/* Cuentas por correo contra un servidor simulado: crear cuenta, iniciar sesion y sincronizar progreso. */
const {chromium}=require(require("child_process").execSync("npm root -g").toString().trim()+"/playwright");
const URL=process.env.URL||"http://localhost:8123/app/index.html";
const MOCK="https://mock.supabase.test";
(async()=>{
 const b=await chromium.launch({executablePath:process.env.CHROMIUM||"/opt/pw-browsers/chromium",args:["--no-sandbox"]});
 const p=await (await b.newContext({viewport:{width:390,height:800}})).newPage();
 const errs=[],calls=[];let cloud=null;
 p.on("pageerror",e=>errs.push(String(e)));
 await p.route(MOCK+"/**",async r=>{
  const q=r.request(),u=new globalThis.URL(q.url()),path=u.pathname;
  const body=q.postData()?JSON.parse(q.postData()):{};
  calls.push({m:q.method(),path,body});
  const j=o=>r.fulfill({status:200,contentType:"application/json",headers:{"access-control-allow-origin":"*"},body:JSON.stringify(o)});
  if(q.method()==="OPTIONS")return r.fulfill({status:204,headers:{"access-control-allow-origin":"*","access-control-allow-headers":"*","access-control-allow-methods":"*"}});
  if(path==="/auth/v1/signup")return j({access_token:"anon",refresh_token:"r0",expires_in:3600});
  if(path==="/auth/v1/user"&&q.method()==="GET")return j({id:"u1",email:calls.some(c=>c.path==="/auth/v1/verify")?"marc@test.com":"",is_anonymous:!calls.some(c=>c.path==="/auth/v1/verify")});
  if(path==="/auth/v1/user"&&q.method()==="PUT")return j({id:"u1"});
  if(path==="/auth/v1/otp")return j({});
  if(path==="/auth/v1/verify")return body.token==="123456"?j({access_token:"acct",refresh_token:"r1",expires_in:3600}):r.fulfill({status:403,contentType:"application/json",headers:{"access-control-allow-origin":"*"},body:JSON.stringify({msg:"Token has expired or is invalid"})});
  if(path==="/rest/v1/rpc/save_progress"){cloud=body.p_data;return r.fulfill({status:204,headers:{"access-control-allow-origin":"*"}});}
  if(path==="/rest/v1/rpc/load_progress")return j(cloud);
  if(path==="/rest/v1/rpc/my_leagues")return j([]);
  r.fulfill({status:404,headers:{"access-control-allow-origin":"*"},body:"{}"});
 });
 await p.route("**/app/index.html",async r=>{
  const resp=await r.fetch();let t=await resp.text();
  t=t.replace(/"supabaseUrl":"[^"]*"/,'"supabaseUrl":"'+MOCK+'"').replace(/"supabaseKey":"[^"]*"/,'"supabaseKey":"anon-key"');
  r.fulfill({response:resp,body:t});
 });
 await p.goto(URL);const out={};
 await p.evaluate(()=>{S.alias="Marc";S.days["2026-10-01"]={mm:70};S.medals.streak3={t:"streak",n:3,name:"x",day:"2026-10-03"};save();show("perfil");});
 out.hasCard=await p.$("#acc-new")!==null;
 /* crear cuenta */
 await p.click("#acc-new");await p.fill("#acc-mail","marc@test.com");await p.click("#acc-send");await p.waitForSelector("#acc-code");
 await p.fill("#acc-code","000000");await p.click("#acc-ok");await p.waitForTimeout(300);
 out.badCode=await p.$("#acc-code")!==null;                 /* sigue pidiendo codigo */
 await p.fill("#acc-code","123456");await p.click("#acc-ok");await p.waitForSelector("#acc-sync");
 out.account=await p.evaluate(()=>S.account);
 out.cloudDays=cloud&&Object.keys(cloud.days);out.cloudMedal=cloud&&Object.keys(cloud.medals);
 out.verifyType=calls.find(c=>c.path==="/auth/v1/verify").body.type;
 /* otro movil: estado vacio, inicia sesion y recupera */
 await p.evaluate(()=>{S.days={};S.medals={};S.account=null;S.alias="";save();ACC={mode:"",email:"",sent:false};renderPerfil();});
 await p.click("#acc-old");await p.fill("#acc-mail","marc@test.com");await p.click("#acc-send");await p.waitForSelector("#acc-code");
 await p.fill("#acc-code","123456");await p.click("#acc-ok");await p.waitForSelector("#acc-sync");
 out.restored=await p.evaluate(()=>({days:Object.keys(S.days),medals:Object.keys(S.medals),alias:S.alias}));
 out.otpBody=calls.find(c=>c.path==="/auth/v1/otp").body;
 out.errs=errs;console.log(JSON.stringify(out,null,1));await b.close();
})();
