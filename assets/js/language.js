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
        description: "获取更多校园流量卡套餐、办理细则与发货限制地区信息，直接联系 UniDock 负责人确认。"
      },
      dormSuppliesMeta: {
        title: "UniDock | 寝室用具",
        description: "查看 UniDock 整理的寝室用具图册，包括三件套花色、床帘和单品。"
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
      checklistPage: {
        hero: {
          eyebrow: "行前准备",
          title: "行前准备清单",
          subtitle: "出发前完成关键准备，减少入校后的遗漏、返工和临时排队。",
          tags: ["证件", "生活", "电子", "建议"]
        },
        materials: {
          eyebrow: "证件与材料",
          title: "最高优先级：先把入学材料准备完整",
          subtitle: "这一部分决定你能否顺利完成入学与报到，尤其是档案材料，不建议拖到出发当天再确认。",
          mustTitle: "必须携带",
          mustItems: [
            "录取通知书原件。",
            "身份证原件。",
            "近期同底 1 寸、2 寸免冠彩照各 4 张。",
            "个人档案或档案移交证明，确保档案密封、签章完整。",
            "团员建议带上团员证，以便后续组织关系处理。"
          ],
          conditionalTitle: "按情况准备",
          conditionalItems: [
            "已办理生源地信用助学贷款的同学：带好贷款受理证明。",
            "姓名、生源地或户口信息有变更的同学：带好相关证明材料。",
            "外市来宁且年底前需在南京就医的同学：提前完成医保异地备案。",
            "如企业微信人脸照片采集未成功，到校后还需按要求补录信息。"
          ],
          noteLabel: "重点提醒",
          noteText: "档案是入学的硬性材料之一，若既没有档案也没有移交证明，可能无法完成入学。录取通知书、身份证、证件照建议至少做一份电子备份，放在手机相册或云端。"
        },
        living: {
          eyebrow: "生活与寝居",
          title: "把宿舍生活的基础配置提前想清楚",
          subtitle: "床上用品、洗漱、清洁和基础药品四组最容易在出发前遗漏，建议按组扫描，不要只凭印象打包。",
          mustLabel: "必备",
          missLabel: "易遗漏",
          cards: [
            { title: "床上用品", must: "床单、被套、枕套，提前确认宿舍床尺寸。", miss: "床垫、被子、枕头、蚊帐、遮光床帘。" },
            { title: "洗漱", must: "牙刷杯、毛巾、沐浴露、洗发水、洗面奶、洗衣液。", miss: "脸盆、水桶、浴室防滑拖和居家拖鞋。" },
            { title: "清洁", must: "扫把、簸箕、抹布。", miss: "晾衣架、夹子、粘钩，多备几个会更省心。" },
            { title: "药品", must: "创可贴、感冒药、退烧药。", miss: "肠胃药、碘伏、驱蚊液或花露水。" }
          ],
          bridgeEyebrow: "UniDock 入口",
          bridgeTitle: "寝居用品一站式入口",
          bridgeDesc: "如果你想把宿舍基础物资集中处理，可以回到首页从寝室用具入口继续查看。",
          bridgeButton: "查看入口"
        },
        electronics: {
          eyebrow: "电子与学习",
          title: "别只带设备，也要把配件和网络方案想清楚",
          subtitle: "手机和电脑只是基础，真正容易耽误使用的是充电、插座、耳机、存储和校园网络这些细节。",
          mainTitle: "主设备",
          mainItems: [
            "手机、电脑是大学阶段最基础的学习与沟通工具。",
            "如果需要办理校园网或宽带，建议提前了解学校的网络方案。",
            "U 盘或移动硬盘适合备份课件、作业和资料。"
          ],
          accessoriesTitle: "配件",
          accessoriesItems: [
            "充电器、充电宝、数据线至少按日常习惯各准备一套。",
            "插线板建议带独立开关，最好 4 个以上插口。",
            "鼠标、键盘、耳机、笔袋、荧光笔、2B 铅笔和尺子都属于容易漏装的学习配件。"
          ],
          noteLabel: "网络提醒",
          noteText: "建议提前处理流量卡与网络方案。网络与通信属于基础设施，越早决定，到校后的排队和信息差越少。"
        },
        avoid: {
          eyebrow: "不建议携带",
          title: "把行李负担压下来，现场会更轻松",
          subtitle: "并不是带得越多越稳妥，真正影响体验的往往是大件、重件和到校后才能判断要不要买的物品。",
          dontTitle: "不要带",
          dontItems: [
            "大型大功率电器，如电饭煲、锅具等。",
            "过多换季厚衣服，宿舍柜体空间有限，冬装后续邮寄更合理。",
            "无用杂物和暂时用不到的堆积品，会明显增加整理成本。"
          ],
          laterTitle: "可以后补",
          laterItems: [
            "非必需品可以等到学校后再网购或在附近超市补齐。",
            "这样能减轻搬运行李的压力，也更容易根据宿舍实际情况补货。",
            "宿舍通常有公共吹风机，如需自带也建议先确认管理要求。"
          ]
        },
        advice: {
          eyebrow: "UniDock 建议",
          title: "把关键准备放到出发前，而不是到校后",
          subtitle: "真正节省时间的不是多带东西，而是提前做好顺序判断和基础规划。",
          bridgeTitle: "出发前优先完成这三步",
          bridgeItems: [
            "先处理流量卡与网络方案，不把基础通信留到报到当天。",
            "把证件、档案和基础生活物资按优先级分层打包。",
            "提前规划宿舍区、路线和现场流程，避免开学排队与信息差。"
          ],
          bridgeButton: "查看报道全流程"
        }
      },
      arrivalPage: {
        hero: {
          eyebrow: "报道流程",
          title: "报道全流程",
          subtitle: "从出发到完成报到，按阶段完成关键步骤。",
          stages: [
            { title: "出发前", desc: "证件、宿舍区域、入校路径先确认。" },
            { title: "到达南京", desc: "按地铁、高铁、机场或自驾路线入校。" },
            { title: "入校与报到", desc: "到宿舍报到点后按迎新流程完成验证。" },
            { title: "现场支持", desc: "接驳、快递、缴费与咨询都在现场可用。" }
          ]
        },
        before: {
          eyebrow: "出发前",
          title: "先把出发前的三件事做完",
          subtitle: "证件和物品先整理完整，再确认宿舍区域与入校路径，到校后会顺畅很多。",
          items: [
            { title: "带齐物品", desc: "确认已带齐必要证件与物品，尤其是录取通知书、身份证、证件照和档案材料。" },
            { title: "确认宿舍区域", desc: "提前确定自己属于东苑、中苑、西苑还是南苑，后续选择校门和停车路线都依赖这一步。" },
            { title: "查看校园地图", desc: "建议先熟悉校门、宿舍区和报到点的大致位置，避免入校后走冤枉路。" }
          ],
          button: "查看行前准备清单"
        },
        arrive: {
          eyebrow: "到达南京",
          title: "按你的到达方式选择路线",
          subtitle: "先确认到站类型，再按路线进校；如果是自驾，优先确认宿舍区与入校门的对应关系。",
          routes: [
            { badge: "路线卡 01", title: "地铁 / 高铁", note: "适合到达南京站、南京南站或小红山站后继续换乘进校的同学。" },
            { badge: "路线卡 02", title: "机场", note: "从机场出发时换乘会更多，建议提前预留时间，并确认地铁运营时段。" },
            { badge: "路线卡 03", title: "自驾", note: "离南京 3 到 4 小时车程内的同学可以考虑自驾，但一定先看宿舍区与校门映射。" }
          ]
        },
        drive: {
          eyebrow: "自驾入校",
          title: "先看宿舍区，再展开详细路线",
          subtitle: "先确认你的宿舍区与推荐校门，再按下方折叠路线查看详细行驶路径；默认全部收起，避免页面信息一次性铺满。",
          mappings: [
            { title: "晖园 / 硕园", desc: "推荐校门：东苑东门 / 东苑南门" },
            { title: "沁园", desc: "推荐校门：气象谷东门 / 中苑南门" },
            { title: "文园", desc: "推荐校门：西苑南门、西苑北门" },
            { title: "毓园", desc: "推荐校门：南苑东门" }
          ],
          accordions: [
            { title: "东苑东门入校", subtitle: "对应晖园、硕园宿舍区", exit: "建议由中苑南门或西苑南门出校。" },
            { title: "东苑南门入校", subtitle: "适合前往沁园周边区域", exit: "建议由中苑南门或西苑南门出校。" },
            { title: "中苑南门入校", subtitle: "直接服务沁园宿舍区", exit: "建议由西苑南门出校。" },
            { title: "西苑南门入校", subtitle: "对应文园宿舍区", exit: "建议沿西苑围墙南段或揽江楼东侧道路出校。" },
            { title: "西苑北门入校", subtitle: "适合从万家坝路方向进入", exit: "建议由西苑南门出校。" },
            { title: "气象谷入校", subtitle: "适合前往沁园，含两种入场方案", exit: "建议由气象谷东门或西南门出校。" },
            { title: "南苑东门入校", subtitle: "对应毓园宿舍区", exit: "" }
          ],
          noteLabel: "行车提醒",
          noteText: "校内全线单向行驶，限速 30km/h，禁止调头、逆行、超速和违停。入校车辆饱和时，建议停放在龙山北路、万家坝路、盘新路、盘城新街等周边道路，再从就近校门步行入校。"
        },
        check: {
          eyebrow: "到校后流程",
          title: "按顺序完成四步报到",
          subtitle: "流程尽量保持线性处理，先到宿舍报到点，再进入企业微信迎新模块，最后完成身份验证与材料领取。",
          steps: [
            { title: "到宿舍报到点", desc: "先到宿舍楼下对应学院的报到点，按现场指引确认学院与楼栋信息。" },
            { title: "企业微信 → 我的迎新", desc: "打开学校企业微信中的“我的迎新”，进入线上迎新流程。" },
            { title: "验证与领取材料", desc: "完成身份验证、查验录取通知书，并按要求领取材料；具体安排以班级群和辅导员通知为准。" },
            { title: "完成报到", desc: "所有环节确认完成后，即可正式结束报到流程，进入宿舍安顿与后续安排。" }
          ]
        },
        support: {
          eyebrow: "现场支持",
          title: "到场后可直接使用的支持信息",
          subtitle: "把常见支持信息集中在同一处，避免到场后再反复找群消息和零散通知。",
          shuttleTitle: "接驳服务",
          shuttleItems: [
            "本部校区：信息工程大学地铁站（公交站）与毓园社区之间提供循环接驳。",
            "浦口经开区创新港：双垅地铁站与经开区千贤居之间提供循环接驳。",
            "报到日 8:30-18:30 运行，具体结束时间以现场报到情况为准。"
          ],
          ticketTitle: "地铁票说明",
          ticketItems: [
            "新生可凭录取通知书原件到现场负责老师处领取地铁票支持。",
            "每位新生最多可领取 3 张，建议到站后优先咨询志愿者服务站。"
          ],
          packageTitle: "快递地址",
          packages: [
            { name: "东苑（晖园、硕园）", lines: ["江苏省南京市浦口区盘城街道南京信息工程大学东苑文德楼快递点"] },
            { name: "中苑（沁园）", lines: ["江苏省南京市浦口区盘城街道南京信息工程大学中苑中国邮政快递点", "江苏省南京市浦口区龙山北路 18 号-1 号中国气象谷菜鸟驿站"] },
            { name: "西苑（文园）", lines: ["江苏省南京市浦口区盘城街道南京信息工程大学西苑滨江楼快递点"] },
            { name: "南苑（毓园）", lines: ["江苏省南京市浦口区永锦路 41 号南京信息工程大学南苑校区"] }
          ],
          paymentTitle: "现场缴费 / 绿色通道",
          paymentItems: [
            "东苑：晖园社区红十字急救培训中心附近收费点。",
            "中苑：大学生活动中心一楼门厅收费点。",
            "西苑：文园社区红十字急救培训站收费点。",
            "家庭经济困难可在西苑文园社区红十字急救培训站的“绿色通道”咨询资助政策。"
          ],
          counselTitle: "咨询与心理支持",
          counselItems: [
            "招生政策咨询：东苑行政楼 202，电话 025-58181818。",
            "大学生心理健康教育中心：风云剧场 N201、N202，电话 025-58731377。",
            "如需更多学院层面的信息，优先查看班级群和辅导员通知。"
          ]
        },
        safety: {
          eyebrow: "安全提醒",
          title: "到场当天保持这些底线意识",
          subtitle: "这些提醒不复杂，但最容易在现场忙乱时被忽视，建议出发前先看一遍。",
          alerts: [
            { title: "防诈骗", desc: "不要轻信陌生收费链接、群聊通知或以老师、学长学姐名义发来的转账要求。" },
            { title: "贵重物品", desc: "手机、证件、现金等贵重物品尽量随身携带，不要交给陌生人代管。" },
            { title: "手续本人办理", desc: "入学手续尽量由本人直接办理，不要委托他人代办，避免钱财和信息风险。" },
            { title: "家校联系", desc: "及时把辅导员联系方式告诉家长，保持家校联系畅通，外出也要按要求请假报备。" }
          ]
        }
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
          desc: "联系负责人获取更多套餐信息",
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
          subtitle: "如需获取更多套餐、办理细则、发货 / 限制地区等信息，请联系负责人确认。"
        },
        contact: {
          eyebrow: "联系负责人",
          title: "联系负责人获取更多套餐信息",
          desc: "如需获取更多套餐、办理细则、发货 / 限制地区等信息，请直接联系本站负责人确认。",
          button: "联系负责人",
          back: "返回校园流量卡"
        }
      },
      dormSuppliesPage: {
        hero: {
          eyebrow: "生活资源",
          title: "寝室用具",
          subtitle: "整理三件套花色、床帘和单品图册，方便你在入住前预览宿舍生活用品的样式。"
        },
        transparency: {
          label: "信息透明",
          toggle: "点击展开说明",
          text: "本页面图片来源于素材中心，仅供参考。最终花色、材质和到货款式以实际办理或负责人确认为准。"
        },
        sections: {
          beddingSet: {
            eyebrow: "Section 01",
            title: "三件套花色",
            subtitle: "已收录 53 个三件套花色，覆盖麂皮绒、天丝、长绒棉等不同材质。"
          },
          bedCurtain: {
            eyebrow: "Section 02",
            title: "床帘",
            subtitle: "已收录 20 个床帘款式，包含 U 型导轨遮光款与蚊帐式床帘。"
          },
          singleItems: {
            eyebrow: "Section 03",
            title: "单品",
            subtitle: "已收录 12 个单品，包含床帘花色合集、床垫、枕头、被芯与套件。"
          }
        },
        card: {
          photoCountSingle: "共 1 张",
          photoCountTpl: "共 {count} 张",
          openHint: "点击查看全部图片",
          fallback: "暂无图片",
          imageAlt: "{name} 第 {index} 张"
        },
        action: {
          viewAll: "查看全部",
          expand: "展开",
          collapse: "收起",
          floatingAria: "收起当前板块"
        },
        pillModal: {
          eyebrow: "选择产品",
          title: "选择产品",
          countTpl: "共 {count} 个",
          empty: "暂无产品"
        },
        modal: {
          close: "关闭",
          sectionLabel: "所属板块",
          countTpl: "共 {count} 张"
        },
        cta: {
          eyebrow: "继续了解",
          title: "想确认具体到货款式？",
          desc: "联系本站负责人，提前确认花色细节、价格与下单方式。",
          button: "联系负责人"
        }
      },
      footer: {
        desc: "为 NUIST 新生整理信息入口、校园资源与联系支持。",
        note: "一个克制、清晰、可直接使用的新生首页入口。",
        contactButton: "联系我们"
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
        description: "Reach out to the UniDock leads for more campus mobile plan options, application details, and shipping or restricted region info."
      },
      dormSuppliesMeta: {
        title: "UniDock | Dorm Supplies",
        description: "Browse UniDock's dorm supplies gallery: bedding sets, bed curtains, and single items."
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
      checklistPage: {
        hero: {
          eyebrow: "Pre-Departure",
          title: "Pre-Departure Checklist",
          subtitle: "Finish the key preparation before leaving so the first week on campus has fewer gaps, redo loops, and last-minute queues.",
          tags: ["Documents", "Living", "Electronics", "Advice"]
        },
        materials: {
          eyebrow: "Documents & Records",
          title: "Top priority: get your enrollment materials complete first",
          subtitle: "This decides whether you can finish enrollment and check-in smoothly. The student record file especially should not be left to the day of departure.",
          mustTitle: "Must bring",
          mustItems: [
            "Original admission letter.",
            "Original ID card.",
            "Four recent 1-inch and four 2-inch colour ID photos on matching backgrounds.",
            "Your personal student file or transfer certificate. Keep the file sealed with intact stamps.",
            "Communist Youth League members: bring your league membership card for follow-up transfer."
          ],
          conditionalTitle: "Bring if applicable",
          conditionalItems: [
            "If you took a hometown student loan: bring the loan acceptance certificate.",
            "If your name, hometown, or hukou information changed: bring the supporting documents.",
            "If you come from outside Nanjing and may need medical care in Nanjing before year-end: complete the cross-region medical insurance registration in advance.",
            "If WeCom face capture did not complete, you will need to redo it on arrival."
          ],
          noteLabel: "Important",
          noteText: "The student file is a hard requirement for enrolment. If you have neither the file nor the transfer certificate, enrolment may fail. Keep digital backups of the admission letter, ID card, and ID photos in your phone gallery or cloud."
        },
        living: {
          eyebrow: "Dorm Life",
          title: "Plan the dorm basics ahead of time",
          subtitle: "Bedding, toiletries, cleaning, and basic medicine are the four sets most often missed. Pack group by group instead of relying on memory.",
          mustLabel: "Essentials",
          missLabel: "Easy to miss",
          cards: [
            { title: "Bedding", must: "Bed sheets, duvet cover, pillow case. Confirm the dorm bed size first.", miss: "Mattress, quilt, pillow, mosquito net, blackout bed curtain." },
            { title: "Toiletries", must: "Toothbrush cup, towels, shower gel, shampoo, face wash, laundry detergent.", miss: "Wash basin, water bucket, bathroom anti-slip slippers, indoor slippers." },
            { title: "Cleaning", must: "Broom, dustpan, cleaning cloths.", miss: "Drying rack, clothes pegs, adhesive hooks. A few extras of each are useful." },
            { title: "Medicine", must: "Band-aids, cold medicine, fever medicine.", miss: "Stomach medicine, iodine, mosquito repellent or floral water." }
          ],
          bridgeEyebrow: "UniDock Entry",
          bridgeTitle: "Dorm essentials in one place",
          bridgeDesc: "If you want to handle dorm basics together, return to the homepage and use the dorm essentials entry.",
          bridgeButton: "Open Entry"
        },
        electronics: {
          eyebrow: "Electronics & Study",
          title: "It's not just the devices — plan the accessories and network too",
          subtitle: "Phone and laptop are the baseline. What usually slows you down are charging, sockets, headphones, storage, and the campus network setup.",
          mainTitle: "Main devices",
          mainItems: [
            "Phone and laptop are the baseline tools for study and communication in university.",
            "If you need campus network or broadband, look up the school's network options ahead of time.",
            "A USB stick or portable SSD is useful for backing up class notes, assignments, and files."
          ],
          accessoriesTitle: "Accessories",
          accessoriesItems: [
            "Chargers, power banks, and cables: bring at least one set matching your daily routine.",
            "Use a power strip with independent switches and at least 4 sockets.",
            "Mouse, keyboard, headphones, pen case, highlighters, 2B pencils, and a ruler are common study accessories that get left behind."
          ],
          noteLabel: "Network Tip",
          noteText: "Sort out your mobile data plan and network options early. Connectivity is infrastructure — the earlier you decide, the fewer queues and information gaps after arrival."
        },
        avoid: {
          eyebrow: "Avoid Bringing",
          title: "Lighter luggage means a smoother arrival",
          subtitle: "Packing more is not safer. What hurts most are large items, heavy items, and things you can only decide on after arriving.",
          dontTitle: "Don't bring",
          dontItems: [
            "Large high-power appliances like rice cookers or pots.",
            "Too many seasonal heavy clothes. Dorm storage is limited — mail winter wear later.",
            "Random clutter and things you won't use soon. They add real cleanup cost."
          ],
          laterTitle: "Buy later",
          laterItems: [
            "Non-essentials can be bought online or at nearby supermarkets after arrival.",
            "This reduces luggage stress and lets you buy based on the actual dorm setup.",
            "Dorms usually have shared hair dryers. If you bring your own, check the management rules first."
          ]
        },
        advice: {
          eyebrow: "UniDock Advice",
          title: "Front-load preparation before departure, not after arrival",
          subtitle: "The real time saver is not packing more — it's deciding the order and planning the basics in advance.",
          bridgeTitle: "Three priorities before leaving",
          bridgeItems: [
            "Sort out the SIM card and network setup first; do not leave baseline communication to check-in day.",
            "Pack ID, files, and basic life supplies in priority layers.",
            "Pre-plan the dorm area, route, and on-site flow to avoid first-day queues and info gaps."
          ],
          bridgeButton: "View Arrival Process"
        }
      },
      arrivalPage: {
        hero: {
          eyebrow: "Arrival Process",
          title: "Arrival Process",
          subtitle: "From departure to completing check-in, finish the key steps stage by stage.",
          stages: [
            { title: "Before Departure", desc: "Confirm documents, dorm area, and entry route first." },
            { title: "Arrive in Nanjing", desc: "Enter campus by metro, high-speed rail, airport, or driving." },
            { title: "Check In", desc: "After reaching the dorm check-in point, complete verification via the welcome process." },
            { title: "On-site Support", desc: "Shuttles, packages, payment, and consultations are all available on site." }
          ]
        },
        before: {
          eyebrow: "Before Departure",
          title: "Get these three things done before leaving",
          subtitle: "Organize documents and supplies first, then confirm dorm area and entry route. Things will go far smoother on the day.",
          items: [
            { title: "Pack everything", desc: "Confirm you have all required documents and supplies — especially the admission letter, ID card, ID photos, and student file." },
            { title: "Confirm dorm area", desc: "Determine in advance whether you are in East / Central / West / South Garden. Choosing campus gate and parking depends on this." },
            { title: "Review campus map", desc: "Get familiar with the gates, dorm areas, and check-in points so you don't take detours after arrival." }
          ],
          button: "View Pre-Departure Checklist"
        },
        arrive: {
          eyebrow: "Arrive in Nanjing",
          title: "Pick a route based on how you arrive",
          subtitle: "Confirm your arrival point first, then enter campus by route. If you drive, prioritise the dorm-area to gate mapping.",
          routes: [
            { badge: "Route 01", title: "Metro / High-speed rail", note: "Best for arrivals at Nanjing Station, Nanjing South Station, or Xiaohongshan Station who continue by transfer." },
            { badge: "Route 02", title: "Airport", note: "Airport arrivals have more transfers. Allow extra time and check the metro operating hours." },
            { badge: "Route 03", title: "Self-driving", note: "Students within a 3-4 hour drive can consider driving — confirm the dorm area to gate mapping first." }
          ]
        },
        drive: {
          eyebrow: "Driving In",
          title: "Check your dorm area, then expand the detailed route",
          subtitle: "Confirm your dorm area and recommended gate first, then expand the collapsed routes below for detailed driving paths. Everything is collapsed by default to avoid information overload.",
          mappings: [
            { title: "Huiyuan / Shuoyuan", desc: "Recommended gate: East Garden East Gate / East Garden South Gate" },
            { title: "Qinyuan", desc: "Recommended gate: Meteorology Valley East Gate / Central Garden South Gate" },
            { title: "Wenyuan", desc: "Recommended gate: West Garden South Gate, West Garden North Gate" },
            { title: "Yuyuan", desc: "Recommended gate: South Garden East Gate" }
          ],
          accordions: [
            { title: "Enter via East Garden East Gate", subtitle: "Serves Huiyuan and Shuoyuan", exit: "Recommend exiting via Central Garden South Gate or West Garden South Gate." },
            { title: "Enter via East Garden South Gate", subtitle: "Best for areas around Qinyuan", exit: "Recommend exiting via Central Garden South Gate or West Garden South Gate." },
            { title: "Enter via Central Garden South Gate", subtitle: "Directly serves Qinyuan", exit: "Recommend exiting via West Garden South Gate." },
            { title: "Enter via West Garden South Gate", subtitle: "Serves Wenyuan", exit: "Recommend exiting along the south section of the West Garden wall or the road east of Lanjianglou." },
            { title: "Enter via West Garden North Gate", subtitle: "Best when approaching from Wanjiaba Road", exit: "Recommend exiting via West Garden South Gate." },
            { title: "Enter via Meteorology Valley", subtitle: "Best for Qinyuan, includes two route options", exit: "Recommend exiting via Meteorology Valley East Gate or Southwest Gate." },
            { title: "Enter via South Garden East Gate", subtitle: "Serves Yuyuan", exit: "" }
          ],
          noteLabel: "Driving Note",
          noteText: "All campus roads are one-way with a 30 km/h limit. No U-turns, wrong-way driving, speeding, or illegal parking. If campus is at capacity, park along Longshan North Road, Wanjiaba Road, Panxin Road, or Pancheng New Street, then enter on foot via the nearest gate."
        },
        check: {
          eyebrow: "On Arrival",
          title: "Finish check-in in four steps",
          subtitle: "Keep the process linear: dorm check-in point first, then WeCom welcome module, then identity verification and material pickup.",
          steps: [
            { title: "Go to the dorm check-in point", desc: "Head to the dorm building's college check-in point and confirm your college and building info per on-site guidance." },
            { title: "WeCom → My Welcome", desc: "Open the school WeCom \"My Welcome\" entry to start the online welcome flow." },
            { title: "Verify and collect materials", desc: "Complete identity verification, present your admission letter, and collect the materials. Details follow the class group and counsellor notice." },
            { title: "Complete check-in", desc: "Once all steps are confirmed, check-in is officially complete and you can settle into the dorm." }
          ]
        },
        support: {
          eyebrow: "On-site Support",
          title: "Information you can use directly after arriving",
          subtitle: "Common support info is kept together so you don't have to dig through chat history once on site.",
          shuttleTitle: "Shuttle Service",
          shuttleItems: [
            "Main campus: a loop shuttle runs between NUIST Metro Station (bus stop) and Yuyuan community.",
            "Pukou New Port Innovation Hub: a loop shuttle runs between Shuanglong Metro Station and Qianxianju.",
            "Operates from 8:30-18:30 on check-in day. End time follows on-site conditions."
          ],
          ticketTitle: "Metro Ticket Note",
          ticketItems: [
            "Freshmen can present the original admission letter to the on-site staff to get metro ticket support.",
            "Each freshman may receive up to 3 tickets. Ask the volunteer service desk first after arrival."
          ],
          packageTitle: "Package Addresses",
          packages: [
            { name: "East Garden (Huiyuan, Shuoyuan)", lines: ["江苏省南京市浦口区盘城街道南京信息工程大学东苑文德楼快递点"] },
            { name: "Central Garden (Qinyuan)", lines: ["江苏省南京市浦口区盘城街道南京信息工程大学中苑中国邮政快递点", "江苏省南京市浦口区龙山北路 18 号-1 号中国气象谷菜鸟驿站"] },
            { name: "West Garden (Wenyuan)", lines: ["江苏省南京市浦口区盘城街道南京信息工程大学西苑滨江楼快递点"] },
            { name: "South Garden (Yuyuan)", lines: ["江苏省南京市浦口区永锦路 41 号南京信息工程大学南苑校区"] }
          ],
          paymentTitle: "On-site Payment / Green Channel",
          paymentItems: [
            "East Garden: payment point near the Huiyuan community Red Cross first-aid training centre.",
            "Central Garden: payment point in the lobby of the Student Activity Centre, first floor.",
            "West Garden: payment point at the Wenyuan community Red Cross first-aid training station.",
            "Families with financial difficulties can ask about aid policies at the \"Green Channel\" of the Wenyuan Red Cross station."
          ],
          counselTitle: "Consult & Mental Health",
          counselItems: [
            "Admissions consultation: East Garden Admin Building Room 202, phone 025-58181818.",
            "Student Mental Health Centre: Fengyun Theatre N201, N202, phone 025-58731377.",
            "For school-level information, check the class group and counsellor notices first."
          ]
        },
        safety: {
          eyebrow: "Safety",
          title: "Keep these baseline reminders on arrival day",
          subtitle: "These reminders are simple but easily ignored during a busy arrival day. Read them once before leaving.",
          alerts: [
            { title: "Anti-fraud", desc: "Do not trust unfamiliar payment links, group notices, or transfer requests claiming to be from teachers or seniors." },
            { title: "Valuables", desc: "Keep phone, ID, and cash with you. Do not let strangers hold them." },
            { title: "Handle it yourself", desc: "Complete enrolment in person. Avoid delegating to others to reduce financial and information risk." },
            { title: "Family contact", desc: "Share your counsellor's contact with your family and keep the family-school channel open. Apply for leave when going off campus per the rules." }
          ]
        }
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
          desc: "Contact the responsible person for more plan options.",
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
          subtitle: "For more plan options, application details, and shipping or restricted regions, please reach out to the responsible contact."
        },
        contact: {
          eyebrow: "Contact",
          title: "Contact the responsible person for more plan options",
          desc: "For more plan options, application details, and shipping or restricted regions, please contact the responsible person directly.",
          button: "Contact lead",
          back: "Back to Campus Mobile Plan"
        }
      },
      dormSuppliesPage: {
        hero: {
          eyebrow: "Living Resources",
          title: "Dorm Supplies",
          subtitle: "Browse the gallery for bedding sets, bed curtains, and single items so you can preview dorm essentials before move-in."
        },
        transparency: {
          label: "Transparency",
          toggle: "Tap to expand",
          text: "Images on this page come from the supplier material library and are for reference only. Final patterns, materials, and shipped styles are subject to the actual application or confirmation from the responsible contact."
        },
        sections: {
          beddingSet: {
            eyebrow: "Section 01",
            title: "Bedding Sets",
            subtitle: "53 bedding set patterns are organized, covering suede, Tencel, and long-staple cotton."
          },
          bedCurtain: {
            eyebrow: "Section 02",
            title: "Bed Curtains",
            subtitle: "20 bed curtain styles are organized, including U-track blackout curtains and mosquito-net curtains."
          },
          singleItems: {
            eyebrow: "Section 03",
            title: "Single Items",
            subtitle: "12 single items are organized, including curtain pattern collections, mattresses, pillows, quilts, and basic sets."
          }
        },
        card: {
          photoCountSingle: "1 photo",
          photoCountTpl: "{count} photos",
          openHint: "Click to view all images",
          fallback: "No image",
          imageAlt: "{name} image {index}"
        },
        action: {
          viewAll: "View All",
          expand: "Expand",
          collapse: "Collapse",
          floatingAria: "Collapse current section"
        },
        pillModal: {
          eyebrow: "Select a Product",
          title: "Select a Product",
          countTpl: "{count} items",
          empty: "No products"
        },
        modal: {
          close: "Close",
          sectionLabel: "Section",
          countTpl: "{count} photos"
        },
        cta: {
          eyebrow: "Next Step",
          title: "Want to confirm the actual style?",
          desc: "Contact the UniDock lead to confirm patterns, prices, and how to order.",
          button: "Contact lead"
        }
      },
      footer: {
        desc: "An entry point for NUIST freshmen to access information, campus resources, and direct support.",
        note: "A restrained, clear homepage that is ready to use.",
        contactButton: "Contact Us"
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
