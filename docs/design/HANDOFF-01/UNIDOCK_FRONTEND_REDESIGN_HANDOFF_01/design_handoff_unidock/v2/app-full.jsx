/* UniDock v2 — Full Site App with Router */
const { useState, useCallback } = React;

const FullApp = () => {
  const route = useRoute();
  const [lang, setLang] = useState('zh');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = useCallback(() => setDrawerOpen(p => !p), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  // Redirect pages (no nav/footer)
  if (route === '/redirect/campus-nav') return <><Drawer open={drawerOpen} onClose={closeDrawer} lang={lang}/><PageRedirectChoice lang={lang} type="campus"/></>;
  if (route === '/redirect/life') return <><Drawer open={drawerOpen} onClose={closeDrawer} lang={lang}/><PageRedirectChoice lang={lang} type="life"/></>;
  if (route === '/redirect/map') return <><Drawer open={drawerOpen} onClose={closeDrawer} lang={lang}/><PageRedirectTimer lang={lang} type="map"/></>;
  if (route === '/redirect/official') return <><Drawer open={drawerOpen} onClose={closeDrawer} lang={lang}/><PageRedirectTimer lang={lang} type="official"/></>;

  // Homepage
  if (route === '/') return (<>
    <Nav lang={lang} setLang={setLang} onMenu={toggleDrawer}/>
    <Drawer open={drawerOpen} onClose={closeDrawer} lang={lang}/>
    <main><Hero lang={lang}/><CoreEntries lang={lang}/><WhySection lang={lang}/><GuideSection lang={lang}/><CTASection lang={lang}/></main>
    <Footer lang={lang}/>
  </>);

  // Subpages with nav/footer
  const pageMap = {
    '/arrival': { comp: PageArrival, title: lang==='zh'?'报到全流程':'Arrival Process' },
    '/checklist': { comp: PageChecklist, title: lang==='zh'?'行前准备清单':'Pre-Departure Checklist' },
    '/pitfalls': { comp: PagePitfalls, title: lang==='zh'?'新生避坑提示':'Freshman Pitfalls' },
    '/systems': { comp: PageSystems, title: lang==='zh'?'校内系统导航':'Campus Systems' },
    '/contact': { comp: PageContact, title: lang==='zh'?'联系负责人':'Contact Leads' },
    '/better': { comp: PageBetter, title: 'Better Service' },
    '/mailbox': { comp: PageMailbox, title: lang==='zh'?'站内信箱':'Mailbox' },
  };

  const page = pageMap[route];
  if (page) {
    const PageComp = page.comp;
    return (<>
      <Drawer open={drawerOpen} onClose={closeDrawer} lang={lang}/>
      <SubpageLayout lang={lang} setLang={setLang} onMenu={toggleDrawer} title={page.title}>
        <PageComp lang={lang}/>
      </SubpageLayout>
    </>);
  }

  // 404 fallback → home
  return (<>
    <Nav lang={lang} setLang={setLang} onMenu={toggleDrawer}/>
    <Drawer open={drawerOpen} onClose={closeDrawer} lang={lang}/>
    <main><Hero lang={lang}/><CoreEntries lang={lang}/><WhySection lang={lang}/><GuideSection lang={lang}/><CTASection lang={lang}/></main>
    <Footer lang={lang}/>
  </>);
};

ReactDOM.createRoot(document.getElementById('root')).render(<FullApp/>);
