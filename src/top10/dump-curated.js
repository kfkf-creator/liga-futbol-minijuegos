/* Vuelca los nombres curados (respuestas de niveles + extras) por tipo, con sus alias.
   Lo usa src/entities/build_entities.py para no duplicar entidades ni rechazar respuestas correctas. */
const fs=require("fs");
const files=fs.readdirSync(__dirname+"/data").filter(f=>/^b\d+.*\.js$/.test(f));
let levels=[]; files.forEach(f=>{ levels=levels.concat(require("./data/"+f)); });
const extra=require("./data/extra.js");
const out={};
const add=(type,n,al)=>{ (out[type]=out[type]||{}); const o=out[type][n]=out[type][n]||{a:[]}; (al||[]).forEach(x=>{ if(!o.a.includes(x)) o.a.push(x); }); };
levels.forEach(L=>L.answers.forEach(a=>add(L.type,a.n,a.a)));
Object.keys(extra).forEach(t=>extra[t].forEach(n=>add(t,n,[])));
fs.writeFileSync(process.argv[2]||"curated.json",JSON.stringify(out,null,0));
console.log(Object.keys(out).map(t=>t+":"+Object.keys(out[t]).length).join(" "));
