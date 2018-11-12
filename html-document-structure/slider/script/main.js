'use strict';

class Slider {
  constructor(container) {
    if (!(container instanceof Element)) {
      return;
    }
    this.container = container;
    this.slider = this.container.querySelector('.slides');
    this.nav = this.container.querySelector('nav');
    this.firstSlide = this.nav.querySelector('[data-action="first"]');
    this.nextSlide = this.nav.querySelector('[data-action="next"]');
    this.prevSlide = this.nav.querySelector('[data-action="prev"]');
    this.lastSlide = this.nav.querySelector('[data-action="last"]');

    this.init();

    this.nav.addEventListener('click', event => this.handleMoveSlide(event, event.target));
  }

  init() {
    this.slider.firstElementChild.classList.add('slide-current');
    this.prevSlide.classList.add('disabled');
    this.firstSlide.classList.add('disabled');
  }

  handleMoveSlide(event, target) {
    if (target.classList.contains('disabled')) {
      event.preventDefault();
    }
    const currentSlide = this.slider.querySelector('.slide-current');
    let activatedSlide;

    switch (target.dataset.action) {
      case 'next':
        activatedSlide = currentSlide.nextElementSibling;
        break;
      case 'last':
        activatedSlide = currentSlide.parentNode.lastElementChild;
        break;
      case 'prev':
        activatedSlide = currentSlide.previousElementSibling;
        break;
      case 'first':
        activatedSlide = currentSlide.parentNode.firstElementChild;
        break;
    }
    this.setCurrent(currentSlide, activatedSlide);
    this.disabledControl(activatedSlide);



  }

  setCurrent(current, activated) {
    current.classList.remove('slide-current');
    activated.classList.add('slide-current');
  }
  disabledControl(activated) {
    this.firstSlide.classList.toggle('disabled', !activated.previousElementSibling);
    this.prevSlide.classList.toggle('disabled', !activated.previousElementSibling);
    this.lastSlide.classList.toggle('disabled', !activated.nextElementSibling);
    this.nextSlide.classList.toggle('disabled', !activated.nextElementSibling);
  }

}


document.addEventListener('DOMContentLoaded', () => {
  const sliders = document.querySelectorAll('.slider');
  Array.from(sliders).forEach(slider => new Slider(slider));
});