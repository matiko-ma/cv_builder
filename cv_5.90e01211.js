document.addEventListener("DOMContentLoaded",()=>{document.getElementById("btn_create").addEventListener("click",async e=>{var a,i,d;e.preventDefault();let n={};for(let t=0;t<sessionStorage.length;t++){let e=sessionStorage.key(t);n[e]=sessionStorage.getItem(e)}let o=JSON.parse(n.cardsData||"{}"),s=await fetch("https://timeapi.io/api/Time/current/zone?timeZone=Europe/Moscow"),r=await s.json(),p=(a=n,i=o,d=`${r.year}-${String(r.month).padStart(2,"0")}-${String(r.day).padStart(2,"0")} ${String(r.hour).padStart(2,"0")}:${String(r.minute).padStart(2,"0")}:${String(r.seconds).padStart(2,"0")}`,`
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
            <p><b>\u{421}\u{43E}\u{437}\u{434}\u{430}\u{43D}\u{43E}:</b> ${d} \u{41C}\u{421}\u{41A}</p>
            <p class="h1">${a.name||""} ${a.surname||""}</p>
            ${a.photo_input?`<img class="photo" src="${a.photo_input}" />`:""}

            <p><b>\u{414}\u{43E}\u{43B}\u{436}\u{43D}\u{43E}\u{441}\u{442}\u{44C}:</b> ${a.posName||""}</p>
            <p><b>Email:</b> ${a.email||""}</p>
            <p><b>\u{422}\u{435}\u{43B}\u{435}\u{444}\u{43E}\u{43D}:</b> ${a.phone||""}</p>

            <div class="section">
                <div class="title">\u{41E} \u{441}\u{435}\u{431}\u{435}</div>
                <p>${a.about_text||""}</p>
            </div>

            ${t("Образование",i.ed_card,{ed_lvl:"Уровень образования",ed_uni:"Учебное заведение",ed_start:"Начало обучения",ed_end:"Окончание обучения",ed_fcl:"Факультет",ed_major:"Специализация"})}

        ${t("Опыт работы",i.exp_card,{exp_pos:"Должность",exp_org:"Организация",exp_start:"Начало работы",exp_end:"Окончание работы",w_cur:"Работаю сейчас",exp_resp:"Обязанности и достижения"})}

        ${t("Языки",i.lang,{adt_lng_name:"Язык",adt_lvl_lang:"Уровень"})}

        ${t("Hard Skills",i.hard_skills,{adt_hard_name:"Навык",adt_lvl_hard:"Уровень"})}

        ${t("Soft Skills",i.soft_skills,{adt_soft_name:"Навык",adt_lvl_soft:"Уровень"})}

        ${t("Публикации",i.articles,{adt_year:"Год публикации",adt_journal:"Журнал",adt_ref:"Ссылка"})}

        </body>
        </html>`),l=await fetch("https://api.html2pdf.app/v1/generate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({html:p,apiKey:"c",pageSize:"A4"})}),u=await l.blob(),c=URL.createObjectURL(u);window.open(c,"_blank")})});function t(t,e,a){if(!e||0===e.length)return"";let i=`<div class="section"><div class="title">${t}</div>`;return e.forEach(t=>{for(let e of(i+="<div>",Object.keys(a)))if(e in t.data){let d=a[e];i+=`<p><span>${d}:</span> ${t.data[e]}</p>`}i+="</div>"}),i+="</div>"}
//# sourceMappingURL=cv_5.90e01211.js.map
