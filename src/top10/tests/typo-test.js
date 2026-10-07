/* Una respuesta equivocada que es otra entidad real no debe corregirse ni sugerirse como acierto ("Estonia" no es "Escocia"),
   y los descriptores de los niveles no pueden nombrar respuestas. */
const {chromium}=require(require("child_process").execSync("npm root -g").toString().trim()+"/playwright");
(async()=>{
  const b=await chromium.launch({executablePath:process.env.CHROMIUM||"/opt/pw-browsers/chromium"});
  const p=await b.newPage(); const errs=[]; p.on("pageerror",e=>errs.push(e.message));
  await p.goto(process.env.URL); await p.waitForFunction(()=>dbState==="ready");
  const r=await p.evaluate(()=>{
    const out={estonia:null,typoOk:null,wrongAsHit:[],wrongSuggested:[],descLeaks:[]};
    const L=LEVELS.find(l=>l.type==="selecciones"&&l.answers.some(a=>a.n==="Escocia"));
    if(L){ const j=judge(L,"Estonia",new Set()); out.estonia={judge:j.t,near:nearMiss(L,"Estonia",new Set())}; const t=judge(L,"Escosia",new Set()); out.typoOk=t.t; }
    /* ninguna otra selección o equipo real puede contarse como acierto ni sugerirse en un nivel que no la tiene */
    LEVELS.filter(l=>l.type==="selecciones"||l.type==="equipos").forEach(l=>{
      const names=(l.type==="selecciones"?DB.selecciones:DB.equipos.slice(0,3000)).map(e=>e.n);
      const own=new Set(l.answers.flatMap(a=>a.keys));
      names.forEach(n=>{ const k=norm(n); if(own.has(k)) return;
        const j=judge(l,n,new Set()); if(j.t==="hit") out.wrongAsHit.push(l.title.slice(0,25)+": "+n+" -> "+l.answers[j.i].n);
        const m=nearMiss(l,n,new Set()); if(m!==null) out.wrongSuggested.push(l.title.slice(0,25)+": "+n+" -> "+l.answers[m].n); });
    });
    out.wrongAsHit=out.wrongAsHit.slice(0,15); out.wrongSuggested=out.wrongSuggested.slice(0,15);
    /* descripciones sin respuestas */
    const stop=new Set(["como","real","club","city","united"]);
    LEVELS.forEach(l=>{ const d=" "+norm(l.desc||"")+" "; const hit=[];
      l.answers.forEach(a=>{ [a.n].concat(a.a||[]).forEach(x=>{ const k=norm(x); if(k.length>=4&&!stop.has(k)&&d.includes(" "+k+" ")) hit.push(a.n); });
        const t=norm(a.n).split(" "), last=t[t.length-1]; if(t.length>1&&last.length>=5&&!stop.has(last)&&d.includes(" "+last+" ")) hit.push(a.n+"*"); });
      const bad=[...new Set(hit)].filter(h=>h!=="Lisandro Martínez*"); /* apellido del portero excluido, no una pista */
      if(bad.length) out.descLeaks.push(l.id+": "+bad.join(", ")); });
    return out;
  });
  r.errs=errs; console.log(JSON.stringify(r,null,1)); await b.close();
  if(!r.estonia||r.estonia.judge!=="miss"||r.estonia.near!==null||r.typoOk!=="hit"||r.wrongAsHit.length||r.wrongSuggested.length||r.descLeaks.length||errs.length) process.exit(1);
})();
