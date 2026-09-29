const fs=require("fs");
const html=fs.readFileSync("../../top10/index.html","utf8");
const m=html.match(/<script>([\s\S]*)<\/script>/);
const code=m[1];
new Function(code.replace(/^"use strict";/,"")); // sintaxis (falla por DOM al ejecutar, no aquí)
const logic=code.split("//__UI__")[0];
const api=new Function(logic+"; return {LEVELS,EXTRA,judge,nearMiss,suggest,norm,lev,POOLS,DIFFS,TYPES};")();
const {LEVELS,judge,nearMiss,suggest,norm}=api;
let problems=[];
const P=s=>problems.push(s);
const tally={diff:{},type:{},cur:0};
LEVELS.forEach(L=>{
  const id=L.id;
  if(!["facil","medio","dificil","leyenda"].includes(L.diff)) P(id+" diff invalida");
  if(!["jugadores","equipos","entrenadores","estadios","selecciones"].includes(L.type)) P(id+" type invalido");
  tally.diff[L.diff]=(tally.diff[L.diff]||0)+1; tally.type[L.type]=(tally.type[L.type]||0)+1; if(L.cur) tally.cur++;
  if(L.answers.length!==10) P(id+" no tiene 10 respuestas");
  if(/[—–]/.test(JSON.stringify(L))) P(id+" contiene raya larga");
  const names=new Set();
  L.answers.forEach((a,i)=>{
    if(!a.d) P(id+"."+(i+1)+" sin detalle");
    if(names.has(norm(a.n))) P(id+" nombre repetido "+a.n); names.add(norm(a.n));
    a.keys.forEach(k=>{
      const r=judge(L,k,new Set());
      if(r.t==="amb") return;
      if(r.t!=="hit") P(id+" clave no resuelve: "+k);
      else if(r.i!==i && !(L.answers[r.i].keys.includes(k))) P(id+" clave "+k+" va a otra respuesta");
    });
    // el nombre completo siempre debe dar su propia respuesta
    const r=judge(L,a.n,new Set());
    if(r.t!=="hit"||r.i!==i){ if(!(r.t==="hit"&&L.answers[r.i].keys.includes(norm(a.n)))) P(id+" nombre no resuelve: "+a.n); }
    // nearMiss de un typo simple
    const t=norm(a.n); if(t.length>=6){
      const typo=t.slice(0,3)+t.slice(4); // borra una letra
      const j=judge(L,typo,new Set());
      if(j.t==="miss"){ const ni=nearMiss(L,typo,new Set()); if(ni===null) P(id+" typo sin sugerencia: "+typo); else if(ni!==i && !L.answers[ni].keys.some(k=>k.startsWith(t.slice(0,3)))) {} }
    }
  });
  // no sugerencias que filtren: escribir una respuesta absurda no da nada
  if(nearMiss(L,"zzzzzz",new Set())!==null) P(id+" nearMiss ruido");
});
// desplegable: cada respuesta se encuentra escribiendo sus 3 primeras letras
LEVELS.forEach(L=>L.answers.forEach(a=>{
  const q=norm(a.n).slice(0,3);
  const s=suggest(L,q,new Set());
  if(!s.length) P(L.id+" sin desplegable para "+q);
}));
console.log("niveles:",LEVELS.length,JSON.stringify(tally));
console.log("pools:",Object.entries(api.POOLS).map(([k,v])=>k+"="+v.length).join(" "));
console.log(problems.length?("PROBLEMAS:\n"+problems.join("\n")):"0 problemas");
