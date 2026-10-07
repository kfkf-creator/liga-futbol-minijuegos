// Genera top10/og.png (1200x630) con el logo propio del Top 10. Uso: node pwa/make-og.js (desde src/top10)
const {chromium}=require(require("child_process").execSync("npm root -g").toString().trim()+"/playwright");
const fs=require("fs"),path=require("path");
(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||"/opt/pw-browsers/chromium"});
const p=await b.newPage({viewport:{width:1200,height:630}});
const logo="data:image/png;base64,"+fs.readFileSync(path.join(__dirname,"logo-original.png")).toString("base64");
await p.setContent(`<body style="margin:0;width:1200px;height:630px;background:radial-gradient(900px 500px at 50% -100px,#15432e,#08150f 70%);display:flex;align-items:center;gap:50px;padding:0 90px;box-sizing:border-box;font-family:Arial Black,Helvetica,Arial,sans-serif">
<div style="width:380px;height:380px;border-radius:80px;overflow:hidden;flex:none"><img src="${logo}" style="width:380px;height:380px;transform:scale(1.42)"></div>
<div><div style="color:#3ddc84;font-size:92px;font-weight:900;line-height:1">TOP 10<br>FÚTBOL</div>
<div style="color:#eef7f1;font-size:32px;font-family:Helvetica,Arial,sans-serif;margin-top:24px">Más de 160 niveles.<br>Cinco vidas. Diez respuestas.</div></div></body>`);
await p.screenshot({path:path.join(__dirname,"..","..","..","top10","og.png")});await b.close();})();
