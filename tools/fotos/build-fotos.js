/* Piloto de fotos de jugadores con licencia libre (Wikidata + Wikimedia Commons).
   Uso: node tools/fotos/build-fotos.js [N]      (N = cuantos jugadores; 0 = todos los de los juegos; por defecto 100)
   Salida: app/fotos/<slug>.jpg, app/fotos/index.json (creditos) y app/fotos/informe.md (cobertura).
   Necesita acceso a wikidata.org y commons.wikimedia.org: se ejecuta en GitHub Actions, no en el sandbox de Claude. */
const fs=require("fs"),path=require("path");
const root=path.join(__dirname,"..","..");
const out=process.env.FOTOS_OUT||path.join(root,"app","fotos");
const UA="LigaFutbolMinijuegos/1.0 (https://github.com/kfkf-creator/liga-futbol-minijuegos; proyecto aficionado sin ingresos)";
const N=process.argv[2]!==undefined?+process.argv[2]:100;
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const norm=s=>s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g," ").trim();
const slug=s=>norm(s).replace(/ /g,"-");

/* jugadores de los juegos: misterioso, trayectoria y alineaciones del once oculto */
function candidatos(){
  const m=new Map();
  const add=(n,born)=>{const k=norm(n);if(k&&!m.has(k))m.set(k,{n,born:born||null});};
  const MIST=require(path.join(root,"src/app/data/misterioso.js")),TRAY=require(path.join(root,"src/app/data/tray.js"));
  MIST.players.filter(p=>p.fame>=3).forEach(p=>add(p.n,p.born));
  TRAY.forEach(p=>add(p.n,p.born));
  require(path.join(root,"src/app/data/formaciones.json")).forEach(f=>{
    const tdir=path.join(root,"src","top10","data");
    fs.readdirSync(tdir).filter(x=>/^b\d+.*\.js$/.test(x)).forEach(x=>require(path.join(tdir,x)).filter(l=>l.title===f.title).forEach(l=>l.answers.forEach(a=>add(a.n))));
  });
  const arr=[...m.values()];
  return N>0?arr.slice(0,N):arr;
}

async function api(url){
  for(let t=0;t<6;t++){
    let r;
    try{r=await fetch(url,{headers:{"User-Agent":UA,"Accept":"application/json"}});}catch(e){await sleep(3000*(t+1));continue;}
    if(r.status===429||r.status>=500){await sleep(3000*(t+1));continue;}
    if(!r.ok)throw new Error(r.status+" "+url);
    return r.json();
  }
  throw new Error("reintentos agotados "+url);
}
const WD="https://www.wikidata.org/w/api.php",CM="https://commons.wikimedia.org/w/api.php";
const claimIds=(e,p)=>((e.claims||{})[p]||[]).map(c=>c.mainsnak&&c.mainsnak.datavalue&&c.mainsnak.datavalue.value&&(c.mainsnak.datavalue.value.id||c.mainsnak.datavalue.value)).filter(Boolean);
const birthYear=e=>{const c=((e.claims||{}).P569||[])[0];const t=c&&c.mainsnak.datavalue&&c.mainsnak.datavalue.value.time;return t?+t.slice(1,5):null;};

async function findPlayer(p){
  const ids=new Set();
  for(const lang of ["es","en"]){
    const j=await api(`${WD}?action=wbsearchentities&search=${encodeURIComponent(p.n)}&language=${lang}&limit=10&type=item&format=json`);
    (j.search||[]).forEach(s=>ids.add(s.id));
    await sleep(process.env.FOTOS_FAST?0:150);
  }
  if(!ids.size)return {why:"sin entidad en Wikidata"};
  const j=await api(`${WD}?action=wbgetentities&ids=${[...ids].slice(0,20).join("|")}&props=claims|labels&languages=es|en&format=json`);
  let best=null;
  for(const id of Object.keys(j.entities||{})){
    const e=j.entities[id];
    if(!claimIds(e,"P31").includes("Q5")||!claimIds(e,"P106").includes("Q937857"))continue;   /* humano y futbolista */
    const labs=["es","en"].map(l=>e.labels&&e.labels[l]&&norm(e.labels[l].value)).filter(Boolean),want=norm(p.n).split(" ");
    if(!labs.some(l=>l===norm(p.n)||want.every(w=>l.split(" ").includes(w))||l.split(" ").every(w=>want.includes(w))))continue;   /* el nombre tiene que coincidir */
    const by=birthYear(e),score=(p.born&&by===p.born?2:0)+(p.born&&by&&by!==p.born?-3:0);
    if(!best||score>best.score)best={id,e,score};
  }
  if(!best)return {why:"ninguna entidad es un futbolista"};
  if(p.born&&best.score<0)return {why:"el ano de nacimiento no coincide"};
  const img=claimIds(best.e,"P18")[0];
  if(!img)return {qid:best.id,why:"sin imagen en Wikidata"};
  return {qid:best.id,file:img};
}

const OK_LIC=/^(CC0|Public domain|PD\b|CC[ -]BY(-SA)?\b)/i, BAD_LIC=/\b(NC|ND)\b/i;
const strip=h=>String(h||"").replace(/<[^>]*>/g,"").replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#0?39;/g,"'").replace(/\s+/g," ").trim();
async function commonsInfo(file){
  const j=await api(`${CM}?action=query&titles=${encodeURIComponent("File:"+file)}&prop=imageinfo&iiprop=extmetadata|url|mime&iiurlwidth=320&format=json`);
  const pg=Object.values((j.query||{}).pages||{})[0],ii=pg&&pg.imageinfo&&pg.imageinfo[0];
  if(!ii)return {why:"sin datos en Commons"};
  const x=ii.extmetadata||{},v=k=>strip(x[k]&&x[k].value);
  const lic=v("LicenseShortName");
  if(!lic||!OK_LIC.test(lic)||BAD_LIC.test(lic))return {why:"licencia no valida: "+(lic||"desconocida")};
  if(!/^image\/(jpeg|png|webp)$/.test(ii.mime||""))return {why:"formato "+ii.mime};
  return {lic,licUrl:v("LicenseUrl"),artist:v("Artist")||v("Credit"),restr:v("Restrictions"),thumb:ii.thumburl,page:ii.descriptionurl};
}
async function download(url,dest){
  const r=await fetch(url,{headers:{"User-Agent":UA}});
  if(!r.ok)throw new Error("descarga "+r.status);
  fs.writeFileSync(dest,Buffer.from(await r.arrayBuffer()));
}

(async()=>{
  fs.mkdirSync(out,{recursive:true});
  const list=candidatos(),index={},fallos=[];
  for(const p of list){
    try{
      const f=await findPlayer(p);
      if(!f.file){fallos.push([p.n,f.why]);continue;}
      const c=await commonsInfo(f.file);
      if(!c.thumb){fallos.push([p.n,c.why]);continue;}
      const k=slug(p.n);
      await download(c.thumb,path.join(out,k+".jpg"));
      index[k]={n:p.n,qid:f.qid,lic:c.lic,licUrl:c.licUrl,artist:c.artist,restr:c.restr||"",page:c.page};
    }catch(e){fallos.push([p.n,"error: "+e.message]);}
    await sleep(process.env.FOTOS_FAST?0:250);
  }
  fs.writeFileSync(path.join(out,"index.json"),JSON.stringify(index,null,1));
  const ok=Object.keys(index).length,pct=Math.round(100*ok/list.length);
  const lics={};Object.values(index).forEach(i=>lics[i.lic]=(lics[i.lic]||0)+1);
  const motivos={};fallos.forEach(([,w])=>{const k=w.replace(/:.*/,"");motivos[k]=(motivos[k]||0)+1;});
  const md=`# Piloto de fotos libres\n\nJugadores probados: ${list.length}\nCon foto valida: ${ok} (${pct} %)\nSin foto: ${fallos.length}\n\n## Licencias usadas\n${Object.entries(lics).map(([k,v])=>`- ${k}: ${v}`).join("\n")}\n\n## Motivos de descarte\n${Object.entries(motivos).map(([k,v])=>`- ${k}: ${v}`).join("\n")}\n\n## Sin foto\n${fallos.map(([n,w])=>`- ${n}: ${w}`).join("\n")}\n`;
  fs.writeFileSync(path.join(out,"informe.md"),md);
  console.log(md.split("\n## Sin foto")[0]);
})();
