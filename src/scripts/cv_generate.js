document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById("btn_create");

    btn.addEventListener("click", async (e) => {
        e.preventDefault();

        const storage = {};
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            storage[key] = sessionStorage.getItem(key);
        }

        const cardsData = JSON.parse(storage.cardsData || '{}');

        // Получаем время с timeapi.io (GET-запрос)
        let createdAt;
        const response = await fetch("https://timeapi.io/api/Time/current/zone?timeZone=Europe/Moscow");
        const data = await response.json();
        createdAt = `${data.year}-${String(data.month).padStart(2, '0')}-${String(data.day).padStart(2, '0')} ${String(data.hour).padStart(2, '0')}:${String(data.minute).padStart(2, '0')}:${String(data.seconds).padStart(2, '0')}`;

        // Преобразование всех данных в HTML 
        const html = generateHTML(storage, cardsData, createdAt);

        // Формирование PDF с помощью API html2pdf (POST-запрос)
        const pdfResponse = await fetch("https://api.html2pdf.app/v1/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                html,
                apiKey: "6CwulKugycaW5Yt1OB0CPIFSPgQt24jBaI5aXW59YQAWip0rqiAH6cObOHQ8Nufj",
                pageSize: "A4"
            })
        });

        const pdfBlob = await pdfResponse.blob();
        const url = URL.createObjectURL(pdfBlob);

        // Открытие PDF в новой вкладке
        window.open(url, "_blank");
    });
});

function generateHTML(storage, cardsData, createdAt) {
    return `
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
            <p><b>Создано:</b> ${createdAt} МСК</p>
            <h1>${storage.name || ''} ${storage.surname || ''}</h1>
            ${storage.photo_input ? `<img class="photo" src="${storage.photo_input}" />` : ''}

            <p><b>Должность:</b> ${storage.posName || ''}</p>
            <p><b>Email:</b> ${storage.email || ''}</p>
            <p><b>Телефон:</b> ${storage.phone || ''}</p>

            <div class="section">
                <div class="title">О себе</div>
                <p>${storage.about_text || ''}</p>
            </div>

            ${renderSection("Образование", cardsData.ed_card, {
        ed_lvl: 'Уровень образования',
        ed_uni: 'Учебное заведение',
        ed_start: 'Начало обучения',
        ed_end: 'Окончание обучения',
        ed_fcl: 'Факультет',
        ed_major: 'Специализация'
    })}

        ${renderSection("Опыт работы", cardsData.exp_card, {
        exp_pos: 'Должность',
        exp_org: 'Организация',
        exp_start: 'Начало работы',
        exp_end: 'Окончание работы',
        w_cur: 'Работаю сейчас',
        exp_resp: 'Обязанности и достижения'
    })}

        ${renderSection("Языки", cardsData.lang, {
        adt_lng_name: 'Язык',
        adt_lvl_lang: 'Уровень'
    })}

        ${renderSection("Hard Skills", cardsData.hard_skills, {
        adt_hard_name: 'Навык',
        adt_lvl_hard: 'Уровень'
    })}

        ${renderSection("Soft Skills", cardsData.soft_skills, {
        adt_soft_name: 'Навык',
        adt_lvl_soft: 'Уровень'
    })}

        ${renderSection("Публикации", cardsData.articles, {
        adt_year: 'Год публикации',
        adt_journal: 'Журнал',
        adt_ref: 'Ссылка'
    })}

        </body>
        </html>`;
}

function renderSection(title, cards, keyMap) {
    if (!cards || cards.length === 0) return "";
    let html = `<div class="section"><div class="title">${title}</div>`;
    cards.forEach(card => {
        html += "<div>";
        for (const key of Object.keys(keyMap)) {
            if (key in card.data) {
                const label = keyMap[key];
                html += `<p><span>${label}:</span> ${card.data[key]}</p>`;
            }
        }
        html += "</div>";
    });
    html += "</div>";
    return html;
}