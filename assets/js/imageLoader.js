/* UniDock — Image scheduler / loader.
   A small, dependency-free image loader used to stage requests in three
   priority lanes:
     CRITICAL    — first-paint covers / images known to be in viewport.
     INTERACTION — images the user just asked for (e.g. lightbox open).
     IDLE        — quiet background preloading; pauses while the user is active.
   Features:
     · De-dups by URL — each URL only fetches once across the page.
     · Concurrency cap on the high-priority pool plus a smaller idle pool, so
       the network isn't flooded with parallel image requests.
     · Lazy-loads via IntersectionObserver when supported.
     · Idle work uses requestIdleCallback (with a setTimeout fallback) and is
       paused when the user scrolls / clicks / types / touches.
     · Honors navigator.connection.saveData and 2g effectiveType.
   Public API (window.UniDockImageLoader):
     PRIORITY                                                 priority enum
     preload(url, priority)            → Promise<string>      kick off a load
     preloadBatch(urls, priority)      → Promise<string>[]    bulk variant
     loadInto(imgEl, url, opts)        → Promise<string>      assign src once ready
     observe(imgEl, url, opts)                                lazy via IO
     isLoaded(url)                     → boolean
     pauseIdle() / resumeIdle()                               manual idle control
     disableIdle()                                            permanent (e.g. saveData)
*/
(function () {
  const PRIORITY = { CRITICAL: 0, INTERACTION: 1, IDLE: 2 };
  const POOL_LIMIT = 6;
  const IDLE_POOL_LIMIT = 2;
  const IDLE_QUIET_MS = 1500;

  // URL → entry. status walks idle → queued → loading → loaded | failed.
  const registry = new Map();
  // Three FIFO queues, indexed by priority value.
  const queues = [[], [], []];
  let activeCount = 0;
  let idleActiveCount = 0;
  let idlePaused = false;
  let idleDisabled = false;
  let idleResumeHandle = null;
  let lastInteractionAt = 0;

  function connSaveData() {
    const c = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (!c) return false;
    if (c.saveData) return true;
    if (c.effectiveType && /(^|-)2g$/.test(c.effectiveType)) return true;
    return false;
  }

  function getEntry(url) {
    let e = registry.get(url);
    if (!e) {
      let resolve, reject;
      const promise = new Promise(function (res, rej) { resolve = res; reject = rej; });
      e = { status: "idle", priority: PRIORITY.IDLE, promise: promise, resolve: resolve, reject: reject, img: null };
      registry.set(url, e);
    }
    return e;
  }

  function enqueue(url, priority) {
    if (!url) return Promise.reject(new Error("UniDockImageLoader: missing url"));
    if (priority == null) priority = PRIORITY.IDLE;
    const entry = getEntry(url);
    if (entry.status === "loaded" || entry.status === "loading" || entry.status === "failed") {
      // Upgrading priority on in-flight loads has no effect; just return promise.
      return entry.promise;
    }
    if (priority < entry.priority || entry.status === "idle") {
      entry.priority = priority;
    }
    if (entry.status === "idle") {
      entry.status = "queued";
      queues[entry.priority].push(url);
    } else if (entry.status === "queued") {
      // Already queued; push to the higher-priority queue if we just upgraded.
      // The stale lower-queue entry is filtered out at pickNext time.
      queues[entry.priority].push(url);
    }
    pump();
    return entry.promise;
  }

  function takeFromQueue(p) {
    while (queues[p].length) {
      const url = queues[p].shift();
      const entry = registry.get(url);
      if (!entry || entry.status !== "queued" || entry.priority !== p) continue;
      return { url: url, entry: entry };
    }
    return null;
  }

  function pump() {
    // Drain high-priority lanes against the main pool.
    while (activeCount < POOL_LIMIT) {
      let next = takeFromQueue(PRIORITY.CRITICAL);
      if (!next) next = takeFromQueue(PRIORITY.INTERACTION);
      if (!next) break;
      startLoad(next.url, next.entry, false);
    }
    // Idle lane runs in a tiny separate pool, and only while the high pool is
    // quiet and the user isn't actively interacting.
    if (!idlePaused && !idleDisabled && activeCount === 0) {
      while (idleActiveCount < IDLE_POOL_LIMIT) {
        const next = takeFromQueue(PRIORITY.IDLE);
        if (!next) break;
        startLoad(next.url, next.entry, true);
      }
    }
  }

  function startLoad(url, entry, isIdle) {
    entry.status = "loading";
    if (isIdle) idleActiveCount++; else activeCount++;
    const img = new Image();
    entry.img = img;
    try {
      if (entry.priority === PRIORITY.CRITICAL) img.fetchPriority = "high";
      else if (entry.priority === PRIORITY.IDLE) img.fetchPriority = "low";
    } catch (_) {}
    img.decoding = "async";
    img.onload = function () {
      entry.status = "loaded";
      if (isIdle) idleActiveCount--; else activeCount--;
      try { entry.resolve(url); } catch (_) {}
      pump();
    };
    img.onerror = function () {
      entry.status = "failed";
      if (isIdle) idleActiveCount--; else activeCount--;
      try { entry.reject(new Error("UniDockImageLoader: failed to load " + url)); } catch (_) {}
      pump();
    };
    img.src = url;
  }

  function preload(url, priority) {
    return enqueue(url, priority);
  }

  function preloadBatch(urls, priority) {
    if (!Array.isArray(urls)) return [];
    return urls.map(function (u) { return preload(u, priority); });
  }

  /* Assign src to an existing <img>. Two modes:
     · opts.eager=true   — set src immediately (browser fetches with fetchpriority
       hint). Used for the first images the user must see right now.
     · default            — route through the scheduler, then set src once loaded.
       This keeps a stable upper bound on parallel requests. */
  function loadInto(imgEl, url, opts) {
    if (!imgEl || !url) return Promise.reject(new Error("UniDockImageLoader: bad args"));
    opts = opts || {};
    const priority = opts.priority == null ? PRIORITY.INTERACTION : opts.priority;

    if (opts.eager) {
      try {
        if (priority === PRIORITY.CRITICAL) imgEl.fetchPriority = "high";
        else if (priority === PRIORITY.IDLE) imgEl.fetchPriority = "low";
      } catch (_) {}
      imgEl.decoding = "async";
      if (!imgEl.loading) imgEl.loading = "eager";
      const entry = getEntry(url);
      if (entry.status === "loaded") {
        imgEl.src = url;
        return entry.promise;
      }
      // Drive the entry from this element's events so the registry stays in sync.
      if (entry.status === "idle" || entry.status === "queued") {
        entry.status = "loading";
        entry.priority = priority;
        imgEl.addEventListener("load", function () {
          entry.status = "loaded";
          try { entry.resolve(url); } catch (_) {}
          pump();
        }, { once: true });
        imgEl.addEventListener("error", function () {
          entry.status = "failed";
          try { entry.reject(new Error("UniDockImageLoader: failed to load " + url)); } catch (_) {}
          pump();
        }, { once: true });
        imgEl.src = url;
      } else {
        // Already in-flight elsewhere — wait for that load, then attach src.
        entry.promise.then(function () { imgEl.src = url; }, function () {
          if (typeof opts.onError === "function") opts.onError();
        });
      }
      return entry.promise;
    }

    const entry = getEntry(url);
    if (entry.status === "loaded") {
      imgEl.src = url;
      return entry.promise;
    }
    const p = enqueue(url, priority);
    p.then(function () { imgEl.src = url; }, function () {
      if (typeof opts.onError === "function") opts.onError();
    });
    return p;
  }

  /* Watch an <img> and only start loading once it nears the viewport. Falls
     back to immediate load when IntersectionObserver isn't available. */
  function observe(imgEl, url, opts) {
    if (!imgEl || !url) return;
    opts = opts || {};
    const priority = opts.priority == null ? PRIORITY.CRITICAL : opts.priority;
    const rootMargin = opts.rootMargin || "320px 0px";
    if (typeof IntersectionObserver !== "function") {
      loadInto(imgEl, url, { priority: priority });
      return;
    }
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          io.disconnect();
          loadInto(imgEl, url, { priority: priority });
        }
      });
    }, { rootMargin: rootMargin });
    io.observe(imgEl);
  }

  function isLoaded(url) {
    const e = registry.get(url);
    return !!(e && e.status === "loaded");
  }

  function pauseIdle() {
    idlePaused = true;
    lastInteractionAt = Date.now();
  }

  function resumeIdle() {
    if (idleDisabled) return;
    idlePaused = false;
    pump();
  }

  function disableIdle() {
    idleDisabled = true;
    idlePaused = true;
    queues[PRIORITY.IDLE].length = 0;
  }

  function scheduleIdleResume() {
    if (idleDisabled) return;
    if (idleResumeHandle) return;
    const ric = window.requestIdleCallback || function (cb) {
      return setTimeout(function () {
        cb({ didTimeout: true, timeRemaining: function () { return 0; } });
      }, IDLE_QUIET_MS);
    };
    idleResumeHandle = ric(function () {
      idleResumeHandle = null;
      const quiet = Date.now() - lastInteractionAt;
      if (quiet < IDLE_QUIET_MS) {
        scheduleIdleResume();
        return;
      }
      idlePaused = false;
      pump();
    }, { timeout: IDLE_QUIET_MS + 800 });
  }

  function onInteraction() {
    if (idleDisabled) return;
    pauseIdle();
    scheduleIdleResume();
  }

  // Passive + capture so we don't interfere with normal event handling.
  function bindInputs() {
    const opts = { passive: true, capture: true };
    ["scroll", "pointerdown", "keydown", "touchstart", "wheel"].forEach(function (ev) {
      window.addEventListener(ev, onInteraction, opts);
    });
  }

  bindInputs();

  if (connSaveData()) {
    disableIdle();
  }

  window.UniDockImageLoader = {
    PRIORITY: PRIORITY,
    preload: preload,
    preloadBatch: preloadBatch,
    loadInto: loadInto,
    observe: observe,
    isLoaded: isLoaded,
    pauseIdle: pauseIdle,
    resumeIdle: resumeIdle,
    disableIdle: disableIdle,
    saveData: connSaveData(),
  };
})();
