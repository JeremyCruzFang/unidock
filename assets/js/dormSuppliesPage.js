/* UniDock — Dorm Supplies page renderer
   Renders three sections (bedding-set / bed-curtain / single-items) from
   window.UniDockDormSupplies. Each product is a card with a stacked-image
   preview; clicking opens a lightbox showing every image in a grid.
   Re-renders on language change. */
(function () {
  const SECTION_META = {
    "bedding-set": {
      labelKey: "dormSuppliesPage.sections.beddingSet",
      reveal: 0,
    },
    "bed-curtain": {
      labelKey: "dormSuppliesPage.sections.bedCurtain",
      reveal: 40,
    },
    "single-items": {
      labelKey: "dormSuppliesPage.sections.singleItems",
      reveal: 80,
    },
  };

  function t(key, replacements) {
    const i18n = window.UniDockI18n;
    if (!i18n || typeof i18n.t !== "function") return "";
    const v = i18n.t(key, replacements);
    return typeof v === "string" ? v : "";
  }

  function tNested(key) {
    const i18n = window.UniDockI18n;
    if (!i18n) return "";
    return i18n.t(key);
  }

  function getLang() {
    const i18n = window.UniDockI18n;
    if (i18n && typeof i18n.getLanguage === "function") return i18n.getLanguage();
    return "zh";
  }

  function createEl(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined && text !== null) el.textContent = text;
    return el;
  }

  function photoCountLabel(count) {
    if (count === 1) {
      return t("dormSuppliesPage.card.photoCountSingle") || "1";
    }
    return t("dormSuppliesPage.card.photoCountTpl", { count: count }) || (count + "");
  }

  function buildStack(product, opts) {
    const stack = createEl("div", "dorm-card__stack");
    const images = product.images || [];
    if (images.length === 0) {
      const fb = createEl("div", "dorm-card__fallback", t("dormSuppliesPage.card.fallback") || "No image");
      stack.appendChild(fb);
      stack.classList.add("dorm-card__stack--empty");
      return stack;
    }

    // Back layers under the cover are pure CSS surfaces — no image requests.
    // The visual depth is the same as before, but it costs zero bytes.
    const layerCount = Math.min(images.length, 3);
    for (let i = layerCount - 1; i >= 1; i--) {
      const layer = createEl("div", "dorm-card__layer dorm-card__layer--" + i);
      layer.setAttribute("aria-hidden", "true");
      stack.appendChild(layer);
    }

    // Cover image — uses the tiny thumbnail, not the full WebP. Loading is
    // routed through UniDockImageLoader so requests are staged: the first cards
    // in a grid get eager + fetchpriority=high, the rest defer until they near
    // the viewport.
    const cover = createEl("div", "dorm-card__cover");
    const coverImg = createEl("img", "dorm-card__cover-img");
    const coverUrl = product.coverThumb || images[0];
    coverImg.alt = t("dormSuppliesPage.card.imageAlt", { name: product.displayName, index: 1 }) || product.displayName;
    coverImg.loading = "lazy";
    coverImg.decoding = "async";
    coverImg.addEventListener("error", function () {
      cover.classList.add("is-broken");
      cover.appendChild(createEl("span", "dorm-card__broken-hint", t("dormSuppliesPage.card.fallback") || "No image"));
    });
    const loader = window.UniDockImageLoader;
    const eagerCover = !!(opts && opts.eager);
    if (loader) {
      if (eagerCover) {
        loader.loadInto(coverImg, coverUrl, { priority: loader.PRIORITY.CRITICAL, eager: true });
      } else {
        loader.observe(coverImg, coverUrl, { priority: loader.PRIORITY.CRITICAL });
      }
    } else {
      coverImg.src = coverUrl;
    }
    cover.appendChild(coverImg);

    // count badge
    const badge = createEl("span", "dorm-card__count", photoCountLabel(images.length));
    cover.appendChild(badge);

    stack.appendChild(cover);
    return stack;
  }

  function buildCard(product, opts) {
    const card = createEl("article", "dorm-card");
    card.setAttribute("data-product-key", product.productKey);
    card.setAttribute("data-section-key", product.sectionKey);

    const trigger = createEl("button", "dorm-card__trigger");
    trigger.type = "button";
    const ariaName = product.displayName;
    trigger.setAttribute("aria-label", ariaName);
    trigger.appendChild(buildStack(product, opts));
    card.appendChild(trigger);

    const body = createEl("div", "dorm-card__body");
    body.appendChild(createEl("h3", "dorm-card__name", product.displayName));
    const hintRow = createEl("div", "dorm-card__hint-row");
    hintRow.appendChild(createEl("span", "dorm-card__hint", t("dormSuppliesPage.card.openHint") || ""));
    body.appendChild(hintRow);
    card.appendChild(body);

    trigger.addEventListener("click", function () {
      openLightbox(product);
    });
    trigger.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(product);
      }
    });

    return card;
  }

  // Track which sections have had their cards built. We only build a section's
  // grid the first time it is expanded — collapsed sections issue zero image
  // requests during initial paint.
  const renderedSections = new Set();

  function syncSectionTexts() {
    Object.keys(SECTION_META).forEach(function (key) {
      const meta = SECTION_META[key];
      const eyebrowEl = document.querySelector('[data-dorm-eyebrow="' + key + '"]');
      const titleEl = document.querySelector('[data-dorm-title="' + key + '"]');
      const subtitleEl = document.querySelector('[data-dorm-subtitle="' + key + '"]');
      if (eyebrowEl) eyebrowEl.textContent = t(meta.labelKey + ".eyebrow");
      if (titleEl) titleEl.textContent = t(meta.labelKey + ".title");
      if (subtitleEl) subtitleEl.textContent = t(meta.labelKey + ".subtitle");
    });
  }

  function renderSectionGrid(key) {
    const data = window.UniDockDormSupplies;
    if (!data) return;
    const grid = document.querySelector('[data-dorm-grid="' + key + '"]');
    if (!grid) return;
    grid.innerHTML = "";
    const products = data.bySection(key);
    products.forEach(function (p, i) {
      // First couple of cards in a freshly-expanded section land above the fold
      // and should fetch eagerly; the rest defer via IntersectionObserver.
      grid.appendChild(buildCard(p, { eager: i < 2 }));
    });
    renderedSections.add(key);
    // Once the section is open, queue this section's first full image per
    // product onto the idle lane so future lightbox opens feel instant.
    scheduleIdlePreloadForSection(key);
  }

  // Idle preload: enqueue images[0] of each product at IDLE priority. The
  // scheduler holds these until the network is quiet and the user isn't
  // interacting; opening a lightbox later finds the first frame cached.
  function scheduleIdlePreloadForSection(key) {
    const loader = window.UniDockImageLoader;
    const data = window.UniDockDormSupplies;
    if (!loader || !data) return;
    if (loader.saveData) return;
    data.bySection(key).forEach(function (p) {
      const first = p.images && p.images[0];
      if (first) loader.preload(first, loader.PRIORITY.IDLE);
    });
  }

  // Idle preload only the tiny cover thumbs of as-yet-unrendered sections.
  // Cover thumbs are small and let the next section expansion feel instant
  // without flooding the network with full-resolution images.
  function scheduleIdlePreloadCovers() {
    const loader = window.UniDockImageLoader;
    const data = window.UniDockDormSupplies;
    if (!loader || !data) return;
    if (loader.saveData) return;
    (data.sectionOrder || []).forEach(function (key) {
      if (renderedSections.has(key)) return;
      data.bySection(key).forEach(function (p) {
        if (p.coverThumb) loader.preload(p.coverThumb, loader.PRIORITY.IDLE);
      });
    });
  }

  // Re-render any already-expanded section so card alt text / hint translate.
  function rerenderRenderedSections() {
    renderedSections.forEach(function (key) {
      renderSectionGrid(key);
    });
  }

  // Called by the initial page load and language change. Builds nothing for
  // collapsed sections; just refreshes the header labels.
  function renderSections() {
    syncSectionTexts();
    rerenderRenderedSections();
  }

  /* ── Lightbox ───────────────────────────────────────────────────────────── */
  let lightboxEl = null;
  let lastFocused = null;

  function ensureLightbox() {
    if (lightboxEl) return lightboxEl;
    const overlay = createEl("div", "dorm-lightbox");
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-hidden", "true");
    overlay.tabIndex = -1;

    const dialog = createEl("div", "dorm-lightbox__dialog");

    const header = createEl("div", "dorm-lightbox__header");
    const titleWrap = createEl("div", "dorm-lightbox__title-wrap");
    const sectionLabel = createEl("span", "dorm-lightbox__section");
    sectionLabel.setAttribute("data-role", "section");
    const title = createEl("h2", "dorm-lightbox__title");
    title.setAttribute("data-role", "title");
    const meta = createEl("p", "dorm-lightbox__meta");
    meta.setAttribute("data-role", "meta");
    titleWrap.appendChild(sectionLabel);
    titleWrap.appendChild(title);
    titleWrap.appendChild(meta);
    header.appendChild(titleWrap);

    const closeBtn = createEl("button", "dorm-lightbox__close");
    closeBtn.type = "button";
    closeBtn.setAttribute("data-role", "close");
    closeBtn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 6L18 18M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg><span class="dorm-lightbox__close-label" data-role="close-label"></span>';
    header.appendChild(closeBtn);

    dialog.appendChild(header);

    const grid = createEl("div", "dorm-lightbox__grid");
    grid.setAttribute("data-role", "grid");
    dialog.appendChild(grid);

    overlay.appendChild(dialog);
    document.body.appendChild(overlay);

    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closeLightbox();
    });
    closeBtn.addEventListener("click", closeLightbox);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && overlay.classList.contains("is-open")) {
        closeLightbox();
      }
    });

    lightboxEl = overlay;
    return overlay;
  }

  function getSectionLabelText(sectionKey) {
    const meta = SECTION_META[sectionKey];
    if (!meta) return "";
    return t(meta.labelKey + ".title");
  }

  function openLightbox(product) {
    const overlay = ensureLightbox();
    const sectionEl = overlay.querySelector('[data-role="section"]');
    const titleEl = overlay.querySelector('[data-role="title"]');
    const metaEl = overlay.querySelector('[data-role="meta"]');
    const grid = overlay.querySelector('[data-role="grid"]');
    const closeLabel = overlay.querySelector('[data-role="close-label"]');
    const closeBtn = overlay.querySelector('[data-role="close"]');

    const sectionLabel = t("dormSuppliesPage.modal.sectionLabel");
    sectionEl.textContent = sectionLabel + " · " + getSectionLabelText(product.sectionKey);
    titleEl.textContent = product.displayName;

    const count = product.images.length;
    metaEl.textContent = t("dormSuppliesPage.modal.countTpl", { count: count });

    closeLabel.textContent = t("dormSuppliesPage.modal.close");
    closeBtn.setAttribute("aria-label", t("dormSuppliesPage.modal.close"));

    grid.innerHTML = "";
    const loader = window.UniDockImageLoader;
    // P1: clicking a card promotes that product's full images onto the
    // INTERACTION lane. The first couple are sent through eagerly (browser
    // fetches immediately at high priority); the rest queue through the
    // scheduler so concurrency stays bounded instead of dumping 10–22
    // simultaneous WebP requests on the network.
    product.images.forEach(function (src, i) {
      const fig = createEl("figure", "dorm-lightbox__figure dorm-lightbox__figure--loading");
      const img = createEl("img", "dorm-lightbox__img");
      img.alt = t("dormSuppliesPage.card.imageAlt", { name: product.displayName, index: i + 1 });
      img.decoding = "async";
      img.addEventListener("load", function () {
        fig.classList.remove("dorm-lightbox__figure--loading");
      });
      img.addEventListener("error", function () {
        fig.classList.remove("dorm-lightbox__figure--loading");
        fig.classList.add("is-broken");
      });
      if (loader) {
        if (i < 2) {
          loader.loadInto(img, src, { priority: loader.PRIORITY.CRITICAL, eager: true });
        } else {
          loader.loadInto(img, src, { priority: loader.PRIORITY.INTERACTION });
        }
      } else {
        img.src = src;
        img.loading = i === 0 ? "eager" : "lazy";
        img.fetchPriority = i === 0 ? "high" : "auto";
      }
      fig.appendChild(img);
      grid.appendChild(fig);
    });

    lastFocused = document.activeElement;
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("dorm-lightbox-open");
    // focus close
    setTimeout(function () { closeBtn.focus(); }, 0);
  }

  function closeLightbox() {
    if (!lightboxEl) return;
    lightboxEl.classList.remove("is-open");
    lightboxEl.setAttribute("aria-hidden", "true");
    document.body.classList.remove("dorm-lightbox-open");
    if (lastFocused && typeof lastFocused.focus === "function") {
      try { lastFocused.focus(); } catch (e) {}
    }
  }

  /* ── Pill modal (per-section product picker) ───────────────────────────── */
  let pillModalEl = null;
  let pillModalLastFocused = null;

  function ensurePillModal() {
    if (pillModalEl) return pillModalEl;
    const overlay = createEl("div", "dorm-pill-modal");
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-hidden", "true");

    const dialog = createEl("div", "dorm-pill-modal__dialog");

    const header = createEl("div", "dorm-pill-modal__header");
    const titleWrap = createEl("div", "dorm-pill-modal__title-wrap");
    const eyebrow = createEl("span", "dorm-pill-modal__eyebrow");
    eyebrow.setAttribute("data-role", "eyebrow");
    const title = createEl("h2", "dorm-pill-modal__title");
    title.setAttribute("data-role", "title");
    const meta = createEl("p", "dorm-pill-modal__meta");
    meta.setAttribute("data-role", "meta");
    titleWrap.appendChild(eyebrow);
    titleWrap.appendChild(title);
    titleWrap.appendChild(meta);
    header.appendChild(titleWrap);

    const closeBtn = createEl("button", "dorm-pill-modal__close");
    closeBtn.type = "button";
    closeBtn.setAttribute("data-role", "close");
    closeBtn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 6L18 18M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg><span class="dorm-pill-modal__close-label" data-role="close-label"></span>';
    header.appendChild(closeBtn);

    dialog.appendChild(header);

    const list = createEl("div", "dorm-pill-modal__list");
    list.setAttribute("data-role", "list");
    dialog.appendChild(list);

    overlay.appendChild(dialog);
    document.body.appendChild(overlay);

    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closePillModal();
    });
    closeBtn.addEventListener("click", closePillModal);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && overlay.classList.contains("is-open")) {
        closePillModal();
      }
    });

    pillModalEl = overlay;
    return overlay;
  }

  function openPillModal(sectionKey) {
    const data = window.UniDockDormSupplies;
    if (!data) return;
    const overlay = ensurePillModal();
    const eyebrow = overlay.querySelector('[data-role="eyebrow"]');
    const title = overlay.querySelector('[data-role="title"]');
    const meta = overlay.querySelector('[data-role="meta"]');
    const list = overlay.querySelector('[data-role="list"]');
    const closeLabel = overlay.querySelector('[data-role="close-label"]');
    const closeBtn = overlay.querySelector('[data-role="close"]');

    const products = data.bySection(sectionKey);

    eyebrow.textContent = t("dormSuppliesPage.pillModal.eyebrow") + " · " + getSectionLabelText(sectionKey);
    title.textContent = getSectionLabelText(sectionKey);
    meta.textContent = t("dormSuppliesPage.pillModal.countTpl", { count: products.length });

    closeLabel.textContent = t("dormSuppliesPage.modal.close");
    closeBtn.setAttribute("aria-label", t("dormSuppliesPage.modal.close"));

    list.innerHTML = "";
    if (products.length === 0) {
      const empty = createEl("p", "dorm-pill-modal__empty", t("dormSuppliesPage.pillModal.empty"));
      list.appendChild(empty);
    } else {
      products.forEach(function (product) {
        const pill = createEl("button", "dorm-pill", product.displayName);
        pill.type = "button";
        pill.setAttribute("data-product-key", product.productKey);
        pill.addEventListener("click", function () {
          closePillModal({ skipFocusRestore: true });
          openLightbox(product);
        });
        list.appendChild(pill);
      });
    }

    pillModalLastFocused = document.activeElement;
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("dorm-lightbox-open");
    setTimeout(function () { closeBtn.focus(); }, 0);
  }

  function closePillModal(opts) {
    if (!pillModalEl) return;
    pillModalEl.classList.remove("is-open");
    pillModalEl.setAttribute("aria-hidden", "true");
    // Only release body scroll lock if the image lightbox is also closed.
    if (!lightboxEl || !lightboxEl.classList.contains("is-open")) {
      document.body.classList.remove("dorm-lightbox-open");
    }
    if (opts && opts.skipFocusRestore) return;
    if (pillModalLastFocused && typeof pillModalLastFocused.focus === "function") {
      try { pillModalLastFocused.focus(); } catch (e) {}
    }
  }

  /* ── Collapse / expand + floating collapse button ──────────────────────── */
  let floatingBtnEl = null;
  let activeExpandedKey = null;

  function ensureFloatingBtn() {
    if (floatingBtnEl) return floatingBtnEl;
    const btn = createEl("button", "dorm-floating-collapse");
    btn.type = "button";
    btn.hidden = true;
    btn.innerHTML = '<span class="dorm-floating-collapse__chevron" aria-hidden="true"></span><span class="dorm-floating-collapse__label"></span>';
    btn.addEventListener("click", function () {
      const key = btn.getAttribute("data-target");
      if (!key) return;
      const section = document.querySelector('[data-dorm-section="' + key + '"]');
      if (!section) return;
      collapseSection(section);
    });
    document.body.appendChild(btn);
    floatingBtnEl = btn;
    return btn;
  }

  function syncToggleLabels() {
    document.querySelectorAll('[data-dorm-toggle]').forEach(function (btn) {
      const expand = btn.querySelector('.dorm-section__toggle-label--expand');
      const collapse = btn.querySelector('.dorm-section__toggle-label--collapse');
      if (expand) expand.textContent = t("dormSuppliesPage.action.expand");
      if (collapse) collapse.textContent = t("dormSuppliesPage.action.collapse");
    });
    document.querySelectorAll('[data-dorm-view-all] > span').forEach(function (span) {
      span.textContent = t("dormSuppliesPage.action.viewAll");
    });
    if (floatingBtnEl) {
      const label = floatingBtnEl.querySelector('.dorm-floating-collapse__label');
      if (label) label.textContent = t("dormSuppliesPage.action.collapse");
      floatingBtnEl.setAttribute("aria-label", t("dormSuppliesPage.action.floatingAria"));
    }
  }

  function expandSection(section) {
    if (!section) return;
    const key = section.getAttribute("data-dorm-section");
    // Lazy-render the grid on first expand. Collapsed sections never trigger
    // an image fetch, and re-expanding a previously rendered section just
    // re-shows the cached DOM.
    if (key && !renderedSections.has(key)) {
      renderSectionGrid(key);
    }
    section.classList.remove("is-collapsed");
    const btn = section.querySelector('[data-dorm-toggle="' + key + '"]');
    if (btn) btn.setAttribute("aria-expanded", "true");
    updateFloatingCollapse();
  }

  function collapseSection(section) {
    if (!section) return;
    section.classList.add("is-collapsed");
    const key = section.getAttribute("data-dorm-section");
    const btn = section.querySelector('[data-dorm-toggle="' + key + '"]');
    if (btn) btn.setAttribute("aria-expanded", "false");
    // Scroll to keep the section header in view so the user keeps context.
    const top = section.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    if (btn) {
      try { btn.focus({ preventScroll: true }); } catch (e) {}
    }
    updateFloatingCollapse();
  }

  function bindSectionToggles() {
    document.querySelectorAll('[data-dorm-toggle]').forEach(function (btn) {
      btn.addEventListener("click", function () {
        const key = btn.getAttribute("data-dorm-toggle");
        const section = document.querySelector('[data-dorm-section="' + key + '"]');
        if (!section) return;
        if (section.classList.contains("is-collapsed")) {
          expandSection(section);
        } else {
          collapseSection(section);
        }
      });
    });
  }

  function bindViewAllButtons() {
    document.querySelectorAll('[data-dorm-view-all]').forEach(function (btn) {
      btn.addEventListener("click", function () {
        openPillModal(btn.getAttribute("data-dorm-view-all"));
      });
    });
  }

  function updateFloatingCollapse() {
    const btn = ensureFloatingBtn();
    const expanded = Array.prototype.slice.call(
      document.querySelectorAll('[data-dorm-section]:not(.is-collapsed)')
    );

    if (expanded.length === 0) {
      btn.hidden = true;
      activeExpandedKey = null;
      return;
    }

    const vh = window.innerHeight;
    let best = null;
    let bestScore = 0;
    expanded.forEach(function (section) {
      const r = section.getBoundingClientRect();
      const visible = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
      // Only show the floating button when this section actually overlaps viewport
      // by a meaningful amount (avoids flashing when scrolled fully past).
      if (visible < 80) return;
      if (visible > bestScore) {
        bestScore = visible;
        best = section;
      }
    });

    if (!best) {
      btn.hidden = true;
      activeExpandedKey = null;
      return;
    }

    const key = best.getAttribute("data-dorm-section");
    activeExpandedKey = key;
    btn.setAttribute("data-target", key);
    btn.setAttribute("aria-label", t("dormSuppliesPage.action.floatingAria"));
    const label = btn.querySelector('.dorm-floating-collapse__label');
    if (label) label.textContent = t("dormSuppliesPage.action.collapse");
    btn.hidden = false;
  }

  function initInteractions() {
    ensureFloatingBtn();
    bindSectionToggles();
    bindViewAllButtons();
    syncToggleLabels();
    updateFloatingCollapse();
    window.addEventListener("scroll", updateFloatingCollapse, { passive: true });
    window.addEventListener("resize", updateFloatingCollapse);
  }

  function onLanguageChange() {
    renderSections();
    syncToggleLabels();
    updateFloatingCollapse();
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderSections();
    initInteractions();
    // Idle preload of cover thumbs only fires after a real quiet window
    // (~2.5s) and only via the IDLE lane — any scroll / click / keydown pauses
    // the scheduler before flooding the network.
    setTimeout(function () {
      const ric = window.requestIdleCallback || function (cb) { return setTimeout(cb, 500); };
      ric(function () { scheduleIdlePreloadCovers(); }, { timeout: 5000 });
    }, 2500);
  });
  window.addEventListener("unidock:language-change", onLanguageChange);
})();
