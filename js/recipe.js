
shell("explorar");
const id=+new URL(location.href).searchParams.get("id"),r=R.find(x=>x.id===id)||R[0],root=document.querySelector("#recipe");
let timerInt=null,timerSec=0;
function render(){
 const fav=store.get("coffee:favs").includes(r.id),tried=store.get("coffee:tried").includes(r.id),notes=store.obj("coffee:notes")[r.id]||"";
 document.title=`${r.name} · 50+ Maneiras de Fazer Café`;
 root.innerHTML=`<div class="container">
 <a href="explorar.html" style="display:inline-block;margin-bottom:16px;color:#75655a">← Voltar para explorar</a>
 <div class="detail-hero">
  <section class="dark-panel"><span class="eyebrow">${r.icon} ${r.category} · ${r.country}</span><h1>${r.name}</h1><p class="lead">${r.summary}</p><div class="hero-actions"><button id="guide" class="btn btn-primary">Iniciar modo preparo →</button><button id="fav" class="btn btn-secondary">${fav?"♥ Favorito":"♡ Salvar"}</button></div><img class="detail-bean" src="assets/images/coffee-bean.png" alt=""></section>
  <aside class="facts">
   <div class="fact"><small>Dificuldade</small><strong>${r.difficulty}</strong></div><div class="fact"><small>Tempo</small><strong>${r.active_time}</strong></div>
   <div class="fact"><small>Moagem</small><strong>${r.grind}</strong></div><div class="fact"><small>Água</small><strong>${r.water_temp}</strong></div>
   <div class="fact"><small>Proporção</small><strong>${r.ratio}</strong></div><div class="fact"><small>Rendimento</small><strong>${r.yield_}</strong></div>
   <div class="fact"><small>Equipamento</small><strong>${r.equipment}</strong></div><div class="fact"><small>Perfil</small><strong>${r.profile}</strong></div>
  </aside>
 </div>
 <div class="content-grid main">
  <section class="panel"><span class="eyebrow">Mise en place</span><h2>Ingredientes</h2><div class="ingredients">${r.ingredients.map((x,i)=>`<label><input type="checkbox" data-ing="${i}"><span>${x}</span></label>`).join("")}</div><div class="tip" style="margin-top:18px"><strong>Dica de serviço</strong><br>${r.tip}</div></section>
  <section class="panel"><span class="eyebrow">Passo a passo</span><h2>Como preparar</h2><div class="steps">${r.steps.map(s=>`<div class="step">${s}</div>`).join("")}</div></section>
 </div>
 <div class="content-grid two">
  <section class="panel"><span class="eyebrow">Contexto</span><h2>Entenda o estilo</h2><p>${r.context}</p><div class="notice">As proporções são referências domésticas. Grão, torra, equipamento e paladar mudam o resultado — ajuste uma variável por vez.</div></section>
  <section class="panel"><span class="eyebrow">Ajuste fino</span><h2>Se algo não sair como esperado</h2><div class="trouble">${r.troubleshooting.map(x=>`<div><strong>${x[0]}</strong><span>${x[1]}</span></div>`).join("")}</div></section>
 </div>
 <div class="content-grid two">
  <section class="panel"><span class="eyebrow">Variações</span><h2>Faça do seu jeito</h2><ul>${r.variations.map(x=>`<li>${x}</li>`).join("")}</ul></section>
  <section class="panel"><span class="eyebrow">Seu registro</span><h2>Minha experiência</h2><div class="guide-actions"><button id="tried" class="mini-btn ${tried?"active":""}">${tried?"✓ Já experimentei":"Marcar como experimentado"}</button></div><label style="display:block;margin-top:16px;font-weight:800">Notas pessoais</label><textarea id="notes" class="field notes" placeholder="Ex.: usei moagem 18 no meu moedor, achei mais doce com 30 s…">${notes}</textarea></section>
 </div>
 <section class="panel" style="margin-top:16px"><span class="eyebrow">Cronômetro livre</span><h2>Controle o tempo sem sair da receita</h2><div class="timer"><strong id="timerDisplay" class="timer-display">00:00</strong><button id="timerStart" class="mini-btn">Iniciar</button><button id="timerReset" class="mini-btn">Zerar</button></div></section>
 </div>`;
 document.querySelector("#fav").onclick=()=>{toggleId("coffee:favs",r.id);render()};
 document.querySelector("#tried").onclick=()=>{toggleId("coffee:tried",r.id);render()};
 document.querySelector("#notes").oninput=e=>{const o=store.obj("coffee:notes");o[r.id]=e.target.value;store.setObj("coffee:notes",o)};
 document.querySelector("#guide").onclick=openGuide;
 const display=document.querySelector("#timerDisplay"),start=document.querySelector("#timerStart"),reset=document.querySelector("#timerReset");
 start.onclick=()=>{if(timerInt){clearInterval(timerInt);timerInt=null;start.textContent="Continuar";return}start.textContent="Pausar";timerInt=setInterval(()=>{timerSec++;display.textContent=String(Math.floor(timerSec/60)).padStart(2,"0")+":"+String(timerSec%60).padStart(2,"0")},1000)};
 reset.onclick=()=>{clearInterval(timerInt);timerInt=null;timerSec=0;display.textContent="00:00";start.textContent="Iniciar"};
}
let guideIndex=0;
function openGuide(){guideIndex=0;document.querySelector("#modeTitle").textContent=r.name;document.querySelector("#mode").classList.add("open");drawGuide()}
function drawGuide(){document.querySelector("#modeCount").textContent=`Passo ${guideIndex+1} de ${r.steps.length}`;document.querySelector("#modeStep").textContent=r.steps[guideIndex];document.querySelector("#modePrev").disabled=guideIndex===0;document.querySelector("#modeNext").textContent=guideIndex===r.steps.length-1?"Concluir":"Próximo →"}
document.querySelector("#modeClose").onclick=()=>document.querySelector("#mode").classList.remove("open");
document.querySelector("#modePrev").onclick=()=>{if(guideIndex>0){guideIndex--;drawGuide()}};
document.querySelector("#modeNext").onclick=()=>{if(guideIndex<r.steps.length-1){guideIndex++;drawGuide()}else{document.querySelector("#mode").classList.remove("open");if(!store.get("coffee:tried").includes(r.id))toggleId("coffee:tried",r.id);render()}};
render();
