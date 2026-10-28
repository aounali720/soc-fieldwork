import assert from 'node:assert/strict';
import { DATA } from './data.js';
import { LOGS, runSimQuery } from './query.js';
const unique = rows => new Set(rows.map(x=>x.id)).size === rows.length;
assert.ok(DATA.lessons.length >= 60,'Curriculum is comprehensive');
assert.ok(DATA.cases.length >= 15,'Enough incident scenarios');
assert.ok(DATA.questions.length >= 50,'Enough knowledge checks');
assert.ok(DATA.interviews.length >= 60,'Enough interview exercises');
assert.ok(DATA.glossary.length >= 100,'Glossary is comprehensive');
for(const key of ['lessons','cases','interviews','runbooks','questions']) assert.ok(unique(DATA[key]),`${key} IDs should be unique`);
for(const l of DATA.lessons){assert.ok(l.title && l.summary && l.details.length>=3 && l.workflow.length>=3 && l.example);assert.ok(['Foundation','L1','L2','L3'].includes(l.tier));}
for(const c of DATA.cases){assert.ok(c.events.length>=4 && c.questions.length===3);for(const q of c.questions){assert.ok(q.options.length>=3 && q.answer>=0 && q.answer<q.options.length && q.why);}}
for(const q of DATA.questions){assert.ok(q.options.length===4 && q.answer<4 && q.why);}
assert.ok(LOGS.length >= 60);
assert.ok(runSimQuery('source=edr').rows.every(x=>x.source==='edr'));
assert.ok(runSimQuery('source=idp AND detail~FAIL').rows.every(x=>x.source==='idp'&&x.detail.toLowerCase().includes('fail')));
assert.ok(runSimQuery('tier=L2 | count by source').rows.every(x=>typeof x.count==='number'));
assert.equal(runSimQuery('source=sysmon | limit 3').rows.length,3);
assert.ok(runSimQuery('detail~xyz_that_does_not_exist').rows.length===0);
assert.throws(()=>runSimQuery('source=edr | do_something'),/Unsupported pipe/);
assert.throws(()=>runSimQuery('source=edr; drop table events'),/Unsupported filter|Unsupported/);
assert.throws(()=>runSimQuery('source=edr | limit 999999'),/limit 1/);
assert.deepEqual(DATA.references.map(x=>new URL(x.url).protocol).every(p=>p==='https:'),true);
console.log(`PASS: ${DATA.lessons.length} lessons, ${DATA.cases.length} cases, ${DATA.questions.length} quiz questions, ${DATA.interviews.length} interview questions, ${DATA.glossary.length} glossary entries, ${LOGS.length} events`);
