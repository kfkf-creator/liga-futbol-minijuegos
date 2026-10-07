const {chromium}=require(require("child_process").execSync("npm root -g").toString().trim()+"/playwright");
(async()=>{
  const b=await chromium.launch({executablePath:process.env.CHROMIUM||"/opt/pw-browsers/chromium"});
  const ctx=await b.newContext({viewport:{width:400,height:850},permissions:["clipboard-read","clipboard-write"]});
  const p=await ctx.newPage(); const errs=[]; p.on("pageerror",e=>errs.push(e.message)); const r={};
  await p.goto(process.env.URL); r.offByDefault=await p.evaluate(()=>document.getElementById("revBar").hidden);
  await p.goto(process.env.URL+"?revisar=1"); r.bar=await p.evaluate(()=>!document.getElementById("revBar").hidden);
  await p.click("#revBar .btn.primary"); r.panel=await p.evaluate(()=>!document.getElementById("revPanel").hidden);
  r.noCategories=await p.evaluate(()=>!/Fácil|Medio|Difícil|Leyenda/.test(document.getElementById("revPanel").textContent.split("Dificultad")[0])&&["diffPill","typePill","tagPill"].every(id=>document.getElementById(id).hidden));
  r.rows1=await p.locator("#revPanel .chipbtn").allTextContents();
  /* no me gusta: no pide dificultad */
  await p.click("#revPanel .chipbtn:text-is('No me gusta')"); r.rowsNo=await p.locator("#revPanel .chipbtn").allTextContents();
  await p.fill("#revPanel textarea","demasiado rebuscado");
  r.pend1=await p.textContent("#revNextPending"); await p.click("#revNextPending");
  /* me gusta: pide dificultad; sin ella queda a medias */
  await p.click("#revPanel .chipbtn:text-is('Me gusta')"); r.rowsSi=await p.locator("#revPanel .chipbtn").allTextContents(); r.statusMedias=await p.evaluate(()=>document.querySelector("#revPanel .hint[aria-live]").textContent);
  await p.click("#revPanel .chipbtn:text-is('Difícil')"); r.statusOk=await p.evaluate(()=>document.querySelector("#revPanel .hint[aria-live]").textContent);
  await p.click("#revNext");
  await p.click("#revPanel .chipbtn:text-is('Indiferente')"); await p.click("#revPanel .chipbtn:text-is('Fácil')");
  await p.evaluate(()=>showMenu());
  r.bar2=await p.textContent("#revBar p"); r.classes=await p.evaluate(()=>[...document.querySelectorAll(".lvl")].slice(0,4).map(x=>x.className));
  r.text=await p.evaluate(()=>revText());
  r.data=JSON.parse(r.text.split("DATOS\n")[1]);
  await p.goto(process.env.URL); r.persist=await p.evaluate(()=>({bar:!document.getElementById("revBar").hidden,n:Object.keys(JSON.parse(localStorage.getItem("top10futbol.review2"))).length}));
  await p.evaluate(()=>{ localStorage.removeItem("top10futbol.revmode"); }); await p.goto(process.env.URL);
  r.toggleBefore=await p.textContent("#revToggle"); await p.click("#revToggle"); r.barViaToggle=await p.evaluate(()=>!document.getElementById("revBar").hidden);
  await p.goto(process.env.URL+"?revisar=0"); r.off=await p.evaluate(()=>document.getElementById("revBar").hidden);
  r.hscroll=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth); r.errs=errs;
  console.log(JSON.stringify(r,null,1)); await b.close();
  const d=Object.values(r.data);
  if(errs.length||!r.offByDefault||!r.bar||!r.panel||!r.noCategories||r.rowsNo.includes("Fácil")||!r.rowsSi.includes("Fácil")||d.length!==3||!d.some(x=>x[0]==="no"&&!x[1]&&x[2])||!d.some(x=>x[0]==="si"&&x[1]==="dificil")||!d.some(x=>x[0]==="ind"&&x[1]==="facil")||!r.persist.bar||r.persist.n<3||!r.barViaToggle||!r.off||r.hscroll) process.exit(1);
})();
