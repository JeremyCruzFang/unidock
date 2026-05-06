(function () {
  function getI18n() {
    return window.UniDockI18n || null;
  }

  function t(key, replacements) {
    const i18n = getI18n();

    if (!i18n || typeof i18n.t !== "function") {
      return "";
    }

    return i18n.t(key, replacements);
  }

  function setRevealDelay(element) {
    const delay = element.getAttribute("data-delay");

    if (delay) {
      element.style.setProperty("--reveal-delay", delay + "ms");
    }
  }

  function initReveal() {
    const revealElements = document.querySelectorAll("[data-reveal]");

    revealElements.forEach(setRevealDelay);

    if (!("IntersectionObserver" in window)) {
      revealElements.forEach(function (element) {
        element.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries, currentObserver) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -10% 0px"
      }
    );

    revealElements.forEach(function (element) {
      observer.observe(element);
    });
  }

  function syncHeaderOffset(header) {
    if (!header) {
      return;
    }

    const headerHeight = Math.ceil(header.getBoundingClientRect().height + 12);
    document.documentElement.style.setProperty("--header-offset", headerHeight + "px");
  }

  function initHeaderState() {
    const header = document.querySelector(".site-header");

    if (!header) {
      return;
    }

    const updateHeader = function () {
      header.classList.toggle("site-header--scrolled", window.scrollY > 8);
      syncHeaderOffset(header);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    window.addEventListener("resize", updateHeader, { passive: true });

    if ("ResizeObserver" in window) {
      const resizeObserver = new ResizeObserver(function () {
        syncHeaderOffset(header);
      });

      resizeObserver.observe(header);
    }
  }

  function setTransitionState(active) {
    document.body.classList.toggle("is-transitioning", active);
    document.documentElement.setAttribute("data-transition-state", active ? "active" : "idle");

    window.dispatchEvent(new CustomEvent("unidock:transition-state", {
      detail: {
        active: active
      }
    }));
  }

  function initRedirectPage() {
    const page = document.querySelector("[data-redirect-page]");

    if (!page) {
      return;
    }

    const target = page.getAttribute("data-redirect-target");
    const delay = Number(page.getAttribute("data-redirect-delay") || "3");
    const countElement = page.querySelector("[data-redirect-count]");
    const openButton = page.querySelector("[data-redirect-open]");
    const homeButton = page.querySelector("[data-redirect-home]");

    if (!target) {
      return;
    }

    let remaining = delay;
    let timerId = 0;

    setTransitionState(true);

    if (countElement) {
      countElement.textContent = String(remaining);
    }

    const stopTimer = function () {
      if (timerId) {
        window.clearInterval(timerId);
        timerId = 0;
      }
    };

    const redirectNow = function () {
      stopTimer();
      setTransitionState(true);
      window.location.href = target;
    };

    if (openButton) {
      openButton.addEventListener("click", function () {
        stopTimer();
        setTransitionState(true);
      });
    }

    if (homeButton) {
      homeButton.addEventListener("click", function () {
        stopTimer();
        setTransitionState(false);
      });
    }

    if (delay <= 0) {
      redirectNow();
      return;
    }

    timerId = window.setInterval(function () {
      remaining -= 1;

      if (remaining > 0) {
        if (countElement) {
          countElement.textContent = String(remaining);
        }
        return;
      }

      redirectNow();
    }, 1000);

    window.addEventListener("pagehide", stopTimer, { once: true });
  }

  function copyToClipboard(value) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(value);
    }

    return new Promise(function (resolve, reject) {
      const input = document.createElement("textarea");

      input.value = value;
      input.setAttribute("readonly", "");
      input.style.position = "fixed";
      input.style.top = "0";
      input.style.left = "0";
      input.style.opacity = "0";

      document.body.appendChild(input);
      input.focus();
      input.select();

      try {
        const successful = document.execCommand("copy");
        document.body.removeChild(input);

        if (successful) {
          resolve();
          return;
        }
      } catch (error) {
        document.body.removeChild(input);
        reject(error);
        return;
      }

      reject(new Error("copy failed"));
    });
  }

  function getCopyLabels(button) {
    const i18n = getI18n();
    const defaultLabel = button.getAttribute("data-copy-default") ||
      (i18n && typeof i18n.t === "function" ? i18n.t("common.copy") : button.textContent.trim());
    const successLabel = button.getAttribute("data-copy-success") ||
      (i18n && typeof i18n.t === "function" ? i18n.t("common.copied") : defaultLabel);

    return {
      defaultLabel: defaultLabel,
      successLabel: successLabel
    };
  }

  function syncCopyButtonLabel(button) {
    if (!button || button.classList.contains("is-copied")) {
      return;
    }

    button.textContent = getCopyLabels(button).defaultLabel;
  }

  function initCopyButtons() {
    const copyButtons = document.querySelectorAll("[data-copy-value]");

    if (!copyButtons.length) {
      return;
    }

    copyButtons.forEach(function (button) {
      let resetTimer = 0;

      syncCopyButtonLabel(button);

      button.addEventListener("click", function () {
        const value = button.getAttribute("data-copy-value");

        if (!value) {
          return;
        }

        const labels = getCopyLabels(button);

        copyToClipboard(value)
          .then(function () {
            window.clearTimeout(resetTimer);
            button.textContent = labels.successLabel;
            button.classList.add("is-copied");

            resetTimer = window.setTimeout(function () {
              button.textContent = getCopyLabels(button).defaultLabel;
              button.classList.remove("is-copied");
            }, 1600);
          })
          .catch(function () {
            window.clearTimeout(resetTimer);
            button.textContent = getCopyLabels(button).defaultLabel;
            button.classList.remove("is-copied");
          });
      });
    });

    window.addEventListener("unidock:language-change", function () {
      copyButtons.forEach(syncCopyButtonLabel);
    });
  }

  const CAMPUS_MAP_REDIRECT_HREF = "./campus-map-redirect.html";
  let campusMapModal = null;
  let campusMapTarget = CAMPUS_MAP_REDIRECT_HREF;
  let campusMapFocusOrigin = null;

  function openCampusMapModal(target, source) {
    ensureCampusMapModal().open(target || CAMPUS_MAP_REDIRECT_HREF, source || document.activeElement);
  }

  function closeCampusMapModal() {
    if (!campusMapModal) {
      return;
    }

    campusMapModal.close();
  }

  function proceedToCampusMap() {
    closeCampusMapModal();
    setTransitionState(true);
    window.location.href = campusMapTarget || CAMPUS_MAP_REDIRECT_HREF;
  }

  function ensureCampusMapModal() {
    if (campusMapModal) {
      return campusMapModal;
    }

    const overlay = document.createElement("div");

    overlay.id = "campusMapModal";
    overlay.className = "campus-map-modal";
    overlay.hidden = true;
    overlay.setAttribute("aria-hidden", "true");
    overlay.innerHTML =
      '<div class="campus-map-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="campus-map-confirm-title">' +
        '<div class="campus-map-modal__glow" aria-hidden="true"></div>' +
        '<button class="campus-map-modal__close" type="button" data-campus-map-close aria-label="' + (t("common.close") || "Close") + '">' +
          '<span aria-hidden="true">&times;</span>' +
        "</button>" +
        '<span class="eyebrow campus-map-modal__eyebrow" data-campus-map-eyebrow></span>' +
        '<h2 id="campus-map-confirm-title" class="campus-map-modal__title" data-campus-map-title></h2>' +
        '<p class="campus-map-modal__body" data-campus-map-body></p>' +
        '<div class="campus-map-modal__actions">' +
          '<button class="button button--primary" type="button" data-campus-map-confirm></button>' +
          '<button class="button button--secondary" type="button" data-campus-map-cancel></button>' +
        "</div>" +
      "</div>";

    document.body.appendChild(overlay);

    const title = overlay.querySelector("[data-campus-map-title]");
    const body = overlay.querySelector("[data-campus-map-body]");
    const eyebrow = overlay.querySelector("[data-campus-map-eyebrow]");
    const closeButton = overlay.querySelector("[data-campus-map-close]");
    const confirmButton = overlay.querySelector("[data-campus-map-confirm]");
    const cancelButton = overlay.querySelector("[data-campus-map-cancel]");

    const renderModal = function () {
      eyebrow.textContent = t("transition.leaving");
      title.textContent = t("campusMap.confirmTitle");
      body.textContent = t("campusMap.confirmBody");
      closeButton.setAttribute("aria-label", t("common.close"));
      confirmButton.textContent = t("campusMap.openOfficial");
      cancelButton.textContent = t("campusMap.back");
    };

    const closeModal = function () {
      overlay.classList.remove("is-open");
      overlay.hidden = true;
      overlay.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-open");
      campusMapTarget = CAMPUS_MAP_REDIRECT_HREF;

      if (campusMapFocusOrigin && typeof campusMapFocusOrigin.focus === "function") {
        campusMapFocusOrigin.focus();
      }

      campusMapFocusOrigin = null;
    };

    const openModal = function (target, source) {
      campusMapTarget = target || CAMPUS_MAP_REDIRECT_HREF;
      campusMapFocusOrigin = source || document.activeElement;
      renderModal();
      overlay.classList.add("is-open");
      overlay.hidden = false;
      overlay.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
      confirmButton.focus();
    };

    overlay.addEventListener("click", function (event) {
      if (event.target === overlay) {
        closeModal();
      }
    });

    closeButton.addEventListener("click", closeModal);
    cancelButton.addEventListener("click", closeModal);
    confirmButton.addEventListener("click", proceedToCampusMap);

    document.addEventListener("keydown", function (event) {
      if (!overlay.hidden && event.key === "Escape") {
        event.preventDefault();
        closeModal();
      }
    });

    window.addEventListener("unidock:language-change", function () {
      if (!overlay.hidden) {
        renderModal();
      }
    });

    campusMapModal = {
      overlay: overlay,
      open: openModal,
      close: closeModal
    };

    return campusMapModal;
  }

  function isCampusMapEntry(link) {
    if (!link) {
      return false;
    }

    if (link.hasAttribute("data-redirect-open")) {
      return false;
    }

    if (link.hasAttribute("data-campus-map-trigger")) {
      return true;
    }

    const href = link.getAttribute("href");

    if (!href) {
      return false;
    }

    try {
      const url = new URL(href, window.location.href);
      const normalizedHref = (href || "").trim();

      return normalizedHref === "//map.nuist.edu.cn" ||
        url.href === "https://map.nuist.edu.cn/" ||
        url.href === "https://map.nuist.edu.cn";
    } catch (error) {
      return false;
    }
  }

  function getCampusMapTarget(link) {
    if (!link) {
      return CAMPUS_MAP_REDIRECT_HREF;
    }

    const explicitTarget = link.getAttribute("data-campus-map-href");

    if (explicitTarget) {
      return explicitTarget;
    }

    const href = link.getAttribute("href");

    if (!href) {
      return CAMPUS_MAP_REDIRECT_HREF;
    }

    try {
      const url = new URL(href, window.location.href);

      if (url.href === "https://map.nuist.edu.cn/" || url.href === "https://map.nuist.edu.cn") {
        return CAMPUS_MAP_REDIRECT_HREF;
      }
    } catch (error) {
      return CAMPUS_MAP_REDIRECT_HREF;
    }

    return href;
  }

  function initCampusMapConfirm() {
    const links = Array.from(document.querySelectorAll("a")).filter(isCampusMapEntry);

    if (!links.length) {
      return;
    }

    links.forEach(function (link) {
      link.addEventListener("click", function (event) {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
          return;
        }

        event.preventDefault();
        openCampusMapModal(getCampusMapTarget(link), link);
      });
    });
  }

  function markPageReady() {
    window.requestAnimationFrame(function () {
      document.body.classList.add("page-is-ready");
    });
  }

  window.UniDockTransition = {
    setActive: setTransitionState
  };

  document.addEventListener("DOMContentLoaded", function () {
    markPageReady();
    initReveal();
    initHeaderState();
    initRedirectPage();
    initCopyButtons();
    initCampusMapConfirm();
  });
})();
