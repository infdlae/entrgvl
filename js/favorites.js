
shell("meu");
const favsEl=document.querySelector("#favs"),triedEl=document.querySelector("#tried"),p=document.querySelector("#progress"),pt=document.querySelector("#progressText");
function render(){
 const f=store.get("coffee:favs"),t=store.get("coffee:tried"),notes=store.obj("coffee:notes");
 const withNotes=Object.values(notes).filter(v=>String(v||"").trim()).length;
 favsEl.innerHTML=f.length?R.filter(r=>f.includes(r.id)).map(recipeCard).join(""):`<div class="empty premium-empty"><strong>Nenhum favorito ainda.</strong><span>Salve os cafés que mais chamarem sua atenção para criar sua própria coleção.</span><a class="btn btn-primary" href="explorar.html">Explorar cafés</a></div>`;
 triedEl.innerHTML=t.length?R.filter(r=>t.includes(r.id)).map(recipeCard).join(""):`<div class="empty premium-empty"><strong>Sua jornada ainda está começando.</strong><span>Ao concluir um preparo, marque como experimentado para acompanhar sua evolução.</span></div>`;
 const pct=R.length?t.length/R.length*100:0;p.style.width=pct+"%";pt.textContent=`${t.length} de ${R.length} preparos experimentados · ${Math.round(pct)}%`;
 document.querySelector("#favCount").textContent=f.length;document.querySelector("#triedCount").textContent=t.length;document.querySelector("#noteCount").textContent=withNotes;
 bindFavs(render);
}
document.querySelector("#random").onclick=()=>{const r=R[Math.floor(Math.random()*R.length)];location.href="receita.html?id="+r.id};
render();
