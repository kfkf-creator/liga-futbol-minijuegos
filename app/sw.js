/* Service worker de la app de minijuegos. VERSION se sustituye al compilar (hash de la pagina).
   - Pagina: red primero (4 s de limite) y cache si no hay conexion.
   - Nombres de jugadores (../top10/entidades/*.json): cache primero, se refresca por detras.
   - Llamadas al servidor de ligas (otro origen): no se tocan. */
const VERSION="17a20bfe87";
const CORE="minijuegos-core-"+VERSION;
const DATA="minijuegos-data";
const CORE_FILES=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","apple-touch-icon.png"];
self.addEventListener("install",e=>{ e.waitUntil(caches.open(CORE).then(c=>c.addAll(CORE_FILES)).then(()=>self.skipWaiting())); });
self.addEventListener("activate",e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith("minijuegos-core-")&&k!==CORE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
const timeout=ms=>new Promise((_,rej)=>setTimeout(()=>rej(new Error("timeout")),ms));
self.addEventListener("fetch",e=>{
  const req=e.request;
  if(req.method!=="GET") return;
  const url=new URL(req.url);
  if(url.origin!==location.origin) return;
  if(url.pathname.includes("/entidades/")){
    e.respondWith(caches.open(DATA).then(async cache=>{
      const hit=await cache.match(req);
      const net=fetch(req).then(r=>{ if(r.ok) cache.put(req,r.clone()); return r; }).catch(()=>null);
      return hit||(await net)||Response.error();
    }));
    return;
  }
  if(!url.pathname.includes("/app/")) return;
  e.respondWith((async()=>{
    const cache=await caches.open(CORE);
    try{
      const r=await Promise.race([fetch(req),timeout(4000)]);
      if(r&&r.ok) cache.put(req,r.clone());
      return r;
    }catch(err){
      const hit=await cache.match(req,{ignoreSearch:true});
      if(hit) return hit;
      if(req.mode==="navigate"){ const idx=await cache.match("index.html"); if(idx) return idx; }
      return Response.error();
    }
  })());
});
