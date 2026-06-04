/* UniDock v2 — Shared Subpage Components + Router */
const { useState, useEffect, useCallback, useRef } = React;

/* ── Simple hash router ── */
const useRoute = () => {
  const [route, setRoute] = useState(window.location.hash.slice(1) || '/');
  useEffect(() => {
    const fn = () => { setRoute(window.location.hash.slice(1) || '/'); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', fn);
    return () => window.removeEventListener('hashchange', fn);
  }, []);
  return route;
};
const navigate = (path) => { window.location.hash = path; };

/* ── Subpage Nav (with back button) ── */
const SubNav = ({ lang, setLang, onMenu, title }) => {
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
        <div style={{display:'flex',alignItems:'center',gap:8,minWidth:0}}>
          <a className="sub-back" href="#/" onClick={e=>{e.preventDefault();navigate('/')}}>← {lang==='zh'?'返回首页':'Home'}</a>
          <a className="brand" href="#/" onClick={e=>{e.preventDefault();navigate('/')}}>
            <img className="brand__icon" src="icon/icon-144.png" alt="UniDock"/>
            <div className="brand__text"><strong>UniDock</strong><span>{c.nav.sub}</span></div>
          </a>
          <button className="menu-btn" onClick={onMenu} aria-label={c.nav.toggle}><MenuIcon/></button>
          {title && <span style={{fontSize:'0.82rem',fontWeight:600,color:'var(--muted)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{title}</span>}
        </div>
        <div className="nav-actions">
          <a className="nav-icon" href="#/mailbox" onClick={e=>{e.preventDefault();navigate('/mailbox')}} aria-label={c.mailbox.label}>
            <MailIcon/><span className="unread-dot"></span>
          </a>
          <a className="nav-pill" href="#/better" onClick={e=>{e.preventDefault();navigate('/better')}}>{c.nav.better}</a>
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

/* ── Subpage Hero ── */
const SubHero = ({ eyebrow, title, subtitle, children }) => (
  <section className="sub-hero">
    <span className="eyebrow">{eyebrow}</span>
    <h1>{title}</h1>
    <p>{subtitle}</p>
    {children}
  </section>
);

/* ── Content Panel ── */
const CPanel = ({ eyebrow, title, desc, subtle, children }) => (
  <div className={`cpanel${subtle?' cpanel--subtle':''}`}>
    <div className="cpanel__head">
      <span className="cpanel__ey">{eyebrow}</span>
      <h2 className="cpanel__h2">{title}</h2>
      {desc && <p className="cpanel__p">{desc}</p>}
    </div>
    {children}
  </div>
);

/* ── Soft Note ── */
const SoftNote = ({ label, text, quiet }) => (
  <div className={`soft-note${quiet?' soft-note--quiet':''}`}>
    <span className="soft-note__label">{label}</span>
    <p>{text}</p>
  </div>
);

/* ── Numbered List Item ── */
const NItem = ({ idx, children }) => (
  <li className="nlist__item"><span className="nlist__idx">{idx}</span><p className="nlist__body">{children}</p></li>
);

/* ── Copy Button ── */
const CopyBtn = ({ value, lang }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };
  return <button className={`copy-btn${copied?' is-copied':''}`} onClick={copy}>{copied ? (lang==='zh'?'已复制':'Copied') : (lang==='zh'?'复制':'Copy')}</button>;
};

/* ── Subpage Layout Wrapper ── */
const SubpageLayout = ({ lang, setLang, onMenu, title, children }) => (
  <>
    <SubNav lang={lang} setLang={setLang} onMenu={onMenu} title={title}/>
    <main style={{paddingTop:10}}>
      <section className="section--tight">
        <div className="container">
          <div className="detail-shell">{children}</div>
        </div>
      </section>
    </main>
    <Footer lang={lang}/>
  </>
);

Object.assign(window, { useRoute, navigate, SubNav, SubHero, CPanel, SoftNote, NItem, CopyBtn, SubpageLayout });
