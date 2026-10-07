const {chromium}=require(require("child_process").execSync("npm root -g").toString().trim()+"/playwright");
(async()=>{
  const b=await chromium.launch({executablePath:process.env.CHROMIUM||"/opt/pw-browsers/chromium"});
  const ctx=await b.newContext({viewport:{width:420,height:900},permissions:["clipboard-read","clipboard-write"]});
  const p=await ctx.newPage(); const errs=[]; p.on("pageerror",e=>errs.push(e.message));
  await p.goto(process.env.URL); const r={};
  await p.locator(".lvl").first().click();
  await p.evaluate(()=>{ window.__shared=null; navigator.share=async d=>{ window.__shared={text:d.text,files:d.files?d.files.length:0}; }; navigator.canShare=d=>!!d.files; });
  await p.evaluate(()=>{ const L=LEVELS[state.idx]; for(let i=0;i<L.answers.length;i++) submitGuess(L.answers[i].n); });
  r.over=await p.evaluate(()=>state.over&&state.won);
  await p.click("#shareBtn"); await p.waitForTimeout(500);
  r.shared=await p.evaluate(()=>window.__shared);
  r.noSpoiler=await p.evaluate(()=>{ const t=window.__shared.text; return !LEVELS[state.idx].answers.some(a=>t.includes(a.n)); });
  // sin share: copia al portapapeles
  await p.evaluate(()=>{ navigator.share=undefined; navigator.canShare=undefined; });
  await p.click("#shareBtn"); await p.waitForTimeout(300);
  r.msg=await p.textContent("#shareMsg");
  r.clip=(await p.evaluate(()=>navigator.clipboard.readText())).split("\n").length;
  r.hscroll=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
  r.errs=errs; console.log(JSON.stringify(r)); await b.close();
})();
