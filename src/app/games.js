/* ================= juegos nuevos (se inserta en template.html) ================= */
/* Ayudas comunes */
function chunkOfDay(bank,n,day){                       /* n elementos consecutivos de un orden fijo, según el día */
  const order=shuffled(bank,rng(20260930)),len=order.length,start=(dayNum(day)*n)%len,out=[];
  for(let k=0;k<n;k++)out.push(order[(start+k)%len]);
  return out;
}
function meta(id){return GAMES.find(x=>x.id===id);}
function endScreen(day,id,score,line){
  const hoy=day===today();
  stopTimer();recordScore(day,id,score);
  $("#gsc").textContent="";
  $("#gb").innerHTML=`<div class="mut" style="text-align:center;margin-top:30px">${line}</div><div class="big">${score}/100</div>
  ${hoy?`<button class="btn block" id="e1">Compartir</button>`:""}<button class="btn block ghost" style="margin-top:10px" id="e2">Cerrar</button>`;
  const a=$("#e1");if(a)a.onclick=()=>share(shareText());
  $("#e2").onclick=closeGame;
}
function runClock(fn){stopTimer();TIMER=setInterval(fn,250);}
const INPUT_HTML=`<div class="inp"><input id="gi" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="Escribe un jugador..."><button class="btn" id="gs">OK</button><div class="sug" id="sg" style="display:none"></div></div>`;
function bindNameInput(sugFn,onSubmit){
  const inp=$("#gi"),box=$("#sg");
  const submit=v=>{const val=(v??inp.value);if(!val.trim())return;onSubmit(val);};
  $("#gs").onclick=()=>submit();
  inp.onkeydown=e=>{if(e.key==="Enter")submit();};
  inp.oninput=()=>{const s=sugFn(inp.value);if(!s.length){box.style.display="none";return;}box.style.display="block";box.innerHTML=s.map((e,n)=>`<button data-n="${n}">${esc(e.n)}<small>${esc(e.sub||"")}</small></button>`).join("");box.querySelectorAll("button").forEach((b,n)=>b.onclick=()=>submit(s[n].n));};
  inp.focus();
}
function suggestAny(raw,skip){                          /* sugerencias de la base de jugadores */
  const q=norm(raw);if(q.length<2)return [];
  const out=[];
  for(const e of allNames()){
    if(skip&&skip.has(e.nk))continue;
    let s=-1;if(e.nk.startsWith(q))s=0;else if(e.nk.indexOf(" "+q)>=0)s=1;else if(q.length>=3&&e.nk.includes(q))s=2;
    if(s>=0)out.push({e,s});
  }
  out.sort((x,y)=>x.s-y.s||y.e.f-x.e.f||x.e.nk.length-y.e.nk.length);
  return out.slice(0,6).map(x=>x.e);
}
function matchesName(raw,target){                       /* target: {n,a:[]} */
  const q=norm(raw);if(!q)return false;
  const ks=new Set([norm(target.n),...(target.a||[]).map(norm)]);
  const t=norm(target.n).split(" ");if(t[t.length-1].length>=4)ks.add(t[t.length-1]);
  for(const k of ks){if(k===q)return true;const tol=k.length>=10?2:k.length>=6?1:0;if(tol&&q.length>=4&&lev(q,k)<=tol)return true;}
  return false;
}

/* ---------- Verdadero o falso y El intruso (motor común de preguntas) ---------- */
function playQuiz(id,day,cfg){
  const hoy=day===today(),g=meta(id),N=10;
  openGame(g.name+(hoy?" · hoy":" · "+dayLabel(day)),g.c);
  const items=chunkOfDay(cfg.bank,N,day);
  let sv=progGet(day,id);
  if(!sv){sv={i:0,hits:0,t0:Date.now()};progSet(day,id,sv);}
  let i=sv.i,hits=sv.hits,locked=false,done=false,label="";
  const t0=sv.t0,rem=()=>hoy?cfg.T-(Date.now()-t0)/1000:Infinity;
  const hud=()=>{$("#gsc").textContent=(hoy?"⏱ "+fmtT(rem())+" · ":"")+label;};
  function next(){
    const it=items[i];locked=false;label=(i+1)+"/"+N;hud();
    $("#gb").innerHTML=`<div class="bar" style="--c:${g.c}"><i style="width:${i/N*100}%"></i></div>${cfg.render(it)}
    <div class="duel" style="margin-top:14px">${cfg.options(it).map((o,k)=>`<button class="opt sm" data-o="${k}"><b>${esc(o)}</b></button>`).join("")}</div><div id="nx"></div>`;
    document.querySelectorAll(".opt").forEach(b=>b.onclick=()=>pick(+b.dataset.o));
  }
  function pick(k){
    if(locked||done)return;locked=true;
    const it=items[i],right=cfg.correct(it),ok=k===right,opts=document.querySelectorAll(".opt");
    opts.forEach((b,n)=>b.classList.add(n===right?"win":"lose"));
    if(!ok)opts[k].classList.add("pickbad");
    if(ok)hits++;
    progSet(day,id,{i:i+1,hits,t0});
    label=hits+" acierto"+(hits===1?"":"s");hud();
    $("#nx").innerHTML=`<div class="card" style="margin-top:12px;font-size:14px">${esc(cfg.explain(it))}</div><button class="btn block" style="margin-top:10px" id="go">${i===N-1?"Ver resultado":"Siguiente"}</button>`;
    $("#go").onclick=()=>{i++;if(i>=N)end(false);else next();};
  }
  function end(timeout){
    if(done)return;done=true;
    const bonus=hoy?timeBonus(hits,timeout?0:Math.max(0,rem()),cfg.T):0,score=hits*(hoy?9:10)+bonus;
    endScreen(day,id,score,`${timeout?"Se acabó el tiempo. ":""}Has acertado ${hits} de ${N}${hoy?" · bonus de velocidad +"+bonus:""}`);
  }
  if(i>=N)end(false);else if(rem()<=0)end(true);
  else{next();if(hoy)runClock(()=>{if(rem()<=0)end(true);else hud();});}
}
function playVF(day){
  playQuiz("vf",day,{bank:DATA.VF,T:90,
    render:it=>`<div class="q" style="margin-top:22px">${esc(it.s)}</div>`,
    options:()=>["Verdadero","Falso"],correct:it=>it.v?0:1,explain:it=>it.e});
}
function playOdd(day){
  playQuiz("odd",day,{bank:DATA.ODD,T:150,
    render:it=>`<div class="q" style="margin-top:22px">${esc(it.q)}</div>`,
    options:it=>it.items,correct:it=>it.odd,explain:it=>it.why});
}

/* ---------- Línea del tiempo ---------- */
/* ---------- Motor de "ordenar y entregar" (Línea del tiempo y Reconstruye la tabla) ---------- */
function playOrder(id,day,cfg){
  const hoy=day===today(),g=meta(id),T=cfg.T;
  openGame(g.name+(hoy?" · hoy":" · "+dayLabel(day)),g.c);
  const puz=chunkOfDay(cfg.bank,1,day)[0],its=puz.items,N=its.length;
  const keyOf=k=>cfg.key(its[k]);
  const sortedK=its.map(i=>cfg.key(i)).sort((a,b)=>a-b);
  let sv=progGet(day,id);
  if(!sv||!sv.o){sv={o:shuffled(its.map((_,k)=>k),rng(hash(id+day))),t0:Date.now()};progSet(day,id,sv);}
  let ord=sv.o.slice(),done=false;
  const t0=sv.t0,rem=()=>hoy?T-(Date.now()-t0)/1000:Infinity;
  const hud=()=>{$("#gsc").textContent=hoy?"⏱ "+fmtT(rem()):"";};
  function save(){progSet(day,id,{o:ord,t0});}
  function draw(){
    hud();
    $("#gb").innerHTML=`<div class="mut" style="text-align:center;margin-top:8px">${esc(puz.title)}</div>
    <div class="q" style="font-size:17px">${esc(cfg.prompt)}</div>
    <div class="tl">${ord.map((k,i)=>`<div class="tli" style="align-items:center"><span style="flex:1">${esc(its[k].t)}</span>
      <button class="btn ghost" style="padding:8px 12px" data-m="${i}|-1" ${i===0?"disabled":""} aria-label="Subir">▲</button>
      <button class="btn ghost" style="padding:8px 12px" data-m="${i}|1" ${i===N-1?"disabled":""} aria-label="Bajar">▼</button></div>`).join("")}</div>
    <button class="btn block" id="sub" style="margin-top:12px">Entregar</button>`;
    document.querySelectorAll("[data-m]").forEach(b=>b.onclick=()=>{const [i,d]=b.dataset.m.split("|").map(Number);[ord[i],ord[i+d]]=[ord[i+d],ord[i]];save();draw();});
    $("#sub").onclick=()=>end(false);
  }
  function end(timeout){
    if(done)return;done=true;stopTimer();
    let pairs=0;for(let a=0;a<N;a++)for(let b=a+1;b<N;b++)if(keyOf(ord[a])<=keyOf(ord[b]))pairs++;
    const tot=N*(N-1)/2,fr=pairs/tot,exact=ord.filter((k,i)=>keyOf(k)===sortedK[i]).length;
    let score;
    if(hoy){const r=timeout?0:Math.max(0,rem());score=Math.round(90*fr)+Math.round(10*fr*r/T);}
    else score=Math.round(100*fr);
    const line=`${timeout?"Se acabó el tiempo. ":""}${exact} de ${N} en su sitio · ${pairs} de ${tot} parejas bien ordenadas`;
    const ok=(k,i)=>keyOf(k)===sortedK[i];
    $("#gb").innerHTML=`<div class="mut" style="text-align:center;margin-top:8px">Así lo entregaste (verde: en su sitio)</div>
    <div class="tl">${ord.map((k,i)=>`<div class="tli" style="border-color:${ok(k,i)?"var(--ok)":"var(--bad)"}"><b>${cfg.tag(its[k])}</b><span>${esc(its[k].t)}</span>${cfg.sub?`<span class="mut" style="margin-left:auto">${esc(cfg.sub(its[k]))}</span>`:""}</div>`).join("")}</div><div id="endbox"></div>`;
    recordScore(day,id,score);$("#gsc").textContent="";
    $("#endbox").innerHTML=`<div class="mut" style="text-align:center;margin-top:16px">${line}</div><div class="big">${score}/100</div>${hoy?`<button class="btn block" id="e1">Compartir</button>`:""}<button class="btn block ghost" style="margin-top:10px" id="e2">Cerrar</button>`;
    const a=$("#e1");if(a)a.onclick=()=>share(shareText());
    $("#e2").onclick=closeGame;
  }
  if(rem()<=0)end(true);
  else{draw();if(hoy)runClock(()=>{if(rem()<=0)end(true);else hud();});}
}
function playLine(day){
  playOrder("line",day,{bank:DATA.LINE,T:150,prompt:"Ordena los hechos del más antiguo (arriba) al más reciente (abajo)",key:i=>i.y,tag:i=>i.y});
}
function playTable(day){
  playOrder("table",day,{bank:DATA.TABLE,T:150,prompt:"Ordena los 8 primeros de la clasificación final: el campeón arriba",key:i=>i.pos,tag:i=>i.pos+"º",sub:i=>i.pts+" pts"});
}
function playKey(day){
  playQuiz("key",day,{bank:DATA.KEY,T:150,
    render:it=>`<div class="q" style="margin-top:22px">${esc(it.q)}</div>`,
    options:it=>it.opts,correct:it=>it.a,explain:it=>it.why});
}

/* ---------- Marcador exacto ---------- */
function playScore(day){
  const hoy=day===today(),g=meta("score"),N=10,T=240;
  openGame(g.name+(hoy?" · hoy":" · "+dayLabel(day)),g.c);
  const items=chunkOfDay(DATA.SCORE,N,day);
  let sv=progGet(day,"score");
  if(!sv){sv={i:0,pts:0,t0:Date.now()};progSet(day,"score",sv);}
  let i=sv.i,pts=sv.pts,done=false,a=0,b=0,checked=false;
  const t0=sv.t0,rem=()=>hoy?T-(Date.now()-t0)/1000:Infinity;
  const hud=()=>{$("#gsc").textContent=(hoy?"⏱ "+fmtT(rem())+" · ":"")+pts+" pts";};
  const award=(it,x,y)=>{if(x===it.hg&&y===it.ag)return 10;if(Math.sign(it.hg-it.ag)!==Math.sign(x-y))return 0;return x-y===it.hg-it.ag?6:4;};
  function draw(){
    const it=items[i];hud();
    const row=(who,v,k)=>`<div class="tli" style="align-items:center"><span style="flex:1;font-weight:700">${esc(who)}</span><span class="stp"><button class="btn ghost" data-st="${k}-" ${checked?"disabled":""} aria-label="Menos">−</button><b>${v}</b><button class="btn ghost" data-st="${k}+" ${checked?"disabled":""} aria-label="Más">+</button></span></div>`;
    $("#gb").innerHTML=`<div class="bar" style="--c:${g.c}"><i style="width:${i/N*100}%"></i></div>
    <div class="mut" style="text-align:center">Partido ${i+1} de ${N}</div><div class="q">${esc(it.comp)}</div>
    <div class="tl">${row(it.home,a,"a")}${row(it.away,b,"b")}</div>
    <div class="mut" style="text-align:center;font-size:13px">${it.et?"Cuenta el resultado tras la prórroga (sin penaltis).":"Cuenta el resultado final."}</div>
    <div id="nx" style="margin-top:12px"></div>`;
    document.querySelectorAll("[data-st]").forEach(bt=>bt.onclick=()=>{const [k,d]=bt.dataset.st.split("");const dv=d==="+"?1:-1;if(k==="a")a=Math.max(0,Math.min(15,a+dv));else b=Math.max(0,Math.min(15,b+dv));draw();});
    if(checked)return reveal(it);
    $("#nx").innerHTML=`<button class="btn block" id="chk">Comprobar</button>`;
    $("#chk").onclick=()=>{checked=true;const p=award(it,a,b);pts+=p;progSet(day,"score",{i:i+1,pts,t0});draw();};
  }
  function reveal(it){
    const p=award(it,a,b);
    $("#nx").innerHTML=`<div class="card" style="text-align:center"><div class="mut">Resultado real</div><div class="big" style="font-size:40px;margin:4px 0">${it.hg} - ${it.ag}</div><div>${p===10?"¡Exacto! +10":p>0?"+"+p+(p===6?" (resultado y diferencia de goles)":" (aciertas quién gana o el empate)"):"+0"}</div>${it.pen?`<div class="mut" style="margin-top:6px;font-size:13px">Tanda de penaltis: ${esc(it.pen)}</div>`:""}<div class="mut" style="margin-top:6px;font-size:13px">${esc(it.note||"")}</div></div><button class="btn block" style="margin-top:10px" id="go">${i===N-1?"Ver resultado":"Siguiente"}</button>`;
    $("#go").onclick=()=>{i++;checked=false;a=b=0;if(i>=N)end(false);else draw();};
  }
  function end(timeout){
    if(done)return;done=true;
    const score=hoy?Math.round(0.9*pts)+Math.round(10*(pts/100)*(timeout?0:Math.max(0,rem()))/T):pts;
    endScreen(day,"score",score,`${timeout?"Se acabó el tiempo. ":""}${pts} de 100 puntos posibles`);
  }
  if(i>=N)end(false);else if(rem()<=0)end(true);
  else{draw();if(hoy)runClock(()=>{if(rem()<=0)end(true);else hud();});}
}

/* ---------- Camino a la final ---------- */
const SEL={state:"idle",list:[]};
async function loadSel(){
  if(SEL.state!=="idle")return;SEL.state="loading";
  try{const r=await fetch("../top10/entidades/selecciones.json");if(!r.ok)throw 0;SEL.list=(await r.json()).map(x=>x[0]);}catch(e){}
  DATA.ROAD.forEach(x=>{SEL.list.push(x.team);(x.alias||[]).forEach(a=>SEL.list.push(a));});
  SEL.list=[...new Set(SEL.list)];SEL.state="ready";
}
function suggestSel(raw){
  const q=norm(raw);if(q.length<2)return [];
  return SEL.list.map(n=>({n,k:norm(n)})).filter(x=>x.k.startsWith(q)||x.k.includes(" "+q)).slice(0,6).map(x=>({n:x.n,sub:""}));
}
function playRoad(day){
  const g=meta("road");
  openGame(g.name+(day===today()?" · hoy":" · "+dayLabel(day)),g.c);loadSel();
  const P=chunkOfDay(DATA.ROAD,1,day)[0],M=P.matches;
  let sv=progGet(day,"road");
  if(!sv){sv={shown:1,wrong:0,gs:[]};progSet(day,"road",sv);}
  let {shown,wrong}=sv,gs=sv.gs.slice(),over=false,ye="";
  const cost=()=>10*(shown-1)+10*wrong;
  const hud=()=>{$("#gsc").textContent="Vale "+Math.max(20,90-cost())+" pts";};
  const save=()=>progSet(day,"road",{shown,wrong,gs});
  const line=(m,k)=>`<div class="tli"><b style="min-width:112px;font-size:13px">${esc(m.r)}</b><span>Selección misteriosa <b style="color:var(--txt)">${esc(m.s)}</b> ${esc(m.opp)}${m.pen?` <span class="mut">(penaltis ${esc(m.pen)})</span>`:""}</span></div>`;
  function draw(msg){
    hud();
    $("#gb").innerHTML=`<div class="mut" style="text-align:center;margin-top:8px">${esc(P.comp)}: ¿qué selección es y en qué año?</div>
    <div class="tl">${M.slice(0,shown).map(line).join("")}${shown<M.length?`<div class="tli mut"><span>${M.length-shown} partido${M.length-shown===1?"":"s"} más hasta el final</span></div>`:""}</div>
    ${over?"":`<button class="btn ghost block" id="rmore" ${shown>=M.length?"disabled":""}>Destapar otro partido (−10)</button>
    <input class="alias" id="gy" inputmode="numeric" maxlength="4" placeholder="Año (opcional, +10)" value="${esc(ye)}" style="margin-top:12px">
    <div class="inp"><input id="gi" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="Selección"><button class="btn" id="gs">OK</button><div class="sug" id="sg" style="display:none"></div></div>`}
    ${gs.length?`<div class="mut" style="font-size:14px;margin-top:8px">Ya has probado: ${gs.map(esc).join(", ")}</div>`:""}
    <div class="fb" id="fb">${msg||""}</div><div id="endbox"></div>`;
    if(!over){
      $("#rmore").onclick=()=>{if(shown<M.length){shown++;save();draw();}};
      $("#gy").oninput=e=>{ye=e.target.value;};
      bindNameInput(suggestSel,guess);
    }
  }
  function guess(raw){
    const y=($("#gy")?$("#gy").value:"").trim();ye=y;
    if(matchesName(raw,{n:P.team,a:P.alias||[]})){
      over=true;
      const base=Math.max(20,90-cost()),bonus=(+y===P.year)?10:0;
      draw(`¡Correcto! Era ${P.team} en ${P.year}.${y?(bonus?" Año acertado: +10.":" El año no era "+esc(y)+"."):""}`);
      const f=$("#fb");f.style.cssText="text-align:center;font-size:22px;font-weight:900;color:#fff;background:var(--ok);border-radius:16px;padding:12px;margin:10px 0";
      finish(base+bonus);return;
    }
    wrong++;gs.push(raw.trim());save();
    if(wrong>=3){over=true;draw(`Era ${P.team} en ${P.year}.`);finish(0);return;}
    draw("No es. Pierdes 10 puntos.");
  }
  function finish(score){
    stopTimer();recordScore(day,"road",score);$("#gsc").textContent="";
    const all=M.slice(shown);
    $("#endbox").innerHTML=`${all.length?`<div class="mut" style="margin-top:8px">Resto del camino</div><div class="tl">${all.map(line).join("")}</div>`:""}<div class="big">${score}/100</div><button class="btn block ghost" style="margin-top:10px" id="e2">Cerrar</button>`;
    $("#e2").onclick=closeGame;
  }
  if(wrong>=3){over=true;draw(`Era ${P.team} en ${P.year}.`);finish(0);}
  else draw("");
}

/* ---------- Conexiones ---------- */
function playCon(day){
  const hoy=day===today(),g=meta("con"),T=300,COL=["#f5d90a","#9be564","#5bb8ff","#b58cff"];
  openGame(g.name+(hoy?" · hoy":" · "+dayLabel(day)),g.c);
  const puz=chunkOfDay(DATA.CON,1,day)[0];
  const tiles=[];puz.groups.forEach((gr,gi)=>gr.items.forEach(t=>tiles.push({t,gi})));
  const order=shuffled(tiles,rng(hash("con"+day)));
  let sv=progGet(day,"con");
  if(!sv){sv={f:[],m:0,t0:Date.now()};progSet(day,"con",sv);}
  let found=sv.f.slice(),mist=sv.m,sel=new Set(),done=false,msg="";
  const t0=sv.t0,rem=()=>hoy?T-(Date.now()-t0)/1000:Infinity;
  const hud=()=>{$("#gsc").textContent=(hoy?"⏱ "+fmtT(rem())+" · ":"")+"fallos "+mist+"/4";};
  const byDiff=gi=>puz.groups[gi].diff||gi+1;
  function draw(reveal){
    hud();
    const rest=order.filter(x=>!found.includes(x.gi));
    const groupsHtml=(reveal?puz.groups.map((_,gi)=>gi).filter(gi=>!found.includes(gi)).concat(found):found).map(gi=>`<div class="cgrp" style="background:${COL[byDiff(gi)-1]}"><b>${esc(puz.groups[gi].name)}</b><span>${puz.groups[gi].items.map(esc).join(", ")}</span></div>`).join("");
    $("#gb").innerHTML=`<div class="mut" style="text-align:center;margin-top:8px">Encuentra los 4 grupos de 4</div>${groupsHtml}
    ${reveal?"":`<div class="cgrid">${rest.map((x,n)=>`<button class="tile ${sel.has(x.t)?"on":""}" data-t="${esc(x.t)}">${esc(x.t)}</button>`).join("")}</div>
    <div class="fb" id="fb">${msg}</div>
    <div class="row"><button class="btn ghost" id="cdes">Deseleccionar</button><button class="btn" id="cok" ${sel.size===4?"":"disabled"}>Comprobar</button></div>`}`;
    if(!reveal){
      document.querySelectorAll(".tile").forEach(b=>b.onclick=()=>{const t=b.dataset.t;if(sel.has(t))sel.delete(t);else if(sel.size<4)sel.add(t);draw();});
      $("#cdes").onclick=()=>{sel.clear();msg="";draw();};
      $("#cok").onclick=check;
    }
  }
  function save(){progSet(day,"con",{f:found,m:mist,t0});}
  function check(){
    if(done||sel.size!==4)return;
    const chosen=order.filter(x=>sel.has(x.t)),counts={};
    chosen.forEach(x=>counts[x.gi]=(counts[x.gi]||0)+1);
    const top=Math.max(...Object.values(counts)),gi=+Object.keys(counts).find(k=>counts[k]===top);
    if(top===4){found.push(gi);msg="";sel.clear();}
    else{mist++;msg=top===3?"Casi: tres son del mismo grupo.":"Esos cuatro no forman un grupo.";}
    save();
    if(found.length===4)end(false);
    else if(mist>=4)end(false);
    else draw();
  }
  function end(timeout){
    if(done)return;done=true;stopTimer();
    const n=found.length;
    let score;
    if(hoy){const base=Math.max(0,Math.round(22.5*n)-5*mist);score=base+Math.round(10*(base/90)*(timeout?0:Math.max(0,rem()))/T);}
    else score=Math.max(0,Math.round(25*n-5*mist));
    draw(true);
    recordScore(day,"con",score);$("#gsc").textContent="";
    const line=`${timeout?"Se acabó el tiempo. ":mist>=4&&n<4?"Sin fallos disponibles. ":""}${n} de 4 grupos, ${mist} fallo${mist===1?"":"s"}`;
    $("#gb").insertAdjacentHTML("beforeend",`<div class="mut" style="text-align:center;margin-top:16px">${line}</div><div class="big">${score}/100</div>${hoy?`<button class="btn block" id="e1">Compartir</button>`:""}<button class="btn block ghost" style="margin-top:10px" id="e2">Cerrar</button>`);
    const a=$("#e1");if(a)a.onclick=()=>share(shareText());
    $("#e2").onclick=closeGame;
  }
  if(found.length===4||mist>=4)end(false);
  else if(rem()<=0)end(true);
  else{draw();if(hoy)runClock(()=>{if(rem()<=0)end(true);else hud();});}
}

/* ---------- Trayectoria ---------- */
function playTray(day){
  const hoy=day===today(),g=meta("tray");
  openGame(g.name+(hoy?" · hoy":" · "+dayLabel(day)),g.c);
  const P=chunkOfDay(DATA.TRAY,1,day)[0];
  let sv=progGet(day,"tray");
  if(!sv){sv={shown:2,nat:0,pos:0,wrong:0,gs:[]};progSet(day,"tray",sv);}
  let {shown,nat,pos,wrong}=sv,gs=sv.gs.slice(),over=false;
  const cost=()=>10*(shown-2)+15*wrong;
  const hud=()=>{$("#gsc").textContent="Valor "+Math.max(10,100-cost())+" pts";};
  function save(){progSet(day,"tray",{shown,nat,pos,wrong,gs});}
  function draw(msg){
    hud();
    const rows=P.career.slice(0,shown);
    $("#gb").innerHTML=`<div class="mut" style="text-align:center;margin-top:8px">¿Quién es? Sus clubes, en orden</div>
    ${over?"":`<div class="tl">${rows.map(r=>`<div class="tli"><b style="min-width:82px">${esc(r.y)}</b><span>${esc(r.c)}</span></div>`).join("")}${shown<P.career.length?`<div class="tli mut"><b style="min-width:82px">?</b><span>${P.career.length-shown} club${P.career.length-shown===1?"":"es"} más</span></div>`:""}</div>
    <div class="row" style="margin:10px 0"><button class="btn ghost block" id="tmore" ${shown>=P.career.length?"disabled":""}>Otro club (−10)</button></div>`}
    ${gs.length?`<div class="mut" style="font-size:14px">Ya has probado: ${gs.map(esc).join(", ")}</div>`:""}
    ${over?"":INPUT_HTML}<div class="fb" id="fb">${msg||""}</div><div id="endbox"></div>`;
    if(msg==="¡Correcto!"){const f=$("#fb");f.style.cssText="text-align:center;font-size:30px;font-weight:900;color:#fff;background:var(--ok);border-radius:16px;padding:14px;margin:10px 0";}
    if(!over){
      $("#tmore").onclick=()=>{if(shown<P.career.length){shown++;save();draw();}};
      bindNameInput(raw=>suggestAny(raw),guess);
    }
  }
  function guess(raw){
    if(matchesName(raw,P)){over=true;const score=Math.max(10,100-cost());draw("¡Correcto!");finish(score,`Era ${P.n}`);return;}
    wrong++;gs.push(raw.trim());save();
    if(wrong>=3){over=true;draw("");finish(0,`Era ${P.n}`);return;}
    draw("No es. Pierdes 15 puntos.");
  }
  function finish(score,line){
    stopTimer();recordScore(day,"tray",score);$("#gsc").textContent="";
    const rows=P.career;
    $("#endbox").innerHTML=`<div class="tl">${rows.map(r=>`<div class="tli"><b style="min-width:82px">${esc(r.y)}</b><span>${esc(r.c)}</span></div>`).join("")}</div>
    <div class="mut" style="text-align:center">${esc(line)}</div><div class="big">${score}/100</div>${hoy?`<button class="btn block" id="e1">Compartir</button>`:""}<button class="btn block ghost" style="margin-top:10px" id="e2">Cerrar</button>`;
    const a=$("#e1");if(a)a.onclick=()=>share(shareText());
    $("#e2").onclick=closeGame;showPhoto(P.n);
  }
  if(wrong>=3){over=true;draw("");finish(0,`Era ${P.n}`);}
  else draw("");
}

/* ---------- Jugador misterioso ---------- */
function playMist(day){
  const hoy=day===today(),g=meta("mist"),MAXT=6,SC=[100,85,70,55,40,25];
  openGame(g.name+(hoy?" · hoy":" · "+dayLabel(day)),g.c);
  const list=DATA.MIST.players,pool=list.filter(p=>p.fame>=3);
  const T=chunkOfDay(pool,1,day)[0];
  let sv=progGet(day,"mist");
  if(!sv){sv={gs:[]};progSet(day,"mist",sv);}
  const gs=sv.gs.slice();let over=false;
  const find=raw=>{const q=norm(raw);if(!q)return null;
    return list.find(p=>matchesName(raw,p))||null;};
  const cell=(ok,txt,extra)=>`<div class="mc ${ok}">${esc(txt)}${extra||""}</div>`;
  function row(p){
    const dy=T.born-p.born;
    return `<div class="mrow"><div class="mn">${esc(p.n)}</div><div class="mcs">
      ${cell(p.country===T.country?"ok":"no",p.country)}${cell(p.league===T.league?"ok":"no",p.league)}${cell(p.club===T.club?"ok":"no",p.club)}${cell(p.pos===T.pos?"ok":"no",p.pos)}
      ${cell(dy===0?"ok":Math.abs(dy)<=2?"near":"no",String(p.born)," "+(dy>0?"↑":dy<0?"↓":""))}</div></div>`;
  }
  const hud=()=>{$("#gsc").textContent="Intento "+Math.min(gs.length+1,MAXT)+"/"+MAXT;};
  function draw(msg){
    hud();
    $("#gb").innerHTML=`<div class="mut" style="text-align:center;margin-top:8px">Adivina el jugador. Verde: coincide. Naranja: año cercano. Flecha: el secreto nació antes (↓) o después (↑).</div>
    <div class="mhead"><span>País</span><span>Liga</span><span>Club</span><span>Puesto</span><span>Nació</span></div>
    ${gs.map(n=>row(list.find(p=>p.n===n))).join("")}
    ${over?"":INPUT_HTML}<div class="fb" id="fb">${msg||""}</div><div id="endbox"></div>`;
    if(!over)bindNameInput(raw=>{const q=norm(raw);if(q.length<2)return [];return list.filter(p=>!gs.includes(p.n)&&(norm(p.n).includes(q)||(p.a||[]).some(a=>norm(a).startsWith(q)))).slice(0,6).map(p=>({n:p.n,sub:p.club}));},guess);
  }
  function guess(raw){
    const p=find(raw);
    if(!p){draw("No tengo a ese jugador en la lista. Elige uno de las sugerencias.");return;}
    if(gs.includes(p.n)){draw("Ya lo has probado.");return;}
    gs.push(p.n);progSet(day,"mist",{gs});
    if(p.n===T.n){over=true;draw("");finish(SC[gs.length-1],`Era ${T.n}, en ${gs.length} intento${gs.length===1?"":"s"}`);return;}
    if(gs.length>=MAXT){over=true;draw("");finish(0,`Era ${T.n}`);return;}
    draw("");
  }
  function finish(score,line){
    stopTimer();recordScore(day,"mist",score);$("#gsc").textContent="";
    $("#endbox").innerHTML=`<div class="mut" style="text-align:center;margin-top:14px">${esc(line)}</div><div class="big">${score}/100</div>${hoy?`<button class="btn block" id="e1">Compartir</button>`:""}<button class="btn block ghost" style="margin-top:10px" id="e2">Cerrar</button>`;
    const a=$("#e1");if(a)a.onclick=()=>share(shareText());
    $("#e2").onclick=closeGame;showPhoto(T.n);
  }
  if(gs.includes(T.n)){over=true;draw("");finish(SC[gs.length-1],`Era ${T.n}`);}
  else if(gs.length>=MAXT){over=true;draw("");finish(0,`Era ${T.n}`);}
  else draw("");
}

/* ---------- Fotos libres (Wikimedia Commons): solo al revelar la respuesta ---------- */
const PHOTOS={state:"idle",map:{},list:[]};
async function loadPhotos(){
  if(PHOTOS.state!=="idle")return;PHOTOS.state="loading";
  try{const r=await fetch("fotos/index.json");if(r.ok){const j=await r.json();for(const k in j){const e=Object.assign({k},j[k]);PHOTOS.map[norm(j[k].n)]=e;PHOTOS.list.push(e);}}}catch(e){}
  PHOTOS.state="ready";
}
async function photoCard(name){
  await loadPhotos();
  const e=PHOTOS.map[norm(name)],ini=name.split(" ").filter(Boolean).map(x=>x[0]).slice(0,2).join("").toUpperCase();
  return `<div class="photo">${e?`<img src="fotos/${esc(e.k)}.jpg" alt="${esc(name)}" width="72" height="72">`:`<div class="ph">${esc(ini)}</div>`}<div><b>${esc(name)}</b>${e?`<small>Foto: ${esc(e.artist||"autor desconocido")} · <a href="${esc(e.page)}" target="_blank" rel="noopener" style="color:var(--mut)">${esc(e.lic)}</a></small>`:""}</div></div>`;
}
function showPhoto(name){photoCard(name).then(h=>{const b=document.getElementById("endbox");if(b)b.insertAdjacentHTML("afterbegin",h);});}
