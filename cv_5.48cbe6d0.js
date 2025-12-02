document.addEventListener("DOMContentLoaded",()=>{document.getElementById("btn_create").addEventListener("click",async e=>{var a,i,o;e.preventDefault();let n={};for(let t=0;t<sessionStorage.length;t++){let e=sessionStorage.key(t);n[e]=sessionStorage.getItem(e)}let r=JSON.parse(n.cardsData||"{}"),s=await fetch("https://timeapi.io/api/Time/current/zone?timeZone=Europe/Moscow"),d=await s.json(),p=(a=n,i=r,o=`${d.year}-${String(d.month).padStart(2,"0")}-${String(d.day).padStart(2,"0")} ${String(d.hour).padStart(2,"0")}:${String(d.minute).padStart(2,"0")}:${String(d.seconds).padStart(2,"0")}`,`
            <html>
            <head>
                <meta charset="UTF-8" />
                <style>
                    .section { margin-bottom: 20px; }
                    img.photo {
                        width:150px; height:150px; border-radius:50%; object-fit:cover;
                    }
                </style>
            </head>
            <body>
            <p><b>\u{421}\u{43E}\u{437}\u{434}\u{430}\u{43D}\u{43E}:</b> ${o} \u{41C}\u{421}\u{41A}</p>
            <h1>${a.name||""} ${a.surname||""}</h1>
            ${a.photo_input?`<img class="photo" src="${a.photo_input}" />`:""}

            <div class="section">
                <div class="title">\u{41E} \u{441}\u{435}\u{431}\u{435}</div>
                <p>${a.about_text||""}</p>
            </div>

            ${t("Образование",i.ed_card)}
            ${t("Опыт работы",i.exp_card)}
            ${t("Языки",i.lang)}
            ${t("Hard Skills",i.hard_skills)}
            ${t("Soft Skills",i.soft_skills)}
            ${t("Публикации",i.articles)}

            </body></html>`),l=await fetch("https://api.html2pdf.app/v1/generate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({html:p,apiKey:"6CwulKugycaW5Yt1OB0CPIFSPgQt24jBaI5aXW59YQAWip0rqiAH6cObOHQ8Nufj",pageSize:"A4"})}),c=await l.blob(),u=URL.createObjectURL(c);window.open(u,"_blank")});function t(t,e){if(!e||0===e.length)return"";let a=`<div class="section"><div class="title">${t}</div>`;return e.forEach(t=>{for(let e in a+="<div>",t.data)a+=`<p><i>${e}:</i> ${t.data[e]}</p>`;a+="</div>"}),a+="</div>"}});
//# sourceMappingURL=cv_5.48cbe6d0.js.map
