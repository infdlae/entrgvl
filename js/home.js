
shell("inicio");

const stats=coffeeStats();
const daily=dailyRecipe();
const tried=store.get("coffee:tried");
const recent=store.get("coffee:recent");
const recentRecipes=recent.map(id=>R.find(r=>r.id===id)).filter(Boolean).slice(0,4);

const statTried=document.querySelector("#statTried");
const statFavs=document.querySelector("#statFavs");
const statProgress=document.querySelector("#statProgress");
const progressRing=document.querySelector("#progressRing");
const progressBar=document.querySelector("#homeProgress");
const continueWrap=document.querySelector("#continueWrap");
const dailyWrap=document.querySelector("#dailyWrap");
const recentWrap=document.querySelector("#recentWrap");

if(statTried)statTried.textContent=stats.tried;
if(statFavs)statFavs.textContent=stats.favs;
if(statProgress)statProgress.textContent=stats.percent+"%";
if(progressBar)progressBar.style.width=stats.percent+"%";
if(progressRing)progressRing.style.setProperty("--p",stats.percent*3.6+"deg");

if(daily&&dailyWrap){
  dailyWrap.innerHTML=`<a class="featured-recipe" href="receita.html?id=${daily.id}">
    <div>
      <span class="eyebrow">Escolha do dia</span>
      <h3>${daily.name}</h3>
      <p>${daily.summary}</p>
      <div class="featured-meta"><span>◎ ${daily.country}</span><span>◷ ${daily.active_time}</span><span>◆ ${daily.difficulty}</span></div>
    </div>
    <div class="featured-orb"><span>${daily.icon||"☕"}</span></div>
  </a>`;
}

const last=recentRecipes[0] || (tried.length ? R.find(r=>r.id===tried[tried.length-1]) : null);
if(continueWrap){
  if(last){
    continueWrap.innerHTML=`<a class="resume-card" href="receita.html?id=${last.id}">
      <span class="resume-icon">${last.icon||"☕"}</span>
      <span><small>Continuar explorando</small><strong>${last.name}</strong></span>
      <b>→</b>
    </a>`;
  }else{
    continueWrap.innerHTML=`<a class="resume-card" href="explorar.html">
      <span class="resume-icon">⌕</span>
      <span><small>Comece por aqui</small><strong>Encontre seu primeiro preparo</strong></span>
      <b>→</b>
    </a>`;
  }
}

if(recentWrap){
  if(recentRecipes.length){
    recentWrap.innerHTML=recentRecipes.map(r=>recipeCard(r,{compact:true})).join("");
    bindFavs(()=>location.reload());
  }else{
    recentWrap.innerHTML=`<div class="empty premium-empty"><strong>Seu histórico começa na primeira xícara.</strong><span>Abra uma receita e ela aparecerá aqui para você voltar rapidamente.</span><a class="btn btn-primary" href="explorar.html">Explorar receitas</a></div>`;
  }
}

document.querySelectorAll("[data-surprise]").forEach(b=>b.onclick=()=>{
  const r=R[Math.floor(Math.random()*R.length)];
  location.href="receita.html?id="+r.id;
});
