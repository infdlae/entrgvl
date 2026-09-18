
shell("");
const ratioCoffee=document.querySelector("#ratioCoffee"),ratioWater=document.querySelector("#ratioWater"),ratioValue=document.querySelector("#ratioValue"),ratioOut=document.querySelector("#ratioOut");
function calcFromCoffee(){const c=+ratioCoffee.value||0,r=+ratioValue.value||16;ratioWater.value=c&&r?Math.round(c*r):""}
function calcFromWater(){const w=+ratioWater.value||0,r=+ratioValue.value||16;ratioCoffee.value=w&&r?(w/r).toFixed(1):""}
[ratioCoffee,ratioValue].forEach(x=>x.addEventListener("input",calcFromCoffee));ratioWater.addEventListener("input",calcFromWater);
document.querySelector("#ratioPreset").addEventListener("change",e=>{ratioValue.value=e.target.value;calcFromCoffee()});

const mood=document.querySelector("#mood"),milk=document.querySelector("#milk"),effort=document.querySelector("#effort"),compassOut=document.querySelector("#compassOut");
document.querySelector("#compassGo").onclick=()=>{
 let candidates=R.slice();
 if(mood.value==="gelado")candidates=candidates.filter(r=>r.category==="Gelados"||/gelado/i.test(r.temp));
 if(mood.value==="intenso")candidates=candidates.filter(r=>/intenso/i.test(r.profile)||["Clássicos","Métodos"].includes(r.category));
 if(mood.value==="doce")candidates=candidates.filter(r=>["Sobremesa","Doces & especiarias"].includes(r.category)||/doce/i.test(r.profile));
 if(mood.value==="mundo")candidates=candidates.filter(r=>r.category==="Mundo");
 if(milk.value==="sim")candidates=candidates.filter(r=>r.category==="Com leite"||/leite|milk|latte|cappuccino|mocha/i.test(r.name+" "+r.ingredients.join(" ")));
 if(milk.value==="nao")candidates=candidates.filter(r=>!(/leite|milk|latte|cappuccino|mocha/i.test(r.name+" "+r.ingredients.join(" "))));
 if(effort.value==="facil")candidates=candidates.filter(r=>r.difficulty==="Fácil");
 if(!candidates.length)candidates=R;
 const picks=[...candidates].sort(()=>Math.random()-.5).slice(0,3);
 compassOut.innerHTML=picks.map(r=>recipeCard(r,{compact:true})).join("");
 bindFavs();
 compassOut.scrollIntoView({behavior:"smooth",block:"nearest"});
};
