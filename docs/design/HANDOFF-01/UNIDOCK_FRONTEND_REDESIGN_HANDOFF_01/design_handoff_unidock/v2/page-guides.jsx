/* 行前准备 + 新生避坑 + 校内系统 pages */

/* ── 行前准备清单 ── */
const PageChecklist = ({ lang }) => {
  const zh = lang === 'zh';
  return (<>
    <SubHero eyebrow={zh?'行前准备':'Pre-Departure'} title={zh?'行前准备清单':'Pre-Departure Checklist'} subtitle={zh?'出发前完成关键准备，减少入校后的遗漏、返工和临时排队。':'Finish key preparations before departure to reduce missed items and last-minute lines.'}>
      <div className="tag-grid">
        {(zh?['证件','生活','电子','建议']:['Documents','Living','Electronics','Advice']).map((t,i)=><span className="tag-chip" key={i}>{t}</span>)}
      </div>
    </SubHero>

    <CPanel eyebrow={zh?'证件与材料':'Documents'} title={zh?'最高优先级：先把入学材料准备完整':'Top priority: complete your enrollment materials'} desc={zh?'这一部分决定你能否顺利完成入学与报到。':'This determines whether you can complete enrollment.  '}>
      <div className="dual-grid">
        <div className="subcard subcard--strong"><h3>{zh?'必须携带':'Must bring'}</h3><ul className="subcard-list">
          {(zh?['录取通知书原件','身份证原件','近期同底 1 寸、2 寸免冠彩照各 4 张','个人档案或档案移交证明，确保档案密封、签章完整','团员建议带上团员证']:['Admission letter (original)','National ID (original)','1-inch and 2-inch ID photos (4 each)','Personal files or transfer certificate (sealed)','League membership card (if applicable)']).map((s,i)=><li key={i}>{s}</li>)}
        </ul></div>
        <div className="subcard"><h3>{zh?'按情况准备':'Prepare as needed'}</h3><ul className="subcard-list">
          {(zh?['已办理助学贷款：带好贷款受理证明','姓名、生源地有变更：带好相关证明材料','外市来宁需就医：提前完成医保异地备案','企业微信人脸采集未成功：到校后补录']:['Student loan: bring acceptance certificate','Name/origin changed: bring relevant documents','Medical needs in Nanjing: complete cross-city medical insurance filing','WeCom face scan failed: re-register on campus']).map((s,i)=><li key={i}>{s}</li>)}
        </ul></div>
      </div>
      <SoftNote label={zh?'重点提醒':'Key Reminder'} text={zh?'档案是入学的硬性材料之一，若既没有档案也没有移交证明，可能无法完成入学。录取通知书、身份证、证件照建议做电子备份。':'Your personal file is a hard requirement. Without it or a transfer certificate, you may not complete enrollment. Back up your admission letter, ID, and photos digitally.'}/>
    </CPanel>

    <CPanel eyebrow={zh?'生活与寝居':'Living Essentials'} title={zh?'把宿舍生活的基础配置提前想清楚':'Plan your dorm basics in advance'} desc={zh?'床上用品、洗漱、清洁和基础药品四组最容易遗漏。':'Bedding, toiletries, cleaning supplies, and basic medicine are the four most-missed groups.'}>
      <div className="living-grid">
        {[{t:zh?'床上用品':'Bedding',r:zh?'床单、被套、枕套':'Sheets, duvet cover, pillowcase',o:zh?'床垫、被子、枕头、蚊帐、遮光床帘':'Mattress, blanket, pillow, mosquito net, blackout curtain'},
          {t:zh?'洗漱':'Toiletries',r:zh?'牙刷杯、毛巾、沐浴露、洗发水、洗面奶、洗衣液':'Toothbrush set, towels, body wash, shampoo, cleanser, detergent',o:zh?'脸盆、水桶、浴室防滑拖和居家拖鞋':'Basin, bucket, shower sandals, slippers'},
          {t:zh?'清洁':'Cleaning',r:zh?'扫把、簸箕、抹布':'Broom, dustpan, cloth',o:zh?'晾衣架、夹子、粘钩':'Hangers, clips, adhesive hooks'},
          {t:zh?'药品':'Medicine',r:zh?'创可贴、感冒药、退烧药':'Band-aids, cold medicine, fever reducer',o:zh?'肠胃药、碘伏、驱蚊液或花露水':'Stomach medicine, iodine, insect repellent'}
        ].map((c,i)=>(
          <div className="living-card" key={i}><h3>{c.t}</h3>
            <div className="living-meta"><strong>{zh?'必备':'Essential'}</strong><p>{c.r}</p></div>
            <div className="living-meta"><strong>{zh?'易遗漏':'Often missed'}</strong><p>{c.o}</p></div>
          </div>
        ))}
      </div>
    </CPanel>

    <CPanel eyebrow={zh?'电子与学习':'Electronics'} title={zh?'别只带设备，也要把配件和网络方案想清楚':'Don\'t just bring devices — think through accessories and network plans'} desc={zh?'手机和电脑只是基础，真正容易耽误使用的是充电、插座、耳机、存储和校园网络。':'Phone and laptop are basics; what really causes delays are chargers, outlets, and network plans.'}>
      <div className="dual-grid">
        <div className="subcard"><h3>{zh?'主设备':'Main Devices'}</h3><ul className="subcard-list">
          {(zh?['手机、电脑是大学阶段最基础的学习与沟通工具','如果需要办理校园网或宽带，建议提前了解学校的网络方案','U 盘或移动硬盘适合备份课件、作业和资料']:['Phone and laptop are essential for study and communication','Look into campus WiFi and broadband plans in advance','USB drive or portable HDD for backing up coursework']).map((s,i)=><li key={i}>{s}</li>)}
        </ul></div>
        <div className="subcard"><h3>{zh?'配件':'Accessories'}</h3><ul className="subcard-list">
          {(zh?['充电器、充电宝、数据线至少各准备一套','插线板建议带独立开关，最好 4 个以上插口','鼠标、键盘、耳机、笔袋、荧光笔等容易漏装']:['Charger, power bank, cables — at least one set each','Power strip with individual switches, 4+ outlets','Mouse, keyboard, earphones, pen case easily forgotten']).map((s,i)=><li key={i}>{s}</li>)}
        </ul></div>
      </div>
      <SoftNote quiet label={zh?'网络提醒':'Network Tip'} text={zh?'建议提前处理流量卡与网络方案。网络与通信属于基础设施，越早决定，到校后的排队和信息差越少。':'Set up your SIM card and network plan early. The sooner you decide, the less queueing and confusion on arrival.'}/>
    </CPanel>

    <CPanel subtle eyebrow={zh?'不建议携带':'Not Recommended'} title={zh?'把行李负担压下来，现场会更轻松':'Lighten your load for an easier arrival'} desc={zh?'并不是带得越多越稳妥。':'More luggage doesn\'t mean more prepared.'}>
      <div className="dual-grid">
        <div className="subcard"><h3>{zh?'不要带':'Don\'t bring'}</h3><ul className="subcard-list">
          {(zh?['大型大功率电器，如电饭煲、锅具等','过多换季厚衣服，宿舍柜体空间有限','无用杂物和暂时用不到的堆积品']:['Large high-power appliances (rice cookers, pots)','Too many seasonal thick clothes — limited closet space','Unnecessary clutter that just adds packing burden']).map((s,i)=><li key={i}>{s}</li>)}
        </ul></div>
        <div className="subcard"><h3>{zh?'可以后补':'Buy later'}</h3><ul className="subcard-list">
          {(zh?['非必需品可以等到学校后再网购或在附近超市补齐','这样能减轻搬运行李的压力','宿舍通常有公共吹风机，如需自带先确认管理要求']:['Non-essentials can be bought online or at nearby stores','Reduces luggage burden significantly','Dorms usually have shared hair dryers — check rules before bringing one']).map((s,i)=><li key={i}>{s}</li>)}
        </ul></div>
      </div>
    </CPanel>
  </>);
};

/* ── 新生避坑提示 ── */
const PagePitfalls = ({ lang }) => {
  const zh = lang === 'zh';
  const pitfalls = zh ? [
    '不要把大学当作躺平阶段，课程难度和自主学习要求都会明显提升。','不要只追求不挂科，绩点会影响评优、保研、出国和求职。',
    '不要忽视课堂与平时成绩，出勤和作业非常重要。','社团不在多，在精，建议选择 2 到 3 个真正感兴趣的。',
    '管理好生活费，避免不必要的消费压力。','宿舍关系保持边界感，尊重彼此差异。',
    '重要通知必须自己关注，不要依赖他人提醒。','遇到问题及时求助，不要独自承受压力。',
    '不要盲目跟风，应根据自身规划选择方向。','学长经验可以参考，但不要完全照搬。',
    '校内交通需合规，违规车辆可能被清理。','校园卡套餐差异较大，建议提前对比选择。'
  ] : [
    'Don\'t treat university as a stage for coasting.','Don\'t focus only on passing — GPA affects awards, postgrad, and jobs.',
    'Don\'t ignore attendance and continuous assessment.','Don\'t join too many clubs — choose 2-3 that genuinely interest you.',
    'Manage your living expenses to avoid financial pressure.','Keep healthy boundaries in dorm relationships.',
    'Track important notices yourself.','Ask for help early when problems arise.',
    'Don\'t follow trends blindly — choose your own path.','Senior advice is useful but don\'t copy it wholesale.',
    'Follow campus traffic rules.','Campus SIM plans vary — compare them in advance.'
  ];
  const essentials = zh ? [
    '学习方式由被动转为主动，需要自我管理。','校园生活依赖数字系统，建议提前熟悉。',
    '网络和流量是基础配置，建议提前准备。','日常生活服务依赖多个 APP，建议提前下载。',
    '学时和课程要求因学院不同而有所差异。'
  ] : [
    'Learning shifts from passive to self-directed.','Campus life depends on digital systems — get familiar early.',
    'Network and data are baseline infrastructure.','Daily services rely on multiple apps — download them ahead.',
    'Course requirements differ by department.'
  ];
  return (<>
    <SubHero eyebrow={zh?'新生提示':'Freshman Notes'} title={zh?'新生避坑提示':'Freshman Pitfalls'} subtitle={zh?'把入学后最容易忽视的节点提前看清，也把学习与生活的基本节奏先整理明白。':'Clarify commonly overlooked points before arrival, and line up the basics of study and campus life.'}/>
    <CPanel eyebrow="Section A" title={zh?'新生避坑提示':'Freshman Pitfalls'} desc={zh?'优先避开入学初期最常见的判断偏差、信息遗漏和生活管理问题。':'Avoid the most common mistakes in the first stage of campus life.'}>
      <ol className="nlist">{pitfalls.map((p,i)=><NItem key={i} idx={String(i+1).padStart(2,'0')}>{p}</NItem>)}</ol>
      <SoftNote label={zh?'UniDock 建议':'UniDock Advice'} text={zh?'入学前完成校园流量卡选择，避免开学排队和信息差。':'Choose your campus SIM before arrival to avoid lines and info gaps.'}/>
    </CPanel>
    <CPanel subtle eyebrow="Section B" title={zh?'学习与生活须知':'Study & Life Basics'} desc={zh?'先建立正确预期，再逐步熟悉学校系统、课程节奏和日常服务工具。':'Build correct expectations first, then learn school systems and daily tools.'}>
      <ol className="nlist">{essentials.map((e,i)=><NItem key={i} idx={String(i+1).padStart(2,'0')}>{e}</NItem>)}</ol>
      <SoftNote quiet label={zh?'UniDock 定位':'UniDock Positioning'} text={zh?'帮助你在入学前完成关键准备，让你到校即进入状态。':'UniDock helps you finish key prep before arrival so you can settle in faster.'}/>
    </CPanel>
  </>);
};

/* ── 校内系统导航 ── */
const PageSystems = ({ lang }) => {
  const zh = lang === 'zh';
  const cards = zh ? [
    {badge:'网页入口',title:'统一入口',desc:'统一访问相关校园应用入口',meta:'进入',link:true},
    {badge:'网页入口',title:'信息门户',desc:'身份认证、教务相关入口',meta:'进入',link:true},
    {badge:'校内应用',title:'学习通',desc:'课程资料、签到、作业平台',meta:'课程常用'},
    {badge:'校内应用',title:'企业微信',desc:'通知与沟通',meta:'沟通必备'},
    {badge:'校内应用',title:'趣智校园',desc:'洗浴、饮水',meta:'生活服务'},
    {badge:'校内应用',title:'胖乖生活',desc:'洗衣',meta:'生活服务'},
    {badge:'校内应用',title:'闪动校园 Pro',desc:'校园跑',meta:'体测相关'},
    {badge:'校内应用',title:'PU 口袋校园',desc:'学时系统',meta:'活动与学时'},
  ] : [
    {badge:'Web Entry',title:'Unified Portal',desc:'A unified entry for campus apps',meta:'Open',link:true},
    {badge:'Web Entry',title:'Info Portal',desc:'Identity auth and academic services',meta:'Open',link:true},
    {badge:'Campus App',title:'Chaoxing',desc:'Course materials, attendance, assignments',meta:'Course Essential'},
    {badge:'Campus App',title:'WeCom',desc:'Notices and communication',meta:'Communication'},
    {badge:'Campus App',title:'Quzhi Campus',desc:'Bath and drinking water',meta:'Living Service'},
    {badge:'Campus App',title:'Pangguai Life',desc:'Laundry',meta:'Living Service'},
    {badge:'Campus App',title:'Flash Campus Pro',desc:'Campus running',meta:'Fitness Test'},
    {badge:'Campus App',title:'PU Pocket Campus',desc:'Credit-hour system',meta:'Activities'},
  ];
  return (<>
    <SubHero eyebrow={zh?'校内系统':'Campus Systems'} title={zh?'校内系统导航':'Campus Systems Guide'} subtitle={zh?'把入学后常用的系统和应用入口先整理清楚，减少重复查找和切换成本。':'Sort out the systems and apps you\'ll use after arrival.'}/>
    <CPanel eyebrow="System Cards" title={zh?'常用系统与应用':'Common Systems & Apps'} desc={zh?'有外部链接的卡片可直接打开，无链接的项目保留为统一的信息卡片。':'Cards with links can be opened directly; others serve as reference cards.'}>
      <div className="sys-grid">
        {cards.map((c,i)=>(
          <div className={`sys-card${c.link?' sys-card--link':''}`} key={i}>
            <div className="sys-card__head"><span className="sys-card__badge">{c.badge}</span>{c.link && <span className="sys-card__arrow">→</span>}</div>
            <h3>{c.title}</h3><p>{c.desc}</p><span className="sys-card__meta">{c.meta}</span>
          </div>
        ))}
      </div>
      <SoftNote label={zh?'UniDock 优势':'UniDock Advantage'} text={zh?'整合关键系统入口，减少信息查找成本。':'Key system entries are consolidated to reduce search costs.'}/>
    </CPanel>
  </>);
};

Object.assign(window, { PageChecklist, PagePitfalls, PageSystems });
