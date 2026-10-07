const {chromium}=require(require("child_process").execSync("npm root -g").toString().trim()+"/playwright");
(async()=>{
  const b=await chromium.launch({executablePath:process.env.CHROMIUM||"/opt/pw-browsers/chromium"});
  const p=await b.newPage({viewport:{width:900,height:900}});
  const errs=[]; p.on("pageerror",e=>errs.push(e.message)); p.on("response",r=>{if(r.status()>=400)errs.push(r.status()+" "+r.url())});
  await p.goto(process.env.URL);
  await p.waitForFunction(()=>dbState==="ready",null,{timeout:20000});
  const info=await p.evaluate(()=>({n:Object.fromEntries(Object.entries(DB).map(([k,v])=>[k,v.length]))}));
  // 1) todas las respuestas de todos los niveles se aceptan al escribirlas tal cual y tambien con su nombre en la base
  const res=await p.evaluate(()=>{
    const bad=[]; 
    LEVELS.forEach(L=>L.answers.forEach((a,i)=>{
      const j=judge(L,a.n,new Set());
      if(j.t!=="hit"||j.i!==i) bad.push([L.id,a.n,j.t]);
    }));
    return bad;
  });
  // 2) sugerencias: tipos de nivel jugadores / estadios / selecciones
  const sug=await p.evaluate(()=>{
    const pick=t=>LEVELS.find(L=>L.type===t);
    const q=(t,s)=>suggest(pick(t),s,new Set()).map(x=>x.n+(x.sub?" ["+x.sub+"]":""));
    return {yam:q("jugadores","lamine"),xav:q("jugadores","xav"),ron:q("jugadores","ronal"),
            ent:q("entrenadores","guard"),eq:q("equipos","real"),es:q("estadios","wemb"),se:q("selecciones","arg")};
  });
  // 3) las sugerencias del nivel NO deben contener solo respuestas (mas variedad que el nivel)
  const lvl=await p.evaluate(()=>{
    const L=LEVELS.find(x=>x.type==="jugadores");
    const names=new Set(L.answers.map(a=>a.n));
    const s=suggest(L,"jo",new Set());
    return {sug:s.map(x=>x.n), inLevel:s.filter(x=>names.has(x.n)).length};
  });
  // 4) tiempo por pulsacion
  const t=await p.evaluate(()=>{const L=LEVELS.find(x=>x.type==="jugadores");const t0=performance.now();for(let i=0;i<20;i++) suggest(L,"mar",new Set());return (performance.now()-t0)/20;});
  console.log(JSON.stringify({info,badAnswers:res,sug,lvl,msPerKey:Math.round(t),errs},null,1));
  await b.close();
})();
