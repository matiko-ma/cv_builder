import './menu_activeBtn.js'

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('photo_form');
    const inputs = form.querySelectorAll('input, textarea, select');
    const photoLabel = document.getElementsByClassName('photo_label')[0];

    inputs.forEach(input => {
        const storedValue = sessionStorage.getItem(input.name);
        if (storedValue && input.type === 'file') {
            photoLabel.src = storedValue;
        } else if (storedValue && input.type !== 'file') {
            input.value = storedValue;
        }
    });

    inputs.forEach(input => {
        if (input.type === 'file') {
            input.addEventListener('change', () => {
                const file = input.files[0];
                if (!file) return;

                const src = URL.createObjectURL(file);
                photoLabel.src = src;

                const reader = new FileReader();
                reader.onload = e => {
                    sessionStorage.setItem(input.name, e.target.result);
                };
                reader.readAsDataURL(file);
            });
        } else {
            input.addEventListener('input', () => {
                sessionStorage.setItem(input.name, input.value);
            });
        }
    });

    form.addEventListener('submit', () => {
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
    })
});