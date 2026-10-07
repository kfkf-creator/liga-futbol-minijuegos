/* La llama de Hoy abre el panel de racha: escalera completa, siguiente premio marcado y cierre con X, fondo y Escape. */
const {chromium}=require(require("child_process").execSync("npm root -g").toString().trim()+"/playwright");
const URL=process.env.URL||"http://localhost:8123/app/index.html";
(async()=>{
 const b=await chromium.launch({executablePath:process.env.CHROMIUM||"/opt/pw-browsers/chromium",args:["--no-sandbox"]});
 const p=await(await b.newContext({viewport:{width:390,height:800}})).newPage();const errs=[];
 p.on("pageerror",e=>errs.push(String(e)));p.on("console",m=>{if(m.type()==="error"&&!/Failed to load resource|net::/.test(m.text()))errs.push(m.text());});
 await p.goto(URL);
 await p.evaluate(()=>{ADS.secs=0;S.seen=true;const n=dayNum(today());for(let i=1;i<=9;i++){const d=dstrUTC(n-i);S.days[d]={[requiredOf(d)[0]]:70};}checkStreak();renderHoy();});
 const out={};
 await p.click("#stk");
 out.abierto=!!await p.$(".sheet");
 out.filas=await p.$$eval(".sheet .lad",e=>e.length);
 out.esperadas=await p.evaluate(()=>LADDER.length);
 out.hechos=await p.$$eval(".sheet .lad.done",e=>e.length);
 out.siguiente=await p.$eval(".sheet .lad.next .n",e=>e.textContent).catch(()=>null);
 out.texto=await p.$eval(".sheet .stkb b",e=>e.textContent);
 await p.click("#skx");out.cierraX=!await p.$(".sheet");
 await p.click("#stk");await p.mouse.click(5,5);out.cierraFondo=!await p.$(".sheet");
 await p.click("#stk");await p.keyboard.press("Escape");out.cierraEsc=!await p.$(".sheet");
 out.ok=out.abierto&&out.filas===out.esperadas&&out.hechos===2&&out.siguiente==="10 días"&&out.texto==="9"&&out.cierraX&&out.cierraFondo&&out.cierraEsc;
 out.errs=errs;if(!out.ok)out.errs.push("streak-test: panel de racha incorrecto");
 console.log(JSON.stringify(out,null,1));await b.close();
})();
