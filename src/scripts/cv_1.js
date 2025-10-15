import './menu_activeBtn.js'

document.addEventListener('DOMContentLoaded', function () {

    const posEl = document.getElementById('posName');
    posEl.addEventListener('change', () => {
        sessionStorage.setItem('position', posEl.value);
        console.log(sessionStorage.getItem('position'));
    });
    
    const photoEl = document.getElementById('photo_input');
    photoEl.addEventListener('change', () => {
        let src = URL.createObjectURL(photoEl.files[0]);
        const photoLabel = document.getElementsByClassName('photo_label')[0];
        photoLabel.src = src;
        sessionStorage.setItem('photo', src);
        console.log(sessionStorage.getItem('photo'));
    });
});
