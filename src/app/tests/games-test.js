/* Recorre los 6 juegos nuevos: acierto en el reto de hoy y otro camino en el archivo. */
const {chromium}=require(require("child_process").execSync("npm root -g").toString().trim()+"/playwright");
const URL=process.env.URL||"http://localhost:8123/app/index.html";
(async()=>{
 const b=await chromium.launch({executablePath:process.env.CHROMIUM||"/opt/pw-browsers/chromium",args:["--no-sandbox"]});
 const p=await (await b.newContext({viewport:{width:390,height:800}})).newPage();const errs=[];p.on("pageerror",e=>errs.push(String(e)));
 await p.route("**/app/index.html",async r=>{const resp=await r.fetch();let t=await resp.text();t=t.replace(/"supabaseUrl":"[^"]*"/,'"supabaseUrl":""').replace(/"supabaseKey":"[^"]*"/,'"supabaseKey":""');r.fulfill({response:resp,body:t});});
 await p.goto(URL);await p.evaluate(()=>{ADS.secs=0;S.unlock[today()]=true;renderHoy();});const out={};
 out.cards=await p.$$eval("[data-play]",e=>e.length);
 const big=async()=>[await p.$eval(".big",e=>e.previousElementSibling.textContent),await p.textContent(".big")];
 /* Trayectoria: acierto directo */
 await p.click('[data-play="tray"]');
 const tn=await p.evaluate(()=>chunkOfDay(DATA.TRAY,1,today())[0].n);
 await p.fill("#gi",tn.toLowerCase());await p.press("#gi","Enter");
 out.tray=[tn,...await big()];await p.click("#e2");
 /* Trayectoria: 3 fallos (archivo de ayer) */
 await p.evaluate(()=>{NOW=()=>new Date(2026,9,1,12,0,0);});
 await p.evaluate(()=>startGame("tray","2026-09-29"));
 for(let i=0;i<3;i++){await p.fill("#gi","zzqq"+i);await p.press("#gi","Enter");}
 out.trayFail=await big();await p.click("#e2");
 await p.evaluate(()=>{NOW=()=>new Date(2026,8,30,12,0,0);S.unlock[today()]=true;});
 /* Jugador misterioso: dos fallos y acierto */
 await p.evaluate(()=>{show("hoy")});
 await p.click('[data-play="mist"]');
 const mt=await p.evaluate(()=>{const pool=DATA.MIST.players.filter(x=>x.fame>=3);const T=chunkOfDay(pool,1,today())[0];return {t:T.n,other:DATA.MIST.players.filter(x=>x.n!==T.n).slice(0,2).map(x=>x.n)};});
 for(const n of mt.other){await p.fill("#gi",n);await p.press("#gi","Enter");}
 out.mistRows=await p.$$eval(".mrow",e=>e.length);
 await p.fill("#gi",mt.t);await p.press("#gi","Enter");
 out.mist=[mt.t,...await big()];await p.click("#e2");
 /* Línea del tiempo: en orden */
 await p.click('[data-play="line"]');
 const order=await p.evaluate(()=>{const its=chunkOfDay(DATA.LINE,1,today())[0].items;return its.slice().sort((a,b)=>a.y-b.y).map(i=>i.t);});
 for(let i=0;i<order.length;i++){
   for(let guard=0;guard<10;guard++){
     const cur=await p.$$eval(".tli span",els=>els.map(e=>e.textContent));
     const at=cur.indexOf(order[i]);if(at<=i)break;
     await p.click(`[data-m="${at}|-1"]`);
   }
 }
 await p.click("#sub");
 out.line=await big();await p.click("#e2");
 /* Verdadero o falso */
 await p.click('[data-play="vf"]');
 for(let i=0;i<10;i++){await p.click('.opt[data-o="0"]');await p.click("#go");}
 out.vf=await big();
 const m=out.vf[0].match(/acertado (\d+) de 10 · bonus de velocidad \+(\d+)/);out.vfOk=m&&+out.vf[1].split("/")[0]===9*(+m[1])+(+m[2]);await p.click("#e2");
 /* El intruso: acierto siempre */
 await p.click('[data-play="odd"]');
 const odds=await p.evaluate(()=>chunkOfDay(DATA.ODD,10,today()).map(x=>x.odd));
 for(let i=0;i<10;i++){await p.click(`.opt[data-o="${odds[i]}"]`);await p.click("#go");}
 out.odd=await big();await p.click("#e2");
 /* Conexiones: 4 grupos */
 await p.click('[data-play="con"]');
 const groups=await p.evaluate(()=>chunkOfDay(DATA.CON,1,today())[0].groups.map(g=>g.items));
 for(let gi=0;gi<4;gi++){for(const t of groups[gi]){await p.click(`.tile:text-is("${t.replace(/"/g,'\\"')}")`);}await p.click("#cok");}
 out.con=await big();await p.click("#e2");
 out.today=await p.evaluate(()=>JSON.stringify(S.days[today()]));
 out.hoyTotal=await p.evaluate(()=>{show("hoy");return "Total de hoy: "+document.querySelector("#v-hoy .board .bt b").textContent+"/800";});
 out.hscroll=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
 out.errs=errs;console.log(JSON.stringify(out,null,1));await b.close();
})();
