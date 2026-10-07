/* Test de referencia de sugerencias: la primera sugerencia esperada para cada consulta, y que no haya duplicados. */
const {chromium}=require(require("child_process").execSync("npm root -g").toString().trim()+"/playwright");
(async()=>{
  const b=await chromium.launch({executablePath:process.env.CHROMIUM||"/opt/pw-browsers/chromium"});
  const p=await b.newPage(); const errs=[]; p.on("pageerror",e=>errs.push(e.message));
  await p.goto(process.env.URL); await p.waitForFunction(()=>dbState==="ready");
  const types=await p.evaluate(()=>{ const t={}; LEVELS.forEach(L=>{ t[L.type]=t[L.type]||L; }); return Object.fromEntries(Object.entries(t).map(([k,L])=>[k,LEVELS.indexOf(L)])); });
  /* [tipo, consulta, texto que debe aparecer entre las 3 primeras] */
  const CASES=[
    ["jugadores","rudiger","Antonio Rüdiger"],["jugadores","antonio rudiger","Antonio Rüdiger"],["jugadores","mbappe","Kylian Mbappé"],
    ["jugadores","bellingham","Jude Bellingham"],["jugadores","lewandowski","Robert Lewandowski"],["jugadores","messi","Messi"],
    ["jugadores","cristiano","Cristiano Ronaldo"],["jugadores","ronaldo","Ronaldo"],["jugadores","benzema","Karim Benzema"],["jugadores","modric","Luka Modrić"],
    ["jugadores","valverde","Federico Valverde"],["jugadores","yamal","Lamine Yamal"],["jugadores","militao","Éder Militão"],
    ["equipos","betis","Real Betis"],["equipos","real betis","Real Betis"],["equipos","barcelona","Barcelona"],["equipos","atletico","Atlético"],
    ["equipos","sevilla","Sevilla"],["equipos","aberdeen","Aberdeen"]
  ];
  const r={cases:[],dupes:[],fails:[]};
  for(const [t,q,want] of CASES){
    const out=await p.evaluate(([t,q])=>{ const i=LEVELS.findIndex(L=>L.type===t); return suggest(LEVELS[i],q,new Set()).map(x=>x.n); },[t,q]);
    const ok=out.slice(0,3).some(n=>n.includes(want)); r.cases.push([t,q,ok,out.slice(0,4)]); if(!ok) r.fails.push(t+":"+q+" -> "+out.join(" | "));
  }
  /* sin duplicados: ningun par de sugerencias del mismo grupo, para muchas consultas */
  r.dupes=await p.evaluate(()=>{ const bad=[]; const qs=["be","real","bar","atl","man","sev","val","ath","ajax","ber","fc","uni"]; 
    ["equipos","selecciones","estadios","entrenadores"].forEach(t=>{ const L=LEVELS.find(x=>x.type===t); if(!L) return; const G=GROUPS[t];
      qs.forEach(q=>{ const o=suggest(L,q,new Set()); const ids=o.map(x=>G.find(norm(x.n))); if(new Set(ids).size!==ids.length) bad.push(t+":"+q+":"+o.map(x=>x.n).join("|")); }); }); return bad; });
  /* toda respuesta se acepta con el nombre que el desplegable le muestra */
  r.unaccepted=await p.evaluate(()=>{ const bad=[]; LEVELS.forEach(L=>{ const G=GROUPS[L.type]; if(!G) return; L.answers.forEach((a,i)=>{ const nm=G.name(G.find(norm(a.n))); if(nm){ const j=judge(L,nm,new Set()); if(!(j.t==="hit"&&j.i===i)) bad.push(L.title.slice(0,30)+": "+a.n+" <- "+nm+" "+j.t); } }); }); return bad.slice(0,15); });
  console.log(JSON.stringify(r,null,1)); r.errs=errs;
  await b.close(); if(r.fails.length||r.dupes.length||r.unaccepted.length||errs.length) process.exit(1);
})();
