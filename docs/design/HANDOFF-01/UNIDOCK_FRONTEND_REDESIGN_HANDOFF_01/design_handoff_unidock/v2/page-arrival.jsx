/* 报到全流程 page */
const PageArrival = ({ lang }) => {
  const zh = lang === 'zh';
  return (<>
    <SubHero eyebrow={zh?'报到流程':'Arrival Process'} title={zh?'报到全流程':'Full Arrival Process'} subtitle={zh?'从出发到完成报到，按阶段完成关键步骤。':'Complete key steps from departure to check-in, stage by stage.'}>
      <div className="stage-grid">
        {[{i:'01',t:zh?'出发前':'Before Departure',d:zh?'证件、宿舍区域、入校路径先确认。':'Confirm documents, dorm area, and entry route.'},
          {i:'02',t:zh?'到达南京':'Arriving in Nanjing',d:zh?'按地铁、高铁、机场或自驾路线入校。':'Enter campus by metro, train, airport, or car.'},
          {i:'03',t:zh?'入校与报到':'Check-in',d:zh?'到宿舍报到点后按迎新流程完成验证。':'Complete verification at your dorm check-in point.'},
          {i:'04',t:zh?'现场支持':'On-site Support',d:zh?'接驳、快递、缴费与咨询都在现场可用。':'Shuttle, delivery, payment, and help are available on-site.'}
        ].map((s,i)=>(
          <div className="stage-card" key={i}><span className="stage-card__idx">{s.i}</span><h2>{s.t}</h2><p>{s.d}</p></div>
        ))}
      </div>
    </SubHero>

    <CPanel eyebrow={zh?'出发前':'Before Departure'} title={zh?'先把出发前的三件事做完':'Complete these three things before leaving'} desc={zh?'证件和物品先整理完整，再确认宿舍区域与入校路径，到校后会顺畅很多。':'Organize documents and belongings first, then confirm your dorm area and entry route.'}>
      <div className="info-stack">
        {[{t:zh?'带齐物品':'Pack essentials',d:zh?'确认已带齐必要证件与物品，尤其是录取通知书、身份证、证件照和档案材料。':'Confirm you have your admission letter, ID, photos, and personal files.'},
          {t:zh?'确认宿舍区域':'Confirm dorm area',d:zh?'提前确定自己属于东苑、中苑、西苑还是南苑，后续选择校门和停车路线都依赖这一步。':'Determine whether you\'re in East, Central, West, or South campus.'},
          {t:zh?'查看校园地图':'Check campus map',d:zh?'建议先熟悉校门、宿舍区和报到点的大致位置，避免入校后走冤枉路。':'Familiarize yourself with gate, dorm, and check-in locations.'}
        ].map((it,i)=>(
          <div className="info-item" key={i}><span className="info-item__idx">0{i+1}</span><div><h3>{it.t}</h3><p>{it.d}</p></div></div>
        ))}
      </div>
      <div className="section-actions"><a className="btn btn--primary" href="#/checklist" onClick={e=>{e.preventDefault();navigate('/checklist')}}>{zh?'查看行前准备清单':'View pre-departure checklist'}</a></div>
    </CPanel>

    <CPanel eyebrow={zh?'到达南京':'Arriving in Nanjing'} title={zh?'按你的到达方式选择路线':'Choose a route based on your arrival method'} desc={zh?'先确认到站类型，再按路线进校；如果是自驾，优先确认宿舍区与入校门的对应关系。':'Confirm your arrival station, then follow the route to campus.'}>
      <div className="route-grid">
        {[{b:zh?'路线卡 01':'Route 01',t:zh?'地铁 / 高铁':'Metro / Train',p:zh?['南京站/南京南站','3号线','泰冯路','S8','信息工程大学站']:['Nanjing Station','Line 3','Taifeng Road','S8','NUIST Station'],n:zh?'适合到达南京站、南京南站后继续换乘进校的同学。':'For students arriving at Nanjing Station or South Station.'},
          {b:zh?'路线卡 02':'Route 02',t:zh?'机场':'Airport',p:zh?['禄口国际机场','S1','南京南站','3号线','泰冯路','S8']:['Lukou Airport','S1','South Station','Line 3','Taifeng','S8'],n:zh?'从机场出发时换乘会更多，建议提前预留时间。':'More transfers from the airport — plan extra time.'},
          {b:zh?'路线卡 03':'Route 03',t:zh?'自驾':'Driving',p:zh?['先确认宿舍区','再选择入校门','按 A-G 路线入校']:['Confirm dorm area','Choose campus gate','Follow route A-G'],n:zh?'离南京 3 到 4 小时车程内的同学可以考虑自驾。':'Driving is feasible if you\'re within 3-4 hours of Nanjing.'}
        ].map((r,i)=>(
          <div className="route-card" key={i}>
            <div><span className="route-card__badge">{r.b}</span></div>
            <h3>{r.t}</h3>
            <div className="route-card__path">{r.p.map((s,j)=><span key={j}>{s}</span>)}</div>
            <p className="route-card__note">{r.n}</p>
          </div>
        ))}
      </div>
    </CPanel>

    <CPanel eyebrow={zh?'自驾入校':'Driving to Campus'} title={zh?'先看宿舍区，再展开详细路线':'Check your dorm area, then expand the detailed route'} desc={zh?'先确认你的宿舍区与推荐校门，再按下方折叠路线查看详细行驶路径。':'Confirm your dorm area and recommended gate first.'}>
      <div className="mapping-grid">
        {[{t:zh?'晖园 / 硕园':'Huiyuan / Shuoyuan',d:zh?'推荐校门：东苑东门 / 东苑南门':'Recommended: East Campus East/South Gate'},
          {t:zh?'沁园':'Qinyuan',d:zh?'推荐校门：气象谷东门 / 中苑南门':'Recommended: Qixianggu East / Central South Gate'},
          {t:zh?'文园':'Wenyuan',d:zh?'推荐校门：西苑南门、西苑北门':'Recommended: West Campus South/North Gate'},
          {t:zh?'毓园':'Yuyuan',d:zh?'推荐校门：南苑东门':'Recommended: South Campus East Gate'}
        ].map((m,i)=><div className="mapping-card" key={i}><h3>{m.t}</h3><p>{m.d}</p></div>)}
      </div>
      <div className="accordion-group">
        {[{idx:'A',t:zh?'东苑东门入校':'East Campus East Gate',sub:zh?'对应晖园、硕园宿舍区':'For Huiyuan/Shuoyuan dorms',steps:zh?['宁六路','东苑东门','正气路','文达通道','范仲淹广场东左转','万象路','中苑主田径场停车','步行至晖园、硕园宿舍区']:['Ningliu Rd','East Gate','Walk to dorms']},
          {idx:'B',t:zh?'东苑南门入校':'East Campus South Gate',sub:zh?'适合前往沁园周边区域':'For Qinyuan area',steps:zh?['龙山北路东段','东苑南门','文畅隧道','万象路','中苑主田径场停车']:['Longshan N Rd','South Gate','Tunnel','Track parking']},
          {idx:'C',t:zh?'中苑南门入校':'Central South Gate',sub:zh?'直接服务沁园宿舍区':'Direct to Qinyuan dorms',steps:zh?['龙山北路','中苑南门','沁园 41 幢左转','中苑主田径场停车']:['Longshan N Rd','Central South Gate','Track parking']},
          {idx:'D',t:zh?'西苑南门入校':'West Campus South Gate',sub:zh?'对应文园宿舍区':'For Wenyuan dorms',steps:zh?['龙山北路','滨江楼东路','天鹅湖路','文园宿舍区']:['Longshan N Rd','Binjiang E Rd','Swan Lake Rd','Wenyuan dorms']},
          {idx:'E',t:zh?'西苑北门入校':'West Campus North Gate',sub:zh?'适合从万家坝路方向进入':'From Wanjiaba Rd direction',steps:zh?['万家坝路','西苑北门','文园宿舍区']:['Wanjiaba Rd','North Gate','Wenyuan']},
          {idx:'F',t:zh?'气象谷入校':'Qixianggu Entry',sub:zh?'适合前往沁园':'For Qinyuan via underground',steps:zh?['龙山北路东段→气象谷东门','地下停车场→5号电梯','气象谷北门步行入校→沁园']:['East Rd→Qixianggu Gate','Underground parking→Elevator 5','Walk to Qinyuan']},
          {idx:'G',t:zh?'南苑东门入校':'South Campus East Gate',sub:zh?'对应毓园宿舍区':'For Yuyuan dorms',steps:zh?['江北快速路龙山南路出口','龙山南路','药谷大道','南苑东门','地下停车场']:['Jiangbei Expressway','Longshan S Rd','Yaogu Ave','South East Gate']}
        ].map((a,i)=>(
          <details className="accord" key={i}>
            <summary><div className="accord__title"><span className="accord__idx">{a.idx}</span><div><strong>{a.t}</strong><br/><span style={{fontSize:'0.8rem',color:'var(--muted)'}}>{a.sub}</span></div></div><span style={{color:'var(--soft)'}}>+</span></summary>
            <div className="accord__body"><ul>{a.steps.map((s,j)=><li key={j}>{s}</li>)}</ul></div>
          </details>
        ))}
      </div>
      <SoftNote quiet label={zh?'行车提醒':'Driving Reminder'} text={zh?'校内全线单向行驶，限速 30km/h，禁止调头、逆行、超速和违停。入校车辆饱和时，建议停放在周边道路，再从就近校门步行入校。':'All campus roads are one-way at 30km/h. No U-turns, wrong-way driving, or illegal parking. If campus parking is full, park nearby and walk in.'}/>
    </CPanel>

    <CPanel eyebrow={zh?'到校后流程':'After Arrival'} title={zh?'按顺序完成四步报到':'Complete check-in in four steps'} desc={zh?'流程尽量保持线性处理，先到宿舍报到点，再进入企业微信迎新模块。':'Follow a linear process: dorm check-in point → WeCom onboarding → verification.'}>
      <div className="timeline">
        {[{t:zh?'到宿舍报到点':'Go to dorm check-in',d:zh?'先到宿舍楼下对应学院的报到点，按现场指引确认学院与楼栋信息。':'Head to your college\'s check-in point at your dorm building.'},
          {t:zh?'企业微信 → 我的迎新':'WeCom → My Onboarding',d:zh?'打开学校企业微信中的"我的迎新"，进入线上迎新流程。':'Open "My Onboarding" in the school\'s WeCom app.'},
          {t:zh?'验证与领取材料':'Verify & collect materials',d:zh?'完成身份验证、查验录取通知书，并按要求领取材料。':'Complete ID verification and collect your materials.'},
          {t:zh?'完成报到':'Check-in complete',d:zh?'所有环节确认完成后，即可正式结束报到流程。':'Once all steps are confirmed, check-in is officially complete.'}
        ].map((s,i)=>(
          <div className="timeline-step" key={i}><span className="timeline-step__idx">0{i+1}</span><div className="timeline-step__body"><h3>{s.t}</h3><p>{s.d}</p></div></div>
        ))}
      </div>
    </CPanel>

    <CPanel eyebrow={zh?'现场支持':'On-site Support'} title={zh?'到场后可直接使用的支持信息':'Support available on arrival day'} desc={zh?'把常见支持信息集中在同一处，避免到场后再反复找群消息。':'All common support info gathered in one place.'}>
      <div className="support-grid">
        <div className="support-card support-card--accent"><h3>{zh?'接驳服务':'Shuttle Service'}</h3><ul className="support-list"><li>{zh?'本部校区：信息工程大学地铁站与毓园社区之间循环接驳。':'Main campus: shuttle between NUIST station and Yuyuan.'}</li><li>{zh?'报到日 8:30-18:30 运行。':'Runs 8:30-18:30 on registration day.'}</li></ul></div>
        <div className="support-card"><h3>{zh?'地铁票说明':'Metro Ticket Info'}</h3><ul className="support-list"><li>{zh?'新生可凭录取通知书原件领取地铁票支持，每人最多 3 张。':'Freshmen can get up to 3 metro tickets with their admission letter.'}</li></ul></div>
        <div className="support-card"><h3>{zh?'现场缴费 / 绿色通道':'Payment / Green Channel'}</h3><ul className="support-list"><li>{zh?'东苑、中苑、西苑各有收费点。家庭经济困难可在西苑"绿色通道"咨询资助政策。':'Payment points in East/Central/West campus. Financial aid available at West campus green channel.'}</li></ul></div>
      </div>
    </CPanel>

    <CPanel subtle eyebrow={zh?'安全提醒':'Safety Reminder'} title={zh?'到场当天保持这些底线意识':'Keep these safety basics in mind'} desc={zh?'这些提醒不复杂，但最容易在现场忙乱时被忽视。':'Simple but easily forgotten in the rush.'}>
      <div className="alert-grid">
        {[{t:zh?'防诈骗':'Anti-fraud',d:zh?'不要轻信陌生收费链接、群聊通知或以老师名义的转账要求。':'Don\'t trust unfamiliar payment links or transfer requests.'},
          {t:zh?'贵重物品':'Valuables',d:zh?'手机、证件、现金等贵重物品尽量随身携带。':'Keep phone, ID, and cash on your person.'},
          {t:zh?'手续本人办理':'Handle procedures yourself',d:zh?'入学手续尽量由本人直接办理，不要委托他人代办。':'Complete enrollment procedures yourself, not through others.'},
          {t:zh?'家校联系':'Family-school contact',d:zh?'及时把辅导员联系方式告诉家长，保持家校联系畅通。':'Share your counselor\'s contact with your parents.'}
        ].map((a,i)=><div className="alert-card" key={i}><h3>{a.t}</h3><p>{a.d}</p></div>)}
      </div>
    </CPanel>
  </>);
};
Object.assign(window, { PageArrival });
