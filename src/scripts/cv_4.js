import './menu_activeBtn.js'
import CardList from './CardList.js'

document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('exp_form');
    const cardList = new CardList();

    cardList.checkExpNow(form);

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const formData = new FormData(form)
        const data = Object.fromEntries(formData.entries());

        cardList.parseCard(data, 'exp_card', 'exp_form');
        cardList.saveToStorage();

        form.reset();
    });

    const btnNext = document.getElementById('btn_next');
    btnNext.addEventListener('click', (e) => {
        const savedData = sessionStorage.getItem('cardsData');
        const data = JSON.parse(savedData) || [];
        if (!data['exp_card'] || data['exp_card'].length === 0) {
            e.preventDefault();
            alert("Добавьте хотя бы один опыт!")
        };
    });
});