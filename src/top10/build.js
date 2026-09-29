const fs=require("fs"),path=require("path");
const files=fs.readdirSync("data").filter(f=>/^b\d+.*\.js$/.test(f)).sort((a,b)=>{
  const na=parseInt(a.slice(1)),nb=parseInt(b.slice(1)); if(na!==nb) return na-nb;
  return a.localeCompare(b); // b1.js antes que b1new.js? "b1.js" < "b1new.js"
});
let levels=[]; files.forEach(f=>{ levels=levels.concat(require("./data/"+f)); });
levels.forEach((L,i)=>{ L.id=i+1; });
/* reequilibrio final de dificultad: 25 por tramo */
const OVERRIDE={4:"facil",14:"facil",39:"leyenda"};
levels.forEach(L=>{ if(OVERRIDE[L.id]) L.diff=OVERRIDE[L.id]; });
const extra=require("./data/extra.js");
const data="const LEVELS = "+JSON.stringify(levels,null,1)+";\nconst EXTRA = "+JSON.stringify(extra)+";";
const out=fs.readFileSync("template.html","utf8").replace("/*__DATA__*/",()=>data);
fs.writeFileSync("../../top10/index.html",out);
const ed="../../data/entidades",od="../../top10/entidades";
fs.mkdirSync(od,{recursive:true});
fs.readdirSync(ed).filter(f=>f.endsWith(".json")).forEach(f=>fs.copyFileSync(ed+"/"+f,od+"/"+f));
console.log("files:",files.join(","),"levels:",levels.length,"bytes:",out.length);
