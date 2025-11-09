document.addEventListener('DOMContentLoaded', () => {
    const storage = {};
    for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        storage[key] = sessionStorage.getItem(key);
    }

    const cardsData = JSON.parse(storage.cardsData || '{}');

    const container = document.createElement('div');
    container.style.marginTop = '50px';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.justifySelf = 'center';
    container.style.gap = '20px';

    if (storage.photo_input) {
        const img = document.createElement('img');
        img.src = storage.photo_input;
        img.style.width = '150px';
        img.style.height = '150px';
        img.style.borderRadius = '50%';
        container.appendChild(img);
    }

    const personalInfo = document.createElement('div');
    personalInfo.innerHTML = `
        <p class="h1">${storage.name || ''} ${storage.surname || ''}</p>
        <p><span style="font-weight: var(--typography-weight-bold);">Должность:</span> ${storage.posName || ''}</p>
        <p><span style="font-weight: var(--typography-weight-bold);">Email:</span> ${storage.email || ''}</p>
        <p><span style="font-weight: var(--typography-weight-bold);">Телефон:</span> ${storage.phone || ''}</p>
        <p><span style="font-weight: var(--typography-weight-bold);">О себе:</span> ${storage.about_text || ''}</p>
    `;
    container.appendChild(personalInfo);

    const renderSection = (title, cards, keyMap) => {
        if (!cards || cards.length === 0) return;

        const section = document.createElement('div');
        section.innerHTML = `<p class="h3">${title}</p>`;

        cards.forEach(card => {
            const c = document.createElement('div');

            let text = '';
            for (const key in card.data) {
                const label = keyMap[key] || key;
                text += `<p><span style="font-style: italic;">${label}:</span> ${card.data[key]}</p>`;
            }

            c.innerHTML = text;
            section.appendChild(c);
        });

        container.appendChild(section);
    };

    renderSection('Образование', cardsData.ed_card, {
        ed_lvl: 'Уровень образования',
        ed_uni: 'Учебное заведение',
        ed_start: 'Начало обучения',
        ed_end: 'Окончание обучения',
        ed_fcl: 'Факультет',
        ed_major: 'Специалиация'
    }
    );

    renderSection('Опыт работы',cardsData.exp_card, {
            exp_pos: 'Должность',
            exp_org: 'Организация',
            exp_start: 'Начало работы',
            exp_end: 'Окончание работы',
            w_cur: 'Работаю сейчас',
            exp_resp: 'Обязанности и достижения'
        }
    );

    renderSection('Языки', cardsData.lang, {
        adt_lng_name: 'Язык',
        adt_lvl_lang: 'Уровень'
    });

    renderSection('Hard Skills', cardsData.hard_skills, {
        adt_hard_name: 'Навык',
        adt_lvl_hard: 'Уровень'
    });

    renderSection('Soft Skills', cardsData.soft_skills, {
        adt_soft_name: 'Навык',
        adt_lvl_soft: 'Уровень'
    });

    document.body.appendChild(container);
});