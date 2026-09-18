
shell("mundo");const el=document.querySelector("#countries"),map={};R.forEach(r=>(map[r.country]??=[]).push(r));
const flags={"Brasil":"🇧🇷","Itália":"🇮🇹","EUA":"🇺🇸","Espanha":"🇪🇸","França":"🇫🇷","Áustria":"🇦🇹","Cuba":"🇨🇺","México":"🇲🇽","Turquia":"🇹🇷","Grécia":"🇬🇷","Etiópia":"🇪🇹","Vietnã":"🇻🇳","Senegal":"🇸🇳","Índia":"🇮🇳","Japão":"🇯🇵","Canadá":"🇨🇦","Indonésia":"🇮🇩","Hong Kong":"🇭🇰","Austrália":"🇦🇺"};
el.innerHTML=Object.entries(map).sort((a,b)=>b[1].length-a[1].length).map(([c,a])=>`<a class="country-card" href="explorar.html?q=${encodeURIComponent(c)}"><span class="flag">${flags[c]||"☕"}</span><strong>${c}</strong><small>${a.length} preparo${a.length>1?"s":""}</small></a>`).join("");
