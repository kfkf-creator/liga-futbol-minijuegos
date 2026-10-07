const {chromium}=require(require("child_process").execSync("npm root -g").toString().trim()+"/playwright");
(async()=>{
  const b=await chromium.launch({executablePath:process.env.CHROMIUM||"/opt/pw-browsers/chromium"});
  const p=await (await b.newContext({viewport:{width:390,height:800}})).newPage();
  const errs=[]; p.on("pageerror",e=>errs.push(e.message)); p.on("console",m=>{if(m.type()==="error")errs.push(m.text())});
  await p.goto(process.env.URL); const r={};
  await p.locator(".lvl").first().click();
  const names=await p.evaluate(()=>LEVELS[state.idx].answers.map(a=>a.n));
  r.lives0=await p.textContent("#progLives");
  await p.click("#hintBtn");
  r.lives1=await p.textContent("#progLives");
  r.hinted=await p.locator(".slot.hinted .name").allTextContents();
  r.expectFirst=names[0][0]; r.fb=await p.textContent("#feedback");
  // acertar la respuesta con pista la quita del estado de pista
  await p.fill("#input",names[0]); await p.press("#input","Enter");
  r.hintedAfter=await p.locator(".slot.hinted").count();
  // segunda pista sobre otra respuesta
  await p.click("#hintBtn"); r.hinted2=await p.locator(".slot.hinted .name").allTextContents();
  // agotar: pedir pistas hasta quedar con 1 vida
  await p.click("#hintBtn"); await p.click("#hintBtn");
  r.lives=await p.textContent("#progLives"); r.disabled=await p.isDisabled("#hintBtn");
  // terminar el nivel: 1 vida => errores 4 => 1 estrella si acierta todo
  for(const n of names){ await p.fill("#input",n); await p.press("#input","Enter"); }
  r.stars=await p.textContent("#resStars"); r.title=await p.textContent("#resTitle");
  r.hintAfterEnd=await p.isDisabled("#hintBtn");
  // pista con 2 vidas y nivel de reintento: una sola pista => 3 estrellas
  await p.click("#retryBtn"); await p.click("#hintBtn");
  for(const n of names){ await p.fill("#input",n); await p.press("#input","Enter"); }
  r.starsOneHint=await p.textContent("#resStars");
  r.errs=errs; console.log(JSON.stringify(r,null,1)); await b.close();
})();
