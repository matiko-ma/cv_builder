import './menu_activeBtn.js'

document.addEventListener('DOMContentLoaded', function () {

    const nameEl = document.getElementById('name');
    nameEl.addEventListener('change', () => {
        sessionStorage.setItem('name', nameEl.value);
        console.log(sessionStorage.getItem('name'));
    });
    
    const surnameEl = document.getElementById('surname');
    surnameEl.addEventListener('change', () => {
        sessionStorage.setItem('surname', surnameEl.value);
        console.log(sessionStorage.getItem('surname'));
    });

    const emailEl = document.getElementById('email');
    emailEl.addEventListener('change', () => {
        sessionStorage.setItem('email', emailEl.value);
        console.log(sessionStorage.getItem('email'));
    });

    const phoneEl = document.getElementById('phone');
    phoneEl.addEventListener('change', () => {
        sessionStorage.setItem('phone', phoneEl.value);
        console.log(sessionStorage.getItem('phone'));
    });

    const aboutEl = document.getElementById('about');
    aboutEl.addEventListener('change', () => {
        sessionStorage.setItem('about', aboutEl.value);
        console.log(sessionStorage.getItem('about'));
    });
});