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

  function buildStack(product) {
    const stack = createEl("div", "dorm-card__stack");
    const images = product.images || [];
    if (images.length === 0) {
      const fb = createEl("div", "dorm-card__fallback", t("dormSuppliesPage.card.fallback") || "No image");
      stack.appendChild(fb);
      stack.classList.add("dorm-card__stack--empty");
      return stack;
    }

    // Up to three back layers under the cover
    const layerCount = Math.min(images.length, 3);
    for (let i = layerCount - 1; i >= 1; i--) {
      const layer = createEl("div", "dorm-card__layer dorm-card__layer--" + i);
      // back layers use the next images so they peek out faintly
      const img = createEl("img", "dorm-card__layer-img");
      img.src = images[Math.min(i, images.length - 1)];
      img.alt = "";
      img.loading = "lazy";
      img.decoding = "async";
      img.addEventListener("error", function () {
        layer.classList.add("is-broken");
      });
      layer.appendChild(img);
      stack.appendChild(layer);
    }

    // Cover image
    const cover = createEl("div", "dorm-card__cover");
    const coverImg = createEl("img", "dorm-card__cover-img");
    coverImg.src = images[0];
    coverImg.alt = t("dormSuppliesPage.card.imageAlt", { name: product.displayName, index: 1 }) || product.displayName;
    coverImg.loading = "lazy";
    coverImg.decoding = "async";
    coverImg.addEventListener("error", function () {
      cover.classList.add("is-broken");
      cover.appendChild(createEl("span", "dorm-card__broken-hint", t("dormSuppliesPage.card.fallback") || "No image"));
    });
    cover.appendChild(coverImg);

    // count badge
    const badge = createEl("span", "dorm-card__count", photoCountLabel(images.length));
    cover.appendChild(badge);

    stack.appendChild(cover);
    return stack;
  }

  function buildCard(product) {
    const card = createEl("article", "dorm-card");
    card.setAttribute("data-product-key", product.productKey);
    card.setAttribute("data-section-key", product.sectionKey);

    const trigger = createEl("button", "dorm-card__trigger");
    trigger.type = "button";
    const ariaName = product.displayName;
    trigger.setAttribute("aria-label", ariaName);
    trigger.appendChild(buildStack(product));
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

  function renderSections() {
    const data = window.UniDockDormSupplies;
    if (!data) return;

    Object.keys(SECTION_META).forEach(function (key) {
      const meta = SECTION_META[key];
      const grid = document.querySelector('[data-dorm-grid="' + key + '"]');
      const eyebrowEl = document.querySelector('[data-dorm-eyebrow="' + key + '"]');
      const titleEl = document.querySelector('[data-dorm-title="' + key + '"]');
      const subtitleEl = document.querySelector('[data-dorm-subtitle="' + key + '"]');

      if (eyebrowEl) eyebrowEl.textContent = t(meta.labelKey + ".eyebrow");
      if (titleEl) titleEl.textContent = t(meta.labelKey + ".title");
      if (subtitleEl) subtitleEl.textContent = t(meta.labelKey + ".subtitle");

      if (!grid) return;
      grid.innerHTML = "";
      data.bySection(key).forEach(function (p) {
        grid.appendChild(buildCard(p));
      });
    });
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
    product.images.forEach(function (src, i) {
      const fig = createEl("figure", "dorm-lightbox__figure");
      const img = createEl("img", "dorm-lightbox__img");
      img.src = src;
      img.alt = t("dormSuppliesPage.card.imageAlt", { name: product.displayName, index: i + 1 });
      img.loading = "lazy";
      img.decoding = "async";
      img.addEventListener("error", function () {
        fig.classList.add("is-broken");
      });
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
    section.classList.remove("is-collapsed");
    const key = section.getAttribute("data-dorm-section");
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
  });
  window.addEventListener("unidock:language-change", onLanguageChange);
})();
