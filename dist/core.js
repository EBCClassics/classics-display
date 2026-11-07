/* Pure scheduling and validation; shared by the screen and the checks. */
(function(root){
'use strict';
const DAY=86400000, order=['welcome','tour','people','careers','news'];
function validDate(v){if(typeof v!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(v))return false;const d=new Date(v+'T12:00:00Z');return !isNaN(d)&&d.toISOString().slice(0,10)===v;}
function dateKey(now,timezone){const p=new Intl.DateTimeFormat('en-GB',{timeZone:timezone,year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);const v=k=>p.find(x=>x.type===k).value;return `${v('year')}-${v('month')}-${v('day')}`;}
function ordinal(key){return Math.floor(Date.parse(key+'T12:00:00Z')/DAY);}
function modulo(n,m){return ((n%m)+m)%m;}
function weekdayIndex(key){const day=ordinal(key),dow=new Date(key+'T12:00:00Z').getUTCDay();const monday=day-(dow+6)%7;return Math.floor((monday-4)/7)*5+Math.min((dow+6)%7,4);}
function dailyIndex(key,settings){return settings.schoolDaysOnly?weekdayIndex(key)-weekdayIndex(settings.anchorDate):ordinal(key)-ordinal(settings.anchorDate);}
function active(e,key){return (!e.from||e.from<=key)&&(!e.until||e.until>=key);}
// Gregorian Easter, following the US Naval Observatory's calendar algorithm.
function easterDate(year) {
 const century = Math.floor(year / 100);
 const goldenYear = year % 19;
 const correction = Math.floor((century - 17) / 25);
 let epact = modulo(century - Math.floor(century / 4) - Math.floor((century - correction) / 3) + 19 * goldenYear + 15, 30);
 epact -= Math.floor(epact / 28) * (1 - Math.floor(epact / 28) * Math.floor(29 / (epact + 1)) * Math.floor((21 - goldenYear) / 11));
 const weekday = modulo(year + Math.floor(year / 4) + epact + 2 - century + Math.floor(century / 4), 7);
 const offset = epact - weekday;
 const month = 3 + Math.floor((offset + 40) / 44);
 const day = offset + 28 - 31 * Math.floor(month / 4);
 return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}
function shiftDate(key, days) {
 return new Date(Date.parse(key + 'T12:00:00Z') + days * DAY).toISOString().slice(0, 10);
}
function eventWindow(event, year) {
 const window = event.window;
 if (window.rule === 'dated') return window.dates.find(range => range.from.startsWith(year + '-')) || null;
 if (window.rule === 'month') {
  const month = String(window.month).padStart(2, '0');
  return {from: `${year}-${month}-01`, until: new Date(Date.UTC(year, window.month, 0, 12)).toISOString().slice(0, 10)};
 }
 if (window.rule === 'easter') {
  const easter = easterDate(year);
  return {from: shiftDate(easter, window.before), until: shiftDate(easter, window.after)};
 }
 if (window.rule === 'remembrance') {
  const armistice = `${year}-11-11`;
  const weekday = new Date(armistice + 'T12:00:00Z').getUTCDay();
  return {from: `${year}-11-06`, until: shiftDate(armistice, (7 - weekday) % 7)};
 }
 const from = `${year}-${window.start}`;
 const until = `${year + (window.end < window.start ? 1 : 0)}-${window.end}`;
 return {from, until};
}
function selectEvent(events, key, turn = 0) {
 const year = Number(key.slice(0, 4));
 const available = events.filter(event => [year - 1, year].some(y => {
  const range = eventWindow(event, y);
  return range && active(range, key);
 }));
 if (!available.length) return null;
 const priority = Math.max(...available.map(event => event.priority));
 const pool = available.filter(event => event.priority === priority);
 return pool[modulo(Number.isSafeInteger(turn) ? turn : 0, pool.length)] || null;
}
function validate(d){
 const fail=m=>{throw new Error(m);};
 const text=(v,max,name)=>{if(typeof v!=='string'||!v.trim()||v.length>max)fail('Invalid '+name);};
 if(!d||d.version!==1||!d.settings)fail('Unsupported content version');
 const s=d.settings;text(s.school,50,'school');text(s.department,50,'department');if(!validDate(s.anchorDate))fail('Invalid anchorDate');
 try{new Intl.DateTimeFormat('en-GB',{timeZone:s.timezone}).format();}catch{fail('Invalid timezone');}
 if(typeof s.schoolDaysOnly!=='boolean'||!Number.isInteger(s.newsMaxAgeDays)||s.newsMaxAgeDays<1||s.newsMaxAgeDays>90)fail('Invalid settings');
 for(const k of order)if(!Number.isFinite(s.durations?.[k])||s.durations[k]<5||s.durations[k]>120)fail('Invalid duration '+k);
 const keys=['welcomes','sites','people','careers','news'];
 const fields={welcomes:{title:70,greeting:60,body:80,question:130,caption:110},sites:{title:35,location:30,landmark:65,period:65,body:230,question:130,gullLine:105,caption:110,sourceLabel:100},people:{title:40,role:75,body:230,connection:130,question:130,caption:110,sourceLabel:100},careers:{title:35,lead:65,body:230,challenge:140,note:130},news:{title:65,body:280,why:170,caption:130,publishedLabel:60,sourceLabel:100}};
 for(const key of keys){
  const rows=d[key];if(!Array.isArray(rows)||rows.length<1||rows.length>100)fail('Invalid '+key);const ids=new Set();
  for(const e of rows){text(e.id,60,'id');if(!/^[a-z0-9-]+$/.test(e.id)||ids.has(e.id))fail('Invalid or duplicate id');ids.add(e.id);
   for(const [f,max] of Object.entries(fields[key]))text(e[f],max,key+'.'+f);
   for(const f of ['from','until'])if(e[f]&&!validDate(e[f]))fail('Invalid '+f);if(e.from&&e.until&&e.from>e.until)fail('Reversed range');
   if(key!=='careers'){text(e.imageAlt,180,'imageAlt');if(typeof e.image!=='string'||!/^assets\/[a-z0-9_./-]+\.(jpg|png|webp|svg)$/.test(e.image)||e.image.includes('..'))fail('Use a local image under assets/');}
   if(['sites','people','news'].includes(key)){try{if(new URL(e.sourceUrl).protocol!=='https:')fail('Invalid source URL');}catch{fail('Invalid source URL');}}
   if(key==='sites'&&![e.mapX,e.mapY].every(n=>Number.isFinite(n)&&n>=0&&n<=100))fail('Invalid map position');
   if(key==='careers'&&(!Array.isArray(e.skills)||e.skills.length!==3||e.skills.some(v=>typeof v!=='string'||v.length>24)))fail('Three short skills required');
   if(key==='news'&&(!['archive','news'].includes(e.mode)||!validDate(e.published)))fail('Invalid news date or mode');
   if(key==='news'&&e.feedExtract!==undefined&&typeof e.feedExtract!=='boolean')fail('Invalid feed extract flag');
  }
  if(!rows.some(e=>!e.from&&!e.until&&(key!=='news'||e.mode==='archive')))fail('Keep an undated fallback in '+key);
 }
 if(d.newsStatus){const n=d.newsStatus;
  if(typeof n.lastSuccess!=='string'||!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(n.lastSuccess)||isNaN(Date.parse(n.lastSuccess)))fail('Invalid source check time');
  for(const k of ['sources','failedSources'])if(!Array.isArray(n[k])||n[k].length>10||n[k].some(v=>typeof v!=='string'||v.length>100))fail('Invalid source status');
  if(n.latestPublication!==null&&!validDate(n.latestPublication))fail('Invalid latest publication');
 }
 // Optional so content cached by earlier releases remains valid.
 if (d.events !== undefined) {
  if (!Array.isArray(d.events) || d.events.length > 60) fail('Invalid event calendar');
  const eventIds = new Set();
  for (const event of d.events) {
   text(event.id, 60, 'event id');
   if (!/^[a-z0-9-]+$/.test(event.id) || eventIds.has(event.id)) fail('Invalid or duplicate event id');
   eventIds.add(event.id);
   const fields = {title: 60, body: 140, kind: 30, observance: 100, displayWindow: 150, sourceLabel: 100, imageAlt: 150};
   for (const [field, limit] of Object.entries(fields)) text(event[field], limit, 'event ' + field);
   if (!Number.isInteger(event.priority) || event.priority < 0 || event.priority > 100) fail('Invalid event priority');
   if (typeof event.image !== 'string' || !/^assets\/seasons\/[a-z0-9-]+\.svg$/.test(event.image)) fail('Invalid event image');
   if (event.borderImage !== undefined && (typeof event.borderImage !== 'string' || !/^assets\/seasons\/[a-z0-9-]+\.(svg|png|webp)$/.test(event.borderImage))) fail('Invalid seasonal border');
   if (event.designName !== undefined) text(event.designName, 32, 'event design name');
   if (event.explanation !== undefined && (typeof event.explanation !== 'string' || event.explanation.length > 110)) fail('Invalid seasonal explanation');
   if (event.accent !== undefined && (typeof event.accent !== 'string' || !/^#[0-9A-Fa-f]{6}$/.test(event.accent))) fail('Invalid seasonal colour');
   try {
    if (new URL(event.sourceUrl).protocol !== 'https:') fail('Invalid event source');
   } catch {
    fail('Invalid event source');
   }
   const window = event.window;
   if (!window || !['fixed', 'easter', 'remembrance', 'month', 'dated'].includes(window.rule)) fail('Invalid event window');
   if (window.rule === 'month' && (!Number.isInteger(window.month) || window.month < 1 || window.month > 12)) fail('Invalid event month');
   if (window.rule === 'dated') {
    if (!Array.isArray(window.dates) || !window.dates.length || window.dates.length > 50) fail('Invalid confirmed event dates');
    const years = new Set();
    for (const range of window.dates) {
     if (!validDate(range.from) || !validDate(range.until) || range.from > range.until || years.has(range.from.slice(0, 4))) fail('Invalid confirmed event range');
     years.add(range.from.slice(0, 4));
    }
   }
   if (window.rule === 'fixed' && ![window.start, window.end].every(date =>
    typeof date === 'string' && /^\d{2}-\d{2}$/.test(date) && validDate('2001-' + date)
   )) fail('Invalid annual event date');
   if (window.rule === 'easter' && (
    ![window.before, window.after].every(days => Number.isInteger(days) && Math.abs(days) <= 30)
    || window.before > window.after
   )) fail('Invalid Easter window');
  }
 }
 if(!Array.isArray(d.schedule)||d.schedule.length>1000)fail('Invalid schedule');const seen=new Set();
 for(const row of d.schedule){if(!validDate(row.date)||seen.has(row.date))fail('Invalid or duplicate schedule date');seen.add(row.date);
  for(const [f,k] of Object.entries({welcome:'welcomes',site:'sites',person:'people',career:'careers',news:'news'}))if(row[f]&&!d[k].some(e=>e.id===row[f]))fail('Unknown scheduled '+f);
 }
 return d;
}
function selectDay(d,key,cycle=0){
 const n=dailyIndex(key,d.settings), turn=Number.isSafeInteger(cycle)?cycle:0, schedule=d.schedule.find(e=>e.date===key)||{};
 function pick(category,scheduled,step=1){const available=d[category].filter(e=>active(e,key));const fixed=available.findIndex(e=>e.id===scheduled);return available[modulo((fixed>=0?fixed:n*step)+turn*step,available.length)];}
 const live=d.news.filter(e=>e.mode==='news'&&active(e,key)&&e.published<=key&&ordinal(key)-ordinal(e.published)<=d.settings.newsMaxAgeDays);
 const archived=d.news.filter(e=>e.mode==='archive'&&e.published<=key&&active(e,key));
 const newsPool=live.length?live:archived, fixed=newsPool.findIndex(e=>e.id===schedule.news);
 const news=newsPool[modulo((fixed>=0?fixed:n)+turn,newsPool.length)]||null;
 const people=pick('people',schedule.person,2), peoplePool=d.people.filter(e=>active(e,key)), next=peoplePool[(peoplePool.indexOf(people)+1)%peoplePool.length];
 return {welcome:pick('welcomes',schedule.welcome),tour:pick('sites',schedule.site),people,peoplePair:[people,...(next&&next!==people?[next]:[])],careers:pick('careers',schedule.career),news};
}
const api={DAY,order,validDate,dateKey,ordinal,dailyIndex,validate,selectDay,easterDate,eventWindow,selectEvent};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.Classics=api;
})(typeof globalThis!=='undefined'?globalThis:this);
