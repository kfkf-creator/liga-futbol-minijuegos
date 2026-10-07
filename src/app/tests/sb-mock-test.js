/* Comprueba la capa Supabase contra un servidor simulado (forma de las peticiones, cabeceras y flujo). */
const {chromium}=require(require("child_process").execSync("npm root -g").toString().trim()+"/playwright");
const URL=process.env.URL||"http://localhost:8123/app/index.html";
const MOCK="https://mock.supabase.test";
(async()=>{
 const b=await chromium.launch({executablePath:process.env.CHROMIUM||"/opt/pw-browsers/chromium",args:["--no-sandbox"]});
 const p=await (await b.newContext({viewport:{width:390,height:800}})).newPage();
 const errs=[],calls=[];
 p.on("pageerror",e=>errs.push(String(e)));
 let leagues=[];
 await p.route(MOCK+"/**",async r=>{
  const q=r.request(),u=new globalThis.URL(q.url()),path=u.pathname;
  calls.push({m:q.method(),path,auth:q.headers()["authorization"]||"",key:q.headers()["apikey"]||"",body:q.postData()||""});
  const j=o=>r.fulfill({status:200,contentType:"application/json",headers:{"access-control-allow-origin":"*"},body:JSON.stringify(o)});
  if(q.method()==="OPTIONS")return r.fulfill({status:204,headers:{"access-control-allow-origin":"*","access-control-allow-headers":"*","access-control-allow-methods":"*"}});
  if(path==="/auth/v1/signup")return j({access_token:"tok1",refresh_token:"ref1",expires_in:3600});
  if(path==="/rest/v1/rpc/set_alias")return r.fulfill({status:204,headers:{"access-control-allow-origin":"*"}});
  if(path==="/rest/v1/rpc/create_league"){const l={id:"uuid-1",code:"ABC123",name:JSON.parse(q.postData()).p_name};leagues=[l];return j(l);}
  if(path==="/rest/v1/rpc/my_leagues")return j(leagues);
  if(path==="/rest/v1/rpc/league_board")return j([{alias:"Marc",mm:80,once:60,total:140},{alias:"Ana",mm:90,once:70,total:160}]);
  if(path==="/rest/v1/rpc/league_days")return j([{k:1,alias:"Marc",avatar:"",me:true,day:"2026-10-06",tot:140,ng:4},{k:2,alias:"Ana",avatar:"p:star:2",me:false,day:"2026-10-06",tot:210,ng:4}]);
  if(path==="/rest/v1/rpc/submit_score")return r.fulfill({status:204,headers:{"access-control-allow-origin":"*"}});
  r.fulfill({status:404,body:"{}"});
 });
 /* misma pagina pero con el servidor simulado configurado */
 await p.route("**/app/index.html",async r=>{
  const resp=await r.fetch();let t=await resp.text();
  t=t.replace(/"supabaseUrl":"[^"]*"/,'"supabaseUrl":"'+MOCK+'"').replace(/"supabaseKey":"[^"]*"/,'"supabaseKey":"anon-key"');
  r.fulfill({response:resp,body:t});
 });
 await p.goto(URL);await p.evaluate(()=>{ADS.secs=0;S.unlock[today()]=true;renderHoy();});
 await p.click('[data-play="mm"]');
 for(let i=0;i<10;i++){await p.click('.opt[data-o="0"]');await p.click("#go");}
 await p.click("#e2");
 await p.click('#tabs [data-v="ligas"]');
 await p.fill("#al","Marc");await p.click("#al-ok");
 await p.waitForSelector("#ln");
 await p.fill("#ln","Los cracks");await p.click("#lc");
 await p.waitForSelector("[data-l]");
 await p.click("[data-l]");
 await p.waitForSelector("#bd table");
 const rows=await p.$$eval("#bd tr",e=>e.map(x=>x.textContent));
 await p.waitForTimeout(300);
 const submit=calls.filter(c=>c.path.endsWith("submit_score"));
 const out={rows,
  signup:calls.filter(c=>c.path==="/auth/v1/signup").length,
  submitBody:submit.map(c=>c.body),
  submitAuth:submit.map(c=>c.auth+"|"+c.key),
  pending:await p.evaluate(()=>S.pending.length),
  errs};
 console.log(JSON.stringify(out,null,1));
 await b.close();
})();
