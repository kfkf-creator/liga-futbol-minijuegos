/* Amplia top10/entidades/jugadores.json con futbolistas de Wikidata que falten (para el desplegable de nombres).
   Uso: node tools/jugadores/ampliar.js [minEnlaces]    (por defecto 5 enlaces a Wikipedias: filtra a los poco conocidos)
   Necesita acceso a query.wikidata.org: se ejecuta en GitHub Actions. Formato de cada fila: [nombre, pais, anoNacimiento, fama]. */
const fs=require("fs"),path=require("path");
const file=path.join(__dirname,"..","..","top10","entidades","jugadores.json");
const MIN=+(process.argv[2]||5);
const UA="LigaFutbolMinijuegos/1.0 (https://github.com/kfkf-creator/liga-futbol-minijuegos; proyecto aficionado sin ingresos)";
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const norm=s=>String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/ß/g,"ss").replace(/ø/g,"o").replace(/æ/g,"ae").replace(/đ/g,"d").replace(/ł/g,"l").replace(/['’`´]/g,"").replace(/[^a-z0-9]+/g," ").trim();
async function sparql(q){
  for(let t=0;t<3;t++){
    try{
      const r=await fetch("https://query.wikidata.org/sparql?format=json&query="+encodeURIComponent(q),{headers:{"User-Agent":UA,"Accept":"application/sparql-results+json"},signal:AbortSignal.timeout(70000)});
      if(r.status===429||r.status>=500){await sleep(5000*(t+1));continue;}
      if(!r.ok)throw new Error(r.status);
      return (await r.json()).results.bindings;
    }catch(e){if(t===2)throw e;await sleep(4000*(t+1));}
  }
}
(async()=>{
  const cur=JSON.parse(fs.readFileSync(file,"utf8")),have=new Set(cur.map(x=>norm(x[0])));
  const add=[];let vistos=0;const t0=Date.now();
  const paises={};
  try{for(const r of await sparql(`SELECT ?c ?l WHERE{ ?c wdt:P31 wd:Q6256. ?c rdfs:label ?l FILTER(LANG(?l)="es") }`))paises[r.c.value]=r.l.value;}catch(e){console.log("sin paises",e.message);}
  for(let y=1935;y<=2009;y+=1){
    if(Date.now()-t0>22*60*1000){console.log("tiempo agotado en",y);break;}
    const q=`SELECT ?item ?les ?len ?by ?c ?sl WHERE {
      ?item wdt:P106 wd:Q937857; wdt:P569 ?b; wikibase:sitelinks ?sl.
      FILTER(YEAR(?b)=${y}) FILTER(?sl>=${MIN})
      BIND(YEAR(?b) AS ?by)
      OPTIONAL{?item wdt:P27 ?c}
      OPTIONAL{?item rdfs:label ?les FILTER(LANG(?les)="es")}
      OPTIONAL{?item rdfs:label ?len FILTER(LANG(?len)="en")}
    }`;
    let rows;
    try{rows=await sparql(q);}catch(e){console.log("fallo",y,e.message);continue;}
    for(const r of rows){
      const n=(r.les&&r.les.value)||(r.len&&r.len.value);vistos++;
      if(!n||/^Q\d+$/.test(n))continue;
      const k=norm(n);if(!k||have.has(k))continue;
      have.add(k);
      add.push([n,(r.c&&paises[r.c.value])||"",+r.by.value,Math.min(22,8+Math.floor(+r.sl.value/3))]);
    }
    console.log(y,rows.length,"filas, nuevos acumulados",add.length);
    await sleep(800);
  }
  fs.writeFileSync(file,JSON.stringify(cur.concat(add)));
  console.log(`Base: ${cur.length} -> ${cur.length+add.length} (nuevos ${add.length}, filas vistas ${vistos})`);
  fs.writeFileSync(path.join(__dirname,"informe.md"),`# Ampliacion de jugadores\n\nAntes: ${cur.length}\nNuevos: ${add.length}\nDespues: ${cur.length+add.length}\nMinimo de enlaces: ${MIN}\n\nEjemplos: ${add.slice(0,25).map(x=>x[0]).join(", ")}\n`);
})();
