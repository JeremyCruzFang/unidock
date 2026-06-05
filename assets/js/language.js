(function () {
  const STORAGE_KEY = "unidock-language";
  const defaultLang = "zh";
  let currentLang = defaultLang;

  const translations = {
    zh: {
      meta: {
        title: "UniDock | 新生信息与资源入口",
        description: "UniDock 为 NUIST 新生整理入学前后最常用的信息入口与生活资源，帮助你更快适应与连接。"
      },
      arrivalMeta: {
        title: "UniDock | 报到全流程",
        description: "查看 UniDock 整理的报到全流程，从出发到完成报到，按阶段完成关键步骤。"
      },
      checklistMeta: {
        title: "UniDock | 行前准备清单",
        description: "查看 UniDock 整理的行前准备清单，在出发前完成关键准备，减少入校后的遗漏与返工。"
      },
      pitfallsMeta: {
        title: "UniDock | 新生避坑提示",
        description: "查看 UniDock 整理的新生避坑提示与学习生活须知，提前完成入学前的关键准备。"
      },
      systemsMeta: {
        title: "UniDock | 校内系统导航",
        description: "查看 UniDock 整理的校内系统导航入口，更快找到统一入口、信息门户及常用校园应用。"
      },
      contactMeta: {
        title: "UniDock | 联系负责人",
        description: "联系 UniDock 负责人，快速复制手机号、微信号或邮箱，处理报到流程、行前准备、校园资源与页面使用问题。"
      },
      mailboxMeta: {
        title: "UniDock | Mailbox",
        description: "查看 UniDock Mailbox 内的站内通知、置顶消息与模块更新。"
      },
      mailboxDetailMeta: {
        title: "UniDock | Mailbox 详情",
        description: "查看 UniDock Mailbox 消息详情与具体内容。"
      },
      campusMapRedirectMeta: {
        title: "UniDock | 正在前往官方校园地图",
        description: "UniDock 正在为你打开南京信息工程大学官方校园地图服务。"
      },
      officialSiteRedirectMeta: {
        title: "UniDock | 正在前往校园官网",
        description: "UniDock 正在为你打开南京信息工程大学官方网站。"
      },
      lifeResourcesRedirectMeta: {
        title: "UniDock | 选择生活资源入口",
        description: "UniDock 为你分发生命卡与宿舍用具相关入口。"
      },
      campusNavigationRedirectMeta: {
        title: "UniDock | 选择校园入口",
        description: "UniDock 为你分发校园地图与校园官网入口。"
      },
      mobilePlanMeta: {
        title: "UniDock | 校园流量卡",
        description: "查看 UniDock 整理的校园流量卡套餐信息，包括月费、流量、首充机制、活动期与办理前注意事项。"
      },
      mobilePlanMoreMeta: {
        title: "UniDock | 更多校园流量卡套餐",
        description: "更多校园流量卡套餐将在第二阶段从号卡系统中整理后展示。"
      },
      header: {
        subline: "NUIST Freshman Hub",
        languageLabel: "语言切换"
      },
      subpage: {
        back: "返回首页"
      },
      common: {
        back: "返回",
        close: "关闭",
        copy: "复制",
        copied: "已复制"
      },
      menu: {
        toggle: "打开目录",
        freshman: "新生必看",
        arrival: "报到准备",
        living: "生活资源",
        navigation: "校内导航",
        contact: "联系负责人"
      },
      hero: {
        eyebrow: "NUIST 新生入学支持",
        title: "连接新生信息、校园资源与入学支持",
        subtitle: "UniDock 为 NUIST 新生整理入学前后最常用的信息入口与生活资源，帮助你更快完成适应与连接。",
        primary: "开始查看",
        secondary: "联系负责人",
        pills: [
          "高频入口集中整理",
          "覆盖入学前后关键阶段",
          "联系支持更直接"
        ],
        floatTop: "报到准备",
        floatBottom: "地图 / 系统 / 联系方式",
        panelTag: "精选入口",
        panelTitle: "你需要的入口，更快抵达",
        panelSubtitle: "从报到准备到校园生活，先看这些高频内容。",
        panelItems: [
          { title: "报到准备", meta: "流程与材料" },
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
            title: "官方校园地图",
            desc: "跳转至南京信息工程大学官方地图服务，UniDock 仅提供便捷入口。",
            hint: "站外打开"
          },
          {
            title: "校园官网入口",
            desc: "查看学校官方通知、公告与综合信息。",
            hint: "站外打开"
          },
          {
            title: "新生必看",
            desc: "把报到、准备与避坑内容集中放在一个入口。",
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
            desc: "从报到前准备到校内导航，先把最常用的内容整理完整。"
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
            title: "报到全流程",
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
      pitfallsPage: {
        hero: {
          eyebrow: "新生提示",
          title: "新生避坑提示",
          subtitle: "把入学后最容易忽视的节点提前看清，也把学习与生活的基本节奏先整理明白。"
        },
        sections: {
          pitfalls: {
            eyebrow: "Section A",
            title: "新生避坑提示",
            subtitle: "优先避开入学初期最常见的判断偏差、信息遗漏和生活管理问题。",
            items: [
              "不要把大学当作躺平阶段，课程难度和自主学习要求都会明显提升。",
              "不要只追求不挂科，绩点会影响评优、保研、出国和求职。",
              "不要忽视课堂与平时成绩，出勤和作业非常重要。",
              "社团不在多，在精，建议选择 2 到 3 个真正感兴趣的。",
              "管理好生活费，避免不必要的消费压力。",
              "宿舍关系保持边界感，尊重彼此差异。",
              "重要通知必须自己关注，不要依赖他人提醒。",
              "遇到问题及时求助，不要独自承受压力。",
              "不要盲目跟风，应根据自身规划选择方向。",
              "学长经验可以参考，但不要完全照搬。",
              "校内交通需合规，违规车辆可能被清理。",
              "校园卡套餐差异较大，建议提前对比选择。"
            ],
            noteLabel: "UniDock 建议",
            noteText: "入学前完成校园流量卡选择，避免开学排队和信息差。"
          },
          essentials: {
            eyebrow: "Section B",
            title: "学习与生活须知",
            subtitle: "先建立正确预期，再逐步熟悉学校系统、课程节奏和日常服务工具。",
            items: [
              "学习方式由被动转为主动，需要自我管理。",
              "校园生活依赖数字系统，建议提前熟悉。",
              "网络和流量是基础配置，建议提前准备。",
              "日常生活服务依赖多个 APP，建议提前下载。",
              "学时和课程要求因学院不同而有所差异。"
            ],
            noteLabel: "UniDock 定位",
            noteText: "帮助你在入学前完成关键准备，让你到校即进入状态。"
          }
        }
      },
      systemsPage: {
        hero: {
          eyebrow: "校内系统",
          title: "校内系统导航",
          subtitle: "把入学后常用的系统和应用入口先整理清楚，减少重复查找和切换成本。"
        },
        grid: {
          eyebrow: "System Cards",
          title: "常用系统与应用",
          subtitle: "有外部链接的卡片可直接打开，无链接的项目保留为统一的信息卡片，便于你先建立使用清单。"
        },
        cards: [
          {
            badge: "网页入口",
            title: "统一入口",
            desc: "统一访问相关校园应用入口",
            meta: "进入"
          },
          {
            badge: "网页入口",
            title: "信息门户",
            desc: "身份认证、教务相关入口",
            meta: "进入"
          },
          {
            badge: "校内应用",
            title: "学习通",
            desc: "课程资料、签到、作业平台",
            meta: "课程常用"
          },
          {
            badge: "校内应用",
            title: "企业微信",
            desc: "通知与沟通",
            meta: "沟通必备"
          },
          {
            badge: "校内应用",
            title: "趣智校园",
            desc: "洗浴、饮水",
            meta: "生活服务"
          },
          {
            badge: "校内应用",
            title: "胖乖生活",
            desc: "洗衣",
            meta: "生活服务"
          },
          {
            badge: "校内应用",
            title: "闪动校园 Pro",
            desc: "校园跑",
            meta: "体测相关"
          },
          {
            badge: "校内应用",
            title: "PU 口袋校园",
            desc: "学时系统",
            meta: "活动与学时"
          }
        ],
        note: {
          label: "UniDock 优势",
          text: "整合关键系统入口，减少信息查找成本。"
        }
      },
      campusMap: {
        title: "官方校园地图",
        desc: "跳转至南京信息工程大学官方地图服务，UniDock 仅提供便捷入口。",
        confirmTitle: "官方校园地图",
        confirmBody: "你即将离开 UniDock，前往南京信息工程大学官方校园地图服务。地图内容与服务由校方系统提供，UniDock 仅提供便捷导航入口。如官方页面出现授权、商用或使用提示，请以校方说明为准。",
        openOfficial: "前往官方地图",
        back: "返回 UniDock"
      },
      transition: {
        leaving: "站外打开",
        loading: "正在跳转",
        opensIn: "将在",
        secondsAuto: "秒后自动打开",
        openNow: "立即前往",
        backHome: "返回首页",
        domainLabel: "目标域名",
        campusMapTitle: "正在前往官方校园地图",
        campusMapSubtitle: "即将跳转至南京信息工程大学官方校园地图服务。",
        officialSiteTitle: "正在前往校园官网",
        officialSiteSubtitle: "即将跳转至南京信息工程大学官方网站。"
      },
      redirectChoices: {
        campus: {
          eyebrow: "导航选择",
          title: "选择你要前往的校园入口",
          subtitle: "地图和官网入口都已整理好，按你的当前需求继续前往。",
          primaryLabel: "主入口",
          primaryTitle: "官方校园地图",
          primaryDesc: "先查看校内位置、教学区与生活区分布，适合快速找路。",
          primaryMeta: "立即前往",
          secondaryLabel: "次入口",
          secondaryTitle: "校园官网入口",
          secondaryDesc: "前往学校官方网站，查看通知、公告与综合信息。",
          secondaryMeta: "继续打开"
        },
        resources: {
          eyebrow: "资源选择",
          title: "选择你要前往的生活资源",
          subtitle: "先选择当前最需要查看的资源方向，再继续进入对应入口。",
          primaryLabel: "主入口",
          primaryTitle: "校园流量卡",
          primaryDesc: "进入校园流量卡页面，查看套餐、流量与办理说明。",
          primaryMeta: "进入资源",
          secondaryLabel: "次入口",
          secondaryTitle: "寝室用具",
          secondaryDesc: "返回首页并定位到寝室用具入口，继续查看对应链接。",
          secondaryMeta: "进入资源"
        }
      },
      contact: {
        eyebrow: "联系方式",
        title: "联系负责人",
        intro: "如在报到流程、行前准备、校园资源或页面使用中遇到问题，可直接联系对应负责人。",
        panelEyebrow: "负责人联系方式",
        panelTitle: "复制后即可直接联系",
        panelDesc: "手机号、微信与邮箱已整理为统一结构，减少重复确认和手动记录成本。",
        owner01: "负责人 01",
        owner02: "负责人 02",
        sameWechat: "微信同号",
        phone: "手机号",
        wechat: "微信",
        email: "邮箱",
        partnershipEyebrow: "合作联系",
        partnershipTitle: "意向合作联系",
        partnershipDesc: "如需站点合作、共建或内容协作，可直接通过以下方式联系。",
        partnershipBadge: "合作入口",
        partnershipHint: "保持与负责人区块同一套联系方式结构，便于快速复制。",
        partnershipPhone: "合作联系电话",
        partnershipEmail: "合作邮箱"
      },
      mailbox: {
        headerTitle: "站内信箱",
        navLabel: "站内信箱",
        navLabelUnread: "站内信箱，{count} 条未读",
        eyebrow: "Mailbox",
        title: "站内信箱",
        intro: "查看 UniDock 的站内通知、功能更新与重要提醒。",
        pinnedEyebrow: "Pinned",
        pinnedTitle: "置顶消息",
        pinnedDesc: "优先查看的重要站内更新。",
        inboxEyebrow: "Inbox",
        inboxTitle: "全部消息",
        inboxDesc: "按时间排序的站内通知与功能更新。",
        markAll: "全部标为已读",
        pinnedBadge: "置顶",
        noPinned: "暂无置顶消息。",
        noMessages: "暂无消息。",
        detailBack: "返回",
        detailEyebrow: "Message",
        detailTitle: "消息内容",
        loading: "加载中...",
        notFoundTitle: "消息不存在",
        notFoundDate: "请返回 Mailbox 查看其他消息",
        notFoundBody: "当前消息不存在，或暂时无法读取。"
      },
      mobilePlanPage: {
        hero: {
          eyebrow: "校园流量卡",
          title: "校园流量卡",
          subtitle: "为新生整理校园号卡套餐、流量规格、优惠机制和办理注意事项。"
        },
        transparency: {
          label: "信息透明",
          toggle: "点击展开说明",
          text: "本页面根据当前已获得的校园号卡宣传信息整理。套餐价格、流量、活动期、首充规则、会员权益、办理资格、限制地区、发货地区、激活方式、合约期和售后规则可能随运营商政策调整。最终以实际办理页面或负责人确认为准。"
        },
        activity: {
          eyebrow: "活动期说明",
          title: "本期校园号卡活动要点",
          subtitle: "在了解套餐前，先看一下当前活动期的关键信息。",
          items: [
            { title: "免费使用期", desc: "4-8 月共 5 个月免费使用。" },
            { title: "办理用时", desc: "整体办理流程约需 10 分钟。" },
            { title: "线下办理", desc: "支持在校内宿舍区或指定地点线下办理。" },
            { title: "规则说明", desc: "活动细节与最终规则以实际办理页面为准。" }
          ]
        },
        plans: {
          eyebrow: "号卡套餐",
          title: "首批校园流量卡套餐",
          subtitle: "目前整理 2 个中国移动校园号卡套餐，按月费排序便于对照。"
        },
        card: {
          monthlyFee: "月费",
          monthlyFeeUnit: "元 / 月",
          carrierLabel: "运营商",
          highlightsLabel: "核心规格",
          benefitsLabel: "会员 / 月度福利",
          noticesLabel: "待确认 / 以实际办理为准",
          specsLabel: "套餐详情",
          callMinutes: "通话分钟数",
          contractPeriod: "合约期",
          activationMethod: "激活方式",
          membership: "会员权益",
          rechargeBonus: "首充机制",
          balanceValidity: "话费有效期",
          generalData: "基础流量",
          extraData: "额外流量",
          totalData: "合计流量",
          consult: "咨询负责人",
          toggleOpen: "查看完整规则",
          toggleClose: "收起完整规则"
        },
        process: {
          eyebrow: "办理流程",
          title: "四步完成办理",
          subtitle: "把校园号卡办理拆成清晰阶段，按顺序推进即可。",
          steps: [
            { title: "了解套餐", desc: "对照本页内容，明确月费、流量、首充和活动期。" },
            { title: "咨询确认", desc: "联系负责人，确认合约期、激活方式与限制地区。" },
            { title: "办理激活", desc: "在校内宿舍区或指定地点完成线下办理，按指引完成实名与开卡。" },
            { title: "使用与售后", desc: "首充并核对话费有效期，后续问题保留沟通入口。" }
          ]
        },
        faq: {
          eyebrow: "常见问题",
          title: "常见问题与说明",
          items: [
            { q: "活动期免费使用是怎么算的？", a: "宣传资料显示 4 月到 8 月共 5 个月免费使用，期间月租按活动规则减免，具体到账时间以运营商系统为准。" },
            { q: "首充优惠是如何兑现的？", a: "宣传资料显示首次充值 100 元，账户到手 200 元话费，可在指定有效期内使用，逾期未使用部分以运营商规则为准。" }
          ]
        },
        more: {
          eyebrow: "更多套餐",
          title: "更多套餐",
          desc: "更多号卡套餐将在第二阶段从号卡系统中整理后展示。",
          button: "查看更多套餐"
        },
        cta: {
          eyebrow: "继续办理",
          title: "对套餐还有疑问？",
          desc: "联系本站负责人，提前确认套餐细节、限制地区与办理方式。",
          button: "联系负责人"
        }
      },
      mobilePlanMorePage: {
        hero: {
          eyebrow: "更多套餐",
          title: "更多校园流量卡套餐",
          subtitle: "本页面为第二阶段号卡套餐信息陈列位置。"
        },
        empty: {
          eyebrow: "空状态",
          title: "套餐信息整理中",
          desc: "套餐信息将在第二阶段整理后展示。",
          back: "返回校园流量卡"
        }
      },
      footer: {
        desc: "为 NUIST 新生整理信息入口、校园资源与联系支持。",
        note: "一个克制、清晰、可直接使用的新生首页入口。"
      }
    },
    en: {
      meta: {
        title: "UniDock | Freshman Information and Resource Hub",
        description: "UniDock gathers the most useful links and life resources for NUIST freshmen before and after arrival, helping them adapt faster."
      },
      arrivalMeta: {
        title: "UniDock | Arrival Process",
        description: "Review UniDock's arrival process and complete the key steps from departure to check-in."
      },
      checklistMeta: {
        title: "UniDock | Pre-Departure Checklist",
        description: "Review UniDock's pre-departure checklist and finish the key preparation before arriving on campus."
      },
      pitfallsMeta: {
        title: "UniDock | Freshman Pitfalls",
        description: "Review UniDock's freshman pitfalls and study-life notes to prepare the key basics before arrival."
      },
      systemsMeta: {
        title: "UniDock | Campus Systems Guide",
        description: "Review UniDock's campus systems guide to quickly find the unified portal, info portal, and commonly used campus apps."
      },
      contactMeta: {
        title: "UniDock | Contact Leads",
        description: "Contact UniDock leads directly and quickly copy phone numbers, WeChat IDs, or email addresses for support."
      },
      mailboxMeta: {
        title: "UniDock | Mailbox",
        description: "View mailbox announcements, pinned updates, and module changes inside UniDock."
      },
      mailboxDetailMeta: {
        title: "UniDock | Mailbox Detail",
        description: "View the full content of a mailbox message in UniDock."
      },
      campusMapRedirectMeta: {
        title: "UniDock | Opening the Official Campus Map",
        description: "UniDock is opening the official campus map service of NUIST for you."
      },
      officialSiteRedirectMeta: {
        title: "UniDock | Opening the Official Website",
        description: "UniDock is opening the official website of NUIST for you."
      },
      lifeResourcesRedirectMeta: {
        title: "UniDock | Choose a Living Resource Entry",
        description: "UniDock is routing you to the campus SIM card and dorm essentials entries."
      },
      campusNavigationRedirectMeta: {
        title: "UniDock | Choose a Campus Entry",
        description: "UniDock is routing you to the campus map and official website entries."
      },
      mobilePlanMeta: {
        title: "UniDock | Campus Mobile Plan",
        description: "Review UniDock's campus mobile plan summary, including monthly fees, data allowance, recharge bonus, promotional period, and notes before applying."
      },
      mobilePlanMoreMeta: {
        title: "UniDock | More Campus Mobile Plans",
        description: "More campus mobile card plans will be organized from the card system in Stage 2."
      },
      header: {
        subline: "NUIST Freshman Hub",
        languageLabel: "Language switch"
      },
      subpage: {
        back: "Back to Home"
      },
      common: {
        back: "Back",
        close: "Close",
        copy: "Copy",
        copied: "Copied"
      },
      menu: {
        toggle: "Open menu",
        freshman: "Freshman Must-Read",
        arrival: "Arrival Prep",
        living: "Living Resources",
        navigation: "Campus Navigation",
        contact: "Contact Leads"
      },
      hero: {
        eyebrow: "NUIST Freshman Support",
        title: "Connect freshman information, campus resources, and arrival support",
        subtitle: "UniDock gathers the links and resources NUIST freshmen use most before and after arrival, helping them settle in faster.",
        primary: "Start Exploring",
        secondary: "Contact Leads",
        pills: [
          "Key links in one place",
          "Covers pre-arrival to campus life",
          "Direct support contact"
        ],
        floatTop: "Arrival Prep",
        floatBottom: "Map / Systems / Contact",
        panelTag: "Selected Links",
        panelTitle: "Reach what matters faster",
        panelSubtitle: "From arrival prep to campus life, start with these essentials.",
        panelItems: [
          { title: "Arrival Prep", meta: "Steps and materials" },
          { title: "Living Resources", meta: "Dorm and SIM card" },
          { title: "Campus Navigation", meta: "Map and official site" }
        ]
      },
      core: {
        eyebrow: "Core Entry",
        title: "Keep high-frequency links in one place",
        subtitle: "Reduce repeated searching and start with what freshmen use most.",
        cards: [
          {
            title: "Campus SIM Card",
            desc: "Quickly review mobile plans that are relevant for freshmen.",
            hint: "Open entry"
          },
          {
            title: "Dorm Essentials",
            desc: "Review common preparation directions for moving into the dorm.",
            hint: "Open entry"
          },
          {
            title: "Official Campus Map",
            desc: "Open the official NUIST campus map service. UniDock only provides a convenient entry.",
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
            desc: "Keep high-frequency links on one page instead of jumping across chats, posts, and search results."
          },
          {
            title: "Freshman links are curated",
            desc: "From pre-arrival prep to campus navigation, the most-used content is sorted first."
          },
          {
            title: "Reduce the information gap",
            desc: "Even first-time visitors can quickly see what to read next."
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
        desc: "You can reach the responsible contacts for additional help.",
        button: "Add Contact"
      },
      pitfallsPage: {
        hero: {
          eyebrow: "Freshman Notes",
          title: "Freshman Pitfalls",
          subtitle: "Clarify the most commonly overlooked points before arrival, and line up the basics of study and campus life early."
        },
        sections: {
          pitfalls: {
            eyebrow: "Section A",
            title: "Freshman Pitfalls",
            subtitle: "Avoid the most common judgment mistakes, missing information, and life-management issues in the first stage of campus life.",
            items: [
              "Do not treat university as a stage for coasting. Course difficulty and self-management expectations rise sharply.",
              "Do not focus only on avoiding failed classes. GPA affects awards, postgraduate recommendations, studying abroad, and job applications.",
              "Do not ignore attendance and continuous assessment. Class participation and assignments matter a lot.",
              "Do not join too many clubs. Choose two or three that genuinely match your interests.",
              "Manage your living expenses to avoid unnecessary financial pressure.",
              "Keep healthy boundaries in dorm relationships and respect differences.",
              "Track important notices yourself instead of relying on others to remind you.",
              "Ask for help early when problems show up. Do not carry the pressure alone.",
              "Do not follow trends blindly. Choose according to your own plan.",
              "Senior advice is useful, but it should not be copied without thinking.",
              "Follow campus traffic rules. Non-compliant vehicles may be removed.",
              "Campus card plans vary a lot, so compare them in advance."
            ],
            noteLabel: "UniDock Advice",
            noteText: "Choose your campus SIM card before arrival to avoid long lines and information gaps during the first week."
          },
          essentials: {
            eyebrow: "Section B",
            title: "Study and Life Basics",
            subtitle: "Build the right expectations first, then get familiar with school systems, course rhythm, and daily service tools.",
            items: [
              "Learning shifts from passive to self-directed, so self-management becomes essential.",
              "Campus life depends heavily on digital systems, so it helps to get familiar early.",
              "Network access and mobile data are baseline infrastructure, so prepare them in advance.",
              "Daily services rely on multiple apps, so download them ahead of time.",
              "Course and activity requirements differ by school and department."
            ],
            noteLabel: "UniDock Positioning",
            noteText: "UniDock helps you finish the key preparation before arrival so you can settle in faster once you are on campus."
          }
        }
      },
      systemsPage: {
        hero: {
          eyebrow: "Campus Systems",
          title: "Campus Systems Guide",
          subtitle: "Sort out the systems and apps you will use after arrival so there is less repeated searching and switching."
        },
        grid: {
          eyebrow: "System Cards",
          title: "Common Systems and Apps",
          subtitle: "Cards with external links can be opened directly. Items without links remain as a unified information layer so you can build your own usage checklist first."
        },
        cards: [
          {
            badge: "Web Entry",
            title: "Unified Portal",
            desc: "A unified entry for related campus apps",
            meta: "Open"
          },
          {
            badge: "Web Entry",
            title: "Info Portal",
            desc: "Identity authentication and academic services",
            meta: "Open"
          },
          {
            badge: "Campus App",
            title: "Chaoxing",
            desc: "Course materials, attendance, and assignments",
            meta: "Course Essential"
          },
          {
            badge: "Campus App",
            title: "WeCom",
            desc: "Notices and communication",
            meta: "Communication"
          },
          {
            badge: "Campus App",
            title: "Quzhi Campus",
            desc: "Bath and drinking water",
            meta: "Living Service"
          },
          {
            badge: "Campus App",
            title: "Pangguai Life",
            desc: "Laundry",
            meta: "Living Service"
          },
          {
            badge: "Campus App",
            title: "Flash Campus Pro",
            desc: "Campus running",
            meta: "Fitness Test"
          },
          {
            badge: "Campus App",
            title: "PU Pocket Campus",
            desc: "Credit-hour system",
            meta: "Activities and Hours"
          }
        ],
        note: {
          label: "UniDock Advantage",
          text: "Keep key system entries together and reduce the cost of searching for scattered information."
        }
      },
      campusMap: {
        title: "Official Campus Map",
        desc: "Open the official NUIST campus map service. UniDock only provides a convenient entry.",
        confirmTitle: "Official Campus Map",
        confirmBody: "You are about to leave UniDock and open the official campus map service of Nanjing University of Information Science and Technology. The map content and service are provided by the university system. UniDock only provides a convenient navigation entry. If the official page displays authorization, commercial-use, or usage notices, please follow the official instructions.",
        openOfficial: "Open Official Map",
        back: "Back to UniDock"
      },
      transition: {
        leaving: "External Link",
        loading: "Opening",
        opensIn: "Opening in",
        secondsAuto: "seconds",
        openNow: "Open Now",
        backHome: "Back to Home",
        domainLabel: "Destination domain",
        campusMapTitle: "Opening the Official Campus Map",
        campusMapSubtitle: "You are being redirected to the official campus map service of NUIST.",
        officialSiteTitle: "Opening the Official Website",
        officialSiteSubtitle: "You are being redirected to the official website of NUIST."
      },
      redirectChoices: {
        campus: {
          eyebrow: "Navigation Choice",
          title: "Choose the campus entry you need",
          subtitle: "Both the map and the official site entry are ready. Continue based on your current need.",
          primaryLabel: "Primary Entry",
          primaryTitle: "Official Campus Map",
          primaryDesc: "Check campus locations, teaching areas, and living zones first if you need quick navigation.",
          primaryMeta: "Open now",
          secondaryLabel: "Secondary Entry",
          secondaryTitle: "Official Website",
          secondaryDesc: "Open the school's official website for notices, announcements, and broader information.",
          secondaryMeta: "Continue"
        },
        resources: {
          eyebrow: "Resource Choice",
          title: "Choose the living resource you need",
          subtitle: "Start from the resource direction you need most right now, then continue to the related entry.",
          primaryLabel: "Primary Entry",
          primaryTitle: "Campus Mobile Plan",
          primaryDesc: "Open the Campus Mobile Plan page for plan details, data allowance, and application notes.",
          primaryMeta: "Open resource",
          secondaryLabel: "Secondary Entry",
          secondaryTitle: "Dorm Essentials",
          secondaryDesc: "Return to the homepage and jump to the dorm essentials section.",
          secondaryMeta: "Open resource"
        }
      },
      contact: {
        eyebrow: "Contact",
        title: "Contact Leads",
        intro: "If you run into issues with arrival steps, pre-departure prep, campus resources, or page usage, contact the responsible lead directly.",
        panelEyebrow: "Lead Contacts",
        panelTitle: "Copy and contact directly",
        panelDesc: "Phone, WeChat, and email are kept in one consistent structure to reduce repeated confirmation.",
        owner01: "Responsible Person 01",
        owner02: "Responsible Person 02",
        sameWechat: "Same as phone number",
        phone: "Phone",
        wechat: "WeChat",
        email: "Email",
        partnershipEyebrow: "Partnership",
        partnershipTitle: "Partnership Contact",
        partnershipDesc: "For collaboration, co-building, or content coordination, contact us directly through the following details.",
        partnershipBadge: "Partnership",
        partnershipHint: "Kept in the same structured contact format for quick copying.",
        partnershipPhone: "Partnership Phone",
        partnershipEmail: "Partnership Email"
      },
      mailbox: {
        headerTitle: "Mailbox",
        navLabel: "Mailbox",
        navLabelUnread: "Mailbox, {count} unread",
        eyebrow: "Mailbox",
        title: "Mailbox",
        intro: "View UniDock notifications, product updates, and important reminders.",
        pinnedEyebrow: "Pinned",
        pinnedTitle: "Pinned Messages",
        pinnedDesc: "Important updates that should be checked first.",
        inboxEyebrow: "Inbox",
        inboxTitle: "All Messages",
        inboxDesc: "Site notifications and updates sorted by time.",
        markAll: "Mark all as read",
        pinnedBadge: "Pinned",
        noPinned: "No pinned messages yet.",
        noMessages: "No messages yet.",
        detailBack: "Back",
        detailEyebrow: "Message",
        detailTitle: "Message Content",
        loading: "Loading...",
        notFoundTitle: "Message not found",
        notFoundDate: "Please go back to Mailbox and view other messages",
        notFoundBody: "The current message does not exist or cannot be loaded right now."
      },
      mobilePlanPage: {
        hero: {
          eyebrow: "Campus Mobile Plan",
          title: "Campus Mobile Plan",
          subtitle: "Compare campus mobile card options, data allowance, monthly fees, and key terms before applying."
        },
        transparency: {
          label: "Transparency",
          toggle: "Tap to expand",
          text: "The information on this page is organized based on currently available campus mobile plan materials. Pricing, data allowance, promotional periods, recharge bonuses, membership benefits, eligibility, restricted regions, shipping regions, activation methods, contract terms, and support rules may change. Final terms are subject to the actual application page or confirmation from the responsible contact."
        },
        activity: {
          eyebrow: "Promo Notes",
          title: "Key points of this campus mobile plan promo",
          subtitle: "Read these promo details first before reviewing each plan.",
          items: [
            { title: "Free Period", desc: "Free use across the 5 months from April to August." },
            { title: "Handling Time", desc: "The whole application takes about 10 minutes." },
            { title: "Offline Handling", desc: "Offline application is available in campus dorm areas or designated locations." },
            { title: "Rule Disclaimer", desc: "Promotional details and final rules are subject to the actual application page." }
          ]
        },
        plans: {
          eyebrow: "Plans",
          title: "First batch of campus mobile plans",
          subtitle: "Two China Mobile campus card plans are currently organized, sorted by monthly fee for easier comparison."
        },
        card: {
          monthlyFee: "Monthly Fee",
          monthlyFeeUnit: "CNY / mo",
          carrierLabel: "Carrier",
          highlightsLabel: "Key specs",
          benefitsLabel: "Membership / Monthly benefits",
          noticesLabel: "To confirm / subject to actual application",
          specsLabel: "Plan details",
          callMinutes: "Call minutes",
          contractPeriod: "Contract period",
          activationMethod: "Activation method",
          membership: "Membership",
          rechargeBonus: "Recharge bonus",
          balanceValidity: "Balance validity",
          generalData: "Base data",
          extraData: "Extra data",
          totalData: "Total data",
          consult: "Contact lead",
          toggleOpen: "View full terms",
          toggleClose: "Hide full terms"
        },
        process: {
          eyebrow: "Process",
          title: "Four steps to complete the application",
          subtitle: "Break down the campus mobile plan application into clear stages and follow them in order.",
          steps: [
            { title: "Review the plan", desc: "Read this page and clarify the monthly fee, data, recharge, and promo period." },
            { title: "Consult and confirm", desc: "Reach out to the contact and confirm contract terms, activation, and restrictions." },
            { title: "Apply and activate", desc: "Complete offline handling at a campus dorm area or designated location, finish real-name registration, and activate the SIM." },
            { title: "Use and support", desc: "Complete the first recharge, verify the balance validity, and keep the contact for later issues." }
          ]
        },
        faq: {
          eyebrow: "FAQ",
          title: "Frequently asked questions",
          items: [
            { q: "How does the free period work?", a: "Promo materials state that April to August is a 5-month free period during which the monthly fee is waived per promo rules. The actual posting timing follows the carrier system." },
            { q: "How is the recharge bonus delivered?", a: "Promo materials state that the first recharge of 100 CNY credits 200 CNY of balance, usable within the stated validity window. Unused balance after expiration follows the carrier rules." }
          ]
        },
        more: {
          eyebrow: "More Plans",
          title: "More Plans",
          desc: "More mobile card plans will be organized from the card system in Stage 2.",
          button: "View more plans"
        },
        cta: {
          eyebrow: "Apply",
          title: "Still have questions about the plan?",
          desc: "Reach out to the responsible contact to confirm plan details, restricted regions, and how to apply.",
          button: "Contact lead"
        }
      },
      mobilePlanMorePage: {
        hero: {
          eyebrow: "More Plans",
          title: "More Campus Mobile Plans",
          subtitle: "This page is reserved as the Stage 2 surface for additional campus mobile card plans."
        },
        empty: {
          eyebrow: "Empty State",
          title: "Plan information being organized",
          desc: "Plan information will be displayed after Stage 2 organization.",
          back: "Back to Campus Mobile Plan"
        }
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

  function formatValue(value, replacements) {
    if (typeof value !== "string" || !replacements) {
      return value;
    }

    return value.replace(/\{(\w+)\}/g, function (match, key) {
      if (Object.prototype.hasOwnProperty.call(replacements, key)) {
        return String(replacements[key]);
      }

      return match;
    });
  }

  function getTranslationValue(lang, key) {
    return getValue(translations[lang], key);
  }

  function translate(key, replacements) {
    const value = getTranslationValue(currentLang, key);
    const fallbackValue = currentLang === defaultLang ? value : getTranslationValue(defaultLang, key);
    const resolved = typeof value === "string" ? value : fallbackValue;

    return formatValue(typeof resolved === "string" ? resolved : "", replacements);
  }

  function isTransitionActive() {
    return document.body.classList.contains("is-transitioning") ||
      document.documentElement.getAttribute("data-transition-state") === "active";
  }

  function syncLanguageSwitchState() {
    const disabled = isTransitionActive();

    document.querySelectorAll("[data-lang-switch]").forEach(function (button) {
      button.disabled = disabled;
      button.setAttribute("aria-disabled", disabled ? "true" : "false");
      button.classList.toggle("is-disabled", disabled);
      button.tabIndex = disabled ? -1 : 0;
    });

    document.querySelectorAll(".lang-switch").forEach(function (switcher) {
      switcher.classList.toggle("is-disabled", disabled);
      switcher.setAttribute("aria-disabled", disabled ? "true" : "false");
    });
  }

  function applyTranslations() {
    const content = translations[currentLang];
    const description = document.querySelector('meta[name="description"]');
    const pageName = document.body.getAttribute("data-page");
    const pageMeta = pageName ? (content[pageName + "Meta"] || content.meta) : content.meta;

    document.querySelectorAll("[data-i18n]").forEach(function (element) {
      const key = element.getAttribute("data-i18n");
      const value = getTranslationValue(currentLang, key);

      if (typeof value === "string") {
        element.textContent = value;
      }
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach(function (element) {
      const key = element.getAttribute("data-i18n-aria-label");
      const value = getTranslationValue(currentLang, key);

      if (typeof value === "string") {
        element.setAttribute("aria-label", value);
      }
    });

    if (pageMeta && pageMeta.title) {
      document.title = pageMeta.title;
    }

    if (pageMeta && pageMeta.description && description) {
      description.setAttribute("content", pageMeta.description);
    }

    document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";

    document.querySelectorAll("[data-lang-switch]").forEach(function (button) {
      button.classList.toggle("is-active", button.getAttribute("data-lang-switch") === currentLang);
    });

    syncLanguageSwitchState();
  }

  function setLanguage(lang) {
    currentLang = translations[lang] ? lang : defaultLang;
    applyTranslations();
    localStorage.setItem(STORAGE_KEY, currentLang);

    window.dispatchEvent(new CustomEvent("unidock:language-change", {
      detail: {
        lang: currentLang
      }
    }));
  }

  function bindLanguageSwitch() {
    document.querySelectorAll("[data-lang-switch]").forEach(function (button) {
      button.addEventListener("click", function (event) {
        if (isTransitionActive()) {
          event.preventDefault();
          return;
        }

        setLanguage(button.getAttribute("data-lang-switch"));
      });

      button.addEventListener("keydown", function (event) {
        if (!isTransitionActive()) {
          return;
        }

        if (event.key === "Enter" || event.key === " " || event.key === "Spacebar") {
          event.preventDefault();
          event.stopPropagation();
        }
      });
    });
  }

  window.UniDockI18n = {
    getLanguage: function () {
      return currentLang;
    },
    setLanguage: setLanguage,
    t: translate,
    syncLanguageSwitchState: syncLanguageSwitchState
  };

  window.addEventListener("unidock:transition-state", syncLanguageSwitchState);

  document.addEventListener("DOMContentLoaded", function () {
    const stored = localStorage.getItem(STORAGE_KEY);
    const preferred = stored && translations[stored] ? stored : defaultLang;

    bindLanguageSwitch();
    setLanguage(preferred);
  });
})();
