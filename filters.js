(()=>{'use strict';
const VERIFIED={
'Disney': '569563C01 564379C01 197508 190017C01 197509CZ 199191C01 791586 791587 797174 789090C01 789189C01 790060C02 791443ENMX 791567EN80 791572EN73 791573CZ 791574CZ 791593CFL 792135EN80 796338ENMX 798039ENMX 798044NPRMX 798230ENMX 798844C01 798846C01 798848C01 798850C01 798853C01 798880C02 798905C01 798962C01 799194C01 799197C00 799200C01 799345C01 799348C01 799361C00 799363C01 799386C01 799392C01 799395C01 799398C01 799498C01 799507C01 799508C01 799509C01 799510C01 799599C01 399525C01 399553C01 399560C01 790014C01 790024C01 791562NCK 792134EN117 797769CZR 797849CZ 798041ENMX 798042CZR 798043NRG 798045EN82 798232CZ 798455C01 798634C01 798637C01 798847C01 798849C01 798866C01 799014C01 799015C01 799148C01 799192C01 799201C01 799298C01 799334C01 799344C00 799383C01 799385C01 799405C01 799638C01 799647C01 797495CZ 797496CZ 797173CZR 299193C01 299258C01 399198C01 193740C01 163651C01 193654C01 193653C01 193652C01 163362C00 163059C01',
'Marvel':'592561C01 760268C01 762744C01 762764C01 790783C01 790788C01 792193C01 792350C01 792351C01 792352C01 792554C01 792563C01 792565C01 792757C01 792763C01 760661C01 760774C01 790483C01 790780C01 790785C01 792323C01 792562C01 792564C01 590784C00 793129C01 793360C01 192566C01 194223C01 562960C01',
'Harry Potter':'598619C00 360034C01 368618C00 369174C00 260025C00 760035C00 790013C01 798620C01 798621C01 798622C00 798624C01 798625C01 798626C01 798627C01 798629C01 798831C01 798832C01 799123C01 799124C00 799125C01 799126C01 799127C01 799129C00',
'Star Wars':'540031C00 599254C00 769504C01 799248C01 799251C01 799252C01 799501C01 740019C01 749253C01 769244C01 799243C01 799245C00 799246C01 799250C01 799253C01 799256C01 799506C00 799511C01 799513C00',
'Game of Thrones':'792962C01 792966C00 762971C01 163139C00',
'Stranger Things':'193569C00 793563C01 793567C01 193575C00 193578C01 293573C01',
'Bridgerton':'194337C01 294397C01 294336C01'
};
const NAME={
'569563C01':'Disney Heart Clasp Bracelet','564379C01':'Disney Princess Bracelet',
'197508':'Disney Mickey Ears Ring','197509CZ':'Disney Minnie Ears Ring','190017C01':'Disney Beauty and the Beast Rose Ring','199191C01':'Disney Cinderella Tiara Ring',
'193740C01':'Disney Stitch Ring','163651C01':'Disney Rapunzel Tiara Ring','193653C01':'Disney Tiana Ring','193652C01':'Disney Snow White Bow Ring','193654C01':'Disney Ariel Ring','163362C00':'Disney Lion King Ring','163059C01':'Disney Cinderella Ring',
'791586':'Disney Mickey Mouse Charm','791587':'Disney Minnie Mouse Charm','791443ENMX':'Disney Mickey and Minnie Kiss Charm','796338ENMX':'Disney Lilo and Stitch Charm','798844C01':'Disney Stitch Charm','798962C01':'Disney Pixar Up House Charm','798041ENMX':'Disney Pixar Toy Story Woody','798042CZR':'Disney Pixar Toy Story Buzz','798045EN82':'Disney Pixar Alien','799498C01':'Disney Rapunzel Charm','799507C01':'Disney Jasmine Charm','799508C01':'Disney Ariel Charm','799509C01':'Disney Cinderella Charm','799510C01':'Disney Tiana Charm','799638C01':'Disney Frozen Olaf Dangle',
'590784C00':'Marvel Avengers Bracelet','592561C01':'Marvel Logo Bracelet','790783C01':'Marvel Black Panther Charm','790788C01':'Marvel Iron Man Arc Reactor','792350C01':'Marvel Spider-Man City Charm','792351C01':'Marvel Spider-Man Mask','792352C01':'Marvel Spider-Man Camera','792323C01':'Marvel Hanging Spider-Man','760268C01':'Marvel Iron Man Charm','792193C01':'Marvel Hulk Charm','192566C01':'Marvel Groot Ring','194223C01':'Marvel Black Panther Ring','793360C01':'Marvel Deadpool Charm',
'598619C00':'Harry Potter Golden Snitch Bracelet','799123C01':'Harry Potter Hedwig Owl','798622C00':'Harry Potter Hogwarts Charm','798626C01':'Harry Potter Charm','799124C00':'Harry Potter Sorting Hat',
'599254C00':'Star Wars Bracelet','799248C01':'Star Wars R2-D2','799251C01':'Star Wars Princess Leia','799252C01':'Star Wars Lightsaber','799253C01':'Star Wars Grogu','799256C01':'Star Wars Darth Vader',
'792962C01':'Game of Thrones Dragon Egg Charm','792966C00':'Game of Thrones Ice and Fire Dragons','762971C01':'Game of Thrones Astrolabe','163139C00':'Game of Thrones Lannister Lion Ring',
'193569C00':'Stranger Things Hellfire Club Ring','193575C00':'Stranger Things Friends Dont Lie Ring','193578C01':'Stranger Things Demogorgon Ring',
'194337C01':'Bridgerton Blue Bow Ring','294397C01':'Bridgerton Sparkling Bow Earrings','294336C01':'Bridgerton Blue Bow Stud Earrings'
};
const lookup={}; for(const [collab,codes] of Object.entries(VERIFIED))for(const sku of codes.split(/\s+/)){lookup[sku]=collab}
const clean=s=>String(s||'').toUpperCase().replace(/[^A-Z0-9]/g,'').replace(/CO(?=[0123456789]|$)/g,'C0');
let overrides={};try{overrides=JSON.parse(localStorage.getItem('pandoraTagOverrides')||'{}')}catch(_){}
const cache=new Map();
function getType(x){let p=x[1],r=x[2],c=clean(x[4]);if(p===1)return 'Packaging';if(p>=15&&p<=23)return 'Bundles / Sets';
if(p>=2&&p<=14)return 'Bracelets';
if(p===75&&r>=6||p===76&&r<=6)return 'Safety Chains';
if(p===76&&r===7||p===77||p===78||p===79&&r<8)return 'Clips / Clasps';
if(p===80)return 'Spacers';
if(p>=105&&p<=117)return 'Rings';
if(p>=95&&p<=104)return 'Earrings';
if(p>=119)return 'Necklaces';
if(/^1\d{5}/.test(c))return 'Rings';
if(/^2\d{5}/.test(c))return 'Earrings';
if(/^5\d{5}/.test(c))return 'Bracelets';
if(/^3\d{5}/.test(c))return p>=118?'Necklaces':'Pendants';
if(p>=24&&p<=50)return 'Charms';
if(p>=51&&p<=74)return 'Dangle Charms';
if(p>=81&&p<=93)return 'Charms';
if(/^7\d{5}/.test(c))return 'Charms';
return 'Other / Unclassified'}
function getFinish(x){if(x[1]===1)return 'Unknown';const pan=/^PAN(\d+)$/i.exec(String(x[4]||''));if(pan){return Number(pan[1])<=205?'Silver':'Unknown';}const c=clean(x[4]);if(!/^\d{6}/.test(c))return 'Unknown';const a=c.slice(0,2);if(['59','79','19','29','39'].includes(a))return 'Silver';if(['58','78','18','28','38'].includes(a))return 'Rose Gold';if(['55','56','75','76','73','16','15','25','26','35','36'].includes(a))return 'Gold';return 'Unknown'}
function getSetStyle(x){const p=x[1],c=clean(x[4]);if(p>=22&&p<=23)return 'Charm Bracelet Bundles';if(p>=15&&p<=21){const z=/^PAN(\d+)$/.exec(c);return z&&Number(z[1])<=205?'Matching Necklace + Earrings':'Other Jewelry Sets'}return 'Not a Set'}
function getTheme(code,collab){const name=(NAME[code]||'').toLowerCase();if(collab==='Disney'){if(/stitch| lilo/.test(name))return 'Stitch';if(/pixar|toy story|up house/.test(name))return 'Pixar';if(/princess|cinderella|ariel|rapunzel|tiana|snow white|jasmine|belle/.test(name))return 'Disney Princesses';if(/mickey|minnie/.test(name))return 'Mickey & Minnie';}
if(collab==='Marvel'){if(/spider/.test(name))return 'Spider-Man';if(/avengers|hulk|iron man|black panther/.test(name))return 'Avengers';}return 'Unspecified'}
function meta(x){const id=x[0];if(cache.has(id))return cache.get(id);const code=clean(x[4]);const m={collab:lookup[code]||'Unverified / Other',type:getType(x),finish:getFinish(x),setStyle:getSetStyle(x),theme:getTheme(code,lookup[code]),name:NAME[code]||''};Object.assign(m,overrides[id]||{});cache.set(id,m);return m}
const OPTIONS={
collab:['Disney','Marvel','Harry Potter','Star Wars','Game of Thrones','Stranger Things','Bridgerton','Unverified / Other'],
type:['Bracelets','Rings','Charms','Dangle Charms','Pendants','Necklaces','Earrings','Bundles / Sets','Safety Chains','Clips / Clasps','Spacers','Packaging','Other / Unclassified'],
finish:['Silver','Gold','Rose Gold','Unknown'],
setStyle:['Matching Necklace + Earrings','Other Jewelry Sets','Charm Bracelet Bundles','Not a Set'],
theme:['Stitch','Disney Princesses','Mickey & Minnie','Pixar','Spider-Man','Avengers','Unspecified']
};
const DISPLAY={collab:'Collaborations',type:'Jewelry types',setStyle:'Bundle and set styles',finish:'Color / finish (estimated)',theme:'Characters & themes'};
let state={collab:{},type:{},finish:{},theme:{},setStyle:{}};let pricesEnabled=true;let onFilter=()=>{};let all=[];let priceLow='',priceHigh='',pricedOnly=false,knownFinishOnly=false;
const $=id=>document.getElementById(id),safe=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function persist(){try{localStorage.setItem('pandoraAdvancedFilters',JSON.stringify({state,priceLow,priceHigh,pricedOnly,knownFinishOnly}))}catch(_){}}
function load(){try{let o=JSON.parse(localStorage.getItem('pandoraAdvancedFilters')||'null');if(o&&o.state){state=o.state;priceLow=o.priceLow||'';priceHigh=o.priceHigh||'';pricedOnly=!!o.pricedOnly;knownFinishOnly=!!o.knownFinishOnly}}catch(_){}}
function match(x){const m=meta(x);for(const [group,options] of Object.entries(OPTIONS)){const sel=state[group]||{},included=options.filter(v=>sel[v]==='in'),excluded=options.filter(v=>sel[v]==='out');if(excluded.includes(m[group]))return false;if(included.length&&!included.includes(m[group]))return false}if(pricesEnabled&&pricedOnly&&!(Number.isFinite(x[5])))return false;if(knownFinishOnly&&m.finish==='Unknown')return false;if(pricesEnabled&&priceLow!==''&&(x[5]==null||x[5]<Number(priceLow)))return false;if(pricesEnabled&&priceHigh!==''&&(x[5]==null||x[5]>Number(priceHigh)))return false;return true}
function draw(){const count={};for(const g of Object.keys(OPTIONS))count[g]={};for(const x of all){let m=meta(x);for(const g of Object.keys(OPTIONS))count[g][m[g]]=(count[g][m[g]]||0)+1}
$('facetGroups').innerHTML=Object.keys(OPTIONS).map(group=>'<div class="facet-section"><h4>'+DISPLAY[group]+'</h4><div class="facet-list">'+OPTIONS[group].map(value=>{let v=state[group]?.[value]||'',n=count[group][value]||0;return '<div class="facet-chip" data-facet="'+safe(group)+'" data-value="'+safe(value)+'"><span class="facet-name">'+safe(value)+' <small>'+n+'</small></span><button type="button" title="Include '+safe(value)+'" aria-label="Include '+safe(value)+'" aria-pressed="'+(v==='in')+'" data-mode="in" class="'+(v==='in'?'on-include':'')+'">+</button><button type="button" title="Exclude '+safe(value)+'" aria-label="Exclude '+safe(value)+'" aria-pressed="'+(v==='out')+'" data-mode="out" class="'+(v==='out'?'on-exclude':'')+'">−</button></div>'}).join('')+'</div></div>').join('');
if(pricesEnabled){$('priceLow').value=priceLow;$('priceHigh').value=priceHigh;$('pricedOnly').checked=pricedOnly}$('knownFinishOnly').checked=knownFinishOnly;drawSummary()}
function drawSummary(){const tags=[];for(const [g,options] of Object.entries(OPTIONS))for(const k of options){let v=state[g]?.[k];if(v)tags.push('<span class="active-filter '+(v==='out'?'exclude':'')+'">'+(v==='out'?'− ':'+ ')+safe(k)+'</span>')}if(pricesEnabled&&priceLow!=='')tags.push('<span class="active-filter">Min $'+safe(priceLow)+'</span>');if(pricesEnabled&&priceHigh!=='')tags.push('<span class="active-filter">Max $'+safe(priceHigh)+'</span>');$('activeFacetSummary').innerHTML=tags.length?tags.join(''):'<span class="muted">No advanced filters set</span>'}
function changed(){persist();drawSummary();onFilter()}
function reset(){state={collab:{},type:{},finish:{},theme:{},setStyle:{}};priceLow='';priceHigh='';pricedOnly=false;knownFinishOnly=false;draw();changed()}
function example(){['search','collection','pdfPage'].forEach(id=>{const el=document.getElementById(id);if(el)el.value=''});const sort=document.getElementById('sort');if(sort)sort.value='original';state={collab:{Disney:'in'},type:{Rings:'in',Bracelets:'in',Necklaces:'out'},finish:{'Rose Gold':'out'},theme:{},setStyle:{}};priceLow='';priceHigh='';pricedOnly=false;knownFinishOnly=false;draw();changed();$('advancedPanel').open=true;window.scrollTo({top:175,behavior:'smooth'})}
function setup(items,callback,priced=true){all=items;pricesEnabled=priced;onFilter=callback;load();if(!pricesEnabled){priceLow='';priceHigh='';pricedOnly=false}draw();$('facetGroups').addEventListener('click',e=>{let b=e.target.closest('button[data-mode]'),box=e.target.closest('[data-facet]');if(!b||!box)return;let g=box.dataset.facet,k=box.dataset.value,mode=b.dataset.mode;state[g]??={};if(state[g][k]===mode)delete state[g][k];else state[g][k]=mode;draw();changed()});if(pricesEnabled){[['priceLow',v=>priceLow=v],['priceHigh',v=>priceHigh=v]].forEach(([id,set])=>{$(id).addEventListener('input',e=>{set(e.target.value);changed()})});$('pricedOnly').addEventListener('change',e=>{pricedOnly=e.target.checked;changed()})}$('knownFinishOnly').addEventListener('change',e=>{knownFinishOnly=e.target.checked;changed()});$('resetAdvanced').addEventListener('click',reset);$('presetDisney').addEventListener('click',example);
$('savePreset').addEventListener('click',()=>{const name=prompt('Name this saved filter preset:');if(!name||!name.trim())return;let a={};try{a=JSON.parse(localStorage.getItem('pandoraSavedPresets')||'{}')}catch(_){}a[name.trim().slice(0,40)]={state:JSON.parse(JSON.stringify(state)),priceLow,priceHigh,pricedOnly,knownFinishOnly};localStorage.setItem('pandoraSavedPresets',JSON.stringify(a));drawPresets()});
$('savedPresets').addEventListener('change',e=>{if(!e.target.value)return;let a={};try{a=JSON.parse(localStorage.getItem('pandoraSavedPresets')||'{}')}catch(_){}let v=a[e.target.value];if(!v)return;state=v.state;priceLow=v.priceLow;priceHigh=v.priceHigh;pricedOnly=v.pricedOnly;knownFinishOnly=v.knownFinishOnly;draw();changed()});drawPresets();
document.addEventListener('click',e=>{if(!e.target.matches('#saveProductTags'))return;const id=e.target.getAttribute('data-item'),s=$('tagCollab'),t=$('tagType'),f=$('tagFinish'),b=$('tagSetStyle');if(!id||!s||!t||!f||!b)return;overrides[id]={collab:s.value,type:t.value,finish:f.value,setStyle:b.value};try{localStorage.setItem('pandoraTagOverrides',JSON.stringify(overrides))}catch(_){}cache.delete(id);e.target.textContent='SAVED ON THIS DEVICE ✓';onFilter()});
}
function drawPresets(){let o={};try{o=JSON.parse(localStorage.getItem('pandoraSavedPresets')||'{}')}catch(_){}$('savedPresets').innerHTML='<option value="">Load saved preset…</option>'+Object.keys(o).sort().map(s=>'<option value="'+safe(s)+'">'+safe(s)+'</option>').join('')}
function badge(x){const m=meta(x);return '<span class="tag">'+safe(m.type)+'</span>'+(m.setStyle!=='Not a Set'?'<span class="tag">'+safe(m.setStyle)+'</span>':'')+(m.collab!=='Unverified / Other'?'<span class="tag collab">'+safe(m.collab)+'</span>':'')+'<span class="tag metal">'+safe(m.finish)+'</span>'}
function editor(x){const m=meta(x),id=safe(x[0]);return '<details class="edit-tags"><summary>Edit tags for this item</summary><p class="small">Changes are saved only in this browser, not for other visitors.</p>'+[['tagCollab','Collaboration','collab'],['tagType','Jewelry type','type'],['tagFinish','Color / finish','finish'],['tagSetStyle','Bundle / set style','setStyle']].map(([id,label,g])=>'<label>'+label+'<select id="'+id+'">'+OPTIONS[g].map(v=>'<option '+(m[g]===v?'selected':'')+'>'+safe(v)+'</option>').join('')+'</select></label>').join('')+'<button class="secondary" id="saveProductTags" data-item="'+id+'">Save tags</button></details>'}
window.PANDORA_ADVANCED={setup,match,reset,meta,badge,editor};
})();