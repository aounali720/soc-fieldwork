import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { DATA } from './data.js';
import { VISUALS, VISUAL_CATEGORIES, conceptForId, conceptForLesson, diagramSvg, sceneHtml, conceptStudy } from './visuals.js';
assert.equal(VISUALS.length,31);
assert.equal(new Set(VISUALS.map(x=>x.id)).size,VISUALS.length);
assert.equal(VISUAL_CATEGORIES[0],'All');
for (const v of VISUALS){
 assert.ok(v.title && v.analogy && v.intro && v.interview && v.pitfall);
 assert.ok(v.steps.length>=3 && v.steps.length<=5);
 assert.ok(v.signals.length>=2);
 assert.ok(v.steps.every(s=>s.name && s.explanation));
 for (let i=0;i<v.steps.length;i++){
  const svg=diagramSvg(v,i);
  assert.equal((svg.match(/class="v-node/g)||[]).length,v.steps.length);
  assert.ok(svg.includes('aria-label'));
  assert.ok(sceneHtml(v,i).includes(`STAGE ${String(i+1).padStart(2,'0')}`));
 }
 assert.ok(conceptStudy(v).includes(v.analogy));
 if(v.asset){const p=`./assets/visual-${v.asset}.svg`;assert.ok(existsSync(p),p);let xml=readFileSync(p,'utf8');assert.ok(xml.startsWith('<svg') && xml.includes('viewBox="0 0 1200 600"'))}
}
for (const lesson of DATA.lessons){const match=conceptForLesson(lesson);assert.ok(match.visual && typeof match.related==='boolean')}
assert.equal(conceptForId('dns-resolution').steps.length,4);
assert.ok(conceptForLesson(DATA.lessons.find(x=>x.title.toLowerCase().includes('kerberos')))?.visual);
assert.ok(readFileSync('./index.html','utf8').includes('design-v5.css'));
console.log(`PASS: ${VISUALS.length} unique visual explainers, all stage layouts, source illustrations, lesson visual mapping and HTML integration.`);
