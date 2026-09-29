const {chromium}=require(require("child_process").execSync("npm root -g").toString().trim()+"/playwright");
(async()=>{
  const b=await chromium.launch({executablePath:"/opt/pw-browsers/chromium"});
  const c=await b.newContext(); const p=await c.newPage();
  await p.goto(process.env.URL);
  await p.evaluate(()=>{localStorage.clear();localStorage.setItem("top10futbol.v2",JSON.stringify({done:{1:3,68:2}}));});
  await p.reload();
  const r=await p.evaluate(()=>({l1:LEVELS.find(L=>L.oid===1).id,l68:LEVELS.find(L=>L.oid===68).id,done:progress.done,diffs:LEVELS.map(L=>L.diff[0]).join("").replace(/(.)\1+/g,"$1")}));
  console.log(JSON.stringify(r));
  const ok=r.done[r.l1]===3&&r.done[r.l68]===2&&Object.keys(r.done).length===2;
  console.log(ok?"MIGRACION OK":"MIGRACION FALLA"); await b.close();
})();
