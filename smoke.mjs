import assert from 'node:assert/strict';
import { DATA } from './data.js';
const routes={
  overview:'analyst',academy:'Learn the entire stack','visual-lab':'Understand it visually',missions:'The incident queue',
  console:'Make the logs talk',drills:'Evidence retrieval drills',practice:'Practice until','shift-lab':'Work a real',quiz:'Prove what you know',
  interviews:'Speak like the analyst',runbooks:'Runbooks for every shift',atlas:'Know what the telemetry means',
  timeline:'The event chronicle',glossary:'Operational vocabulary',resources:'Learn from primary sources'
};
const errors=[];
for(const [route,expected] of Object.entries(routes)){
 let html='', clickCallback, inputCallback;
 const store={};
 globalThis.location={hash:'#'+route};
 globalThis.localStorage={getItem:key=>store[key]||null,setItem:(key,v)=>{store[key]=v}};
 globalThis.history={replaceState:()=>{}};
 globalThis.window={addEventListener:()=>{},scrollTo:()=>{},confirm:()=>true};
 globalThis.document={addEventListener:(type,fn)=>{if(type==='click')clickCallback=fn;if(type==='input')inputCallback=fn},getElementById(id){assert.equal(id,'app');return{set innerHTML(v){html=v},get innerHTML(){return html}}},querySelector:()=>null};
 try{
   await import(`./app.js?smoke=${route}`);
   assert.ok(html.includes(expected),`Missing text for route ${route}: ${expected}`);
   assert.ok(html.includes('SOC FIELDWORK'));
   assert.ok(!html.includes('undefined</'),`Undefined value in route ${route}`);
   assert.ok(clickCallback, 'Delegated action listener missing');
   if(route==='practice'){
     assert.ok(html.includes('data-action="practice-mode"'));
     clickCallback({target:{closest:()=>({dataset:{action:'practice-mode',mode:'match'}})}});
     assert.ok(html.includes('01 / TERMS'),'Matching board did not render');
     clickCallback({target:{closest:()=>({dataset:{action:'practice-mode',mode:'order'}})}});
     assert.ok(html.includes('practice-order-row'),'Order game did not render');
     clickCallback({target:{closest:()=>({dataset:{action:'practice-exam-start'}})}});
     assert.ok(html.includes('UNASSISTED ROUND'),'Exam round did not start');
   }
   if(route==='shift-lab'){
     assert.ok(html.includes('data-action="sim-open"'));
     clickCallback({target:{closest:()=>({dataset:{action:'sim-tab',tab:'decisions'}})}});
     assert.ok(html.includes('Make the call'),'Simulation decision tab did not render');
     clickCallback({target:{closest:()=>({dataset:{action:'sim-tab',tab:'handoff'}})}});
     assert.ok(html.includes('Write an analyst handoff'),'Simulation handoff tab did not render');
   }
   if(route==='visual-lab'){
     assert.ok(html.includes('data-action="visual-step"'));
     clickCallback({target:{closest:()=>({dataset:{action:'visual-select',id:'dns-resolution'}})}});
     assert.ok(html.includes('How DNS resolution actually works'));
     clickCallback({target:{closest:()=>({dataset:{action:'visual-step',index:'2'}})}});
     assert.ok(html.includes('STAGE 03'));
   }
   if(route==='atlas'){
     assert.ok(html.includes('data-action="atlas-item"'));
     clickCallback({target:{closest:()=>({dataset:{action:'atlas-item',index:'1'}})}});
     assert.ok(html.includes('Failed logon'), 'Signal selection failed');
     clickCallback({target:{closest:()=>({dataset:{action:'atlas-filter',category:'Windows'}})}});
     assert.ok(html.includes('Signal catalog'), 'Signal filter failed');
   }
   if(route==='timeline'){
     assert.ok(html.includes('data-action="timeline-case"'));
     clickCallback({target:{closest:()=>({dataset:{action:'timeline-case',id:'s31'}})}});
     assert.ok(html.includes('MFA approval after rejection storm'), 'Case selection failed');
     clickCallback({target:{closest:()=>({dataset:{action:'timeline-source',source:'idp'}})}});
     assert.ok(html.includes('3 of 5 events shown'), 'Source filter failed');
     clickCallback({target:{closest:()=>({dataset:{action:'timeline-investigate',id:'s31'}})}});
     assert.ok(html.includes('The incident queue'),'Chronicle linked case incorrectly');
   }
 }catch(e){errors.push(`${route}: ${e.stack||e}`)}
}
assert.equal(errors.length,0,errors.join('\n\n'));
console.log(`PASS: all ${Object.keys(routes).length} routes render; atlas filters, event chronology and case navigation pass.`);
console.log(`Data: ${DATA.lessons.length} lessons, ${DATA.cases.length} cases, ${DATA.questions.length} questions, ${DATA.interviews.length} interviews.`);
