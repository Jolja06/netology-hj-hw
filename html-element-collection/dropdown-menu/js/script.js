'use strict';

window.onload = () => {
  const menu = document.querySelector('.wrapper-dropdown');
  menu.addEventListener('click', toggleMenu);

  function toggleMenu() {
    menu.classList.toggle('active');
  }
};