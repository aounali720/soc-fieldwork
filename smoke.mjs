// Runs the view renderer in a minimal document shim; useful where a browser is unavailable.
import assert from 'node:assert/strict';
const routes={
  overview:'Think like an analyst.',academy:'Learn the entire stack',missions:'The incident queue',
  console:'Make the logs talk',quiz:'Prove what you know',interviews:'Speak like the analyst',
  runbooks:'Runbooks for every shift',glossary:'Operational vocabulary',resources:'Learn from primary sources'
};
let errors=[];
for(const [route,expected] of Object.entries(routes)){
  let html='';
  globalThis.location={hash:'#'+route};
  globalThis.localStorage={getItem:()=>null,setItem:()=>{}};
  globalThis.history={replaceState:()=>{}};
  globalThis.window={addEventListener:()=>{},scrollTo:()=>{},confirm:()=>true};
  globalThis.document={addEventListener:()=>{},getElementById(id){assert.equal(id,'app');return {set innerHTML(v){html=v;},get innerHTML(){return html}}}};
  try{await import(`./app.js?smoke=${route}`);assert.ok(html.includes(expected),`missing route heading ${route}`);assert.ok(html.includes('SOC FIELDWORK'));assert.ok(!html.includes('undefined</'));}
  catch(e){errors.push(`${route}: ${e.message}`);}
}
assert.equal(errors.length,0,errors.join('\n'));
console.log('PASS: all 9 view routes render successfully under a DOM shim.');
