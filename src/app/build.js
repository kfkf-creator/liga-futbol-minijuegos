/* Construye app/index.html a partir de template.html + datos.
   Uso: cd src/app && node build.js */
const fs=require("fs"),path=require("path");
const root=path.join(__dirname,"..","..");
const read=f=>fs.readFileSync(path.join(__dirname,f),"utf8");

/* Más o menos */
const MM=[].concat(require("./data/mm1.js"),require("./data/mm2.js"),require("./data/mm3.js"));
const ids=new Set();
MM.forEach(s=>{
  if(ids.has(s.id)) throw new Error("id repetido "+s.id); ids.add(s.id);
  const vs=new Set(s.items.map(i=>i.v));
  if(vs.size!==s.items.length) throw new Error("valores repetidos en "+s.id);
});

/* Once oculto: alineaciones de los niveles del Top 10 + formaciones */
const tdir=path.join(root,"src","top10","data");
const levels=[];
fs.readdirSync(tdir).filter(f=>/^b\d+.*\.js$/.test(f)).forEach(f=>levels.push(...require(path.join(tdir,f))));
const byTitle=new Map(levels.map(l=>[l.title,l]));
const slug=s=>s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const LINEUPS=require("./data/formaciones.json").map(f=>{
  const L=byTitle.get(f.title);
  if(!L) throw new Error("alineacion sin nivel: "+f.title);
  if(f.rows.reduce((a,b)=>a+b,0)!==10||L.answers.length!==10) throw new Error("rows/answers "+f.title);
  return {k:slug(f.title).slice(0,80),title:f.title,rows:f.rows,gk:f.gk||"",auto:!!L.auto,
    ans:L.answers.map(a=>({n:a.n,a:a.a||[]}))};
});
const ks=new Set(LINEUPS.map(l=>l.k));
if(ks.size!==LINEUPS.length) throw new Error("claves de alineacion repetidas");

const cfg=fs.existsSync(path.join(__dirname,"config.js"))?require("./config.js"):{supabaseUrl:"",supabaseKey:""};
const chk=(name,arr,f)=>{const ids=new Set();arr.forEach(x=>{if(ids.has(x.id))throw new Error(name+" id repetido "+x.id);ids.add(x.id);f(x);});};
const opt=f=>fs.existsSync(path.join(__dirname,"data",f))?require("./data/"+f):null;   /* ficheros de ampliacion opcionales */
const TRAY=[].concat(require("./data/tray.js"),opt("tray2.js")||[]),VF=require("./data/vf.js"),ODD=require("./data/intruso.js"),CON=[].concat(require("./data/conexiones.js"),require("./data/conexiones2.js")),
  LINE=[].concat(require("./data/linea.js"),opt("linea2.js")||[]),MIST=require("./data/misterioso.js");
chk("tray",TRAY,x=>{if(x.career.length<4)throw new Error("carrera corta "+x.id);});
chk("vf",VF,x=>{if(typeof x.v!=="boolean")throw new Error("vf "+x.id);});
chk("odd",ODD,x=>{if(x.items.length!==4||x.odd<0||x.odd>3)throw new Error("odd "+x.id);});
chk("con",CON,x=>{const all=x.groups.flatMap(g=>g.items);if(x.groups.length!==4||new Set(all.map(t=>t.toLowerCase())).size!==16)throw new Error("con "+x.id);});
chk("line",LINE,x=>{if(x.items.length!==6||new Set(x.items.map(i=>i.y)).size!==6)throw new Error("line "+x.id);});
if(new Set(MIST.players.map(p=>p.n)).size!==MIST.players.length)throw new Error("misterioso repetidos");
const SCORE=require("./data/marcador.js"),KEY=require("./data/momentos.js"),ROAD=[].concat(require("./data/camino.js"),opt("camino2.js")||[]),TABLE=[].concat(require("./data/tabla.js"),opt("tabla2.js")||[]),FUN=opt("curiosos.js")||{};
chk("score",SCORE,x=>{if(!Number.isInteger(x.hg)||!Number.isInteger(x.ag)||!x.home||!x.away)throw new Error("score "+x.id);});
chk("key",KEY,x=>{if(x.opts.length!==4||x.a<0||x.a>3||new Set(x.opts).size!==4)throw new Error("key "+x.id);});
chk("road",ROAD,x=>{if(x.matches.length<5||!x.team||!x.year)throw new Error("road "+x.id);});
chk("table",TABLE,x=>{if(x.items.length!==8||x.items.some((i,k)=>i.pos!==k+1))throw new Error("table "+x.id);});
const data={FUN,MM,TRAY,VF,ODD,CON,LINE,MIST,SCORE,KEY,ROAD,TABLE,LINEUPS,T10:{total:levels.length},CFG:{supabaseUrl:cfg.supabaseUrl||"",supabaseKey:cfg.supabaseKey||""}};
const mk=(tpl,gms)=>read(tpl).replace("/*__GAMES__*/",()=>read(gms)).replace("/*__DATA__*/null",()=>JSON.stringify(data));
const html=mk("template.html","games.js");
const out=path.join(root,"app");
fs.mkdirSync(out,{recursive:true});
fs.writeFileSync(path.join(out,"index.html"),html);
fs.copyFileSync(path.join(__dirname,"pwa","manifest.webmanifest"),path.join(out,"manifest.webmanifest"));
/* version anterior de la interfaz, guardada tal cual en /app/classic/ (sin PWA propia) */
fs.mkdirSync(path.join(out,"classic"),{recursive:true});
fs.writeFileSync(path.join(out,"classic","index.html"),mk("template.classic.html","games.classic.js").replace(/<link rel="manifest"[^>]*>/,""));
const ver=require("crypto").createHash("sha1").update(html).digest("hex").slice(0,10);
fs.writeFileSync(path.join(out,"sw.js"),read("pwa/sw.template.js").replace("__VERSION__",ver));
console.log("app/index.html",html.length,"bytes; MM sets",MM.length,"lineups",LINEUPS.length);
