import './menu_activeBtn.js'
import CardList from './CardList.js'
import { showAlert } from './showAlert.js'

document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('ed_form');
    const cardList = new CardList();

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const formData = new FormData(form)
        const data = Object.fromEntries(formData.entries());

        cardList.parseCard(data, 'ed_card', 'ed_form');
        cardList.saveToStorage();

        form.reset();
    });

    const btnNext = document.getElementById('btn_next');
    btnNext.addEventListener('click', (e) => {
        const savedData = sessionStorage.getItem('cardsData');
        const data = JSON.parse(savedData) || [];

        if (!data['ed_card'] || data['ed_card'].length === 0) {
            e.preventDefault();
            showAlert("Добавьте хотя бы один уровень образования!")
        };
    });
});