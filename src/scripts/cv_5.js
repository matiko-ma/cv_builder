import { parseCard } from './parseCard.js'

document.addEventListener('DOMContentLoaded', function () {

    const adtLngNameEl = document.getElementById('adt_lng_name');
    adtLngNameEl.addEventListener('change', () => {
        sessionStorage.setItem('adtLngName', adtLngNameEl.value);
        console.log(sessionStorage.getItem('adtLngName'));
    });

    const adtLvlLangEl = document.getElementById('adt_lvl_lang');
    adtLvlLangEl.addEventListener('change', () => {
        sessionStorage.setItem('adtLvlLang', adtLvlLangEl.value);
        console.log(sessionStorage.getItem('adtLvlLang'));
    });

    const adtHardNameEl = document.getElementById('adt_hard_name');
    adtHardNameEl.addEventListener('change', () => {
        sessionStorage.setItem('adtHardName', adtHardNameEl.value);
        console.log(sessionStorage.getItem('adtHardName'));
    });

    const adtLvlHardEl = document.getElementById('adt_lvl_hard');
    adtLvlHardEl.addEventListener('change', () => {
        sessionStorage.setItem('adtLvlHard', adtLvlHardEl.value);
        console.log(sessionStorage.getItem('adtLvlHard'));
    });

    const adtSoftNameEl = document.getElementById('adt_soft_name');
    adtSoftNameEl.addEventListener('change', () => {
        sessionStorage.setItem('adtSoftName', adtSoftNameEl.value);
        console.log(sessionStorage.getItem('adtSoftName'));
    });

    const adtLvlSoftEl = document.getElementById('adt_lvl_soft');
    adtLvlSoftEl.addEventListener('change', () => {
        sessionStorage.setItem('adtLvlSoft', adtLvlSoftEl.value);
        console.log(sessionStorage.getItem('adtLvlSoft'));
    });

    const langAddBtnEl = document.getElementById('add_lang');
    langAddBtnEl.addEventListener('click', () => {
        const cardBody = sessionStorage.getItem('adtLngName');
        const cardSmallText = sessionStorage.getItem('adtLvlLang');

        const card = parseCard(cardBody, cardSmallText);
        const cardsWrapper = document.getElementById('lang');
        cardsWrapper.appendChild(card);
    });

    const hardAddBtnEl = document.getElementById('add_hard');
    hardAddBtnEl.addEventListener('click', () => {
        const cardBody = sessionStorage.getItem('adtHardName');
        const cardSmallText = sessionStorage.getItem('adtLvlHard');

        const card = parseCard(cardBody, cardSmallText);
        const cardsWrapper = document.getElementById('hard_skills');
        cardsWrapper.appendChild(card);
    });

    const softAddBtnEl = document.getElementById('add_soft');
    softAddBtnEl.addEventListener('click', () => {
        const cardBody = sessionStorage.getItem('adtSoftName');
        const cardSmallText = sessionStorage.getItem('adtLvlSoft');

        const card = parseCard(cardBody, cardSmallText);
        const cardsWrapper = document.getElementById('soft_skills');
        cardsWrapper.appendChild(card);
    });
});