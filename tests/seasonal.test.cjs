const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const C = require('../dist/core.js');
const content = require('../dist/content.json');
const events = content.events;
const event = id => events.find(row => row.id === id);

test('seasonal calendar validates and every illustration is bundled', () => {
 C.validate(content);
 assert.equal(events.length, 30);
 for (const row of events) {
  for (const image of [row.image, row.borderImage]) assert.ok(fs.existsSync(path.join(__dirname, '../dist', image)), image);
 }
});

test('older content without a seasonal calendar still validates', () => {
 const oldContent = structuredClone(content);
 delete oldContent.events;
 assert.equal(C.validate(oldContent), oldContent);
 assert.equal(C.selectEvent([], '2026-11-07'), null);
});

test('the application renders bundled events when saved content predates the calendar', () => {
 const vm = require('node:vm');
 const oldContent = structuredClone(content);
 delete oldContent.events;
 const elements = new Map();
 const element = id => {
  if (!elements.has(id)) elements.set(id, {
   innerHTML:'', style:{setProperty(){}}, dataset:{}, classList:{toggle(){}},
   addEventListener(){}, setAttribute(){}, querySelectorAll(){return [];}, focus(){}
  });
  return elements.get(id);
 };
 vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../dist/app.js'), 'utf8'), {
  window:{Classics:C, SEEDED_CONTENT:content, addEventListener(){}},
  document:{getElementById:element, querySelector:element, addEventListener(){}},
  location:{search:'?date=2026-11-07&cycle=0&pause=1', protocol:'file:'},
  localStorage:{getItem:() => JSON.stringify(oldContent)},
  navigator:{onLine:false}, performance:{now:() => 0},
  innerWidth:1920, innerHeight:1080, URLSearchParams, AbortController,
  setInterval(){}, setTimeout(){}, clearTimeout(){},
  fetch:async () => {throw new Error('Offline');}
 });
 assert.equal(element('seasonal').hidden, true);
 assert.match(element('seasonal-art').innerHTML, /poppy-flowing.svg/);
 assert.equal(element('stage').dataset.season, 'remembrance');
});

test('fireworks and Christmas use inclusive annual windows without weekend holding', () => {
 for (const year of [2026, 2027, 2028, 2100]) {
  assert.equal(C.selectEvent(events, `${year}-10-31`).id, 'black-history');
  for (let day = 1; day <= 5; day++) assert.equal(C.selectEvent(events, `${year}-11-0${day}`).id, 'bonfire');
  assert.equal(C.selectEvent(events, `${year}-11-06`).id, 'remembrance');
  assert.equal(C.selectEvent(events, `${year}-11-30`), null);
  assert.equal(C.selectEvent(events, `${year}-12-01`).id, 'christmas');
  assert.equal(C.selectEvent(events, `${year}-12-31`).id, 'christmas');
  assert.equal(C.selectEvent(events, `${year + 1}-01-01`).id, 'kalends');
 }
});

test('Remembrance runs from 6 November through the Sunday of 11 November’s week', () => {
 assert.deepEqual(C.eventWindow(event('remembrance'), 2026), {from: '2026-11-06', until: '2026-11-15'});
 assert.deepEqual(C.eventWindow(event('remembrance'), 2029), {from: '2029-11-06', until: '2029-11-11'});
 for (let year = 2000; year <= 2100; year++) {
  const window = C.eventWindow(event('remembrance'), year);
  assert.equal(new Date(window.until + 'T12:00:00Z').getUTCDay(), 0);
  assert.ok(window.until >= `${year}-11-11` && window.until <= `${year}-11-17`);
  assert.equal(C.selectEvent(events, window.until).id, 'remembrance');
  const after = new Date(Date.parse(window.until + 'T12:00:00Z') + C.DAY).toISOString().slice(0, 10);
  assert.notEqual(C.selectEvent(events, after)?.id, 'remembrance');
 }
});

test('Western Easter follows Gregorian dates including exceptional and century years', () => {
 for (const [year, date] of [[1818,'03-22'], [1954,'04-18'], [1981,'04-19'], [2000,'04-23'], [2024,'03-31'], [2025,'04-20'], [2026,'04-05'], [2027,'03-28'], [2038,'04-25'], [2100,'03-28']]) {
  assert.equal(C.easterDate(year), `${year}-${date}`);
 }
 assert.deepEqual(C.eventWindow(event('easter'), 2027), {from:'2027-03-21', until:'2027-04-04'});
 for (const day of ['2027-03-21', '2027-03-28', '2027-04-04']) assert.equal(C.selectEvent([event('easter')], day).id, 'easter');
 assert.equal(C.selectEvent([event('easter')], '2027-03-20'), null);
 assert.equal(C.selectEvent([event('easter')], '2027-04-05'), null);
});

test('overlapping festivals alternate across all five screens and successive loops', () => {
 const turns = Array.from({length:10}, (_, turn) => C.selectEvent(events, '2026-06-09', turn).id);
 assert.deepEqual(turns, Array.from({length:5}, () => ['pride', 'vestalia']).flat());
 const overlapping = [...events, {...event('bonfire'), id:'test-festival', window:{rule:'fixed',start:'11-01',end:'11-30'}}];
 for (let turn = 0; turn < 10; turn++) assert.equal(C.selectEvent(overlapping, '2026-11-11', turn).id, 'remembrance');
 assert.equal(C.selectEvent(events, '2026-01-15'), null);
});

test('organiser-set campaigns use confirmed years and calendar months include leap day', () => {
 assert.deepEqual(C.eventWindow(event('childrens-mental-health'), 2027), {from:'2027-02-01', until:'2027-02-07'});
 assert.equal(C.selectEvent([event('childrens-mental-health')], '2027-02-01').id, 'childrens-mental-health');
 assert.equal(C.selectEvent([event('childrens-mental-health')], '2027-02-08'), null);
 assert.equal(C.selectEvent([event('childrens-mental-health')], '2028-02-01'), null);
 assert.equal(C.selectEvent([event('mental-health-week')], '2027-05-10').id, 'mental-health-week');
 assert.equal(C.selectEvent([event('mental-health-week')], '2027-05-16').id, 'mental-health-week');
 assert.equal(C.selectEvent([event('mental-health-week')], '2027-05-17'), null);
 assert.equal(C.selectEvent([event('anti-bullying')], '2026-11-22').id, 'anti-bullying');
 assert.equal(C.selectEvent([event('world-book-day')], '2027-03-07').id, 'world-book-day');
 assert.equal(C.selectEvent([event('lgbt-history')], '2028-02-29').id, 'lgbt-history');
 assert.equal(C.selectEvent([event('lgbt-history')], '2028-03-01'), null);
 for (const window of [{rule:'month',month:13}, {rule:'dated',dates:[]}, {rule:'dated',dates:[{from:'2027-02-01',until:'2027-01-31'}]}]) {
  const invalid = structuredClone(content);
  invalid.events[0].window = window;
  assert.throws(() => C.validate(invalid));
 }
});

test('annual rules support cross-year ranges and reject malformed event content', () => {
 const winter = {...event('kalends'), window:{rule:'fixed',start:'12-28',end:'01-03'}};
 assert.equal(C.selectEvent([winter], '2027-01-03').id, 'kalends');
 assert.equal(C.selectEvent([winter], '2027-01-04'), null);
 for (const mutate of [
  row => row.window.start = '02-30',
  row => row.window.start = '02-29',
  row => row.window.rule = 'unknown',
  row => row.image = 'assets/../private.svg',
  row => row.borderImage = ['assets/seasons/poppy-border.svg'],
  row => row.accent = ['#FF2DAA'],
  row => row.sourceUrl = 'javascript:alert(1)',
  row => row.body = 'x'.repeat(141),
  row => row.priority = NaN,
  row => row.window = {rule:'easter',before:7,after:-7}
 ]) {
  const invalid = structuredClone(content);
  mutate(invalid.events[0]);
  assert.throws(() => C.validate(invalid));
 }
 const duplicate = structuredClone(content);
 duplicate.events.push(duplicate.events[0]);
 assert.throws(() => C.validate(duplicate));
});

test('offline navigation retains the calendar and credits pages', async () => {
 const vm = require('node:vm');
 const handlers = {};
 const matches = [];
 const cache = {match:async url => {matches.push(url); return {cachedUrl:url};}};
 vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../dist/sw.js'), 'utf8'), {
  self:{location:{href:'https://example.org/classics-display/sw.js'}, addEventListener:(type, callback) => handlers[type] = callback},
  caches:{open:async () => cache},
  fetch:async () => {throw new Error('Offline');},
  URL, AbortController, setTimeout, clearTimeout,
  Response:{error:() => {throw new Error('No cached response');}}
 });
 for (const [page, expected] of [['?date=2026-11-07','index.html'], ['calendar.html','calendar.html'], ['credits.html','credits.html'], ['assets/seasons/pride.svg','assets/seasons/pride.svg']]) {
  let response;
  handlers.fetch({request:{method:'GET', mode:page.endsWith('.svg')?'cors':'navigate', url:'https://example.org/classics-display/' + page}, respondWith:value => response = value});
  assert.equal((await response).cachedUrl, 'https://example.org/classics-display/' + expected);
 }
 assert.equal(matches.length, 4);
});
