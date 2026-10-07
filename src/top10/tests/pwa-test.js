const {chromium}=require(require("child_process").execSync("npm root -g").toString().trim()+"/playwright");
(async()=>{
  const b=await chromium.launch({executablePath:process.env.CHROMIUM||"/opt/pw-browsers/chromium"});
  const c=await b.newContext({viewport:{width:390,height:800}});
  const p=await c.newPage(); const errs=[]; p.on("pageerror",e=>errs.push(e.message));
  p.on("console",m=>{ if(m.type()==="error"&&!/Failed to load resource: net::ERR_INTERNET_DISCONNECTED/.test(m.text())) errs.push(m.text()); });
  const base=process.env.URL.replace(/index\.html$/,"");
  const r={};
  await p.goto(base+"index.html");
  await p.waitForFunction(()=>dbState==="ready",null,{timeout:20000});
  await p.evaluate(()=>navigator.serviceWorker.ready);
  await p.waitForFunction(()=>!!navigator.serviceWorker.controller,null,{timeout:10000}).catch(()=>{});
  // si aun no controla, recargar una vez
  if(!(await p.evaluate(()=>!!navigator.serviceWorker.controller))){ await p.reload(); await p.waitForFunction(()=>dbState==="ready"); }
  r.controlled=await p.evaluate(()=>!!navigator.serviceWorker.controller);
  r.manifest=await p.evaluate(async()=>{ const m=await (await fetch("manifest.webmanifest")).json(); return {name:m.name,display:m.display,icons:m.icons.length,start:m.start_url}; });
  r.icons={}; for(const f of ["icon-192.png","icon-512.png","icon-maskable-512.png","apple-touch-icon.png","favicon-48.png"]){
    r.icons[f]=await p.evaluate(async f=>{ const x=await fetch(f); const bm=await createImageBitmap(await x.blob()); return x.status+" "+bm.width+"x"+bm.height; },f);
  }
  // sin conexion: recargar y comprobar que el juego y los nombres siguen
  await c.setOffline(true);
  await p.reload();
  await p.waitForFunction(()=>dbState==="ready",null,{timeout:15000}).catch(()=>{});
  r.offlineLevels=await p.locator(".lvl").count();
  r.offlineDb=await p.evaluate(()=>dbState+" "+(DB.jugadores||[]).length);
  await p.locator(".lvl").first().click();
  await p.fill("#input","lamin");
  r.offlineSuggest=await p.locator("#ac li").allTextContents();
  await c.setOffline(false);
  // barra de instalar (simulando beforeinstallprompt)
  await p.goto(base+"index.html");
  await p.evaluate(()=>{ const e=new Event("beforeinstallprompt"); e.prompt=()=>{window.__prompted=true}; e.userChoice=Promise.resolve({outcome:"accepted"}); window.dispatchEvent(e); });
  r.installBarVisible=await p.isVisible("#install");
  await p.click("#installBtn"); r.prompted=await p.evaluate(()=>!!window.__prompted); r.installBarAfter=await p.isVisible("#install");
  r.hscroll=await p.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth);
  r.errs=errs; console.log(JSON.stringify(r,null,1)); await b.close();
})();
