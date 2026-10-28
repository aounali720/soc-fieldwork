import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { DATA } from './data.js';
import { PRACTICE_BANKS, PRACTICE_MODES, MATCH_BOARDS, ORDER_TASKS, TRUTH_CHECKS, FILL_GAPS, NEW_MCQ, TRIAGE_CARDS, pool, checkFill, checkMatching, checkOrder, normalizedAnswer, seededOrder } from './practice-data.js';
import { createPracticeController } from './practice-ui.js';

assert.deepEqual(Object.fromEntries(Object.entries(PRACTICE_BANKS).map(([k,v])=>[k,v.length])),{mcq:216,match:25,order:17,truth:36,fill:30,triage:195});
assert.equal(TRIAGE_CARDS.length,DATA.cases.length*3);
for(const mode of PRACTICE_MODES){const all=PRACTICE_BANKS[mode.id];assert.ok(all.length>=17);assert.equal(new Set(all.map(x=>x.id)).size,all.length);for(const t of (mode.id==='triage'?['L1','L2','L3']:['Foundation','L1','L2','L3']))assert.ok(pool(mode.id,t).length>0,`${mode.id} has no ${t} questions`);}
for(const q of PRACTICE_BANKS.mcq){assert.ok(q.question&&q.options.length===4&&q.why);assert.ok(q.answer>=0&&q.answer<q.options.length);assert.equal(new Set(q.options).size,q.options.length,`duplicate distractor: ${q.id}`);}
for(const q of TRIAGE_CARDS){assert.ok(q.caseId&&q.caseName&&q.summary&&q.why);assert.ok(q.answer>=0&&q.answer<q.options.length);}
for(const q of MATCH_BOARDS){assert.equal(q.pairs.length,5);assert.ok(q.pairs.every(p=>p.term&&p.meaning));assert.equal(new Set(q.pairs.map(p=>p.term)).size,5);assert.equal(new Set(q.pairs.map(p=>p.meaning)).size,5);assert.ok(checkMatching(q,{0:0,1:1,2:2,3:3,4:4}));assert.ok(!checkMatching(q,{0:1,1:0,2:2,3:3,4:4}));}
for(const q of ORDER_TASKS){assert.ok(q.steps.length>=4);assert.equal(new Set(q.steps).size,q.steps.length);assert.ok(checkOrder(q,q.steps.map((_,i)=>i)));assert.ok(!checkOrder(q,q.steps.map((_,i)=>q.steps.length-1-i)));}
for(const q of TRUTH_CHECKS)assert.equal(typeof q.answer,'boolean');
for(const q of FILL_GAPS){assert.ok(q.answers.every(x=>checkFill(q,x)));assert.ok(!checkFill(q,'does-not-exist'));assert.ok(q.prompt.includes('____'));}
assert.equal(normalizedAnswer('  Key-Distribution Center!  '),'keydistribution center');
for(let n=2;n<=10;n++){const a=seededOrder('demo',n);assert.equal(new Set(a).size,n);assert.deepEqual([...a].sort((x,y)=>x-y),Array.from({length:n},(_,i)=>i));}
let count=0;let progress={practice:{},practiceExams:[]};let navigation=null;const game=createPracticeController({getProgress:()=>progress,save:()=>count++,onNavigate:id=>navigation=id,onChange:()=>{},onToast:()=>{}});
let html=game.render();assert.ok(html.includes('Match the columns')&&html.includes('10-question interview sprint'));
function trigger(action,args={}){assert.ok(game.handle(action,args),action);}
trigger('practice-mode',{mode:'match'});html=game.render();assert.ok(html.includes('01 / TERMS')&&html.includes('02 / MEANINGS'));let ui=game.getState();assert.ok(ui.sequence.length===0);
for(let i=0;i<5;i++){trigger('practice-left',{index:String(i)});trigger('practice-right',{index:String(i)});}trigger('practice-grade');assert.ok(game.render().includes('Correct — mastered'));assert.ok(progress.practice.match[game.getState().id]);
trigger('practice-mode',{mode:'order'});ui=game.getState();const order=ui.sequence.slice();for(let target=0;target<order.length;target++){let pos=ui.sequence.indexOf(target);while(pos>target){trigger('practice-move',{index:String(pos),direction:'-1'});pos--;}}trigger('practice-grade');assert.ok(game.render().includes('Correct — mastered'));
trigger('practice-mode',{mode:'truth'});ui=game.getState();let q=PRACTICE_BANKS.truth.find(x=>x.id===ui.id);trigger('practice-choice',{choice:String(q.answer)});trigger('practice-grade');assert.ok(game.render().includes('Correct classification'));
trigger('practice-mode',{mode:'fill'});q=PRACTICE_BANKS.fill.find(x=>x.id===game.getState().id);game.input(q.answers[0]);trigger('practice-grade');assert.ok(game.render().includes('Accepted answer'));
trigger('practice-mode',{mode:'mcq'});q=PRACTICE_BANKS.mcq.find(x=>x.id===game.getState().id);trigger('practice-choice',{choice:String(q.answer)});trigger('practice-grade');assert.ok(game.render().includes('Correct — mastered'));
trigger('practice-mode',{mode:'triage'});q=PRACTICE_BANKS.triage.find(x=>x.id===game.getState().id);trigger('practice-case');assert.equal(navigation,q.caseId);
trigger('practice-exam-start');for(let i=0;i<10;i++){ui=game.getState();let q=PRACTICE_BANKS.mcq.find(x=>x.id===ui.exam.ids[ui.exam.position]);trigger('practice-exam-choice',{choice:String(q.answer)});trigger('practice-exam-submit');}assert.ok(game.render().includes('10 / 10 correct'));assert.equal(progress.practiceExams.length,1);assert.equal(progress.practiceExams[0].score,10);assert.ok(count>=6);
assert.ok(readFileSync('./index.html','utf8').includes('practice.css'));assert.ok(readFileSync('./app.js','utf8').includes('practice:()=>practice.render()'));
console.log('PASS: 519 practice exercises, deterministic boards, all six modes, feedback, mastery, navigation, ordering, and full exam scoring.');
