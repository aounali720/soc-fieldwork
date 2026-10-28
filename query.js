import { DATA } from './data.js';
function createLogs(){return DATA.cases.flatMap(c=>c.events.map((e,i)=>({time:e.time,source:e.source,asset:e.asset,detail:e.detail,tier:c.tier,case:c.id,event:`${c.id}-${i+1}`})));}
export const LOGS=createLogs();
export function runSimQuery(query,logs=LOGS){const text=String(query||'').trim();if(!text)throw new Error('Enter a filter, e.g. source=edr or detail~4624.');if(/[;`{}<>\\]/.test(text))throw new Error('Unsupported query characters. Use simple field filters and pipe operators only.');let sections=text.split('|').map(x=>x.trim());if(sections.length>5)throw new Error('Use one filter plus up to four operators.');const filter=sections.shift();let rows=[...logs];
 if(filter&&filter!=='*'){
   const orGroups=filter.split(/\s+OR\s+/i);
   const compile=expr=>expr.split(/\s+AND\s+/i).map(clause=>{
     const match=clause.trim().match(/^(time|source|asset|detail|tier|case|event)\s*(=|~)\s*(.+)$/i);
     if(!match)throw new Error(`Unsupported filter: ${clause}. Use field=value or field~text, joined with AND/OR.`);
     let [,field,op,value]=match;value=value.trim().replace(/^['"]|['"]$/g,'');if(!value)throw new Error('Filter value cannot be empty.');return {field:field.toLowerCase(),op,value:value.toLowerCase()};
   });
   const clauses=orGroups.map(compile);
   rows=rows.filter(r=>clauses.some(and=>and.every(({field,op,value})=>op==='='?String(r[field]).toLowerCase()===value:String(r[field]).toLowerCase().includes(value))));
 }
 for(let section of sections){let match;
   if((match=section.match(/^count\s+by\s+(time|source|asset|tier|case)$/i))){const field=match[1].toLowerCase(),counts=new Map();for(const r of rows)counts.set(r[field],(counts.get(r[field])||0)+1);rows=[...counts].map(([group,count])=>({[field]:group,count})).sort((a,b)=>b.count-a.count);continue;}
   if((match=section.match(/^sort\s+(time|source|asset|tier|case|count)\s*(asc|desc)?$/i))){const field=match[1].toLowerCase(),desc=match[2]?.toLowerCase()==='desc';rows.sort((a,b)=>{const c=typeof a[field]==='number'?a[field]-b[field]:String(a[field]??'').localeCompare(String(b[field]??''));return desc?-c:c});continue;}
   if((match=section.match(/^limit\s+(\d+)$/i))){const n=Number(match[1]);if(n<1||n>500)throw new Error('Use limit 1–500.');rows=rows.slice(0,n);continue;}
   throw new Error(`Unsupported pipe: ${section}. Try '| count by source', '| sort time desc', or '| limit 10'.`);
 }
 return {rows,columns:rows.length?Object.keys(rows[0]):['time','source','asset','detail','tier','case'],matched:rows.length};
}
