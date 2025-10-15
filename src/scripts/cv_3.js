import './menu_activeBtn.js'
import CardList from './CardList.js'

document.addEventListener('DOMContentLoaded', function () {

    const cardList = new CardList();

    const edAddBtnEl = document.getElementsByClassName('btn_add')[0];
    edAddBtnEl.addEventListener('click', () => {
        const cardBody = document.getElementById('ed_lvl').value;
        const edStart = document.getElementById('ed_start').value;
        const edEnd = document.getElementById('ed_end').value;

        const formatMonthYear = (dateStr) => {
        const [year, month] = dateStr.split('-');
        return `${month}.${year}`;
        };
        const  cardSmallText = `${formatMonthYear(edStart)} — ${formatMonthYear(edEnd)}`;

        const extraData = {
            uni: document.getElementById('ed_uni').value,
            fcl: document.getElementById('ed_fcl').value,
            major: document.getElementById('ed_major').value
        };

        cardList.parseCard(cardBody, cardSmallText, 'ed', extraData);
    });
});