import { parseCard } from './parseCard.js'

document.addEventListener('DOMContentLoaded', function () {

    const edLvlEl = document.getElementById('ed_lvl');
    edLvlEl.addEventListener('change', () => {
        sessionStorage.setItem('edLvl', edLvlEl.value);
        console.log(sessionStorage.getItem('edLvl'));
    });

    const edUniEl = document.getElementById('ed_uni');
    edUniEl.addEventListener('change', () => {
        sessionStorage.setItem('edUni', edUniEl.value);
        console.log(sessionStorage.getItem('edUni'));
    });

    const edStartEl = document.getElementById('ed_start');
    edStartEl.addEventListener('change', () => {
        sessionStorage.setItem('edStart', edStartEl.value);
        console.log(sessionStorage.getItem('edStart'));
    });

    const edEndEl = document.getElementById('ed_end');
    edEndEl.addEventListener('change', () => {
        sessionStorage.setItem('edEnd', edEndEl.value);
        console.log(sessionStorage.getItem('edEnd'));
    });

    const edFclEl = document.getElementById('ed_fcl');
    edFclEl.addEventListener('change', () => {
        sessionStorage.setItem('edFcl', edFclEl.value);
        console.log(sessionStorage.getItem('edFcl'));
    });

    const edMajorEl = document.getElementById('ed_major');
    edMajorEl.addEventListener('change', () => {
        sessionStorage.setItem('edMajor', edMajorEl.value);
        console.log(sessionStorage.getItem('edMajor'));
    });

    const edAddBtnEl = document.getElementsByClassName('btn_add')[0];
    edAddBtnEl.addEventListener('click', () => {
        const cardBody = sessionStorage.getItem('edLvl');
        const edStart = sessionStorage.getItem('edStart');
        const edEnd = sessionStorage.getItem('edEnd');

        const formatMonthYear = (dateStr) => {
        const [year, month] = dateStr.split('-');
        return `${month}.${year}`;
        };
        const  cardSmallText = `${formatMonthYear(edStart)} — ${formatMonthYear(edEnd)}`;


        const card = parseCard(cardBody, cardSmallText);
        const cardsWrapper = document.getElementsByClassName('cards_wrapper')[0];
        cardsWrapper.appendChild(card);
    });
});