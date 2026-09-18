
shell("explorar");
const q=document.querySelector("#q"),cat=document.querySelector("#cat"),temp=document.querySelector("#temp"),diff=document.querySelector("#diff"),grid=document.querySelector("#grid"),count=document.querySelector("#count"),chips=document.querySelector("#chips"),favOnly=document.querySelector("#favOnly"),sort=document.querySelector("#sort"),random=document.querySelector("#random");
let favoritesOnly=false;

function fill(sel,key){[...new Set(R.map(x=>x[key]))].sort().forEach(v=>sel.insertAdjacentHTML("beforeend",`<option value="${v}">${v}</option>`))}
fill(cat,"category");fill(temp,"temp");fill(diff,"difficulty");

const url=new URL(location.href);
if(url.searchParams.get("cat"))cat.value=url.searchParams.get("cat");
if(url.searchParams.get("q"))q.value=url.searchParams.get("q");

const cats=[...new Set(R.map(x=>x.category))];
chips.innerHTML=cats.map(c=>`<button class="chip ${cat.value===c?"on":""}" data-cat="${c}">${c}</button>`).join("");

function minutes(r){
 const s=(r.active_time||"").toString();
 const n=parseInt(s)||999;
 return /h/.test(s)?n*60:n;
}
function difficultyRank(v){return ({Fácil:1,Médio:2,Avançado:3}[v]||9)}
function render(){
 const s=q.value.trim().toLowerCase();
 const favs=store.get("coffee:favs");
 let list=R.filter(r=>
   (!cat.value||r.category===cat.value)&&
   (!temp.value||r.temp===temp.value)&&
   (!diff.value||r.difficulty===diff.value)&&
   (!favoritesOnly||favs.includes(r.id))&&
   (!s||[r.name,r.country,r.category,r.equipment,r.profile,r.ingredients.join(" "),r.context].join(" ").toLowerCase().includes(s))
 );
 if(sort.value==="name")list.sort((a,b)=>a.name.localeCompare(b.name,"pt-BR"));
 if(sort.value==="quick")list.sort((a,b)=>minutes(a)-minutes(b));
 if(sort.value==="easy")list.sort((a,b)=>difficultyRank(a.difficulty)-difficultyRank(b.difficulty)||a.name.localeCompare(b.name));
 if(sort.value==="country")list.sort((a,b)=>a.country.localeCompare(b.country,"pt-BR")||a.name.localeCompare(b.name));
 count.textContent=`${list.length} preparo${list.length!==1?"s":""} encontrado${list.length!==1?"s":""}.`;
 grid.innerHTML=list.length?list.map(recipeCard).join(""):`<div class="empty premium-empty"><strong>Nenhum preparo encontrado.</strong><span>Tente remover um filtro, mudar a busca ou desativar “Só favoritos”.</span></div>`;
 bindFavs(render);
}
[q,cat,temp,diff,sort].forEach(el=>el.addEventListener(el===q?"input":"change",()=>{
 document.querySelectorAll(".chip").forEach(c=>c.classList.toggle("on",c.dataset.cat===cat.value));render()
}));
document.querySelectorAll(".chip").forEach(b=>b.onclick=()=>{
 cat.value=cat.value===b.dataset.cat?"":b.dataset.cat;
 document.querySelectorAll(".chip").forEach(c=>c.classList.toggle("on",c.dataset.cat===cat.value));
 render();
});
favOnly.onclick=()=>{favoritesOnly=!favoritesOnly;favOnly.classList.toggle("active",favoritesOnly);favOnly.textContent=favoritesOnly?"♥ Favoritos ativos":"♡ Só favoritos";render()};
random.onclick=()=>{const available=R.filter(r=>(!cat.value||r.category===cat.value)&&(!temp.value||r.temp===temp.value)&&(!diff.value||r.difficulty===diff.value));const pick=available[Math.floor(Math.random()*available.length)]||R[0];location.href="receita.html?id="+pick.id};
render();
