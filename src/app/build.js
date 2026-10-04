/* Construye app/index.html a partir de template.html + datos.
   Uso: cd src/app && node build.js */
const fs=require("fs"),path=require("path");
const root=path.join(__dirname,"..","..");
const read=f=>fs.readFileSync(path.join(__dirname,f),"utf8");

/* Más o menos */
const MM=[].concat(require("./data/mm1.js"),require("./data/mm2.js"));
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
const TRAY=require("./data/tray.js"),VF=require("./data/vf.js"),ODD=require("./data/intruso.js"),CON=[].concat(require("./data/conexiones.js"),require("./data/conexiones2.js").filter(x=>!["con-16","con-20"].includes(x.id))),  /* con-16 y con-20 con dudas de verificacion: fuera hasta revisarlos */
  LINE=require("./data/linea.js"),MIST=require("./data/misterioso.js");
chk("tray",TRAY,x=>{if(x.career.length<4)throw new Error("carrera corta "+x.id);});
chk("vf",VF,x=>{if(typeof x.v!=="boolean")throw new Error("vf "+x.id);});
chk("odd",ODD,x=>{if(x.items.length!==4||x.odd<0||x.odd>3)throw new Error("odd "+x.id);});
chk("con",CON,x=>{const all=x.groups.flatMap(g=>g.items);if(x.groups.length!==4||new Set(all.map(t=>t.toLowerCase())).size!==16)throw new Error("con "+x.id);});
chk("line",LINE,x=>{if(x.items.length!==6||new Set(x.items.map(i=>i.y)).size!==6)throw new Error("line "+x.id);});
if(new Set(MIST.players.map(p=>p.n)).size!==MIST.players.length)throw new Error("misterioso repetidos");
const data={MM,TRAY,VF,ODD,CON,LINE,MIST,LINEUPS,T10:{total:levels.length},CFG:{supabaseUrl:cfg.supabaseUrl||"",supabaseKey:cfg.supabaseKey||""}};
const html=read("template.html").replace("/*__GAMES__*/",()=>read("games.js")).replace("/*__DATA__*/null",()=>JSON.stringify(data));
const out=path.join(root,"app");
fs.mkdirSync(out,{recursive:true});
fs.writeFileSync(path.join(out,"index.html"),html);
fs.copyFileSync(path.join(__dirname,"pwa","manifest.webmanifest"),path.join(out,"manifest.webmanifest"));
const ver=require("crypto").createHash("sha1").update(html).digest("hex").slice(0,10);
fs.writeFileSync(path.join(out,"sw.js"),read("pwa/sw.template.js").replace("__VERSION__",ver));
console.log("app/index.html",html.length,"bytes; MM sets",MM.length,"lineups",LINEUPS.length);
