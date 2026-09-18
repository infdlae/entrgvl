
shell("meu");
const favsEl=document.querySelector("#favs"),triedEl=document.querySelector("#tried"),p=document.querySelector("#progress"),pt=document.querySelector("#progressText");
function render(){const f=store.get("coffee:favs"),t=store.get("coffee:tried");favsEl.innerHTML=f.length?R.filter(r=>f.includes(r.id)).map(recipeCard).join(""):`<div class="empty">Você ainda não salvou nenhum favorito.</div>`;triedEl.innerHTML=t.length?R.filter(r=>t.includes(r.id)).map(recipeCard).join(""):`<div class="empty">Marque um preparo quando experimentar.</div>`;p.style.width=`${t.length/R.length*100}%`;pt.textContent=`${t.length} de ${R.length} preparos experimentados`;bindFavs(render)}render();
