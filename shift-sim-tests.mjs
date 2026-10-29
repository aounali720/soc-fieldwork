import assert from 'node:assert/strict';
import {SHIFT_SIMULATIONS} from './shift-sim-data.js';
import {createShiftSimulator,gradeSimulation} from './shift-sim-ui.js';
import {PRACTICE_BANKS} from './practice-data.js';

assert.equal(SHIFT_SIMULATIONS.length,10);
assert.equal(SHIFT_SIMULATIONS.reduce((n,x)=>n+x.evidence.length,0),60);
assert.equal(SHIFT_SIMULATIONS.reduce((n,x)=>n+x.decisions.length,0),30);
assert.equal(new Set(SHIFT_SIMULATIONS.map(x=>x.id)).size,10);
for(const c of SHIFT_SIMULATIONS){
 assert.ok(['L1','L2','L3'].includes(c.tier));
 assert.equal(c.evidence.length,6);
 assert.equal(c.decisions.length,3);
 assert.ok(c.objective&&c.pitfall&&c.missing&&c.report&&c.next);
 assert.equal(new Set(c.evidence.map(e=>e.time)).size,6);
 for(const e of c.evidence)assert.ok(e.time&&e.source&&e.entity&&e.event);
 for(const q of c.decisions){assert.equal(q.options.length,4);assert.ok(q.why.length>25);assert.ok(q.answer>=0&&q.answer<4);assert.equal(new Set(q.options).size,4);}
 const good=Object.fromEntries(c.decisions.map((q,i)=>[i,q.answer]));
 assert.deepEqual(gradeSimulation(c,good),{score:3,total:3});
 assert.equal(gradeSimulation(c,{0:(c.decisions[0].answer+1)%4,1:good[1],2:good[2]}).score,2);
}
assert.deepEqual(Object.fromEntries(Object.entries(PRACTICE_BANKS).map(([k,v])=>[k,v.length])),{mcq:244,match:33,order:22,truth:46,fill:40,triage:195});
for(const [mode,arr] of Object.entries(PRACTICE_BANKS))assert.equal(new Set(arr.map(x=>x.id)).size,arr.length,`${mode} has duplicate IDs`);
let progress={shiftLab:{}},saved=0,changes=0,notices=[];
const ctl=createShiftSimulator({getProgress:()=>progress,save:()=>saved++,onChange:()=>changes++,onToast:x=>notices.push(x)});
assert.ok(ctl.render().includes('Work a real'));
assert.ok(ctl.render().includes('The service-desk password spray'));
ctl.handle('sim-tab',{tab:'decisions'});ctl.handle('sim-submit',{});
assert.ok(notices.at(-1).includes('three decisions'));
for(let i=0;i<3;i++)ctl.handle('sim-answer',{index:String(i),choice:String(SHIFT_SIMULATIONS[0].decisions[i].answer)});
ctl.handle('sim-submit',{});
assert.equal(progress.shiftLab['shift07-01'].score,3);
assert.ok(ctl.render().includes('MODEL DEBRIEF')===false); // in decisions view until handoff tab
ctl.handle('sim-tab',{tab:'handoff'});
assert.ok(ctl.render().includes('What to put in the ticket'));
ctl.notesInput('Affected device: managed <fake> sample; needs source verification.');
assert.equal(progress.shiftLab['shift07-01'].notes,'Affected device: managed <fake> sample; needs source verification.');
assert.ok(ctl.render().includes('&lt;fake&gt;'),'User-created text escaped');
ctl.handle('sim-open',{id:'shift07-08'});
ctl.handle('sim-tier',{tier:'L3'});
assert.ok(ctl.render().includes('The parser that quietly went dark'));
assert.ok(!ctl.render().includes('sim-open" data-id="shift07-01"'),'Tier filters case buttons');
ctl.handle('sim-source',{source:'EDR'});
assert.ok(ctl.render().includes('1 / 6 events'));
ctl.handle('sim-next',{});
assert.equal(ctl.getState().id,'shift07-09');
assert.ok(saved>=2&&changes>=6);
console.log('PASS: Edition 07 shift simulations, all 10 structured investigations, 60 logs, 30 decisions, notes, escaping, filters, grading and 580+ practice tasks');
