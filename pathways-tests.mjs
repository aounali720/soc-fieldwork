import assert from 'node:assert/strict';
import {PATHWAYS} from './pathways-data.js';
import {createPathwaysController} from './pathways-ui.js';
const {topics,labs,paths}=PATHWAYS;
assert.equal(topics.length,48);assert.equal(labs.length,16);assert.equal(Object.keys(paths).length,6);
assert.equal(new Set(topics.map(x=>x.id)).size,topics.length);
assert.equal(new Set(labs.map(x=>x.id)).size,labs.length);
assert.deepEqual(new Set(topics.map(x=>x.tier)),new Set(['Foundation','L1','L2','L3']));
for(const x of topics){for(const field of ['title','concept','scenario','pivot','trap','hint'])assert.ok(x[field].length>(field==='title'?6:20),`${x.id} ${field}`);assert.equal(x.check.options.length,3);assert.equal(x.check.options[x.check.answer],x.pivot);assert.equal(x.workflow.length,5);assert.ok(x.links.length>0,`${x.id} lacks source alignment`)}
for(const x of labs){assert.equal(x.events.length,3);assert.equal(x.choices.length,3);assert.ok(x.choices[x.answer].length>25);assert.ok(x.explanation.length>40)}
const progress={version:1,pathwayCompleted:{},pathwayLabs:{}};let html='',saved=0;const ctrl=createPathwaysController({getProgress:()=>progress,save:()=>saved++,onChange:()=>{html=ctrl.render()},onToast:()=>{}});
html=ctrl.render();assert.ok(html.includes('Blue Team Pathways'));assert.ok(html.includes('SOC Operations'));
assert.ok(html.includes('data-action="trail-open"'));
ctrl.handle('trail-open',{id:'pt002'});
const topic=topics[1];ctrl.handle('trail-answer',{index:String(topic.check.answer)});ctrl.handle('trail-submit');assert.ok(html.includes('Correct reasoning'));
ctrl.handle('trail-master',{id:'pt002'});assert.equal(progress.pathwayCompleted.pt002,true);
ctrl.handle('trail-mode',{mode:'labs'});assert.ok(html.includes('INVESTIGATION DIFFICULTY'));
ctrl.handle('trail-lab-choice',{index:String(labs[0].answer)});ctrl.handle('trail-lab-submit');assert.equal(progress.pathwayLabs.pl01,true);assert.ok(html.includes('Good judgment'));
ctrl.handle('trail-mode',{mode:'map'});assert.ok(html.includes('Provider syllabus'));
ctrl.handle('trail-map-select',{id:'thm-l2'});assert.ok(html.includes('Blue Team Pathways'));
ctrl.input('trail-search','Kerberos');assert.ok(html.includes('Kerberos'));
assert.ok(saved>=2);
console.log(`PASS: ${topics.length} original field lessons, ${labs.length} labs, ${Object.keys(paths).length} skill maps, filtering, answers, completion persistence.`);
