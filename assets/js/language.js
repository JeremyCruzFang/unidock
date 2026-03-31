(function () {
  const STORAGE_KEY = "unidock-language";
  const defaultLang = "zh";
  const translations = {
    zh: {
      meta: {
        title: "UniDock | 新生信息与资源入口",
        description: "UniDock 为 NUIST 新生整理入学前后最常用的信息入口与生活资源，帮你更快完成适应与连接。"
      },
      header: {
        subline: "NUIST Freshman Hub",
        languageLabel: "语言切换"
      },
      hero: {
        eyebrow: "NUIST 新生入学支持",
        title: "连接新生信息、校园资源与入学支持",
        subtitle: "UniDock 为 NUIST 新生整理入学前后最常用的信息入口与生活资源，帮你更快完成适应与连接。",
        primary: "开始查看",
        secondary: "联系负责人",
        pills: [
          "高频入口集中整理",
          "覆盖入学前后关键阶段",
          "联系支持更直接"
        ],
        floatTop: "报道准备",
        floatBottom: "地图 / 系统 / 联系方式",
        panelTag: "精选入口",
        panelTitle: "你需要的入口，更快抵达",
        panelSubtitle: "从报道准备到校园生活，先看这些高频内容。",
        panelItems: [
          { title: "报道准备", meta: "流程与材料" },
          { title: "生活资源", meta: "寝室与流量卡" },
          { title: "校内导航", meta: "地图与官网入口" }
        ]
      },
      core: {
        eyebrow: "核心入口",
        title: "把高频入口放在同一处",
        subtitle: "减少来回搜索，优先处理入学前后最常用的事项。",
        cards: [
          {
            title: "校园流量卡",
            desc: "快速了解适合新生办理的校园通信方案。",
            hint: "查看入口"
          },
          {
            title: "寝室用具",
            desc: "整理入住宿舍前常见的物品准备方向。",
            hint: "查看入口"
          },
          {
            title: "校园地图",
            desc: "提前熟悉教学区、生活区和常用办事地点。",
            hint: "站外打开"
          },
          {
            title: "校园官网入口",
            desc: "查看学校官方通知、公告与综合信息。",
            hint: "站外打开"
          },
          {
            title: "新生必看",
            desc: "把报道、准备与避坑内容集中放在一个入口。",
            hint: "进入查看"
          },
          {
            title: "联系方式",
            desc: "遇到具体问题时，直接找到对应负责人员。",
            hint: "立即联系"
          }
        ]
      },
      why: {
        eyebrow: "Why UniDock",
        title: "把需要的信息整理清楚，而不是堆得更多",
        subtitle: "UniDock 只做一件事：把新生真正会反复用到的入口与资源集中起来，减少遗漏和重复查找。",
        items: [
          {
            title: "不用四处找信息",
            desc: "把高频入口放在同一页，减少群聊、帖子和搜索之间来回切换。"
          },
          {
            title: "新生入口集中整理",
            desc: "从报道前准备到校内导航，先把最常用的内容整理完整。"
          },
          {
            title: "降低信息差",
            desc: "让第一次接触校园信息的新生，也能快速知道下一步该看什么。"
          }
        ]
      },
      guide: {
        eyebrow: "新生必看",
        title: "按实际阶段进入，不必一次看完所有内容",
        subtitle: "把最容易遗漏的环节拆成四个清晰入口，帮助你按顺序推进准备与适应。",
        items: [
          {
            title: "报道全流程",
            desc: "按时间顺序梳理报到当天需要完成的关键步骤。"
          },
          {
            title: "行前准备清单",
            desc: "把证件、生活用品和常见准备项提前整理好。"
          },
          {
            title: "新生避坑提示",
            desc: "提前了解常见误区，减少时间和精力浪费。"
          },
          {
            title: "校内系统导航",
            desc: "快速找到课程、事务与校园服务相关系统入口。"
          }
        ]
      },
      cta: {
        eyebrow: "进一步帮助",
        title: "还有问题没有解决？",
        desc: "你可以通过本站负责人员联系方式，获取进一步帮助。",
        button: "添加联系方式"
      },
      footer: {
        desc: "为 NUIST 新生整理信息入口、校园资源与联系支持。",
        note: "一个克制、清晰、可直接使用的新生首页入口。"
      }
    },
    en: {
      meta: {
        title: "UniDock | Freshman Information and Resource Hub",
        description: "UniDock brings together the most useful pre-arrival and campus-life links for NUIST freshmen, helping them adapt and connect faster."
      },
      header: {
        subline: "NUIST Freshman Hub",
        languageLabel: "Language switch"
      },
      hero: {
        eyebrow: "NUIST Freshman Support",
        title: "Connect freshman information, campus resources, and arrival support",
        subtitle: "UniDock gathers the links and life resources NUIST freshmen use most before and after arrival, helping them settle in and connect faster.",
        primary: "Start Exploring",
        secondary: "Contact Lead",
        pills: [
          "Key links in one place",
          "Covers pre-arrival to campus life",
          "Direct support contact"
        ],
        floatTop: "Arrival Prep",
        floatBottom: "Map / Systems / Contact",
        panelTag: "Selected Links",
        panelTitle: "Reach what matters faster",
        panelSubtitle: "From arrival prep to daily campus life, start with these essentials.",
        panelItems: [
          { title: "Arrival Prep", meta: "Steps and materials" },
          { title: "Living Resources", meta: "Dorm supplies and SIM card" },
          { title: "Campus Navigation", meta: "Map and official site" }
        ]
      },
      core: {
        eyebrow: "Core Entry",
        title: "Keep high-frequency links in one place",
        subtitle: "Reduce repeated searching and start with the items freshmen use most.",
        cards: [
          {
            title: "Campus SIM Card",
            desc: "Quickly check mobile plans that are relevant for freshmen.",
            hint: "Open entry"
          },
          {
            title: "Dorm Essentials",
            desc: "Review common preparation directions for moving into the dorm.",
            hint: "Open entry"
          },
          {
            title: "Campus Map",
            desc: "Get familiar with teaching areas, living zones, and key service spots.",
            hint: "Open site"
          },
          {
            title: "Official Website",
            desc: "Visit official notices, announcements, and campus updates.",
            hint: "Open site"
          },
          {
            title: "Freshman Must-Read",
            desc: "See arrival, preparation, and caution content in one clear entry.",
            hint: "View details"
          },
          {
            title: "Contact",
            desc: "Reach the responsible person directly when you have a specific question.",
            hint: "Contact now"
          }
        ]
      },
      why: {
        eyebrow: "Why UniDock",
        title: "Organize what matters instead of adding more noise",
        subtitle: "UniDock focuses on one job: gathering the links and resources freshmen actually reuse, so less gets missed and less time is spent searching.",
        items: [
          {
            title: "No need to search everywhere",
            desc: "Put high-frequency links on one page instead of jumping across chats, posts, and search results."
          },
          {
            title: "Freshman links are curated",
            desc: "From pre-arrival prep to campus navigation, the most-used content is sorted first."
          },
          {
            title: "Reduce the information gap",
            desc: "Even first-time visitors to campus information can quickly see what to read next."
          }
        ]
      },
      guide: {
        eyebrow: "Freshman Must-Read",
        title: "Enter by stage instead of reading everything at once",
        subtitle: "The most easy-to-miss topics are split into four clear entries so preparation can move in a natural order.",
        items: [
          {
            title: "Arrival Process",
            desc: "Review the key steps to complete on arrival day in sequence."
          },
          {
            title: "Pre-Departure Checklist",
            desc: "Prepare documents, daily items, and common essentials in advance."
          },
          {
            title: "Freshman Pitfalls",
            desc: "Understand common mistakes early and avoid wasted time or effort."
          },
          {
            title: "Campus Systems Guide",
            desc: "Find the links for courses, services, and school systems quickly."
          }
        ]
      },
      cta: {
        eyebrow: "Further Help",
        title: "Still have unresolved questions?",
        desc: "You can reach the responsible contact from this site for additional help.",
        button: "Add Contact"
      },
      footer: {
        desc: "An entry point for NUIST freshmen to access information, campus resources, and direct support.",
        note: "A restrained, clear homepage that is ready to use."
      }
    }
  };

  function getValue(source, key) {
    return key.split(".").reduce(function (result, part) {
      if (result === undefined || result === null) {
        return undefined;
      }

      if (/^\d+$/.test(part)) {
        return result[Number(part)];
      }

      return result[part];
    }, source);
  }

  function setLanguage(lang) {
    const currentLang = translations[lang] ? lang : defaultLang;
    const content = translations[currentLang];
    const description = document.querySelector('meta[name="description"]');

    document.querySelectorAll("[data-i18n]").forEach(function (element) {
      const key = element.getAttribute("data-i18n");
      const value = getValue(content, key);

      if (typeof value === "string") {
        element.textContent = value;
      }
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach(function (element) {
      const key = element.getAttribute("data-i18n-aria-label");
      const value = getValue(content, key);

      if (typeof value === "string") {
        element.setAttribute("aria-label", value);
      }
    });

    document.title = content.meta.title;

    if (description) {
      description.setAttribute("content", content.meta.description);
    }

    document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";
    document.querySelectorAll("[data-lang-switch]").forEach(function (button) {
      button.classList.toggle("is-active", button.getAttribute("data-lang-switch") === currentLang);
    });

    localStorage.setItem(STORAGE_KEY, currentLang);
  }

  function initLanguageSwitch() {
    const stored = localStorage.getItem(STORAGE_KEY);
    const preferred = stored && translations[stored] ? stored : defaultLang;

    setLanguage(preferred);

    document.querySelectorAll("[data-lang-switch]").forEach(function (button) {
      button.addEventListener("click", function () {
        setLanguage(button.getAttribute("data-lang-switch"));
      });
    });
  }

  document.addEventListener("DOMContentLoaded", initLanguageSwitch);
})();
