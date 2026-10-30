import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { FIELD_MANUAL } from './field-manual-data.js';
import { createFieldManualController } from './field-manual-ui.js';
const M=FIELD_MANUAL;
assert.equal(M.chapters.length,51);
assert.equal(M.references.length,73);
assert.equal(M.recipes.length,20);
assert.equal(M.sheets.length,10);
for(const [key,arr] of Object.entries({chapters:M.chapters,recipes:M.recipes,sheets:M.sheets})){
  assert.equal(new Set(arr.map(x=>x.id)).size,arr.length,`${key}: unique IDs`);
}
assert.equal(new Set(M.references.map(x=>x.group+':'+x.key)).size,M.references.length);
for (const t of M.chapters){
  assert.ok(t.concept.length>=80,`${t.id} explanation`);
  assert.ok(t.sequence.length>=4,`${t.id} steps`);
  assert.ok(t.evidence.length>=3,`${t.id} evidence`);
  assert.ok(t.example.length>=75,`${t.id} example`);
  assert.ok(t.answer.length>=50,`${t.id} interview model answer`);
  assert.ok(['Foundation','L1','L2','L3'].includes(t.tier));
}
for(const row of M.references)assert.ok(row.group&&row.key&&row.label&&row.meaning&&row.pivot&&row.limit);
for(const row of M.recipes)assert.ok(row.query.length>40&&row.interpret&&row.pivot);
for(const row of M.sheets)assert.ok(row.body.split('\n').length>=5);
const app=readFileSync(new URL('./app.js',import.meta.url),'utf8');
const html=readFileSync(new URL('./index.html',import.meta.url),'utf8');
assert.ok(app.includes("manual:()=>manual.render()"));
assert.ok(app.includes("'manual'"));
assert.ok(html.includes('field-manual.css'));
let saved='',copies=[];globalThis.localStorage={getItem:()=>saved,setItem:(_k,v)=>saved=v};
const manual=createFieldManualController({onChange:()=>{},onCopy:v=>copies.push(v),onToast:()=>{}});
const first=manual.render();assert.ok(first.includes('The SOC Field Manual'));assert.ok(first.includes('What actually happens during a SOC shift'));
manual.handle('manual-reveal',{});assert.ok(manual.render().includes('An alert is a detection hypothesis'));
manual.handle('manual-read',{id:'fm01'});assert.ok(saved.includes('fm01'));
manual.handle('manual-tab',{tab:'references'});assert.ok(manual.render().includes('4625'));
manual.handle('manual-tab',{tab:'recipes'});assert.ok(manual.render().includes('Failed logons by account'));
manual.handle('manual-copy',{value:'recipe:rq01'});assert.ok(copies[0].includes('EventCode=4625'));
manual.handle('manual-tab',{tab:'sheets'});assert.ok(manual.render().includes('Shift handoff'));
manual.handle('manual-copy',{value:'sheet:sh01'});assert.ok(copies[1].includes('SHIFT (UTC)'));
console.log('Edition 08 field manual: 51 chapters, 73 reference cards, 20 detection recipes, 10 templates; interaction tests passed.');
