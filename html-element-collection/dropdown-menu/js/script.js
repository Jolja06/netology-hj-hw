'use strict';

window.onload = () => {
  const menu = document.querySelector('.wrapper-dropdown');
  menu.addEventListener('click', () => menu.classList.toggle('active'));
};
