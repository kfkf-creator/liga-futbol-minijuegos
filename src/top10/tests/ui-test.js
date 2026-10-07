const {chromium}=require(require("child_process").execSync("npm root -g").toString().trim()+"/playwright");
(async()=>{
  const b=await chromium.launch({executablePath:process.env.CHROMIUM||"/opt/pw-browsers/chromium"});
  const p=await b.newPage({viewport:{width:900,height:900}});
  const errs=[]; p.on("pageerror",e=>errs.push(e.message)); p.on("console",m=>{if(m.type()==="error")errs.push(m.text())});
  await p.addInitScript(()=>{ try{ localStorage.setItem("top10futbol.revmode","1"); }catch(e){} });
  await p.goto((process.env.URL||"file://"+process.cwd()+"/../../top10/index.html"));
  const cards=await p.locator(".lvl").count();
  await p.click("button.chipbtn:text-is(\"Leyenda\")");
  const legend=await p.locator(".lvl").count();
  await p.click("button.chipbtn:text-is(\"Todas\")");
  await p.click("button.chipbtn:text-is(\"Curiosidades\")");
  const cur=await p.locator(".lvl").count();
  const ci=await p.evaluate(()=>LEVELS.filter(L=>L.cur).findIndex(L=>/asiáticos/.test(L.title)));
  await p.locator(".lvl").nth(ci).click();
  // Curiosidad: escribir "son h" y ver desplegable
  await p.fill("#input","hun");
  const acAfter=await p.locator("#ac li").allTextContents();
  await p.fill("#input","shatsqiqh");
  await p.press("#input","Enter");
  const fb1=await p.textContent("#feedback"), lives1=await p.textContent("#progLives");
  console.log("title",await p.textContent("#title"));
  console.log("fb1",fb1,lives1,await p.locator(".sug").count());
  await p.click(".sug");
  const fb2=await p.textContent("#feedback"), found=await p.textContent("#progFound");
  // desplegable con teclado
  await p.fill("#input","kag");
  await p.press("#input","ArrowDown"); await p.press("#input","Enter");
  const found2=await p.textContent("#progFound");
  // fallo real x5
  for(const w of ["Messi","Xavi","Iniesta","Pedri","Gavi"]){ if(await p.isDisabled("#input")) break; await p.fill("#input",w); await p.press("#input","Enter"); }
  const over=await p.textContent("#resTitle");
  const missed=await p.locator(".slot.missed").count();
  const nextHidden=await p.locator("#nextBtn").isHidden();
  await p.screenshot({path:"shot.png",fullPage:true});
  console.log(JSON.stringify({cards,legend,cur,acAfter,fb1,lives1,fb2,found,found2,over,missed,nextHidden,errs}));
  await b.close();
})();
