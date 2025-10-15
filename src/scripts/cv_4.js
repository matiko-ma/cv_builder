import './menu_activeBtn.js'
import CardList from './CardList.js'

document.addEventListener('DOMContentLoaded', function () {

    const cardList = new CardList();

    const expAddBtnEl = document.getElementsByClassName('btn_add')[0];
    expAddBtnEl.addEventListener('click', () => {
        const cardBody = document.getElementById('exp_pos').value;
        const expStart = document.getElementById('exp_start').value;
        const expEnd = document.getElementById('exp_end').value;
        const workCurrent = document.getElementById('w_cur').checked;
        let cardSmallText = "";

        const formatMonthYear = (dateStr) => {
            const [year, month] = dateStr.split('-');
            return `${month}.${year}`;
        };

        if (workCurrent === true) {
            cardSmallText = `${formatMonthYear(expStart)} — Сейчас`;
        }
        else { cardSmallText = `${formatMonthYear(expStart)} — ${formatMonthYear(expEnd)}`; };

        const extraData = {
            org: document.getElementById('exp_org').value,
            resp: document.getElementById('exp_resp').value
        };

        cardList.parseCard(cardBody, cardSmallText, 'exp', extraData);
    });
});