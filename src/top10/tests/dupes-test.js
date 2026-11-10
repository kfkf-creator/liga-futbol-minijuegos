/* Sinónimos en el desplegable: "Betis" y "Real Betis" son el mismo club y deben salir como una sola opción,
   con la base de nombres cargada y con la lista de reserva (sin red). Ambas formas se siguen aceptando al responder.
   Los equipos distintos (Inter e Inter Miami, Rusia y la Unión Soviética) no se fusionan. */
const {chromium}=require(require("child_process").execSync("npm root -g").toString().trim()+"/playwright");
const sugg=(p,t,q,found)=>p.evaluate(([t,q,found])=>{ const L=LEVELS.find(x=>x.type===t); return suggest(L,q,new Set(found||[])).map(x=>x.n); },[t,q,found||[]]);
(async()=>{
  const b=await chromium.launch({executablePath:process.env.CHROMIUM||"/opt/pw-browsers/chromium"});
  const r={fails:[],cases:0}, errs=[];
  const check=(ok,msg)=>{ r.cases++; if(!ok) r.fails.push(msg); };
  for(const mode of ["base cargada","reserva"]){
    const p=await b.newPage(); p.on("pageerror",e=>errs.push(e.message));
    if(mode==="reserva") await p.route("**/entidades/**",x=>x.abort());
    await p.goto(process.env.URL);
    await p.waitForFunction(m=>dbState===(m==="reserva"?"failed":"ready"),mode);
    const tag=q=>"["+mode+"] "+q;
    /* 1. Betis: una sola opción, Real Betis, para cualquier forma de escribirlo */
    for(const q of ["bet","betis","real betis","real bet"]){
      const o=await sugg(p,"equipos",q);
      check(o.filter(n=>/betis/i.test(n)).length===1 && o[0]==="Real Betis", tag(q)+" -> "+JSON.stringify(o));
    }
    /* 2. Ambas formas se aceptan al responder, en todos los niveles con el Betis */
    const bet=await p.evaluate(()=>{ const bad=[], seen=[]; LEVELS.forEach((L,li)=>L.answers.forEach((a,i)=>{ if(!/betis/.test(norm(a.n))) return; seen.push(L.title);
      ["Betis","Real Betis"].forEach(w=>{ const j=judge(L,w,new Set()); if(!(j.t==="hit"&&j.i===i)) bad.push(L.title.slice(0,30)+" <- "+w+" "+j.t); });
      if(suggest(L,"betis",new Set([i])).some(x=>/betis/i.test(x.n))) bad.push(L.title.slice(0,30)+": sigue sugiriendo el Betis ya acertado"); })); return {bad,n:seen.length}; });
    check(bet.n>=4 && !bet.bad.length, tag("aceptar Betis")+" "+JSON.stringify(bet));
    /* 3. Rüdiger sigue primero */
    const rud=await sugg(p,"jugadores","rudiger");
    check(rud[0]==="Antonio Rüdiger", tag("rudiger")+" -> "+JSON.stringify(rud));
    /* 4. Otros clubes con dos nombres: una sola opción */
    const SAME=[["barcelona",["Barcelona","FC Barcelona"]],["bayern",["Bayern Múnich","Bayern de Múnich"]],["psg",["PSG","Paris Saint-Germain"]],["paris saint",["PSG","Paris Saint-Germain"]],
      ["inter",["Inter","Inter de Milán"]],["tottenham",["Tottenham","Tottenham Hotspur"]],["west ham",["West Ham","West Ham United"]],["espanyol",["Espanyol","RCD Espanyol"]],
      ["napoli",["Nápoles","Napoli"]],["oporto",["Oporto","Porto"]],["porto",["Oporto","Porto"]],["verona",["Verona","Hellas Verona"]]];
    for(const [q,forms] of SAME){
      const o=await sugg(p,"equipos",q);
      check(o.filter(n=>forms.includes(n)).length===1, tag(q)+" duplicado -> "+JSON.stringify(o));
    }
    /* 5. Barrido: ninguna pareja de sugerencias que se citen como alias (salvo selecciones históricas) */
    const dup=await p.evaluate(()=>{ const bad=[];
      ["equipos","jugadores","estadios"].forEach(t=>{ const L=LEVELS.find(x=>x.type===t), by=new Map(POOLS[t].map(e=>[e.nk,e]));
        const qs=new Set(); POOLS[t].forEach(e=>[e.nk,...e.keys].forEach(k=>{ if(k.length>=3) qs.add(k.slice(0,3)); if(k.length>=4) qs.add(k); }));
        [...qs].forEach(q=>{ const o=suggest(L,q,new Set()).map(x=>norm(x.n)); o.forEach(a=>o.forEach(c=>{ if(a<c && by.has(a) && by.has(c) && by.get(a).keys.includes(c) && by.get(c).keys.includes(a)) bad.push(t+":"+q+":"+a+"|"+c); })); }); });
      return [...new Set(bad)].slice(0,10); });
    check(!dup.length, tag("barrido de alias mutuos")+" "+JSON.stringify(dup));
    /* 6. Lo distinto no se fusiona */
    const has=(o,x)=>o.includes(x);
    const rm=await sugg(p,"equipos","madrid"); check(has(rm,"Real Madrid")&&rm.some(n=>/Atl[ée]tico/.test(n)), tag("madrid")+" "+JSON.stringify(rm));
    const ru=await sugg(p,"selecciones","rusia"); check(has(ru,"Rusia")&&has(ru,"Unión Soviética"), tag("rusia")+" "+JSON.stringify(ru));
    const ck=await sugg(p,"selecciones","chec"); check(has(ck,"Checoslovaquia")&&has(ck,"República Checa"), tag("chec")+" "+JSON.stringify(ck));
    if(mode==="base cargada"){ const im=await sugg(p,"equipos","inter"); check(has(im,"Inter")&&im.some(n=>/Miami/.test(n)), tag("inter y Miami")+" "+JSON.stringify(im)); }
    await p.close();
  }
  r.errs=errs; console.log(JSON.stringify(r,null,1));
  await b.close(); if(r.fails.length||errs.length) process.exit(1);
})();
