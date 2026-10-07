/* Ejecuta los tests del Top 10 (servidor en :8123 desde la raiz del repo). Cada test se lanza desde src/top10.
   Falla por excepcion, "errs" no vacio o scroll horizontal. Uso: node src/top10/tests/run-all.js */
const {spawnSync}=require("child_process"),path=require("path"),fs=require("fs");
const dir=__dirname, root=path.join(dir,"..");
const names=fs.readdirSync(dir).filter(f=>/(-test|^play-all)\.js$/.test(f)).sort();
const env=Object.assign({},process.env,{URL:process.env.URL||"http://localhost:8123/top10/index.html"});
let bad=0;
for(const f of names){
  const r=spawnSync("node",[path.join(dir,f)],{encoding:"utf8",timeout:240000,cwd:root,env});
  const out=(r.stdout||"")+(r.stderr||""), probs=[];
  if(r.status!==0)probs.push("codigo de salida "+r.status);
  const m=out.match(/"errs":\s*\[([^\]]*)\]/);
  if(m&&m[1].trim())probs.push("errores de consola: "+m[1].trim().slice(0,300));
  if(/"hscroll":\s*true/.test(out))probs.push("scroll horizontal");
  if(/Error:|UnhandledPromiseRejection/.test(r.stderr||""))probs.push("excepcion: "+(r.stderr||"").slice(0,300));
  console.log((probs.length?"FALLA ":"ok    ")+f+(probs.length?"  "+probs.join(" | "):""));
  if(probs.length)bad++;
}
process.exit(bad?1:0);
