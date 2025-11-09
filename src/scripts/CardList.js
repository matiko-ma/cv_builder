export default class CardList {
    constructor() {
        this.wrappers = document.querySelectorAll('.cards_wrapper');
        this.draggedCard = null;
        this.storageKey = 'cardsData';
        this.init();
        this.loadFromStorage();
    }

    init() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.delete_svg')) {
                this.closeForm();
                const card = e.target.closest('.card');
                if (card) {
                    const wrapper = card.parentElement;
                    card.remove();
                    if (!wrapper.querySelector('.card')) {
                        wrapper.style.display = 'none';
                    }
                    this.saveToStorage();
                }
            }
        });

        document.addEventListener('mousedown', (e) => {
            if (e.target.closest('.drag_svg')) {
                const card = e.target.closest('.card');
                if (card) card.setAttribute('draggable', 'true');
            }
        });

        document.addEventListener('mouseup', () => {
            document.querySelectorAll('.card').forEach(card => {
                card.removeAttribute('draggable');
            });
        });

        document.addEventListener('dragstart', (e) => {
            if (e.target.classList.contains('card')) {
                this.closeForm();
                this.draggedCard = e.target;
                e.target.classList.add('dragging');
            }
        });

        document.addEventListener('dragend', (e) => {
            if (e.target.classList.contains('card')) {
                e.target.classList.remove('dragging');
                this.draggedCard = null;
                this.saveToStorage();
            }
        });

        this.wrappers.forEach(wrapper => {
            wrapper.addEventListener('dragover', (e) => {
                e.preventDefault();
                const afterElement = this.getDragAfterElement(wrapper, e.clientY);
                if (afterElement == null) {
                    wrapper.appendChild(this.draggedCard);
                } else {
                    wrapper.insertBefore(this.draggedCard, afterElement);
                }
            });
        });
    }

    parseCard(cardData, wrapperId, formId, fromStorage = false) {
        if (!cardData || Object.keys(cardData).length === 0) return;

        const wrapper = document.getElementById(wrapperId);
        if (!wrapper) return;

        const card = document.createElement('div');
        card.classList.add('card');
        card.cardData = cardData;
        card.formId = formId;

        const [cardBody, cardSmallText] = this.cardText(cardData, formId);

        card.innerHTML = `
        <div class="card_text">
            <p class="card_body">${cardBody}</p>
            <p class="input_years">${cardSmallText}</p>
        </div>
        <button class="svg_btn">
            <svg class="delete_svg" viewBox="0 0 20 19">
                <path d="M11.5 0.125C12.2432 0.125 12.8584 0.66571 12.9775 1.375H18.5C19.3284 1.375 20 2.04657 20 2.875C20 3.70343 19.3284 4.375 18.5 4.375H17.8994L17.0605 16.5469C16.9701 17.8577 15.8804 18.875 14.5664 18.875H5.43359C4.11964 18.875 3.02986 17.8577 2.93945 16.5469L2.10059 4.375H1.5C0.671573 4.375 0 3.70343 0 2.875C0 2.04657 0.671573 1.375 1.5 1.375H7.02246C7.1416 0.66571 7.75685 0.125 8.5 0.125H11.5ZM5.90039 15.875H14.0996L14.8936 4.375H5.10645L5.90039 15.875Z"/>
            </svg>
        </button>
        <button class="svg_btn">
            <svg class="drag_svg" viewBox="0 0 22 15">
                <path d="M19.5713 12C20.3997 12.0001 21.0713 12.6716 21.0713 13.5C21.0713 14.3284 20.3997 14.9999 19.5713 15H2.42871C1.60028 15 0.928711 14.3284 0.928711 13.5C0.928711 12.6716 1.60028 12 2.42871 12H19.5713ZM19.5713 6C20.3997 6.00008 21.0713 6.67162 21.0713 7.5C21.0713 8.32838 20.3997 8.99992 19.5713 9H2.42871C1.60028 9 0.928711 8.32843 0.928711 7.5C0.928711 6.67157 1.60028 6 2.42871 6H19.5713ZM19.5713 0C20.3997 7.53728e-05 21.0713 0.671619 21.0713 1.5C21.0713 2.32838 20.3997 2.99992 19.5713 3H2.42871C1.60028 3 0.928711 2.32843 0.928711 1.5C0.928711 0.671573 1.60028 0 2.42871 0H19.5713Z"/>
            </svg>
        </button>
        `;

        wrapper.appendChild(card);
        wrapper.style.display = '';

        card.addEventListener('click', (e) => {
            if (!e.target.closest('.svg_btn')) {
                this.openEditForm(card, formId);
            }
        });
    }

    openEditForm(card, formId) {
        const existingForm = card.nextElementSibling;
        if (existingForm?.classList.contains('edit_form')) {
            existingForm.remove();
            return;
        }

        const templateForm = document.getElementById(formId);
        const formClone = templateForm.cloneNode(true);
        formClone.classList.add('edit_form');
        formClone.removeAttribute('id');

        this.checkExpNow(formClone);

        const inputs = formClone.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            const value = card.cardData[input.name];
            if (input.type === 'checkbox') {
                input.checked = value === 'on' || value === true;
            } else if (value !== undefined) {
                input.value = value;
            }
        });

        card.insertAdjacentElement('afterend', formClone);

        formClone.addEventListener('submit', e => {
            e.preventDefault();
            if (!formClone.checkValidity()) {
                formClone.reportValidity();
                return;
            }

            const formData = new FormData(formClone)
            const cardData = Object.fromEntries(formData.entries());

            card.cardData = cardData;
            const [cardBody, cardSmallText] = this.cardText(cardData, formId);

            card.querySelector('.card_body').textContent = cardBody;
            card.querySelector('.input_years').textContent = cardSmallText;

            formClone.remove();

            this.saveToStorage();
        });
    }

    getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.card:not(.dragging)')];
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    };

    cardText(cardData, formId) {
        if (formId === "ed_form") {
            return [
                cardData.ed_lvl,
                `${this.formatMonthYear(cardData.ed_start)} — ${this.formatMonthYear(cardData.ed_end)}`]
        } else if (formId === "exp_form") {
            if (cardData.w_cur) {
                return [
                    cardData.exp_pos,
                    `${this.formatMonthYear(cardData.exp_start)} — Сейчас`,
                ]
            }
            else {
                return [
                    cardData.exp_pos,
                    `${this.formatMonthYear(cardData.exp_start)} — ${this.formatMonthYear(cardData.exp_end)}`,
                ]
            };
        } else {
            if (formId === "adt1_form") {
                return [cardData.adt_lng_name, cardData.adt_lvl_lang];
            } else if (formId === "adt2_form") {
                return [cardData.adt_hard_name, cardData.adt_lvl_hard];
            } else if (formId === "adt3_form") {
                return [cardData.adt_soft_name, cardData.adt_lvl_soft];
            };
        };
    };

    formatMonthYear(dateStr) {
        if (!dateStr || !dateStr.includes('-')) return '';
        const [year, month] = dateStr.split('-');
        return `${month}.${year}`;
    };

    checkExpNow(form) {
        const checkbox = form.w_cur;
        const endInput = form.exp_end;
        if (checkbox && endInput) {
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    endInput.disabled = true;
                    endInput.value = '';
                    endInput.required = false;
                } else {
                    endInput.disabled = false;
                    endInput.required = true;
                }
            });
        }
    };

    closeForm() {
        document.querySelectorAll('.edit_form').forEach(form => form.remove());
    };

    saveToStorage() {
        const data = JSON.parse(sessionStorage.getItem(this.storageKey)) || {};
        this.wrappers.forEach(wrapper => {
            data[wrapper.id] = [...wrapper.querySelectorAll('.card')].map(card => ({
                data: card.cardData,
                form: card.formId,
            }));
        });
        sessionStorage.setItem(this.storageKey, JSON.stringify(data));
    }

    loadFromStorage() {
        const savedData = sessionStorage.getItem(this.storageKey);
        if (!savedData) return;
        const data = JSON.parse(savedData);

        Object.keys(data).forEach(wrapperId => {
            const cards = data[wrapperId];
            if (!Array.isArray(cards)) return;
            cards.forEach(cardObj => {
                if (!cardObj.data || Object.keys(cardObj.data).length === 0) return;
                this.parseCard(cardObj.data, wrapperId, cardObj.form, true);
            });
        });
    }
}