const menu = document.getElementsByClassName('menu')[0];
const activeBtn = document.getElementsByClassName('active')[0];

if (activeBtn) {
    const offsetLeft = activeBtn.offsetLeft;
    menu.scrollTo({
        left: offsetLeft - 35,
        behavior: 'auto'
    });
}