(function(){
'use strict';
const C=window.Classics, params=new URLSearchParams(location.search), names=['Welcome','Gulliver on Tour','They studied Classics','Careers','Classical news'];
const $=id=>document.getElementById(id), esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])), lines=v=>esc(v).replace(/\n/g,'<br>');
let data=C.validate(window.SEEDED_CONTENT), contentSource='Bundled seed', dateOverride=C.validDate(params.get('date'))?params.get('date'):null;
let index=Math.max(0,C.order.indexOf(params.get('screen'))), paused=params.get('pause')==='1', speed=[1,4,10].includes(Number(params.get('speed')))?Number(params.get('speed')):1;
let lastKey='', day, elapsed=0, lastTick=performance.now(), loading=false, notice='', imageFailures=0, offlineReady=false;
const cacheKey='classics-display-content-v2';
const seasonalMotion=window.SeasonalMotion?.create($('seasonal-art'));
let cycle=/^\d+$/.test(params.get('cycle')||'')?Number(params.get('cycle')):Math.floor(Date.now()/(Object.values(data.settings.durations).reduce((a,b)=>a+b,0)*1000));
function scale(){const factor=Math.min(innerWidth/1920,innerHeight/1080);$('stage').style.transform=`scale(${factor})`; $('viewport').style.width=innerWidth+'px';$('viewport').style.height=innerHeight+'px';}
function key(){return dateOverride||C.dateKey(new Date(),data.settings.timezone);}
function photo(e,cls=''){return `<div class="image-wrap ${cls}"><img class="photo" src="${esc(e.image)}" alt="${esc(e.imageAlt)}"></div>`;}
function caption(e){return `<figcaption class="caption">${esc(e.caption)}</figcaption>`;}
function source(e){return `<p class="source">Source: <a href="${esc(e.sourceUrl)}" target="_blank" rel="noopener">${esc(e.sourceLabel)}</a></p>`;}
function question(q,label='Something to think about'){return `<div class="question-block"><span class="question-label">${esc(label)}</span><p class="question">${esc(q)}</p></div>`;}
function heading(label,extra=''){return `<div class="section-heading"><p class="eyebrow">${esc(label)}</p>${extra}</div>`;}
function renderSeason(key) {
 const events = data.events ?? window.SEEDED_CONTENT.events ?? [];
 const event = C.selectEvent(events, key, cycle * C.order.length + index);
 const artwork = window.SEEDED_CONTENT.events?.find(row => row.id === event?.id);
 const requestedBorder = event?.borderImage ?? artwork?.borderImage;
 // Saved drafts may still name the superseded photographic-style poppies.
 const borderImage = requestedBorder === 'assets/seasons/poppy-bold.png' ? 'assets/seasons/poppy-flowing.svg' : requestedBorder;
 $('stage').classList.toggle('has-season', !!event);
 $('stage').dataset.season = event?.id || '';
 $('stage').dataset.seasonArt = borderImage?.split('/').pop().replace(/\.(svg|png|webp)$/, '') || '';
 $('stage').style.setProperty('--season-accent', event?.accent ?? artwork?.accent ?? '#FF2DAA');
 $('seasonal-art').hidden = !event;
 $('seasonal').hidden = true;
 $('rotation').hidden = !!event;
 $('current-screen').hidden = true;
 $('current-screen').textContent = names[index];
 if (!event) {
  seasonalMotion?.set(null);
  $('seasonal').replaceChildren();
  $('seasonal-art').replaceChildren();
  $('seasonal-art').dataset.image = '';
  return;
 }
 const explanation = event.explanation ?? artwork?.explanation ?? (event.kind.startsWith('Roman') ? event.body : '');
 $('seasonal').hidden = !explanation;
 $('seasonal').innerHTML = explanation ? `<p class="seasonal-explanation">${esc(explanation)}</p>` : '';
 const designName = event.designName ?? artwork?.designName ?? '';
 const artSource = designName ? `assets/seasons/${event.id}-named.svg` : borderImage || event.image;
 const animated = seasonalMotion?.set(borderImage || event.image, designName);
 if ($('seasonal-art').dataset.image !== artSource) {
  if (!animated) $('seasonal-art').innerHTML = borderImage
   ? `<img class="seasonal-border" src="${esc(artSource)}" alt="">`
   : `<img class="seasonal-legacy" src="${esc(event.image)}" alt="">`;
  $('seasonal-art').dataset.image = artSource;
 }
}
const careerArt=`<svg viewBox="0 0 350 280" role="img" aria-label="An open book leading to new possibilities" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M175 235V95M175 105q-50-42-122-16v135q72-26 122 16 50-42 122-16V89q-72-26-122 16Z" stroke="#FF2DAA" stroke-width="6"/><path d="M78 121q42-8 70 11m-70 24q42-8 70 11m-70 24q42-8 70 11m55-70q28-19 70-11m-70 46q28-19 70-11m-70 46q28-19 70-11M175 62V22m-45 47-24-24m113 24 24-24" stroke="#F4FF47" stroke-width="5"/></svg>`;
function render(){
 const k=key();day=C.selectDay(data,k,cycle);lastKey=k;const type=C.order[index],e=day[type];let html='';
 if(type==='welcome')html=`<section class="screen welcome enter"><div class="welcome-copy"><p class="eyebrow">Welcome to Classics</p><h1>${lines(e.title).replace(/<br>(.*)/,'<br><em>$1</em>')}</h1><p class="body">${esc(e.body)}</p><p class="greeting">${esc(e.greeting)}</p>${question(e.question,'A question for today')}</div><figure class="welcome-art"><div class="frame-line"></div>${photo(e)}${caption(e)}<span class="welcome-sticker">A world worth exploring.</span></figure></section>`;
 if(type==='tour')html=`<section class="screen tour enter">${heading('Gulliver on Tour!',`<span class="series">The Eastbourne Gull explores the ancient world</span>`)}<div class="tour-grid"><figure class="tour-visual">${photo(e)}<div class="gull-card"><img src="assets/gulliver.svg" alt="Gulliver the Eastbourne Gull wearing his explorer's hat and pink scarf"><p class="gull-bubble">${esc(e.gullLine)}</p></div>${caption(e)}</figure><div class="tour-copy"><p class="tour-country">This stop · ${esc(e.location)}</p><h1>${esc(e.title)}</h1><p class="landmark">${esc(e.landmark)}</p><span class="tag">${esc(e.period)}</span><p class="body">${esc(e.body)}</p>${question(e.question,'Gulliver wonders…')}${source(e)}</div></div><div class="itinerary" aria-label="Seeded destinations">${Array.from({length:Math.min(5,data.sites.length)},(_,i)=>data.sites[(data.sites.indexOf(e)+i)%data.sites.length]).map(s=>`<span class="${s.id===e.id?'current':''}">${esc(s.title)}</span>`).join('')}</div></section>`;
 if(type==='people')html=`<section class="screen people enter">${heading('They studied Classics','<span class="series">Different degrees. Remarkable careers.</span>')}<div class="graduates-grid">${day.peoplePair.map(p=>`<article class="graduate-card"><figure>${photo(p)}${caption(p)}</figure><div class="graduate-copy"><p class="person-role">${esc(p.role)}</p><h1>${esc(p.title)}</h1><p class="connection">${esc(p.connection)}</p><p class="body">${esc(p.body)}</p>${source(p)}</div></article>`).join('')}</div><p class="people-footnote">Greek and Latin can be the beginning of a much wider story.</p></section>`;
 if(type==='careers')html=`<section class="screen careers enter">${heading('Where can Classics take you?','<span class="series">Skills you can take further</span>')}<div class="career-grid"><div><p class="career-label">${esc(e.title)}</p><h1>${lines(e.lead)}</h1><p class="body">${esc(e.body)}</p><div class="skills">${e.skills.map(s=>`<span>${esc(s)}</span>`).join('')}</div><p class="career-note">${esc(e.note)}</p></div><div class="career-panel">${careerArt}${question(e.challenge,'Try this thought')}</div></div></section>`;
 if(type==='news'&&e){const archive=e.mode==='archive';html=`<section class="screen news enter">${heading('Classics in the news',`<span class="archive-tag">${archive?'From the archive':'Recent discoveries'}</span>`)}<div class="news-grid"><div><h1>${lines(e.title)}</h1><p class="news-date">Reported: ${esc(e.publishedLabel)}</p><p class="body">${esc(e.body)}</p><div class="why"><span class="question-label">Why it matters</span><p class="question">${esc(e.why)}</p></div>${source(e)}${e.feedExtract?'<p class="extract-note">Short source extract · follow the source for the full report.</p>':''}</div><figure class="news-image">${photo(e)}${caption(e)}${archive?'<p class="archive-note">An older discovery, with its original report date.</p>':''}<p class="news-check">${data.newsStatus?.lastSuccess?'Sources checked: '+esc(data.newsStatus.lastSuccess.slice(0,10)):''}</p></figure></div></section>`;}
 if(type==='news'&&!e)html=`<section class="screen empty-news">${heading('Classics in the news')}<h1>A story worth checking.</h1><p>No sourced story is available for this preview date.</p><p class="archive-note">The display will continue to the welcome screen.</p></section>`;
 $('screen').innerHTML=html;
 renderSeason(k);
 document.querySelector('.college').textContent=data.settings.school;document.querySelector('.identity span:last-child').textContent=data.settings.department;
 $('screen').querySelectorAll('img').forEach(img=>img.addEventListener('error',()=>{if(!img.dataset.fallback){img.dataset.fallback='1';img.src=img.src.includes('gulliver.svg')?'assets/fallback.svg':'assets/fallback.svg';img.alt='Illustrated fallback: an ancient temple';const caption=img.closest('figure')?.querySelector('.caption');if(caption)caption.textContent='Image unavailable · illustrated fallback';imageFailures++;diagnostics();}},{once:true}));
 $('rotation').innerHTML=names.map((n,i)=>`<span class="rotation-item ${i===index?'active':''}" ${i===index?'aria-current="step"':''}><b>${String(i+1).padStart(2,'0')}</b>${n}</span>`).join('');
 $('counter').textContent=String(index+1).padStart(2,'0')+' / 05';$('screen-select').value=type;elapsed=0;updateClock();updatePlay();diagnostics();
}
function updateClock(){const now=new Date(), preview=new Date(key()+'T12:00:00Z');$('date').textContent=new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'long',weekday:'short',timeZone:'UTC'}).format(preview);$('clock').textContent=new Intl.DateTimeFormat('en-GB',{hour:'2-digit',minute:'2-digit',hourCycle:'h23',timeZone:data.settings.timezone}).format(now);}
function updatePlay(){$('stage').classList.toggle('is-paused',paused);seasonalMotion?.pause(paused);$('pause').textContent=paused?'Play':'Pause';$('pause').setAttribute('aria-pressed',String(paused));$('play-state').textContent=paused?'Paused':dateOverride?'Preview date':speed!==1?`${speed}× test speed`:'Auto-advancing';}
function diagnostics(){$('diagnostics').textContent=`${contentSource} · loop ${cycle} · ${key()}${dateOverride?' (preview)':''} · ${navigator.onLine?'Online':'Offline'} · ${offlineReady?'Offline cache ready':'Offline cache not confirmed'}${imageFailures?' · '+imageFailures+' image fallback(s)':''}${notice?' · '+notice:''}`;}
function go(delta){if(index===4&&delta>0)cycle++;if(index===0&&delta<0)cycle=Math.max(0,cycle-1);index=(index+delta+5)%5;render();}
function pause(){paused=!paused;lastTick=performance.now();updatePlay();}
function controls(show){$('controls').hidden=show===undefined?!$('controls').hidden:!show;if(!$('controls').hidden)$('pause').focus();}
function fullscreen(){const action=document.fullscreenElement?document.exitFullscreen?.():document.documentElement.requestFullscreen?.();if(action?.catch)action.catch(()=>{notice='Full screen unavailable in this panel; use player full screen.';diagnostics();});}
async function loadContent(){if(loading)return;loading=true;const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),4000);try{
 const response=await fetch('content.json',{cache:'no-store',signal:controller.signal});if(!response.ok)throw Error('Content unavailable');const next=C.validate(await response.json());
 data=next;contentSource='Editable content.json';notice='';try{localStorage.setItem(cacheKey,JSON.stringify(next));}catch{}render();
 }catch{notice='Content unavailable or invalid; keeping valid content.';diagnostics();}finally{clearTimeout(timeout);loading=false;}}
try{const saved=localStorage.getItem(cacheKey);if(saved){data=C.validate(JSON.parse(saved));contentSource='Last valid saved content';}}catch{}
$('screen-select').innerHTML=C.order.map((s,i)=>`<option value="${s}">${names[i]}</option>`).join('');$('screen-select').addEventListener('change',e=>{index=C.order.indexOf(e.target.value);render();});
$('pause').onclick=pause;$('prev').onclick=()=>go(-1);$('next').onclick=()=>go(1);$('fullscreen').onclick=fullscreen;$('close-controls').onclick=()=>controls(false);$('reload-content').onclick=loadContent;
$('test-date').value=dateOverride||key();$('test-date').onchange=e=>{if(C.validDate(e.target.value)){dateOverride=e.target.value;render();}};
$('today').onclick=()=>{dateOverride=null;$('test-date').value=key();render();};$('speed').value=String(speed);$('speed').onchange=e=>{speed=Number(e.target.value);updatePlay();};
window.addEventListener('keydown',e=>{if(e.target.matches('input,select,textarea,button,a')){if(e.key==='Escape')controls(false);return;}if([' ','ArrowRight','ArrowLeft'].includes(e.key))e.preventDefault();if(e.key===' ')pause();if(e.key==='ArrowRight')go(1);if(e.key==='ArrowLeft')go(-1);if(/^[1-5]$/.test(e.key)){index=Number(e.key)-1;render();}if(e.key.toLowerCase()==='c')controls();if(e.key.toLowerCase()==='f')fullscreen();if(e.key==='Escape')controls(false);});
window.addEventListener('resize',scale);window.addEventListener('online',()=>{diagnostics();loadContent();});window.addEventListener('offline',diagnostics);
document.addEventListener('visibilitychange',()=>{lastTick=performance.now();if(!document.hidden){if(lastKey!==key())render();updateClock();}});
scale();render();if(params.get('controls')==='1')controls(true);loadContent();
setInterval(()=>{const now=performance.now(),delta=now-lastTick;lastTick=now;if(lastKey!==key())render();updateClock();if(!paused&&!document.hidden){elapsed+=Math.min(delta,1000)*speed;const duration=data.settings.durations[C.order[index]]*1000;if(elapsed>=duration)go(1);}const duration=data.settings.durations[C.order[index]]*1000;$('progress').style.width=Math.min(100,elapsed/duration*100)+'%';},100);
setInterval(loadContent,15*60*1000);
if('serviceWorker' in navigator&&location.protocol!=='file:'&&params.get('nosw')!=='1')navigator.serviceWorker.register('sw.js').then(async()=>{await navigator.serviceWorker.ready;const c=await caches.open('classics-display-v3');offlineReady=!!(await c.match(new URL('index.html',location.href).href));diagnostics();}).catch(()=>{notice='Player does not support offline caching; page still rotates while loaded.';diagnostics();});
})();
