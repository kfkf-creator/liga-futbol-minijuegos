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
levels=levels.map((L,i)=>({L,i})).sort((a,b)=>RANK[a.L.diff]-RANK[b.L.diff]||a.i-b.i).map(x=>x.L);
levels.forEach((L,i)=>{ L.id=i+1; });
const extra=require("./data/extra.js");
const data="const LEVELS = "+JSON.stringify(levels,null,1)+";\nconst EXTRA = "+JSON.stringify(extra)+";";
const out=fs.readFileSync("template.html","utf8").replace("/*__DATA__*/",()=>data);
fs.writeFileSync("../../top10/index.html",out);
const ed="../../data/entidades",od="../../top10/entidades";
fs.mkdirSync(od,{recursive:true});
fs.readdirSync(ed).filter(f=>f.endsWith(".json")).forEach(f=>fs.copyFileSync(ed+"/"+f,od+"/"+f));
console.log("files:",files.join(","),"levels:",levels.length,"bytes:",out.length);
