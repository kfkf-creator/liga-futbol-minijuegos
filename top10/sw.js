/* Service worker del Top 10 Fútbol. VERSION se sustituye al compilar (hash del juego).
   - Juego y página: red primero (con tiempo límite) y caché si no hay conexión, así las actualizaciones llegan rápido.
   - Ficheros de nombres (entidades/*.json): caché primero y se refrescan por detrás. */
const VERSION="0b45f58ed8";
const CORE="top10-core-"+VERSION;
const DATA="top10-data";
const CORE_FILES=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","apple-touch-icon.png"];

self.addEventListener("install",e=>{
  e.waitUntil(caches.open(CORE).then(c=>c.addAll(CORE_FILES)).then(()=>self.skipWaiting()));
});
self.addEventListener("activate",e=>{
  e.waitUntil(
    caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith("top10-core-")&&k!==CORE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

function timeout(ms){ return new Promise((_,rej)=>setTimeout(()=>rej(new Error("timeout")),ms)); }

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
  e.respondWith((async()=>{
    const cache=await caches.open(CORE);
    try{
      const r=await Promise.race([fetch(req,{cache:"no-cache"}),timeout(4000)]);   /* revalida siempre: GitHub Pages sirve con max-age=600 y se quedaba la versión vieja */
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
