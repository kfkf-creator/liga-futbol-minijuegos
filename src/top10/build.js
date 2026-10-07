const fs=require("fs"),path=require("path");
const files=fs.readdirSync("data").filter(f=>/^b\d+.*\.js$/.test(f)).sort((a,b)=>{
  const na=parseInt(a.slice(1)),nb=parseInt(b.slice(1)); if(na!==nb) return na-nb;
  return a.localeCompare(b); // b1.js antes que b1new.js? "b1.js" < "b1new.js"
});
let levels=[]; files.forEach(f=>{ levels=levels.concat(require("./data/"+f)); });
levels.forEach((L,i)=>{ L.id=i+1; });
/* reequilibrio final de dificultad: 25 por tramo */
const OVERRIDE={4:"facil",14:"facil",39:"leyenda",85:"medio",68:"facil",16:"dificil",9:"medio"};
levels.forEach(L=>{ if(OVERRIDE[L.id]) L.diff=OVERRIDE[L.id]; });
/* orden de juego: por tramo (fácil, medio, difícil, leyenda), conservando el orden original dentro de cada uno */
const RANK={facil:0,medio:1,dificil:2,leyenda:3};
levels.forEach(L=>{ L.oid=L.id; });
/* v3: numeración de la versión de 100 niveles (solo para migrar progreso antiguo) */
levels.filter(L=>L.oid<=100).map((L,i)=>({L,i})).sort((a,b)=>RANK[a.L.diff]-RANK[b.L.diff]||a.i-b.i).forEach((x,k)=>{ x.L.v3=k+1; });
/* clave estable para guardar el progreso: no cambia aunque se añadan niveles */
const slug=s=>s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
levels.forEach(L=>{ L.key=slug(L.title); });
if(new Set(levels.map(L=>L.key)).size!==levels.length) throw new Error("claves de nivel repetidas");
{ const h=s=>{ let x=0x811c9dc5; for(let i=0;i<s.length;i++){ x^=s.charCodeAt(i); x=Math.imul(x,0x01000193)>>>0; } return x; };
  const ids=levels.map(L=>h(L.key).toString(36).padStart(5,"0").slice(-5));
  if(new Set(ids).size!==ids.length) throw new Error("identificadores de copia de seguridad repetidos"); }
levels=levels.map((L,i)=>({L,i})).sort((a,b)=>RANK[a.L.diff]-RANK[b.L.diff]||a.i-b.i).map(x=>x.L);
levels.forEach((L,i)=>{ L.id=i+1; });
const YEARS=require("./data/years.js");
levels.forEach(L=>{ L.yrs=YEARS[L.title]||L.yrs; if(!L.yrs) throw new Error("Sin rango de años: "+L.title); });
const extra=require("./data/extra.js");
const data="const LEVELS = "+JSON.stringify(levels,null,1)+";\nconst EXTRA = "+JSON.stringify(extra)+";";
const tpl=fs.readFileSync("template.html","utf8").replace("/*__DATA__*/",()=>data);
const build=require("crypto").createHash("sha1").update(tpl).digest("hex").slice(0,6);
const out=tpl.replace("__BUILD__",build);
fs.writeFileSync("../../top10/index.html",out);
const ed="../../data/entidades",od="../../top10/entidades";
fs.mkdirSync(od,{recursive:true});
fs.readdirSync(ed).filter(f=>f.endsWith(".json")).forEach(f=>fs.copyFileSync(ed+"/"+f,od+"/"+f));
/* PWA: manifiesto y service worker con versión = hash del juego */
fs.copyFileSync("pwa/manifest.webmanifest","../../top10/manifest.webmanifest");
const ver=require("crypto").createHash("sha1").update(out).digest("hex").slice(0,10);
fs.writeFileSync("../../top10/sw.js",fs.readFileSync("pwa/sw.template.js","utf8").replace("__VERSION__",ver));
console.log("files:",files.join(","),"levels:",levels.length,"bytes:",out.length);
