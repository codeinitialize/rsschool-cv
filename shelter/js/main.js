document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.querySelector('.burger-menu');
    const menuList = document.getElementById('menu__list');

    burgerMenu.addEventListener('click', () => {
        menuList.classList.toggle('active');
    });
});