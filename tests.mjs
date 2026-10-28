import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { DATA } from './data.js';
import { LOGS, runSimQuery } from './query.js';

const unique = rows => new Set(rows.map(x=>x.id)).size === rows.length;
const counters = Object.fromEntries(Object.entries(DATA).filter(([,v])=>Array.isArray(v)).map(([k,v])=>[k,v.length]));
assert.ok(DATA.lessons.length >= 150, 'Expanded curriculum is present');
assert.ok(DATA.cases.length >= 42, 'Expanded investigation cases are present');
assert.ok(DATA.questions.length >= 135, 'Expanded knowledge checks are present');
assert.ok(DATA.interviews.length >= 135, 'Expanded interview prep is present');
assert.ok(DATA.drills.length >= 31, 'Evidence drills are present');
assert.ok(DATA.runbooks.length >= 46, 'Expanded playbooks present');
assert.ok(DATA.glossary.length >= 190, 'Expanded glossary present');
for (const key of ['lessons','cases','interviews','runbooks','questions','drills']) assert.ok(unique(DATA[key]), `${key} identifiers must be unique`);
for (const l of DATA.lessons){
 assert.ok(l.title && l.summary && l.details.length >= 3 && l.workflow.length >= 3 && l.example);
 assert.ok(['Foundation','L1','L2','L3'].includes(l.tier));
 if (l.evidence) assert.ok(l.evidence.length>=2 && l.pitfalls?.length>=2);
}
for (const c of DATA.cases){
 assert.ok(c.events.length>=4 && c.questions.length===3,c.id);
 for(const q of c.questions) assert.ok(q.options.length>=3 && q.answer>=0 && q.answer<q.options.length && q.why);
 for(const e of c.events) assert.ok(e.time && e.source && e.asset && e.detail);
}
for(const q of DATA.questions) assert.ok(q.options.length===4 && q.answer>=0 && q.answer<4 && q.why);
assert.equal(LOGS.length,DATA.cases.reduce((sum,c)=>sum+c.events.length,0));
assert.ok(LOGS.length >= 200);
assert.ok(runSimQuery('source=edr').rows.every(x=>x.source==='edr'));
assert.ok(runSimQuery('source=idp AND detail~FAIL').rows.every(x=>x.source==='idp' && x.detail.toLowerCase().includes('fail')));
assert.ok(runSimQuery('tier=L2 | count by source').rows.every(x=>typeof x.count==='number'));
assert.equal(runSimQuery('source=sysmon | limit 3').rows.length,3);
assert.ok(runSimQuery('detail~xyz_that_does_not_exist').rows.length===0);
assert.throws(()=>runSimQuery('source=edr | do_something'),/Unsupported pipe/);
assert.throws(()=>runSimQuery('source=edr; drop table events'),/Unsupported filter|Unsupported/);
assert.throws(()=>runSimQuery('source=edr | limit 999999'),/limit 1/);
for(const d of DATA.drills){
 const want=runSimQuery(d.solution);
 assert.ok(want.rows.length > 0,d.id+' should match synthetic events');
 assert.ok(want.rows.every(x=>x.event),d.id+' needs raw events for grading');
 assert.ok(d.title && d.task && d.hint && d.lesson);
}
assert.equal(new Set(DATA.glossary.map(g=>g.term.toLowerCase())).size,DATA.glossary.length,'Glossary terms unique');
assert.ok(DATA.references.every(x=>new URL(x.url).protocol==='https:'));
assert.equal(DATA.atlas.length,32,'Signal atlas must contain 32 reference entries');
assert.ok(new Set(DATA.atlas.map(x=>`${x.category}:${x.code}`)).size===DATA.atlas.length,'Signal reference IDs should be unique within category');
assert.equal(runSimQuery('case=s31 AND source=idp').rows.length,3,'MFA drill fixture is stable');
assert.equal(runSimQuery('case=s39 AND source=test').rows.length,2,'Detection parser fixture is stable');
assert.deepEqual(DATA,JSON.parse(readFileSync('./content.json','utf8')),'data.js and content.json must match');
console.log('PASS:',JSON.stringify(counters),'telemetry:',LOGS.length);
