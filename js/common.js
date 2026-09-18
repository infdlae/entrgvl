
const R=window.COFFEE_RECIPES;
const store={
 get(k){try{return JSON.parse(localStorage.getItem(k)||"[]")}catch{return []}},
 set(k,v){localStorage.setItem(k,JSON.stringify(v))},
 obj(k){try{return JSON.parse(localStorage.getItem(k)||"{}")}catch{return {}}},
 setObj(k,v){localStorage.setItem(k,JSON.stringify(v))}
};
function toggleId(key,id){let a=store.get(key);a=a.includes(id)?a.filter(x=>x!==id):[...a,id];store.set(key,a);return a.includes(id)}
function recipeCard(r){
 const f=store.get("coffee:favs").includes(r.id);
 return `<article class="recipe-card"><div class="topline"><span class="tag">${r.icon} ${r.category}</span><button class="heart" data-fav="${r.id}" aria-label="Favoritar">${f?"♥":"♡"}</button></div><h3><a href="receita.html?id=${r.id}">${r.name}</a></h3><p>${r.summary}</p><div class="recipe-meta"><span>◎ ${r.country}</span><span>◷ ${r.active_time}</span><span>◆ ${r.difficulty}</span></div></article>`;
}
function bindFavs(cb){
 document.querySelectorAll("[data-fav]").forEach(b=>b.onclick=e=>{e.preventDefault();toggleId("coffee:favs",+b.dataset.fav);if(cb)cb();else b.textContent=store.get("coffee:favs").includes(+b.dataset.fav)?"♥":"♡"})
}
function shell(active=""){
 const menu=document.getElementById("menu"), toggle=document.getElementById("menuToggle");
 if(toggle){toggle.onclick=()=>menu.classList.toggle("open");document.addEventListener("click",e=>{if(!menu.contains(e.target)&&!toggle.contains(e.target))menu.classList.remove("open")})}
 document.querySelectorAll(".bottom-nav a").forEach(a=>a.classList.toggle("active",a.dataset.nav===active));
}
if("serviceWorker" in navigator){window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}))}
