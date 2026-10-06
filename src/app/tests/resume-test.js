/* Cerrar un reto a medias y reabrirlo continúa donde estabas (no se puede repetir). */
const {chromium}=require(require("child_process").execSync("npm root -g").toString().trim()+"/playwright");
const URL=process.env.URL||"http://localhost:8123/app/index.html";
(async()=>{
 const b=await chromium.launch({executablePath:"/opt/pw-browsers/chromium",args:["--no-sandbox"]});
 const p=await (await b.newContext({viewport:{width:390,height:800}})).newPage();const errs=[];p.on("pageerror",e=>errs.push(String(e)));
 await p.route("**/app/index.html",async r=>{const resp=await r.fetch();let t=await resp.text();t=t.replace(/"supabaseUrl":"[^"]*"/,'"supabaseUrl":""').replace(/"supabaseKey":"[^"]*"/,'"supabaseKey":""');r.fulfill({response:resp,body:t});});
 await p.goto(URL);await p.evaluate(()=>{ADS.secs=0;S.unlock[today()]=true;renderHoy();});const out={};
 /* Más o menos: 3 duelos, cerrar, reabrir */
 await p.click('[data-play="mm"]');
 for(let i=0;i<3;i++){await p.click('.opt[data-o="0"]');await p.click("#go");}
 out.mmBefore=await p.textContent("#gsc");
 await p.click("#gx");
 out.noScoreYet=await p.evaluate(()=>S.days[today()]===undefined);
 await p.click('[data-play="mm"]');
 out.mmAfter=await p.textContent("#gsc");
 /* cerrar justo tras responder (sin pulsar siguiente) */
 await p.click('.opt[data-o="0"]');await p.click("#gx");
 await p.click('[data-play="mm"]');
 out.mmAfterReveal=await p.textContent("#gsc");
 for(let i=0;i<6;i++){await p.click('.opt[data-o="0"]');await p.click("#go");}
 out.mmFinal=await p.textContent(".big");await p.click("#e2");
 /* Once oculto: 2 aciertos + 2 fallos, cerrar, reabrir */
 await p.click('[data-play="once"]');
 const nm=await p.evaluate(()=>lineupOfDay(today()).ans.map(a=>a.n));
 for(const n of nm.slice(0,2)){await p.fill("#gi",n);await p.press("#gi","Enter");}
 for(let i=0;i<2;i++){await p.fill("#gi","zzzzqq"+i);await p.press("#gi","Enter");}
 out.onceBefore=[await p.textContent("#gsc"),await p.evaluate(()=>document.querySelectorAll(".slot.got").length)];
 await p.click("#gx");
 await p.click('[data-play="once"]');
 out.onceAfter=[await p.textContent("#gsc"),await p.evaluate(()=>document.querySelectorAll(".slot.got").length)];
 for(let i=0;i<3;i++){await p.fill("#gi","zzzzqq"+i);await p.press("#gi","Enter");}
 out.onceEnd=await p.textContent(".big");
 out.stored=await p.evaluate(()=>JSON.stringify({d:S.days[today()],prog:S.prog}));
 /* recarga completa de la pagina a mitad de un reto: tambien continua */
 out.errs=errs;console.log(JSON.stringify(out,null,1));await b.close();
})();
