const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');

function player(reduce=false, available=true) {
 const frames=new Map(), listeners={}, reduced={matches:reduce,addEventListener:(name,fn)=>listeners.motion=fn};
 let id=0, replacements=0, clears=0;
 const context=new Proxy({}, {get:(_,name)=>name==='clearRect'?()=>clears++:()=>{}});
 const canvas={setAttribute(){},getContext:()=>available?context:null};
 const document={hidden:false,createElement:()=>canvas,addEventListener:(name,fn)=>listeners[name]=fn};
 const window={matchMedia:()=>reduced,SeasonalDrawing:require('../dist/seasonal-drawing.js')};
 vm.runInNewContext(fs.readFileSync(require.resolve('../dist/seasonal-motion.js'),'utf8'),{
  window,document,requestAnimationFrame:fn=>{frames.set(++id,fn);return id;},cancelAnimationFrame:id=>frames.delete(id)
 });
 const art=window.SeasonalMotion.create({replaceChildren(){replacements++;}});
 return {art,frames,document,reduced,listeners,get replacements(){return replacements;},get clears(){return clears;},
  tick(now){const [id,fn]=frames.entries().next().value;frames.delete(id);fn(now);}};
}

test('decorative motion stops for pause, background and reduced-motion preferences',()=>{
 const p=player();
 assert.equal(p.art.set('assets/seasons/pride-border.svg'),true);
 p.tick(10); p.tick(50);
 assert.ok(p.clears>1);
 p.art.pause(true); assert.equal(p.frames.size,0);
 p.art.pause(false); assert.equal(p.frames.size,1);
 p.document.hidden=true; p.listeners.visibilitychange(); assert.equal(p.frames.size,0);
 p.document.hidden=false; p.listeners.visibilitychange(); assert.equal(p.frames.size,1);
 p.reduced.matches=true; p.listeners.motion(); assert.equal(p.frames.size,0);
 p.reduced.matches=false; p.listeners.motion(); assert.equal(p.frames.size,1);
 p.art.set(null); assert.equal(p.frames.size,0);
});

test('same seasonal artwork survives screen changes and static fallbacks remain available',()=>{
 const p=player(true);
 assert.equal(p.art.set('assets/seasons/poppy-flowing.svg'),true);
 assert.equal(p.frames.size,0);
 p.art.set('assets/seasons/poppy-flowing.svg');
 assert.equal(p.replacements,1);
 assert.equal(p.art.set('assets/seasons/custom-border.svg'),false);
 assert.equal(player(false,false).art.set('assets/seasons/pride-border.svg'),false);
});


test('all scheduled treatments have finite animated drawings and matching static fallbacks',()=>{
 const art=require('../dist/seasonal-drawing.js'), SVG=require('../scripts/seasonal-art.cjs');
 const content=require('../dist/content.json');
 const names=[...new Set(content.events.map(e=>e.borderImage.split('/').pop().replace('.svg','')))];
 assert.equal(names.length,18);
 for(const name of names){
  const a=new SVG(),b=new SVG();art.draw(name,a,0);art.draw(name,b,2);
  assert.ok(a.output.length>0,name);
  assert.doesNotMatch(a.output.join(''),/NaN|undefined|Infinity/,name);
  assert.doesNotMatch(b.output.join(''),/NaN|undefined|Infinity/,name);
  assert.notDeepEqual(a.output,b.output,name+' should move');
  const fallback=fs.readFileSync(require.resolve('../dist/assets/seasons/'+name+'.svg'),'utf8');
  assert.ok(fallback.includes(a.output.join('')),name+' static fallback should match the moving artwork');
 }
});

test('ancient names appear in matching generated artwork without resetting the canvas',()=>{
 const art=require('../dist/seasonal-drawing.js'), SVG=require('../scripts/seasonal-art.cjs');
 const events=require('../dist/content.json').events;
 const named=events.filter(e=>e.designName);assert.equal(named.length,11);
 for(const e of named){
  const ctx=new SVG(),type=e.borderImage.split('/').pop().replace('.svg','');
  art.draw(type,ctx,0,{label:e.designName,named:true});
  assert.ok(ctx.output.join('').includes(e.designName.toUpperCase()),e.id);
  assert.ok(fs.readFileSync(require.resolve('../dist/assets/seasons/'+e.id+'-named.svg'),'utf8').includes(ctx.output.join('')),e.id);
 }
 assert.equal(events.find(e=>e.id==='christmas').designName,'Saturnalia');
 assert.ok(events.filter(e=>e.kind.startsWith('Modern')).every(e=>!e.designName));
 const p=player(true);p.art.set('assets/seasons/roman-border.svg','Kalends of January');
 p.art.set('assets/seasons/roman-border.svg','Lupercalia');assert.equal(p.replacements,1);
});
