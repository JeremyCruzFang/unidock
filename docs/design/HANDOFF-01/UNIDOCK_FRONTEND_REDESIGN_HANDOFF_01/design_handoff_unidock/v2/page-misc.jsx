/* 联系负责人 + Better Service + Mailbox + Redirect pages */

/* ── 联系负责人 ── */
const PageContact = ({ lang }) => {
  const zh = lang === 'zh';
  return (<>
    <SubHero eyebrow={zh?'联系方式':'Contact'} title={zh?'联系负责人':'Contact Leads'} subtitle={zh?'如在报到流程、行前准备、校园资源或页面使用中遇到问题，可直接联系对应负责人。':'Contact the responsible lead directly if you run into issues.'}/>
    <CPanel eyebrow={zh?'负责人联系方式':'Lead Contacts'} title={zh?'复制后即可直接联系':'Copy and contact directly'} desc={zh?'手机号、微信与邮箱已整理为统一结构，减少重复确认和手动记录成本。':'Phone, WeChat, and email in one consistent structure.'}>
      <div className="contact-grid">
        {[{name:zh?'负责人 01':'Person 01',phone:'+86 18367589789',wechat:'18367589789',email:'opensteve305@gmail.com'},
          {name:zh?'负责人 02':'Person 02',phone:'+86 16665205162',wechat:'16665205162',email:'2143813378@qq.com'}
        ].map((c,i)=>(
          <div className="contact-card" key={i}>
            <span className="contact-card__badge">{c.name}</span>
            <h3>{c.name}</h3>
            <p className="contact-card__hint">{zh?'微信同号':'Same as phone'}</p>
            <div className="contact-methods">
              <div className="contact-method"><span className="contact-method__label">{zh?'手机号':'Phone'}</span><span className="contact-method__value">{c.phone}</span><CopyBtn value={c.phone} lang={lang}/></div>
              <div className="contact-method"><span className="contact-method__label">{zh?'微信':'WeChat'}</span><span className="contact-method__value">{zh?'微信同号':'Same as phone'}</span><CopyBtn value={c.wechat} lang={lang}/></div>
              <div className="contact-method"><span className="contact-method__label">{zh?'邮箱':'Email'}</span><span className="contact-method__value">{c.email}</span><CopyBtn value={c.email} lang={lang}/></div>
            </div>
          </div>
        ))}
      </div>
    </CPanel>
    <CPanel subtle eyebrow={zh?'合作联系':'Partnership'} title={zh?'意向合作联系':'Partnership Contact'} desc={zh?'如需站点合作、共建或内容协作，可直接通过以下方式联系。':'For collaboration, co-building, or content coordination.'}>
      <div className="contact-card">
        <span className="contact-card__badge">{zh?'合作入口':'Partnership'}</span>
        <h3>{zh?'意向合作联系':'Partnership Contact'}</h3>
        <p className="contact-card__hint">{zh?'保持与负责人区块同一套联系方式结构，便于快速复制。':'Same structured format for quick copying.'}</p>
        <div className="contact-methods">
          <div className="contact-method"><span className="contact-method__label">{zh?'电话':'Phone'}</span><span className="contact-method__value">+86 15968586789</span><CopyBtn value="+86 15968586789" lang={lang}/></div>
          <div className="contact-method"><span className="contact-method__label">{zh?'邮箱':'Email'}</span><span className="contact-method__value">opensteve305@gmail.com</span><CopyBtn value="opensteve305@gmail.com" lang={lang}/></div>
        </div>
      </div>
    </CPanel>
  </>);
};

/* ── Better Service ── */
const PageBetter = ({ lang }) => {
  const zh = lang === 'zh';
  return (<>
    <SubHero eyebrow="Better Service" title="Better Service" subtitle={zh?'内部整理 · 新生专属资源入口':'Internal curation for freshmen only'}/>
    <CPanel eyebrow={zh?'精选条目':'Selected Entry'} title={zh?'从内部整理入口进入':'Enter through the curated internal entry'} desc={zh?'当前公开一个结构化条目，用于说明内部资源的价值与获取方式。':'A structured public entry showing the value of internal resources.'}>
      <div className="sys-card sys-card--link" style={{cursor:'pointer'}}>
        <div className="sys-card__head"><span className="sys-card__badge">{zh?'内部整理':'Internal'}</span><span className="sys-card__arrow">→</span></div>
        <h3>{zh?'新生开学资源内部整理':'Curated Freshman Launch Resources'}</h3>
        <p>{zh?'流量卡 / 宿舍用品 / 避坑合集（内部版）':'SIM card / dorm essentials / pitfalls collection (internal)'}</p>
        <span className="sys-card__meta">{zh?'查看详情':'View details'}</span>
      </div>
    </CPanel>
  </>);
};

/* ── Mailbox ── */
const PageMailbox = ({ lang }) => {
  const zh = lang === 'zh';
  const [readIds, setReadIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem('ud_read') || '[]'); } catch { return []; }
  });
  const markRead = (id) => { const next = [...new Set([...readIds, id])]; setReadIds(next); localStorage.setItem('ud_read', JSON.stringify(next)); };
  const markAll = () => { const all = messages.map(m=>m.id); setReadIds(all); localStorage.setItem('ud_read', JSON.stringify(all)); };
  const messages = [
    {id:'m1',title:zh?'UniDock 正式上线':'UniDock is now live',date:'2025-06-01',pinned:true},
    {id:'m2',title:zh?'行前准备清单已更新':'Pre-departure checklist updated',date:'2025-06-02',pinned:true},
    {id:'m3',title:zh?'校内系统导航页面已上线':'Campus systems guide is live',date:'2025-06-03',pinned:false},
    {id:'m4',title:zh?'新生避坑提示已补充至 12 条':'Freshman pitfalls updated to 12 items',date:'2025-06-04',pinned:false},
    {id:'m5',title:zh?'Better Service 入口已添加':'Better Service entry added',date:'2025-06-05',pinned:false},
  ];
  const pinned = messages.filter(m=>m.pinned);
  const inbox = messages;
  return (<>
    <SubHero eyebrow="Mailbox" title={zh?'站内信箱':'Mailbox'} subtitle={zh?'查看 UniDock 的站内通知、功能更新与重要提醒。':'View UniDock announcements, updates, and important reminders.'}/>
    <CPanel eyebrow="Pinned" title={zh?'置顶消息':'Pinned Messages'} desc={zh?'优先查看的重要站内更新。':'Important updates to read first.'}>
      <div className="mb-list">
        {pinned.map(m=>{const unread=!readIds.includes(m.id); return (
          <div className={`mb-item${unread?' is-unread':''}`} key={m.id} onClick={()=>markRead(m.id)}>
            <span className={`mb-item__dot${unread?'':' mb-item__dot--read'}`}></span>
            <div className="mb-item__body"><div className="mb-item__title">{m.title}</div><div className="mb-item__date">{m.date}</div></div>
            <span className="mb-item__pin">{zh?'置顶':'Pinned'}</span>
          </div>
        );})}
        {pinned.length===0 && <p style={{color:'var(--soft)',fontSize:'0.86rem',padding:'12px 0'}}>{zh?'暂无置顶消息。':'No pinned messages.'}</p>}
      </div>
    </CPanel>
    <CPanel eyebrow="Inbox" title={zh?'全部消息':'All Messages'} desc={zh?'按时间排序的站内通知与功能更新。':'Announcements and updates sorted by date.'}>
      <div className="mb-list">
        {inbox.map(m=>{const unread=!readIds.includes(m.id); return (
          <div className={`mb-item${unread?' is-unread':''}`} key={m.id} onClick={()=>markRead(m.id)}>
            <span className={`mb-item__dot${unread?'':' mb-item__dot--read'}`}></span>
            <div className="mb-item__body"><div className="mb-item__title">{m.title}</div><div className="mb-item__date">{m.date}</div></div>
            {m.pinned && <span className="mb-item__pin">{zh?'置顶':'Pinned'}</span>}
          </div>
        );})}
      </div>
      <div style={{marginTop:18}}><button className="btn btn--secondary" onClick={markAll}>{zh?'全部标为已读':'Mark all as read'}</button></div>
    </CPanel>
  </>);
};

/* ── Redirect Choice Pages ── */
const PageRedirectChoice = ({ lang, type }) => {
  const zh = lang === 'zh';
  const data = {
    campus: {
      ey:zh?'导航选择':'Navigation Choice', title:zh?'选择你要前往的校园入口':'Choose the campus entry you need',
      sub:zh?'地图和官网入口都已整理好，按你的当前需求继续前往。':'Both entries are ready. Continue based on your need.',
      p:{label:zh?'主入口':'Primary',title:zh?'官方校园地图':'Official Campus Map',desc:zh?'先查看校内位置、教学区与生活区分布，适合快速找路。':'Check campus locations and areas for quick navigation.',meta:zh?'立即前往':'Open now',href:'#/redirect/map'},
      s:{label:zh?'次入口':'Secondary',title:zh?'校园官网入口':'Official Website',desc:zh?'前往学校官方网站，查看通知、公告与综合信息。':'Visit the official website for notices and info.',meta:zh?'继续打开':'Continue',href:'#/redirect/official'},
    },
    life: {
      ey:zh?'资源选择':'Resource Choice', title:zh?'选择你要前往的生活资源':'Choose the living resource you need',
      sub:zh?'先选择当前最需要查看的资源方向，再继续进入对应入口。':'Pick the resource direction you need most right now.',
      p:{label:zh?'主入口':'Primary',title:zh?'校园流量卡':'Campus SIM Card',desc:zh?'返回首页并定位到校园流量卡入口。':'Return to homepage and jump to the SIM card entry.',meta:zh?'进入资源':'Open',href:'#/'},
      s:{label:zh?'次入口':'Secondary',title:zh?'寝室用具':'Dorm Essentials',desc:zh?'返回首页并定位到寝室用具入口。':'Return to homepage and jump to dorm essentials.',meta:zh?'进入资源':'Open',href:'#/'},
    },
  };
  const d = data[type];
  return (
    <div className="redirect-shell">
      <div className="redirect-icon"><img src="icon/icon-144.png" alt="UniDock"/></div>
      <span className="eyebrow">{d.ey}</span>
      <h1 className="redirect-title">{d.title}</h1>
      <p className="redirect-sub">{d.sub}</p>
      <div className="choice-grid">
        <a className="choice-card choice-card--primary" href={d.p.href}>
          <span className="choice-card__label">{d.p.label}</span><h2 className="choice-card__title">{d.p.title}</h2><p className="choice-card__desc">{d.p.desc}</p><span className="choice-card__meta">{d.p.meta}</span>
        </a>
        <a className="choice-card" href={d.s.href}>
          <span className="choice-card__label">{d.s.label}</span><h2 className="choice-card__title">{d.s.title}</h2><p className="choice-card__desc">{d.s.desc}</p><span className="choice-card__meta">{d.s.meta}</span>
        </a>
      </div>
      <div className="redirect-actions"><a className="btn btn--secondary" href="#/" onClick={e=>{e.preventDefault();navigate('/')}}>{zh?'返回首页':'Back to Home'}</a></div>
      <p style={{marginTop:32,fontSize:'0.88rem',fontWeight:600,color:'var(--soft)'}}>UniDock</p>
    </div>
  );
};

/* ── Redirect Countdown Pages ── */
const PageRedirectTimer = ({ lang, type }) => {
  const zh = lang === 'zh';
  const info = {
    map: {title:zh?'正在前往官方校园地图':'Opening Official Campus Map',sub:zh?'即将跳转至南京信息工程大学官方校园地图服务。':'Redirecting to the official NUIST campus map.',domain:'map.nuist.edu.cn'},
    official: {title:zh?'正在前往校园官网':'Opening Official Website',sub:zh?'即将跳转至南京信息工程大学官方网站。':'Redirecting to the official NUIST website.',domain:'www.nuist.edu.cn'},
  };
  const d = info[type];
  const [count, setCount] = useState(3);
  useEffect(() => { if (count <= 0) return; const t = setTimeout(() => setCount(c => c - 1), 1000); return () => clearTimeout(t); }, [count]);
  return (
    <div className="redirect-shell">
      <div className="redirect-icon"><img src="icon/icon-144.png" alt="UniDock"/></div>
      <span className="eyebrow">{zh?'站外打开':'External Link'}</span>
      <h1 className="redirect-title">{d.title}</h1>
      <p className="redirect-sub">{d.sub}</p>
      <span className="redirect-domain">{d.domain}</span>
      <p className="redirect-status">
        <span>{zh?'将在':'Opening in '}</span> <strong>{count}</strong> <span>{zh?' 秒后自动打开':' seconds'}</span>
      </p>
      <div className="redirect-actions">
        <a className="btn btn--primary" href="#">{zh?'立即前往':'Open Now'}</a>
        <a className="btn btn--secondary" href="#/" onClick={e=>{e.preventDefault();navigate('/')}}>{zh?'返回首页':'Back to Home'}</a>
      </div>
      <p style={{marginTop:32,fontSize:'0.88rem',fontWeight:600,color:'var(--soft)'}}>UniDock</p>
    </div>
  );
};

Object.assign(window, { PageContact, PageBetter, PageMailbox, PageRedirectChoice, PageRedirectTimer });
