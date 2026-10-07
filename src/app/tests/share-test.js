/* La tarjeta de resultado genera un PNG valido y el compartir cae a texto si no hay soporte de archivos. */
const {chromium}=require(require("child_process").execSync("npm root -g").toString().trim()+"/playwright");
const URL=process.env.URL||"http://localhost:8123/app/index.html";
(async()=>{
 const b=await chromium.launch({executablePath:process.env.CHROMIUM||"/opt/pw-browsers/chromium",args:["--no-sandbox"]});
 const p=await(await b.newContext({viewport:{width:390,height:800}})).newPage();const errs=[];
 p.on("pageerror",e=>errs.push(String(e)));p.on("console",m=>{if(m.type()==="error"&&!/Failed to load resource|net::/.test(m.text()))errs.push(m.text());});
 await p.goto(URL);
 const out=await p.evaluate(async()=>{
  const r=S.days[today()]={};MAINS().forEach((g,i)=>r[g.id]=[90,70,50,30][i]);
  const blob=await resultCard();const head=new Uint8Array(await blob.arrayBuffer()).slice(0,4);
  let shared=null;navigator.canShare=()=>true;navigator.share=async d=>{shared={files:(d.files||[]).length,text:!!d.text};};
  await shareResult();
  let fallback=null;navigator.canShare=()=>false;navigator.share=async d=>{fallback={files:(d.files||[]).length,text:d.text};};
  await shareResult();
  return {type:blob.type,size:blob.size,png:Array.from(head).join(",")==="137,80,78,71",shared,fallbackFiles:fallback&&fallback.files,fallbackText:!!(fallback&&fallback.text)};
 });
 out.ok=out.png&&out.size>5000&&out.shared&&out.shared.files===1&&out.fallbackFiles===0&&out.fallbackText;
 out.errs=errs;if(!out.ok)out.errs.push("share-test: resultado inesperado");
 console.log(JSON.stringify(out,null,1));await b.close();
})();
