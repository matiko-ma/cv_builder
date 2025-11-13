import './menu_activeBtn.js'
import CardList from './CardList.js'
import { showAlert } from './showAlert.js'

document.addEventListener('DOMContentLoaded', function () {

    const cardList = new CardList();

    const addCard = (formID, wrapperId) => {
        const form = document.getElementById(formID);

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            const formData = new FormData(form)
            const data = Object.fromEntries(formData.entries());

            cardList.parseCard(data, wrapperId, formID);
            cardList.saveToStorage();

            form.reset();
            form.querySelectorAll('select').forEach(select => {
                if (select.choices) {
                    select.choices.setChoiceByValue('');
                }
            });
        });
    };

    addCard('adt1_form', 'lang');
    addCard('adt2_form', 'hard_skills');
    addCard('adt3_form', 'soft_skills');
    addCard('adt4_form', 'articles');

    const btnCreate = document.getElementById('btn_create');
    btnCreate.addEventListener('click', (e) => {
        const savedData = sessionStorage.getItem(cardList.storageKey);
        const data = JSON.parse(savedData) || {};

        if (data['exp_card'].length === 0) {
            e.preventDefault();
            showAlert("Недостаточно информации для генерации резюме!")
        };
    });
});