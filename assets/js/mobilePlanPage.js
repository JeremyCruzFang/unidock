/* UniDock — Campus Mobile Plan page renderer
   Builds the plan cards from window.UniDockMobilePlans into [data-mobile-plan-grid],
   re-rendering whenever the language changes so labels follow the active locale. */

(function () {
  const PLACEHOLDER_ZH = "待确认";
  const PLACEHOLDER_EN = "To be confirmed";

  function getLang() {
    const i18n = window.UniDockI18n;

    if (i18n && typeof i18n.getLanguage === "function") {
      return i18n.getLanguage();
    }

    return "zh";
  }

  function t(key) {
    const i18n = window.UniDockI18n;

    if (!i18n || typeof i18n.t !== "function") {
      return "";
    }

    const value = i18n.t(key);
    return typeof value === "string" ? value : "";
  }

  function pickLocale(plan, lang, field) {
    const suffix = lang === "en" ? "En" : "Zh";
    const value = plan[field + suffix];

    if (typeof value === "string" && value.length > 0) {
      return value;
    }

    const fallback = plan[field + (suffix === "En" ? "Zh" : "En")];
    return typeof fallback === "string" ? fallback : "";
  }

  function localeArray(plan, lang, field) {
    const suffix = lang === "en" ? "En" : "Zh";
    const value = plan[field + suffix];

    if (Array.isArray(value) && value.length > 0) {
      return value;
    }

    const fallback = plan[field + (suffix === "En" ? "Zh" : "En")];
    return Array.isArray(fallback) ? fallback : [];
  }

  function isPlaceholder(value) {
    if (typeof value !== "string") {
      return false;
    }

    return value === PLACEHOLDER_ZH || value === PLACEHOLDER_EN;
  }

  function specValue(specs, lang, key) {
    const suffix = lang === "en" ? "En" : "Zh";
    const value = specs[key + suffix];

    if (typeof value === "string" && value.length > 0) {
      return value;
    }

    const fallback = specs[key + (suffix === "En" ? "Zh" : "En")];
    return typeof fallback === "string" ? fallback : "";
  }

  function createEl(tag, className, text) {
    const el = document.createElement(tag);

    if (className) {
      el.className = className;
    }

    if (text !== undefined && text !== null) {
      el.textContent = text;
    }

    return el;
  }

  function buildHeader(card, plan, lang) {
    const header = createEl("div", "plan-card__header");

    const eyebrow = createEl("div", "plan-card__eyebrow");
    eyebrow.appendChild(createEl("span", "plan-card__carrier-label", t("mobilePlanPage.card.carrierLabel")));
    eyebrow.appendChild(createEl("span", "plan-card__carrier", pickLocale(plan, lang, "carrier")));
    header.appendChild(eyebrow);

    const name = createEl("h3", "plan-card__name", pickLocale(plan, lang, "name"));
    header.appendChild(name);

    const fee = createEl("div", "plan-card__fee");
    fee.appendChild(createEl("span", "plan-card__fee-label", t("mobilePlanPage.card.monthlyFee")));
    const feeNumberWrap = createEl("span", "plan-card__fee-amount");
    feeNumberWrap.appendChild(createEl("strong", "plan-card__fee-number",
      plan.monthlyFee !== null && plan.monthlyFee !== undefined ? String(plan.monthlyFee) : (lang === "en" ? PLACEHOLDER_EN : PLACEHOLDER_ZH)));
    feeNumberWrap.appendChild(createEl("span", "plan-card__fee-unit", t("mobilePlanPage.card.monthlyFeeUnit")));
    fee.appendChild(feeNumberWrap);
    header.appendChild(fee);

    const tags = createEl("div", "plan-card__tags");
    localeArray(plan, lang, "tags").forEach(function (tag) {
      tags.appendChild(createEl("span", "plan-card__tag", tag));
    });
    header.appendChild(tags);

    card.appendChild(header);
  }

  function buildHighlights(card, plan, lang) {
    const items = localeArray(plan, lang, "highlights");

    if (items.length === 0) {
      return;
    }

    const section = createEl("div", "plan-card__section");
    section.appendChild(createEl("span", "plan-card__section-label", t("mobilePlanPage.card.highlightsLabel")));

    const list = createEl("ul", "plan-card__highlights");
    items.forEach(function (text) {
      const li = createEl("li", "plan-card__highlight");
      li.appendChild(createEl("span", "plan-card__highlight-dot", "·"));
      li.appendChild(createEl("span", null, text));
      list.appendChild(li);
    });

    section.appendChild(list);
    card.appendChild(section);
  }

  function buildKeySpecs(card, plan, lang) {
    const specs = plan.specs || {};
    const order = ["generalData", "extraData", "totalData", "rechargeBonus", "balanceValidity", "membership"];
    const items = [];

    order.forEach(function (key) {
      const value = specValue(specs, lang, key);

      if (value && !isPlaceholder(value)) {
        items.push({ key: key, value: value });
      }
    });

    if (items.length === 0) {
      return;
    }

    const section = createEl("div", "plan-card__section plan-card__section--specs");
    section.appendChild(createEl("span", "plan-card__section-label", t("mobilePlanPage.card.specsLabel")));

    const list = createEl("dl", "plan-card__spec-list");
    items.forEach(function (item) {
      const labelKey = "mobilePlanPage.card." + item.key;
      list.appendChild(createEl("dt", "plan-card__spec-term", t(labelKey)));
      list.appendChild(createEl("dd", "plan-card__spec-desc", item.value));
    });

    section.appendChild(list);
    card.appendChild(section);
  }

  function buildBenefits(card, plan, lang) {
    if (!plan.monthlyBenefits || !Array.isArray(plan.monthlyBenefits.options) || plan.monthlyBenefits.options.length === 0) {
      return;
    }

    const benefits = plan.monthlyBenefits;
    const section = createEl("div", "plan-card__section");
    section.appendChild(createEl("span", "plan-card__section-label", t("mobilePlanPage.card.benefitsLabel")));

    const title = lang === "en" ? benefits.titleEn : benefits.titleZh;
    if (title) {
      section.appendChild(createEl("p", "plan-card__benefits-title", title));
    }

    const list = createEl("ul", "plan-card__benefit-list");
    benefits.options.forEach(function (option, index) {
      const li = createEl("li", "plan-card__benefit");
      li.appendChild(createEl("span", "plan-card__benefit-index", String(index + 1).padStart(2, "0")));

      const body = createEl("div", "plan-card__benefit-body");
      body.appendChild(createEl("strong", "plan-card__benefit-label", lang === "en" ? option.labelEn : option.labelZh));

      const detail = lang === "en" ? option.detailEn : option.detailZh;
      if (detail) {
        body.appendChild(createEl("span", "plan-card__benefit-detail", detail));
      }

      li.appendChild(body);
      list.appendChild(li);
    });

    section.appendChild(list);
    card.appendChild(section);
  }

  function buildNotices(card, plan, lang) {
    const items = localeArray(plan, lang, "notices");

    if (items.length === 0) {
      return;
    }

    const section = createEl("div", "plan-card__section plan-card__section--notices");
    section.appendChild(createEl("span", "plan-card__section-label", t("mobilePlanPage.card.noticesLabel")));

    const list = createEl("ul", "plan-card__notice-list");
    items.forEach(function (text) {
      list.appendChild(createEl("li", "plan-card__notice", text));
    });
    section.appendChild(list);

    card.appendChild(section);
  }

  function buildDetails(card, plan, lang) {
    const specs = plan.specs || {};
    const detailOrder = [
      "generalData",
      "extraData",
      "totalData",
      "callMinutes",
      "membership",
      "rechargeBonus",
      "balanceValidity",
      "contractPeriod",
      "activationMethod"
    ];

    const entries = [];
    detailOrder.forEach(function (key) {
      const value = specValue(specs, lang, key);
      if (value) {
        entries.push({ key: key, value: value });
      }
    });

    if (entries.length === 0) {
      return;
    }

    const details = createEl("details", "plan-card__details");
    const summary = createEl("summary", "plan-card__details-summary");
    summary.appendChild(createEl("span", "plan-card__details-toggle-open", t("mobilePlanPage.card.toggleOpen")));
    summary.appendChild(createEl("span", "plan-card__details-toggle-close", t("mobilePlanPage.card.toggleClose")));
    details.appendChild(summary);

    const list = createEl("dl", "plan-card__detail-list");
    entries.forEach(function (entry) {
      list.appendChild(createEl("dt", "plan-card__detail-term", t("mobilePlanPage.card." + entry.key)));
      list.appendChild(createEl("dd", "plan-card__detail-desc" + (isPlaceholder(entry.value) ? " is-placeholder" : ""), entry.value));
    });

    details.appendChild(list);
    card.appendChild(details);
  }

  function buildActions(card) {
    const actions = createEl("div", "plan-card__actions");
    const consult = createEl("a", "button button--primary plan-card__cta", t("mobilePlanPage.card.consult"));
    consult.href = "./wechat-add.html";
    actions.appendChild(consult);
    card.appendChild(actions);
  }

  function buildCard(plan, lang) {
    const card = createEl("article", "plan-card");
    card.setAttribute("data-plan-id", plan.id);

    buildHeader(card, plan, lang);
    buildHighlights(card, plan, lang);
    buildKeySpecs(card, plan, lang);
    buildBenefits(card, plan, lang);
    buildNotices(card, plan, lang);
    buildDetails(card, plan, lang);
    buildActions(card);

    return card;
  }

  function render() {
    const root = document.querySelector("[data-mobile-plan-grid]");

    if (!root || !window.UniDockMobilePlans) {
      return;
    }

    const lang = getLang();
    root.innerHTML = "";

    window.UniDockMobilePlans.plans.forEach(function (plan) {
      root.appendChild(buildCard(plan, lang));
    });
  }

  document.addEventListener("DOMContentLoaded", render);
  window.addEventListener("unidock:language-change", render);
})();
