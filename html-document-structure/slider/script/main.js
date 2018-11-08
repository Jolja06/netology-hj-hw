'use strict';

class Slider {
  constructor(slider) {
    if (!(slider instanceof Element)) {
      return;
    }
    this.slider = slider;
    this.nav = this.slider.querySelector('nav');
    this.controls = this.nav.children;
    this.container = this.slider.querySelector('.slides');

    this.nav.addEventListener('click', this.moveSlide.bind(this));
    this.init();
  }

  init() {
    this.container.firstElementChild.classList.add('slide-current');
  }

  moveSlide(event) {
    const current = this.container.querySelector('.slide-current');
    switch (event.target.dataset.action) {
      case 'next':
        current.classList.remove('slide-current');
        current.nextElementSibling.classList.add('slide-current');

        break;
      case 'prev':
        current.classList.remove('slide-current');
        current.previousElementSibling.classList.add('slide-current');
        break;
      case 'first':
        current.classList.remove('slide-current');
        current.parentNode.firstElementChild.classList.add('slide-current');
        break;
      case 'last':
        current.classList.remove('slide-current');
        current.parentNode.lastElementChild.classList.add('slide-current');
        break;
    }
  }
}


document.addEventListener('DOMContentLoaded', () => {
  const sliders = document.querySelectorAll('.slider');
  Array.from(sliders).forEach(slider => new Slider(slider));
});