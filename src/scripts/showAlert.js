let alertTimeout;

export function showAlert(message, duration = 3000) {
    const alertBox = document.getElementsByClassName('alert')[0];

    if (alertTimeout) clearTimeout(alertTimeout);

    alertBox.textContent = message;
    alertBox.style.display = 'block';
    alertBox.classList.add('show');

    alertTimeout = setTimeout(() => {
        alertBox.classList.remove('show');
        setTimeout(() => alertBox.style.display = 'none', 400);
    }, duration);
}