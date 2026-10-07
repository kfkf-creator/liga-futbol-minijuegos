/* El codigo de copia de seguridad conserva dias salvados, archivos pagados y fecha del ultimo salvado. */
const {chromium}=require(require("child_process").execSync("npm root -g").toString().trim()+"/playwright");
const URL=process.env.URL||"http://localhost:8123/app/index.html";
(async()=>{
 const b=await chromium.launch({executablePath:process.env.CHROMIUM||"/opt/pw-browsers/chromium",args:["--no-sandbox"]});
 const p=await(await b.newContext({viewport:{width:390,height:800}})).newPage();const errs=[];
 p.on("pageerror",e=>errs.push(String(e)));p.on("console",m=>{if(m.type()==="error"&&!/Failed to load resource|net::/.test(m.text()))errs.push(m.text());});
 await p.goto(URL);
 const out=await p.evaluate(()=>{
  S.days["2026-10-01"]={mm:70};S.saved={"2026-10-02":true};S.paid={"2026-09-30|mm":true};S.lastSave="2026-10-03";S.tokens={hint:1,life:2};
  const code=backupCode();
  S.days={};S.saved={};S.paid={};S.lastSave="";S.tokens={hint:0,life:0};
  restoreCode(code);
  return {days:S.days["2026-10-01"]&&S.days["2026-10-01"].mm,saved:!!(S.saved&&S.saved["2026-10-02"]),paid:!!(S.paid&&S.paid["2026-09-30|mm"]),lastSave:S.lastSave,hint:S.tokens.hint,life:S.tokens.life};
 });
 out.ok=out.days===70&&out.saved&&out.paid&&out.lastSave==="2026-10-03"&&out.hint===1&&out.life===2;
 out.errs=errs;if(!out.ok)out.errs.push("backup-test: la copia de seguridad pierde datos");
 console.log(JSON.stringify(out,null,1));await b.close();
})();
