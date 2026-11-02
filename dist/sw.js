const CACHE='classics-display-v1', ASSETS=["app.js","assets/athens.jpg","assets/credits.json","assets/delphi.jpg","assets/ephesus.jpg","assets/fallback.svg","assets/fonts/FONT_LICENSE.txt","assets/fonts/NimbusRoman-Regular.otf","assets/fonts/NimbusSans-Bold.otf","assets/fonts/NimbusSans-Regular.otf","assets/gulliver.svg","assets/mary.jpg","assets/natalie.jpg","assets/pompeii.jpg","assets/rome.jpg","content.json","core.js","credits.css","credits.html","index.html","seed.js","styles.css"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('classics-display-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
 const u=new URL(e.request.url),root=new URL('./',self.location.href);if(e.request.method!=='GET'||u.origin!==root.origin||!u.pathname.startsWith(root.pathname))return;
 const rel=u.pathname.slice(root.pathname.length);if(e.request.mode!=='navigate'&&!ASSETS.includes(rel))return;
 const fallback=e.request.mode==='navigate'?new URL('index.html',root).href:new URL(rel,root).href;
 e.respondWith((async()=>{const cache=await caches.open(CACHE);try{const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),3500);let r;try{r=await fetch(e.request,{signal:controller.signal});}finally{clearTimeout(timer);}if(r.ok){await cache.put(fallback,r.clone());return r;}const old=await cache.match(fallback);return old||r;}catch{return (await cache.match(fallback))||Response.error();}})());
});
