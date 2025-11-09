import './menu_activeBtn.js'

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('about_form');
    const inputs = form.querySelectorAll('input, textarea, select');

    inputs.forEach(input => {
        const storedValue = sessionStorage.getItem(input.name);
        if (storedValue) {
            input.value = storedValue;
        }

        input.addEventListener('input', () => {
            sessionStorage.setItem(input.name, input.value);
        });
    });

    form.addEventListener('submit', () => {
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
    })
});