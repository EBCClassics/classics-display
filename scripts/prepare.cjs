const fs=require('node:fs'),path=require('node:path'),C=require('../dist/core.js');
const base=path.join(__dirname,'../dist'),data=C.validate(JSON.parse(fs.readFileSync(path.join(base,'content.json'),'utf8')));
fs.writeFileSync(path.join(base,'seed.js'),'/* Generated fallback from content.json. Run node scripts/prepare.cjs after editing. */\nwindow.SEEDED_CONTENT = '+JSON.stringify(data,null,2)+';\n');
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.relative(base,path.join(dir,e.name)).split(path.sep).join('/')]);
const assets=walk(base).filter(f=>!['sw.js','_headers','.nojekyll'].includes(f));
// Bump cache version when changing bundled assets. Install completes only after all assets are cached.
const sw=`const CACHE='classics-display-v2', ASSETS=${JSON.stringify(assets)};
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('classics-display-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
 const u=new URL(e.request.url),root=new URL('./',self.location.href);if(e.request.method!=='GET'||u.origin!==root.origin||!u.pathname.startsWith(root.pathname))return;
 const rel=u.pathname.slice(root.pathname.length);if(e.request.mode!=='navigate'&&!ASSETS.includes(rel))return;
 const fallback=e.request.mode==='navigate'?new URL('index.html',root).href:new URL(rel,root).href;
 e.respondWith((async()=>{const cache=await caches.open(CACHE);try{const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),3500);let r;try{r=await fetch(e.request,{signal:controller.signal});}finally{clearTimeout(timer);}if(r.ok){await cache.put(fallback,r.clone());return r;}const old=await cache.match(fallback);return old||r;}catch{return (await cache.match(fallback))||Response.error();}})());
});\n`;
fs.writeFileSync(path.join(base,'sw.js'),sw);console.log('Validated content; generated seed and offline asset list ('+assets.length+' files).');
