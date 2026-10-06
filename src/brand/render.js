// Renderiza icon.svg / icon-maskable.svg a los PNG de la PWA en app/. Uso: node render.js
const {chromium}=require(require("child_process").execSync("npm root -g").toString().trim()+"/playwright");
const fs=require("fs"),path=require("path");
const out=path.join(__dirname,"..","..","app");
(async()=>{const b=await chromium.launch({executablePath:"/opt/pw-browsers/chromium"});
const jobs=[["icon.svg","icon-512.png",512],["icon.svg","icon-192.png",192],["icon.svg","apple-touch-icon.png",180],["icon.svg","favicon-48.png",48],["icon-maskable.svg","icon-maskable-512.png",512]];
for(const [f,o,s] of jobs){const p=await b.newPage({viewport:{width:s,height:s}});
const svg=fs.readFileSync(path.join(__dirname,f),"utf8").replace('width="1024" height="1024"',`width="${s}" height="${s}"`);
await p.setContent(`<body style="margin:0">${svg}</body>`);await p.screenshot({path:path.join(out,o)});await p.close();}
await b.close();})();
