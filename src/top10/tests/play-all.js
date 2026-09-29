const {chromium}=require(require("child_process").execSync("npm root -g").toString().trim()+"/playwright");
(async()=>{
  const b=await chromium.launch({executablePath:"/opt/pw-browsers/chromium"});
  const p=await b.newPage({viewport:{width:390,height:800}});
  const errs=[]; p.on("pageerror",e=>errs.push(e.message));
  await p.goto("file://"+process.cwd()+"/../../top10/index.html");
  const html=require("fs").readFileSync("../../top10/index.html","utf8");
  const code=html.match(/<script>([\s\S]*)<\/script>/)[1].split("//__UI__")[0];
  const LEVELS=new Function(code+";return LEVELS")();
  let bad=[];
  for(let li=0;li<LEVELS.length;li++){
    const L=LEVELS[li];
    await p.evaluate(i=>{ startLevel(i,[i]); },li);
    for(const a of L.answers){
      await p.fill("#input",a.n); await p.press("#input","Enter");
    }
    const t=await p.textContent("#resTitle");
    const lives=await p.textContent("#progLives");
    if(t!=="Nivel superado"||!lives.includes("5 de 5")) bad.push(L.id+":"+t+":"+lives);
  }
  await p.evaluate(()=>showMenu());
  await p.screenshot({path:"menu.png"});
  console.log("bad:",JSON.stringify(bad),"errs:",JSON.stringify(errs));
  await b.close();
})();
