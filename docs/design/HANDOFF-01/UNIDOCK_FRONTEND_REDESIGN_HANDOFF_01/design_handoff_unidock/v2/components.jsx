/* UniDock v2 — Component Library (Brand Immersive) */
const { useState, useEffect, useCallback } = React;

/* ── Content ── */
const T = {
  zh: {
    nav: { sub: 'NUIST Freshman Hub', better: 'Better', toggle: '打开目录' },
    hero: {
      eyebrow: 'NUIST 新生入学支持',
      title: '连接新生信息、校园资源与入学支持',
      sub: 'UniDock 为 NUIST 新生整理入学前后最常用的信息入口与生活资源，帮你更快完成适应与连接。',
      cta1: '开始查看', cta2: '联系负责人',
      pills: ['高频入口集中整理', '覆盖入学前后关键阶段', '联系支持更直接'],
    },
    core: { eyebrow: '核心入口', title: '把高频入口放在同一处', sub: '减少来回搜索，优先处理入学前后最常用的事项。' },
    entries: [
      { idx:'01', title:'校园流量卡', desc:'快速了解适合新生办理的校园通信方案。', hint:'查看入口', arrow:'→' },
      { idx:'02', title:'寝室用具', desc:'整理入住宿舍前常见的物品准备方向。', hint:'查看入口', arrow:'→' },
      { idx:'03', title:'官方校园地图', desc:'跳转至南京信息工程大学官方地图服务，UniDock 仅提供便捷入口。', hint:'站外打开', arrow:'↗' },
      { idx:'04', title:'校园官网入口', desc:'查看学校官方通知、公告与综合信息。', hint:'站外打开', arrow:'↗' },
      { idx:'05', title:'新生必看', desc:'把报到、准备与避坑内容集中放在一个入口。', hint:'进入查看', arrow:'→' },
      { idx:'06', title:'Better Service', desc:'内部资源入口（新生专属）', hint:'进入查看', arrow:'→', badge:'内部' },
      { idx:'07', title:'联系方式', desc:'遇到具体问题时，直接找到对应负责人员。', hint:'立即联系', arrow:'→' },
    ],
    why: {
      eyebrow: 'Why UniDock',
      title: '把需要的信息整理清楚，而不是堆得更多',
      sub: 'UniDock 只做一件事：把新生真正会反复用到的入口与资源集中起来，减少遗漏和重复查找。',
      items: [
        { idx:'01', title:'不用四处找信息', desc:'把高频入口放在同一页，减少群聊、帖子和搜索之间来回切换。' },
        { idx:'02', title:'新生入口集中整理', desc:'从报到前准备到校内导航，先把最常用的内容整理完整。' },
        { idx:'03', title:'降低信息差', desc:'让第一次接触校园信息的新生，也能快速知道下一步该看什么。' },
      ],
    },
    guide: {
      eyebrow: '新生必看',
      title: '按实际阶段进入，不必一次看完所有内容',
      sub: '把最容易遗漏的环节拆成四个清晰入口，帮助你按顺序推进准备与适应。',
      items: [
        { idx:'01', title:'报到全流程', desc:'按时间顺序梳理报到当天需要完成的关键步骤。' },
        { idx:'02', title:'行前准备清单', desc:'把证件、生活用品和常见准备项提前整理好。' },
        { idx:'03', title:'新生避坑提示', desc:'提前了解常见误区，减少时间和精力浪费。' },
        { idx:'04', title:'校内系统导航', desc:'快速找到课程、事务与校园服务相关系统入口。' },
      ],
    },
    cta: { eyebrow:'进一步帮助', title:'还有问题没有解决？', desc:'你可以通过本站负责人员联系方式，获取进一步帮助。', btn:'添加联系方式' },
    footer: { desc:'为 NUIST 新生整理信息入口、校园资源与联系支持。', note:'一个克制、清晰、可直接使用的新生首页入口。' },
    drawer: { freshman:'新生必看', arrival:'报到准备', living:'生活资源', nav:'校内导航', better:'Better Service', internal:'内部', contact:'联系负责人' },
    mailbox: { label:'站内信箱' },
  },
  en: {
    nav: { sub: 'NUIST Freshman Hub', better: 'Better', toggle: 'Open menu' },
    hero: {
      eyebrow: 'NUIST Freshman Support',
      title: 'Connect freshman information, campus resources, and arrival support',
      sub: 'UniDock gathers the links and resources NUIST freshmen use most before and after arrival, helping them settle in faster.',
      cta1: 'Start Exploring', cta2: 'Contact Leads',
      pills: ['Key links in one place', 'Covers pre-arrival to campus life', 'Direct support contact'],
    },
    core: { eyebrow:'Core Entry', title:'Keep high-frequency links in one place', sub:'Reduce repeated searching and start with what freshmen use most.' },
    entries: [
      { idx:'01', title:'Campus SIM Card', desc:'Quickly review mobile plans that are relevant for freshmen.', hint:'Open entry', arrow:'→' },
      { idx:'02', title:'Dorm Essentials', desc:'Review common preparation directions for moving into the dorm.', hint:'Open entry', arrow:'→' },
      { idx:'03', title:'Official Campus Map', desc:'Open the official NUIST campus map service. UniDock only provides a convenient entry.', hint:'Open site', arrow:'↗' },
      { idx:'04', title:'Official Website', desc:'Visit official notices, announcements, and campus updates.', hint:'Open site', arrow:'↗' },
      { idx:'05', title:'Freshman Must-Read', desc:'See arrival, preparation, and caution content in one clear entry.', hint:'View details', arrow:'→' },
      { idx:'06', title:'Better Service', desc:'Internal entry for freshmen only', hint:'View details', arrow:'→', badge:'Internal' },
      { idx:'07', title:'Contact', desc:'Reach the responsible person directly when you have a specific question.', hint:'Contact now', arrow:'→' },
    ],
    why: {
      eyebrow:'Why UniDock',
      title:'Organize what matters instead of adding more noise',
      sub:'UniDock focuses on one job: gathering the links and resources freshmen actually reuse, so less gets missed and less time is spent searching.',
      items: [
        { idx:'01', title:'No need to search everywhere', desc:'Keep high-frequency links on one page instead of jumping across chats, posts, and search results.' },
        { idx:'02', title:'Freshman links are curated', desc:'From pre-arrival prep to campus navigation, the most-used content is sorted first.' },
        { idx:'03', title:'Reduce the information gap', desc:'Even first-time visitors can quickly see what to read next.' },
      ],
    },
    guide: {
      eyebrow:'Freshman Must-Read',
      title:'Enter by stage instead of reading everything at once',
      sub:'The most easy-to-miss topics are split into four clear entries so preparation can move in a natural order.',
      items: [
        { idx:'01', title:'Arrival Process', desc:'Review the key steps to complete on arrival day in sequence.' },
        { idx:'02', title:'Pre-Departure Checklist', desc:'Prepare documents, daily items, and common essentials in advance.' },
        { idx:'03', title:'Freshman Pitfalls', desc:'Understand common mistakes early and avoid wasted time or effort.' },
        { idx:'04', title:'Campus Systems Guide', desc:'Find the links for courses, services, and school systems quickly.' },
      ],
    },
    cta: { eyebrow:'Further Help', title:'Still have unresolved questions?', desc:'You can reach the responsible contacts for additional help.', btn:'Add Contact' },
    footer: { desc:'Gathers info entries, campus resources, and contact support for NUIST freshmen.', note:'A restrained, clear, and ready-to-use freshman homepage.' },
    drawer: { freshman:'Freshman Must-Read', arrival:'Arrival Prep', living:'Living Resources', nav:'Campus Navigation', better:'Better Service', internal:'Internal', contact:'Contact Leads' },
    mailbox: { label:'Mailbox' },
  },
};

/* ── SVG fragments ── */
const MailIcon = () => <svg viewBox="0 0 24 24"><rect x="4" y="6" width="16" height="12" rx="1.5"/><path d="M5 7l7 5.5L19 7"/></svg>;
const GlobeIcon = () => <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M4.5 9h15M4.5 15h15"/><ellipse cx="12" cy="12" rx="3.5" ry="9"/></svg>;
const MenuIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M4 7H20M4 12H20M4 17H20"/></svg>;
const ChevronIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 9l6 6 6-6"/></svg>;

/* ── Nav ── */
const Nav = ({ lang, setLang, onMenu }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    fn(); window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  const c = T[lang];
  return (
    <header className={`site-nav${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container site-nav__bar">
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <a className="brand" href="#">
            <img className="brand__icon" src="icon/icon-144.png" alt="UniDock"/>
            <div className="brand__text">
              <strong>UniDock</strong>
              <span>{c.nav.sub}</span>
            </div>
          </a>
          <button className="menu-btn" onClick={onMenu} aria-label={c.nav.toggle}><MenuIcon/></button>
        </div>
        <div className="nav-actions">
          <a className="nav-icon" href="#" aria-label={c.mailbox.label}>
            <MailIcon/><span className="unread-dot"></span>
          </a>
          <a className="nav-pill" href="#">{c.nav.better}</a>
          <div className="lang-capsule">
            <GlobeIcon/>
            <button className={`lang-btn${lang==='zh'?' is-active':''}`} onClick={()=>setLang('zh')}>中</button>
            <button className={`lang-btn${lang==='en'?' is-active':''}`} onClick={()=>setLang('en')}>EN</button>
          </div>
        </div>
      </div>
    </header>
  );
};

/* ── Drawer ── */
const Drawer = ({ open, onClose, lang }) => {
  const c = T[lang].drawer;
  const [expanded, setExpanded] = useState(false);
  return (<>
    <div className={`drawer-overlay${open?' is-open':''}`} onClick={onClose}></div>
    <aside className={`drawer${open?' is-open':''}`}>
      <ul className="drawer-list">
        <li className="drawer-item" onClick={()=>setExpanded(!expanded)} style={{cursor:'pointer'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <span>{c.freshman}</span>
            <span style={{transform:expanded?'rotate(180deg)':'',transition:'transform .2s',display:'flex'}}><ChevronIcon/></span>
          </div>
          {expanded && <ul className="drawer-sub">
            <li>{c.arrival}</li><li>{c.living}</li><li>{c.nav}</li>
          </ul>}
        </li>
        <li className="drawer-item" style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          {c.better}<span className="drawer-badge">{c.internal}</span>
        </li>
        <li className="drawer-item">{c.contact}</li>
      </ul>
    </aside>
  </>);
};

/* ── Hero ── */
const Hero = ({ lang }) => {
  const c = T[lang].hero;
  return (
    <section className="hero section">
      <div className="container">
        <span className="eyebrow">{c.eyebrow}</span>
        <h1 className="hero__title">{c.title}</h1>
        <p className="hero__sub">{c.sub}</p>
        <div className="hero__actions">
          <a className="btn btn--primary" href="#core-entry" onClick={e=>{e.preventDefault();const el=document.getElementById('core-entry');if(el)window.scrollTo({top:el.offsetTop-100,behavior:'smooth'})}}>{c.cta1}</a>
          <a className="btn btn--secondary" href="#/contact" onClick={e=>{e.preventDefault();navigate('/contact')}}>{c.cta2}</a>
        </div>
        <div className="hero__pills">
          {c.pills.map((p,i) => <span className="hero-pill" key={i}>{p}</span>)}
        </div>
      </div>
    </section>
  );
};

/* ── Core Entries ── */
const CoreEntries = ({ lang }) => {
  const c = T[lang];
  return (
    <section className="section--tight" id="core-entry">
      <div className="container">
        <div className="sh">
          <span className="eyebrow">{c.core.eyebrow}</span>
          <h2>{c.core.title}</h2>
          <p>{c.core.sub}</p>
        </div>
        <div className="entry-grid">
          {c.entries.map((e,i) => {
            const links=['#/','#/','#/redirect/map','#/redirect/official','#/','#/better','#/contact'];
            const dest=[null,null,'/redirect/map','/redirect/official',null,'/better','/contact'];
            return (
            <a className="card entry-card" key={i} href={links[i]} onClick={ev=>{if(dest[i]){ev.preventDefault();navigate(dest[i])}}}>
              <div className="entry-card__top">
                <div style={{display:'flex',alignItems:'center',gap:8}}>
                  <span className="entry-card__idx">{e.idx}</span>
                  {e.badge && <span className="entry-card__badge">{e.badge}</span>}
                </div>
                <span className="entry-card__arrow">{e.arrow}</span>
              </div>
              <h3>{e.title}</h3>
              <p>{e.desc}</p>
              <span className="entry-card__hint">{e.hint}</span>
            </a>
          );
          })}
        </div>
      </div>
    </section>
  );
};

/* ── Why Section ── */
const WhySection = ({ lang }) => {
  const c = T[lang].why;
  return (
    <section className="section--tight">
      <div className="container">
        <div className="sh">
          <span className="eyebrow">{c.eyebrow}</span>
          <h2>{c.title}</h2>
          <p>{c.sub}</p>
        </div>
        <div className="why-grid">
          {c.items.map((it,i) => (
            <div className="card value-card" key={i}>
              <span className="value-card__idx">{it.idx}</span>
              <h3>{it.title}</h3>
              <p>{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── Guide Section ── */
const GuideSection = ({ lang }) => {
  const c = T[lang].guide;
  return (
    <section className="section">
      <div className="container">
        <div className="card guide-shell">
          <div style={{padding:'8px 6px'}}>
            <span className="eyebrow">{c.eyebrow}</span>
            <h2 style={{marginTop:14,fontSize:'clamp(1.5rem,3vw,2rem)',fontWeight:700,lineHeight:1.12,letterSpacing:'-0.04em',maxWidth:'11ch',textWrap:'balance'}}>{c.title}</h2>
            <p style={{marginTop:10,color:'var(--muted)',fontSize:'0.9rem',lineHeight:1.6,maxWidth:'30ch'}}>{c.sub}</p>
          </div>
          <div style={{display:'grid',gap:14}}>
            {c.items.map((it,i) => (
              <a className="card guide-item" key={i} href={['#/arrival','#/checklist','#/pitfalls','#/systems'][i]} onClick={ev=>{ev.preventDefault();navigate(['/arrival','/checklist','/pitfalls','/systems'][i])}} style={{borderRadius:'var(--r-md)'}}>
                <span className="guide-item__idx">{it.idx}</span>
                <div>
                  <h3>{it.title}</h3>
                  <p>{it.desc}</p>
                </div>
                <span className="guide-item__arrow">→</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── CTA ── */
const CTASection = ({ lang }) => {
  const c = T[lang].cta;
  return (
    <section className="section--tight">
      <div className="container">
        <div className="card cta-banner">
          <div>
            <span className="eyebrow">{c.eyebrow}</span>
            <h2 style={{marginTop:14,fontSize:'clamp(1.5rem,3vw,2.1rem)',fontWeight:700,lineHeight:1.12,letterSpacing:'-0.04em'}}>{c.title}</h2>
            <p style={{marginTop:8,color:'var(--muted)',fontSize:'0.92rem',lineHeight:1.6,maxWidth:'38rem'}}>{c.desc}</p>
          </div>
          <a className="btn btn--primary" href="#/contact" onClick={e=>{e.preventDefault();navigate('/contact')}}>{c.btn}</a>
        </div>
      </div>
    </section>
  );
};

/* ── Footer ── */
const Footer = ({ lang }) => {
  const c = T[lang].footer;
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="card footer-inner">
          <div className="footer-brand">
            <img src="icon/icon-144.png" alt="UniDock"/>
            <div>
              <strong>UniDock</strong>
              <p>{c.desc}</p>
            </div>
          </div>
          <p className="footer-meta">{c.note}</p>
        </div>
      </div>
    </footer>
  );
};

Object.assign(window, { T, Nav, Drawer, Hero, CoreEntries, WhySection, GuideSection, CTASection, Footer });
