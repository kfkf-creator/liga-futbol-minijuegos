/* Racha, medallas, comodines y copia de seguridad. */
const {chromium}=require(require("child_process").execSync("npm root -g").toString().trim()+"/playwright");
const URL=process.env.URL||"http://localhost:8123/app/index.html";
(async()=>{
 const b=await chromium.launch({executablePath:"/opt/pw-browsers/chromium",args:["--no-sandbox"]});
 const p=await (await b.newContext({viewport:{width:390,height:800}})).newPage();const errs=[];p.on("pageerror",e=>errs.push(String(e)));
 await p.route("**/app/index.html",async r=>{const resp=await r.fetch();let t=await resp.text();t=t.replace(/"supabaseUrl":"[^"]*"/,'"supabaseUrl":""').replace(/"supabaseKey":"[^"]*"/,'"supabaseKey":""');r.fulfill({response:resp,body:t});});
 await p.goto(URL);await p.evaluate(()=>{ADS.secs=0;S.unlock[today()]=true;renderHoy();});const out={};
 await p.evaluate(()=>{NOW=()=>new Date(2026,9,20,12,0,0);});
 /* racha: 7 dias seguidos con un obligatorio cada dia */
 out.streak=await p.evaluate(()=>{
  const t=today(),n=dayNum(t);
  for(let i=0;i<7;i++){const d=dstrUTC(n-i);S.days[d]={[requiredOf(d)[0]]:60};}
  S.days[dstrUTC(n-8)]={[requiredOf(dstrUTC(n-8))[0]]:60};          /* hueco el dia n-7: no cuenta */
  checkStreak();
  return {streak:streak(),medals:Object.keys(S.medals).sort(),tokens:S.tokens};
 });
 /* un dia con solo opcionales no cuenta */
 out.optOnly=await p.evaluate(()=>{const d=dstrUTC(dayNum(today())-3);const opt=GAMES.map(g=>g.id).find(id=>!requiredOf(d).includes(id));S.days[d]={[opt]:80};return streak();});
 /* comodin de pista y de vida en Trayectoria */
 await p.evaluate(()=>{S.tokens={hint:1,life:1};save();delete S.days[today()];});
 await p.evaluate(()=>startGame("tray",today()));
 out.hintBtn=await p.$("#th")!==null;
 const c0=await p.$$eval("#gb .tli",e=>e.length);
 await p.click("#th");
 out.hintExtra=(await p.$$eval("#gb .tli",e=>e.length))-c0;
 out.hintLeft=await p.evaluate(()=>tokN("hint"));
 out.noLifeYet=await p.$("#tl")===null;
 for(let i=0;i<2;i++){await p.fill("#gi","zzzzqq"+i);await p.press("#gi","Enter");}
 out.lifeBtn=await p.$("#tl")!==null;
 await p.click("#tl");
 out.lifeLeft=await p.evaluate(()=>tokN("life"));
 await p.fill("#gi","zzzzqq9");await p.press("#gi","Enter");
 out.stillPlaying=await p.$("#gi")!==null;           /* con el comodin, 3 fallos no terminan */
 await p.fill("#gi","zzzzqq8");await p.press("#gi","Enter");
 out.endsAt4=await p.textContent(".big");
 /* copia de seguridad */
 out.backup=await p.evaluate(()=>{const c=backupCode();const keep=JSON.stringify(S.medals);S.days={};S.medals={};S.tokens={hint:0,life:0};restoreCode(c);return {ok:JSON.stringify(S.medals)===keep,days:Object.keys(S.days).length,badCode:(()=>{try{restoreCode("x");return false;}catch(e){return e.message;}})()};});
 await p.evaluate(()=>{show("perfil");});
 out.perfil=await p.$eval("#v-perfil",e=>/Racha y premios/.test(e.innerText));
 out.errs=errs;
 console.log(JSON.stringify(out,null,1));await b.close();
})();
