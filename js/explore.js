
shell("explorar");
const q=document.querySelector("#q"),cat=document.querySelector("#cat"),temp=document.querySelector("#temp"),diff=document.querySelector("#diff"),grid=document.querySelector("#grid"),count=document.querySelector("#count"),chips=document.querySelector("#chips");
function fill(sel,key){[...new Set(R.map(x=>x[key]))].sort().forEach(v=>sel.insertAdjacentHTML("beforeend",`<option value="${v}">${v}</option>`))}
fill(cat,"category");fill(temp,"temp");fill(diff,"difficulty");
const url=new URL(location.href);if(url.searchParams.get("cat"))cat.value=url.searchParams.get("cat");if(url.searchParams.get("q"))q.value=url.searchParams.get("q");
const cats=[...new Set(R.map(x=>x.category))];chips.innerHTML=cats.map(c=>`<button class="chip ${cat.value===c?"on":""}" data-cat="${c}">${c}</button>`).join("");
function render(){
 const s=q.value.trim().toLowerCase();
 const list=R.filter(r=>(!cat.value||r.category===cat.value)&&(!temp.value||r.temp===temp.value)&&(!diff.value||r.difficulty===diff.value)&&(!s||[r.name,r.country,r.category,r.equipment,r.profile,r.ingredients.join(" ")].join(" ").toLowerCase().includes(s)));
 count.textContent=`${list.length} preparo${list.length!==1?"s":""} encontrado${list.length!==1?"s":""}.`;
 grid.innerHTML=list.length?list.map(recipeCard).join(""):`<div class="empty">Nenhum preparo encontrado. Remova um filtro ou tente outra busca.</div>`;
 bindFavs(render);
}
[q,cat,temp,diff].forEach(el=>el.addEventListener(el===q?"input":"change",()=>{document.querySelectorAll(".chip").forEach(c=>c.classList.toggle("on",c.dataset.cat===cat.value));render()}));
document.querySelectorAll(".chip").forEach(b=>b.onclick=()=>{cat.value=cat.value===b.dataset.cat?"":b.dataset.cat;document.querySelectorAll(".chip").forEach(c=>c.classList.toggle("on",c.dataset.cat===cat.value));render()});
render();
