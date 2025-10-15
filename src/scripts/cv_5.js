import './menu_activeBtn.js'
import CardList from './CardList.js'

document.addEventListener('DOMContentLoaded', function () {

    const cardList = new CardList();

    const addCardHandler = (btnId, inputId, levelId, wrapperId) => {
        const btn = document.getElementById(btnId);
        btn.addEventListener('click', () => {
            const cardBody = document.getElementById(inputId).value;
            const cardSmallText = document.getElementById(levelId).value;

            cardList.parseCard(cardBody, cardSmallText, wrapperId);
        });
    };

    addCardHandler('add_lang', 'adt_lng_name', 'adt_lvl_lang', 'lang');
    addCardHandler('add_hard', 'adt_hard_name', 'adt_lvl_hard', 'hard_skills');
    addCardHandler('add_soft', 'adt_soft_name', 'adt_lvl_soft', 'soft_skills');
});