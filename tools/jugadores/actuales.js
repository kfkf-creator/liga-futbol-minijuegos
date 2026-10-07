/* Mezcla tools/jugadores/actuales.txt en data/entidades/jugadores.json. Idempotente.
   Si el jugador ya existe (mismo nombre sin tildes) solo sube su fama; si no, lo anade. Uso: node tools/jugadores/actuales.js */
const fs=require("fs"),path=require("path");
const file=path.join(__dirname,"..","..","data","entidades","jugadores.json");
const norm=s=>String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/ß/g,"ss").replace(/ø/g,"o").replace(/æ/g,"ae").replace(/đ/g,"d").replace(/ł/g,"l").replace(/['’`´]/g,"").replace(/[^a-z0-9]+/g," ").trim();
const db=JSON.parse(fs.readFileSync(file,"utf8"));
const idx=new Map(db.map((r,i)=>[norm(r[0]),i]));
let lvl=0,added=[],raised=0,same=0;
fs.readFileSync(path.join(__dirname,"actuales.txt"),"utf8").split("\n").forEach(line=>{
  const m=line.match(/^# nivel (\d+)/); if(m){ lvl=+m[1]; return; }
  if(!line.trim()||line.startsWith("#")) return;
  line.split(",").map(x=>x.trim()).filter(Boolean).forEach(n=>{
    const k=norm(n), i=idx.get(k);
    if(i===undefined){ db.push([n,"",0,lvl]); idx.set(k,db.length-1); added.push(n); }
    else if(db[i][3]<lvl){ db[i][3]=lvl; raised++; } else same++;
  });
});
fs.writeFileSync(file,JSON.stringify(db));
console.log("anadidos",added.length,"fama subida",raised,"sin cambio",same,"total",db.length);
console.log("Anadidos:",added.join(", "));
