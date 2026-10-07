const {chromium}=require(require("child_process").execSync("npm root -g").toString().trim()+"/playwright");
(async()=>{
  const b=await chromium.launch({executablePath:process.env.CHROMIUM||"/opt/pw-browsers/chromium"});
  const c=await b.newContext({viewport:{width:390,height:800},permissions:["clipboard-read","clipboard-write"]});
  const p=await c.newPage(); const errs=[]; p.on("pageerror",e=>errs.push(e.message)); p.on("console",m=>{if(m.type()==="error")errs.push(m.text())});
  await p.goto(process.env.URL);
  const res={};
  res.ids=await p.evaluate(()=>new Set(LEVELS.map(levelId)).size===LEVELS.length);
  res.stats0=await p.locator(".stat b").allTextContents();
  // ganar el primer nivel visible escribiendo todas las respuestas
  await p.locator(".lvl").first().click();
  const names=await p.evaluate(()=>LEVELS[state.idx].answers.map(a=>a.n));
  for(const n of names){ await p.fill("#input",n); await p.press("#input","Enter"); }
  res.result=await p.textContent("#resTitle");
  // reportar: simular share
  await p.evaluate(()=>{ window.__shared=null; navigator.share=async d=>{ window.__shared=d.text; }; });
  await p.click("#repBtn"); await p.fill("#repText","prueba"); await p.click("#repSend");
  res.share=await p.evaluate(()=>window.__shared);
  await p.click("#menuBtn");
  res.stats1=await p.locator(".stat b").allTextContents();
  // copia de seguridad: guardar, borrar, recuperar
  await p.click("#mine summary"); await p.click("#bkSave");
  const code=await p.inputValue("#bkText"); res.code=code.length>20?code.slice(0,30)+"...":code;
  await p.evaluate(()=>{ localStorage.clear(); });
  await p.reload();
  res.statsCleared=await p.locator(".stat b").allTextContents();
  await p.click("#mine summary"); await p.click("#bkLoad"); await p.fill("#bkText",code); await p.click("#bkAction");
  res.msg=await p.textContent("#bkMsg");
  res.statsRestored=await p.locator(".stat b").allTextContents();
  await p.fill("#bkText",code.slice(0,-1)+(code.slice(-1)==="a"?"b":"a")); await p.click("#bkAction");
  res.tampered=await p.textContent("#bkMsg");
  // no hay scroll horizontal en movil
  res.hscroll=await p.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth);
  res.errs=errs; console.log(JSON.stringify(res,null,1)); await b.close();
})();
