/* Cuenta atrás y bonus de velocidad en los retos del día. */
const {chromium}=require(require("child_process").execSync("npm root -g").toString().trim()+"/playwright");
const URL=process.env.URL||"http://localhost:8123/app/index.html";
(async()=>{
 const b=await chromium.launch({executablePath:"/opt/pw-browsers/chromium",args:["--no-sandbox"]});
 const p=await (await b.newContext({viewport:{width:390,height:800}})).newPage();const errs=[];p.on("pageerror",e=>errs.push(String(e)));
 await p.route("**/app/index.html",async r=>{const resp=await r.fetch();let t=await resp.text();t=t.replace(/"supabaseUrl":"[^"]*"/,'"supabaseUrl":""').replace(/"supabaseKey":"[^"]*"/,'"supabaseKey":""');r.fulfill({response:resp,body:t});});
 await p.goto(URL);const out={};
 /* MM rápido: 10 duelos seguidos */
 await p.click('[data-play="mm"]');
 out.hud=await p.textContent("#gsc");
 for(let i=0;i<10;i++){await p.click('.opt[data-o="0"]');await p.click("#go");}
 const t=await p.textContent(".mut");
 out.mmLine=await p.$eval(".big",e=>e.previousElementSibling.textContent);
 const m=out.mmLine.match(/acertado (\d+) de 10 · bonus de velocidad \+(\d+)/);
 const score=+((await p.textContent(".big")).split("/")[0]);
 out.mmFormulaOk=m&&score===9*(+m[1])+(+m[2]);
 out.mmBonusMax=m?(+m[2])<=(+m[1]):false;
 await p.click("#e2");
 /* MM con tiempo agotado: 3 duelos y luego 200 s después (movemos t0) */
 await p.evaluate(()=>{delete S.days[today()].mm;save();});
 await p.click('[data-play="mm"]');
 for(let i=0;i<3;i++){await p.click('.opt[data-o="0"]');await p.click("#go");}
 await p.evaluate(()=>{const k=today()+"|mm";S.prog[k].t0-=200000;save();});
 await p.click("#gx");
 await p.click('[data-play="mm"]');
 out.mmTimeout=await p.$eval(".big",e=>e.previousElementSibling.textContent);
 const sc=+((await p.textContent(".big")).split("/")[0]);
 const h=+out.mmTimeout.match(/acertado (\d+)/)[1];
 out.mmTimeoutScore=[sc,h*9,sc===h*9];
 await p.click("#e2");
 /* Once: 5 aciertos y tiempo agotado al reabrir */
 await p.click('[data-play="once"]');
 out.onceHud=await p.textContent("#gsc");
 const nm=await p.evaluate(()=>lineupOfDay(today()).ans.map(a=>a.n));
 for(const n of nm.slice(0,5)){await p.fill("#gi",n);await p.press("#gi","Enter");}
 await p.evaluate(()=>{S.prog[today()+"|once"].t0-=600000;save();});
 await p.click("#gx");
 await p.click('[data-play="once"]');
 out.onceTimeout=[await p.$eval(".big",e=>e.previousElementSibling.textContent),await p.textContent(".big")];
 await p.click("#e2");
 /* Once completo rápido: 10/10 con bonus */
 await p.evaluate(()=>{delete S.days[today()].once;save();});
 await p.click('[data-play="once"]');
 for(const n of nm){await p.fill("#gi",n);await p.press("#gi","Enter");}
 out.onceFull=[await p.$eval(".big",e=>e.previousElementSibling.textContent),await p.textContent(".big")];
 await p.click("#e2");
 /* archivo sin reloj */
 await p.evaluate(()=>{NOW=()=>new Date(2026,9,2,12,0,0);show("juegos");});
 await p.click('[data-arch="mm|2026-10-01"]');
 out.archHud=await p.textContent("#gsc");
 out.archTimer=await p.evaluate(()=>TIMER===null);
 for(let i=0;i<10;i++){await p.click('.opt[data-o="0"]');await p.click("#go");}
 out.archEnd=[await p.$eval(".big",e=>e.previousElementSibling.textContent),await p.textContent(".big")];
 out.errs=errs;console.log(JSON.stringify(out,null,1));await b.close();
})();
