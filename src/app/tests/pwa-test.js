const {chromium}=require(require("child_process").execSync("npm root -g").toString().trim()+"/playwright");
const URL=process.env.URL||"http://localhost:8123/app/index.html";
(async()=>{
 const b=await chromium.launch({executablePath:process.env.CHROMIUM||"/opt/pw-browsers/chromium",args:["--no-sandbox"]});
 const ctx=await b.newContext({viewport:{width:390,height:800},serviceWorkers:"allow"});
 const p=await ctx.newPage();const errs=[];p.on("pageerror",e=>errs.push(String(e)));
 const out={};
 await p.goto(URL);
 out.manifestLink=await p.$eval('link[rel=manifest]',e=>e.getAttribute("href"));
 const man=await p.evaluate(async()=>{const r=await fetch("manifest.webmanifest");return r.json();});
 out.manifest={name:man.name,scope:man.scope,icons:man.icons.length};
 await p.evaluate(()=>navigator.serviceWorker.ready.then(()=>1));
 await p.reload();await p.waitForTimeout(500);
 out.controlled=await p.evaluate(()=>!!navigator.serviceWorker.controller);
 /* sin conexion */
 await ctx.setOffline(true);
 await p.reload();
 out.offlineTitle=await p.title();
 out.offlineCards=await p.$$eval("[data-play]",e=>e.length);
 await ctx.setOffline(false);
 /* barra de instalar */
 await p.evaluate(()=>{const e=new Event("beforeinstallprompt");e.prompt=()=>{window.__prompted=1;};e.userChoice=Promise.resolve({});window.dispatchEvent(e);});
 out.barShown=await p.$$eval("#install",e=>e.length);
 out.btn=await p.$$eval("#installBtn",e=>e.length);
 await p.click("#installX");
 out.barAfterDismiss=await p.$$eval("#install",e=>e.length);
 await p.reload();
 await p.evaluate(()=>{const e=new Event("beforeinstallprompt");e.prompt=()=>{};e.userChoice=Promise.resolve({});window.dispatchEvent(e);});
 out.barAfterReload=await p.$$eval("#install",e=>e.length);
 out.hscroll=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
 out.errs=errs;
 console.log(JSON.stringify(out,null,1));
 await b.close();
})();
