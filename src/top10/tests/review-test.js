const {chromium}=require(require("child_process").execSync("npm root -g").toString().trim()+"/playwright");
(async()=>{
  const b=await chromium.launch({executablePath:process.env.CHROMIUM||"/opt/pw-browsers/chromium"});
  const ctx=await b.newContext({viewport:{width:400,height:850},permissions:["clipboard-read","clipboard-write"]});
  const p=await ctx.newPage(); const errs=[]; p.on("pageerror",e=>errs.push(e.message)); const r={};
  await p.goto(process.env.URL); r.noDiffUi=await p.evaluate(()=>({badges:[...document.querySelectorAll(".lvl .badge")].filter(b=>b.textContent).length,row:/Dificultad/.test(document.getElementById("filters").textContent)}));
  r.offByDefault=await p.evaluate(()=>document.getElementById("revBar").hidden);
  await p.goto(process.env.URL+"?revisar=1"); r.bar=await p.evaluate(()=>!document.getElementById("revBar").hidden); r.diffUiInReview=await p.evaluate(()=>({badges:[...document.querySelectorAll(".lvl .badge")].filter(b=>b.textContent).length>100,row:/Dificultad/.test(document.getElementById("filters").textContent)}));
  await p.locator(".lvl").nth(10).click(); r.panel=await p.evaluate(()=>!document.getElementById("revPanel").hidden);
  r.opts=await p.locator("#revPanel .chipbtn").allTextContents();
  await p.click("#revPanel .chipbtn:text-is('Nivel bien')"); await p.click("#revPanel .chipbtn:text-is('Se queda')");
  await p.click("#revNext"); r.next=await p.textContent("#lvlPill"); r.panelAbove=await p.evaluate(()=>{ const pn=document.getElementById("revPanel").getBoundingClientRect().top, inp=document.getElementById("input").getBoundingClientRect().top; return pn<inp; });
  const o2=await p.locator("#revPanel .chipbtn").allTextContents(); r.opts2=o2;
  await p.click("#revPanel .chipbtn:has-text('Subir a')");
  await p.click("#revPanel .chipbtn:text-is('Quitar')"); await p.fill("#revPanel textarea","muy obscuro");
  await p.evaluate(()=>showMenu()); await p.locator(".lvl").nth(100).click();
  await p.click("#revPanel .chipbtn:has-text('Bajar a')"); await p.click("#revPanel .chipbtn:text-is('Comentar')"); await p.fill("#revPanel textarea","hablarlo");
  await p.evaluate(()=>showMenu());
  r.bar2=await p.textContent("#revBar p"); r.marks=await p.locator(".lvl .st").evaluateAll(a=>a.slice(9,13).map(x=>x.textContent));
  r.text=await p.evaluate(()=>revText());
  /* persiste tras recargar y el modo se mantiene sin el parametro */
  await p.goto(process.env.URL); r.persist=await p.evaluate(()=>({bar:!document.getElementById("revBar").hidden,n:Object.keys(JSON.parse(localStorage.getItem("top10futbol.review"))).length}));
  await p.goto(process.env.URL+"?revisar=0"); r.off=await p.evaluate(()=>document.getElementById("revBar").hidden);
  /* sin parametro (app instalada): el boton del menu lo activa */
  await p.evaluate(()=>{ localStorage.removeItem("top10futbol.revmode"); }); await p.goto(process.env.URL);
  r.toggleBefore=await p.textContent("#revToggle"); await p.click("#revToggle"); r.toggleAfter=await p.textContent("#revToggle"); r.barViaToggle=await p.evaluate(()=>!document.getElementById("revBar").hidden);
  r.hscroll=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth); r.errs=errs;
  console.log(JSON.stringify(r,null,1)); await b.close();
  if(errs.length||!r.bar||!r.panel||!r.diffUiInReview.badges||!r.diffUiInReview.row||!r.offByDefault||!r.persist.bar||!r.off||r.persist.n<3||r.noDiffUi.badges||r.noDiffUi.row||!r.barViaToggle) process.exit(1);
})();
