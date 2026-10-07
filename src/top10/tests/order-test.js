/* Repertorio: sin filtros ni categorias a la vista, orden mezclado con variedad, estable y con todos los niveles alcanzables. */
const {chromium}=require(require("child_process").execSync("npm root -g").toString().trim()+"/playwright");
(async()=>{
  const b=await chromium.launch({executablePath:process.env.CHROMIUM||"/opt/pw-browsers/chromium"});
  const p=await b.newPage({viewport:{width:400,height:850}}); const errs=[]; p.on("pageerror",e=>errs.push(e.message));
  await p.goto(process.env.URL); const r={};
  r.ui=await p.evaluate(()=>({filters:document.getElementById("filters").textContent.trim(),badges:document.querySelectorAll(".lvl .badge").length,
    cardText:[...document.querySelectorAll(".lvl")].slice(0,5).map(x=>x.textContent)}));
  r.n=await p.locator(".lvl").count();
  r.order=await p.evaluate(()=>{
    const o=order(), kinds=o.map(i=>kindOf(LEVELS[i]));
    let maxRun=1,run=1; for(let k=1;k<kinds.length;k++){ run=kinds[k]===kinds[k-1]?run+1:1; maxRun=Math.max(maxRun,run); }
    const counts={}; kinds.forEach(k=>counts[k]=(counts[k]||0)+1);
    /* reparto de "once": cuantos hay en cada decil del orden (debe ser uniforme) */
    const dec=Array(10).fill(0); kinds.forEach((k,j)=>{ if(k==="once") dec[Math.floor(j*10/kinds.length)]++; });
    return {total:o.length,unique:new Set(o).size,maxRun,counts,onceByDecile:dec,first5Easy:o.slice(0,5).every(i=>LEVELS[i].diff==="facil"),first5:kinds.slice(0,5)};
  });
  /* estable entre cargas */
  const a=await p.evaluate(()=>order().join(",")); await p.reload(); const c=await p.evaluate(()=>order().join(",")); r.stable=a===c;
  /* en la partida no hay etiquetas de categoria */
  await p.locator(".lvl").first().click();
  r.pills=await p.evaluate(()=>["diffPill","typePill","tagPill"].map(id=>document.getElementById(id).hidden)); r.pill=await p.textContent("#lvlPill");
  /* siguiente nivel avanza por el orden mezclado */
  r.hscroll=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth); r.errs=errs;
  console.log(JSON.stringify(r,null,1)); await b.close();
  const o=r.order; if(errs.length||r.ui.filters||r.ui.badges||o.total!==o.unique||o.total!==r.n||o.maxRun>2||!o.first5Easy||!r.stable||r.pills.some(x=>!x)||/Fácil|Medio|Difícil|Leyenda/.test(r.ui.cardText.join(" "))) process.exit(1);
})();
