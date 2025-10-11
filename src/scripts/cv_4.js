import { parseCard } from './parseCard.js'

document.addEventListener('DOMContentLoaded', function () {

    const expPosEl = document.getElementById('exp_pos');
    expPosEl.addEventListener('change', () => {
        sessionStorage.setItem('expPos', expPosEl.value);
        console.log(sessionStorage.getItem('expPos'));
    });

    const expOrgEl = document.getElementById('exp_org');
    expOrgEl.addEventListener('change', () => {
        sessionStorage.setItem('expOrg', expOrgEl.value);
        console.log(sessionStorage.getItem('expOrg'));
    });

    const expStartEl = document.getElementById('exp_start');
    expStartEl.addEventListener('change', () => {
        sessionStorage.setItem('expStart', expStartEl.value);
        console.log(sessionStorage.getItem('expStart'));
    });

    const expEndEl = document.getElementById('exp_end');
    expEndEl.addEventListener('change', () => {
        sessionStorage.setItem('expEnd', expEndEl.value);
        console.log(sessionStorage.getItem('expEnd'));
    });

    const expCheckboxEl = document.getElementById('w_cur');
    expCheckboxEl.addEventListener('change', () => {
        sessionStorage.setItem('expCheckbox', expCheckboxEl.checked);
        console.log(sessionStorage.getItem('expCheckbox'));
    });

    const expRespEl = document.getElementById('exp_resp');
    expRespEl.addEventListener('change', () => {
        sessionStorage.setItem('expResp', expRespEl.value);
        console.log(sessionStorage.getItem('expResp'));
    });

    const expAddBtnEl = document.getElementsByClassName('btn_add')[0];
    expAddBtnEl.addEventListener('click', () => {
        const cardBody = sessionStorage.getItem('expPos');
        const expStart = sessionStorage.getItem('expStart');
        let expEnd = sessionStorage.getItem('expEnd');

        const formatMonthYear = (dateStr) => {
            const [year, month] = dateStr.split('-');
            return `${month}.${year}`;
        };

        const workCurrent = sessionStorage.getItem('expCheckbox');
        let cardSmallText = "";

        if (workCurrent === 'true') {
            cardSmallText = `${formatMonthYear(expStart)} — Сейчас`;
        }
        else { cardSmallText = `${formatMonthYear(expStart)} — ${formatMonthYear(expEnd)}`; };

        const card = parseCard(cardBody, cardSmallText);
        const cardsWrapper = document.getElementsByClassName('cards_wrapper')[0];
        cardsWrapper.appendChild(card);
    });
});