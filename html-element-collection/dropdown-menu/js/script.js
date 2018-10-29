'use strict';

class Dropdown {
  constructor(container) {
    if (!(container instanceof Element)) {
      return;
    }

    this.container = container;
    this.container.addEventListener('click', this.toggle.bind(this));
  }

  toggle() {
    this.container.classList.toggle('active');
  }
}

window.onload = () => {
  new Dropdown(document.querySelector('.wrapper-dropdown:first-child'));
};