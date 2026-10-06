const {chromium}=require(require("child_process").execSync("npm root -g").toString().trim()+"/playwright");
const URL=process.env.URL||"http://localhost:8123/app/index.html";
(async()=>{
 const b=await chromium.launch({executablePath:"/opt/pw-browsers/chromium",args:["--no-sandbox"]});
 const ctx=await b.newContext({viewport:{width:390,height:800}});
 const p=await ctx.newPage();const errs=[];
 p.on("pageerror",e=>errs.push(String(e)));p.on("console",m=>{if(m.type()==="error"&&!/Failed to load resource|net::/.test(m.text()))errs.push(m.text());});
 const out={};
 await p.route("**/app/index.html",async r=>{const resp=await r.fetch();let t=await resp.text();t=t.replace(/"supabaseUrl":"[^"]*"/,'"supabaseUrl":""').replace(/"supabaseKey":"[^"]*"/,'"supabaseKey":""');r.fulfill({response:resp,body:t});});
 await p.goto(URL);await p.evaluate(()=>{ADS.secs=0;S.unlock[today()]=true;renderHoy();});
 out.title=await p.title();
 out.cards=await p.$$eval("[data-play]",e=>e.length);
 /* Más o menos diario: 10 duelos, siempre la primera opción */
 await p.click('[data-play="mm"]');
 for(let i=0;i<10;i++){await p.click('.opt[data-o="0"]');await p.click("#go");}
 out.mmEnd=await p.textContent(".big");
 const mmExpected=await p.evaluate(()=>S.days[today()].mm);
 out.mmStored=mmExpected;
 await p.click("#e2");
 /* no se puede repetir el diario */
 await p.click('[data-play="mm"]');
 out.mmAgain=await p.textContent(".big");
 await p.click("#gx");
 /* Once oculto diario: acierto 6, fallo 5 */
 await p.click('[data-play="once"]');
 const names=await p.evaluate(()=>{const L=lineupOfDay(today());return {n:L.ans.map(a=>a.n),gk:L.gk,title:L.title};});
 out.lineup=names.title;
 for(const n of names.n.slice(0,6)){await p.fill("#gi",n);await p.press("#gi","Enter");}
 out.found=await p.textContent(".mut + .mut, .pitch + .mut");
 for(let i=0;i<5;i++){await p.fill("#gi","zzzzqq"+i);await p.press("#gi","Enter");}
 out.end=await p.textContent(".big");
 out.onceStored=await p.evaluate(()=>S.days[today()].once);
 await p.click("#e2");
 out.streak=await p.textContent(".streak");
 out.share=await p.evaluate(()=>shareText());
 /* ligas modo local */
 await p.click('#tabs [data-v="ligas"]');
 await p.fill("#al","Marc");await p.click("#al-ok");
 await p.click("#nav-ch");await p.click('[data-ic="star"]');await p.click("#avs");
 await p.fill("#ln","Los cracks");await p.click("#lc");
 await p.waitForSelector("[data-l]");
 await p.click("[data-l]");
 await p.waitForSelector("#bd table");
 out.board=await p.textContent("#bd");
 out.season=await p.evaluate(()=>{
  const t="2026-10-12",R=[];       /* semana 2: Ana, Luis, Marc (+ Eva con 2 dias) */
  const add=(k,al,day,tot,ng)=>R.push({k,alias:al,avatar:"",me:k===3,day,tot,ng});
  const days=["2026-10-12","2026-10-13","2026-10-14"];
  [[1,"Ana",[300,350,380]],[2,"Luis",[320,340,330]],[3,"Marc",[200,250,300]]].forEach(([k,a,v])=>days.forEach((d,i)=>add(k,a,d,v[i],4)));
  add(4,"Eva","2026-10-12",100,2);add(4,"Eva","2026-10-13",150,3);
  const C=seasonCalc(R,1,"2026-10-14");        /* temporada 2 empieza el 2026-11-02: usamos la 0 */
  const C0=seasonCalc(R,0,"2026-10-14");
  return {n1:C.table.length,wk:C0.weeks.length,tab:C0.table.map(m=>m.alias+":"+m.pts+"/"+m.wp+"/"+m.mv),mvp:C0.mvp};
 });
 out.avBoard=(await p.$$("#bd .av")).length;out.avOwner=!!(await p.$("#lav"));
 out.avLeague=await p.evaluate(()=>(LG.sel.avatar||""));
 /* archivo: al dia siguiente, el reto de ayer aparece con sus notas y se puede repetir el que no se jugo */
 await p.evaluate(()=>{delete S.days[today()].once;save();});          /* ayer solo se jugo Más o menos */
 await p.evaluate(()=>{NOW=()=>new Date(2026,9,1,12,0,0);show("juegos");});
 out.archRows=await p.$$eval("[data-arch]",e=>e.map(x=>x.dataset.arch+"="+x.textContent.trim()));
 out.topPill=await p.$eval("a[href*=top10] .pill",e=>e.textContent);
 await p.click('[data-arch="once|2026-09-30"]');
 const nm=await p.evaluate(()=>lineupOfDay("2026-09-30").ans.map(a=>a.n));
 for(const n of nm.slice(0,4)){await p.fill("#gi",n);await p.press("#gi","Enter");}
 for(let i=0;i<5;i++){await p.fill("#gi","zzzzqq"+i);await p.press("#gi","Enter");}
 out.archEnd=await p.textContent(".big");
 await p.click("#e2");
 out.arch=await p.evaluate(()=>JSON.stringify(S.arch));
 out.daysUntouched=await p.evaluate(()=>JSON.stringify(Object.keys(S.days)));
 out.pending=await p.evaluate(()=>S.pending.length);
 await p.click('[data-arch="once|2026-09-30"]');
 out.archAgain=await p.textContent(".big");
 await p.click("#dcl");
 out.noPractice=await p.$$eval("[data-prac]",e=>e.length);
 out.hscroll=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
 out.errs=errs;
 console.log(JSON.stringify(out,null,1));
 await b.close();
})();
