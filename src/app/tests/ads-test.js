/* Capa de recompensas: opcionales, archivo, racha en peligro, orden correcto y tope diario. */
const {chromium}=require(require("child_process").execSync("npm root -g").toString().trim()+"/playwright");
const URL=process.env.URL||"http://localhost:8123/app/index.html";
(async()=>{
 const b=await chromium.launch({executablePath:"/opt/pw-browsers/chromium",args:["--no-sandbox"]});
 const p=await (await b.newContext({viewport:{width:390,height:800}})).newPage();const errs=[];p.on("pageerror",e=>errs.push(String(e)));
 await p.route("**/app/index.html",async r=>{const resp=await r.fetch();let t=await resp.text();t=t.replace(/"supabaseUrl":"[^"]*"/,'"supabaseUrl":""').replace(/"supabaseKey":"[^"]*"/,'"supabaseKey":""');r.fulfill({response:resp,body:t});});
 await p.goto(URL);const out={};
 await p.evaluate(()=>{ADS.secs=0;NOW=()=>new Date(2026,9,20,12,0,0);show("hoy");});
 /* opcionales bloqueados -> video -> desbloqueados */
 out.locked=[await p.$("#unl")!==null,(await p.$$("[data-play]")).length];
 await p.click("#unl");await p.waitForSelector("[data-play]:nth-of-type(5)");
 out.unlocked=(await p.$$("[data-play]")).length;
 /* racha en peligro */
 await p.evaluate(()=>{const n=dayNum(today());S.days={};for(let i=2;i<7;i++){const d=dstrUTC(n-i);S.days[d]={[requiredOf(d)[0]]:50};}show("hoy");});
 out.rescue=await p.$("#resc")!==null;
 out.before=await p.evaluate(()=>streak());
 await p.click("#resc");await p.waitForTimeout(200);
 out.after=await p.evaluate(()=>streak());
 out.rescueGone=await p.$("#resc")===null;
 /* archivo: pide video, queda pagado */
 out.arch=await p.evaluate(async()=>{ADS.secs=0;const k="mm|2026-10-06";const before=Rewards.state().n;
   const ok=await Rewards.request("x");return {ok,n:Rewards.state().n-before};});
 /* tope diario */
 out.cap=await p.evaluate(async()=>{for(let i=0;i<10;i++)await Rewards.request("x");return {left:Rewards.left(),denied:!(await Rewards.request("x"))};});
 /* orden correcto en Linea del tiempo */
 await p.evaluate(()=>{S.ads=null;S.days={};startGame("line",today());});
 await p.click("#sub");await p.waitForSelector("#solb");
 await p.click("#solb");await p.waitForSelector("#sol .tli");
 out.solRows=(await p.$$("#sol .tli")).length;
 out.errs=errs;console.log(JSON.stringify(out,null,1));await b.close();
})();
