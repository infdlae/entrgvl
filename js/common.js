
const R=window.COFFEE_RECIPES||[];

const store={
  get(k){try{return JSON.parse(localStorage.getItem(k)||"[]")}catch{return[]}},
  set(k,v){localStorage.setItem(k,JSON.stringify(v))},
  obj(k){try{return JSON.parse(localStorage.getItem(k)||"{}")}catch{return{}}},
  setObj(k,v){localStorage.setItem(k,JSON.stringify(v))}
};

function toggleId(key,id){
  let a=store.get(key);
  a=a.includes(id)?a.filter(x=>x!==id):[...a,id];
  store.set(key,a);
  return a.includes(id);
}

function addRecent(id){
  let a=store.get("coffee:recent").filter(x=>x!==id);
  a.unshift(id);
  store.set("coffee:recent",a.slice(0,12));
}

function coffeeStats(){
  const tried=store.get("coffee:tried");
  const favs=store.get("coffee:favs");
  const notes=store.obj("coffee:notes");
  return {
    total:R.length,
    tried:tried.length,
    favs:favs.length,
    notes:Object.values(notes).filter(Boolean).length,
    percent:R.length?Math.round(tried.length/R.length*100):0
  };
}

function dailyRecipe(){
  if(!R.length)return null;
  const d=new Date();
  const stamp=Number(String(d.getFullYear())+String(d.getMonth()+1).padStart(2,"0")+String(d.getDate()).padStart(2,"0"));
  return R[stamp%R.length];
}

function recipeCard(r,{compact=false}={}){
  const f=store.get("coffee:favs").includes(r.id);
  return `<article class="recipe-card ${compact?"recipe-card-compact":""}">
    <a class="recipe-card-hit" href="receita.html?id=${r.id}" aria-label="Abrir ${r.name}"></a>
    <div class="recipe-visual" aria-hidden="true"><span>${r.icon||"☕"}</span><i></i></div>
    <div class="topline">
      <span class="tag">${r.category}</span>
      <button class="heart ${f?"is-on":""}" data-fav="${r.id}" aria-label="${f?"Remover dos favoritos":"Adicionar aos favoritos"}">${f?"♥":"♡"}</button>
    </div>
    <h3>${r.name}</h3>
    <p>${r.summary}</p>
    <div class="recipe-meta"><span>◎ ${r.country}</span><span>◷ ${r.active_time}</span><span>◆ ${r.difficulty}</span></div>
    <div class="card-open">Abrir receita <span>→</span></div>
  </article>`;
}

function bindFavs(cb){
  document.querySelectorAll("[data-fav]").forEach(b=>{
    b.onclick=e=>{
      e.preventDefault();
      e.stopPropagation();
      const id=+b.dataset.fav;
      toggleId("coffee:favs",id);
      toast(store.get("coffee:favs").includes(id)?"Salvo em Meu Café":"Removido dos favoritos");
      if(cb)cb();
      else{
        const on=store.get("coffee:favs").includes(id);
        b.textContent=on?"♥":"♡";
        b.classList.toggle("is-on",on);
      }
    };
  });
}

function toast(message){
  let el=document.querySelector(".app-toast");
  if(!el){
    el=document.createElement("div");
    el.className="app-toast";
    document.body.appendChild(el);
  }
  el.textContent=message;
  el.classList.add("show");
  clearTimeout(el._t);
  el._t=setTimeout(()=>el.classList.remove("show"),2200);
}

function setupReveal(){
  const items=document.querySelectorAll(".reveal");
  if(!items.length)return;
  if(matchMedia("(prefers-reduced-motion: reduce)").matches||!("IntersectionObserver"in window)){
    items.forEach(x=>x.classList.add("visible"));return;
  }
  const io=new IntersectionObserver(es=>es.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add("visible");io.unobserve(e.target)}
  }),{threshold:.1});
  items.forEach(x=>io.observe(x));
}

let deferredInstallPrompt=null;
window.addEventListener("beforeinstallprompt",e=>{
  e.preventDefault();
  deferredInstallPrompt=e;
  document.querySelectorAll("[data-install]").forEach(b=>b.hidden=false);
});
async function installApp(){
  if(!deferredInstallPrompt){toast("Use o menu do navegador para adicionar à tela inicial.");return}
  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt=null;
  document.querySelectorAll("[data-install]").forEach(b=>b.hidden=true);
}

function shell(active=""){
  const menu=document.getElementById("menu");
  const toggle=document.getElementById("menuToggle");
  if(toggle&&menu){
    toggle.onclick=()=>{const open=menu.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open))};
    document.addEventListener("click",e=>{
      if(!menu.contains(e.target)&&!toggle.contains(e.target)){menu.classList.remove("open");toggle.setAttribute("aria-expanded","false")}
    });
    document.addEventListener("keydown",e=>{if(e.key==="Escape"){menu.classList.remove("open");toggle.setAttribute("aria-expanded","false")}});
  }
  document.querySelectorAll(".bottom-nav a").forEach(a=>a.classList.toggle("active",a.dataset.nav===active));
  document.querySelectorAll("[data-install]").forEach(b=>b.onclick=installApp);
  setupReveal();
}

if("serviceWorker"in navigator){
  window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
}
