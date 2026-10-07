/* Ejecuta todos los tests y falla si alguno lanza una excepcion, registra errores de consola
   ("errs" no vacio) o provoca scroll horizontal ("hscroll": true).
   Los tests imprimen estado en JSON, no tienen aserciones propias: esto es una comprobacion de humo.
   Uso: (servidor en :8123 desde la raiz del repo)  node src/app/tests/run-all.js */
const {spawnSync}=require("child_process"),path=require("path");
const names=["app","games","sb-mock","pwa","resume","timer","rewards","ads","accounts","share"];
let bad=0;
for(const n of names){
  const r=spawnSync("node",[path.join(__dirname,n+"-test.js")],{encoding:"utf8",timeout:240000});
  const out=(r.stdout||"")+(r.stderr||"");
  const probs=[];
  if(r.status!==0)probs.push("codigo de salida "+r.status);
  const m=out.match(/"errs":\s*\[([^\]]*)\]/);
  if(m&&m[1].trim())probs.push("errores de consola: "+m[1].trim().slice(0,300));
  if(/"hscroll":\s*true/.test(out))probs.push("scroll horizontal");
  if(/Error:|UnhandledPromiseRejection/.test(r.stderr||""))probs.push("excepcion: "+(r.stderr||"").slice(0,300));
  console.log((probs.length?"FALLA ":"ok    ")+n+(probs.length?"  "+probs.join(" | "):""));
  if(probs.length)bad++;
}
process.exit(bad?1:0);
