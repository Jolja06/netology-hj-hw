'use strict';

class Slider {
  constructor(container) {
    if (!(container instanceof Element)) {
      return;
    }

    this.index = 0;

    this.container = container;
    this.navigation = this.container.querySelector('nav');
    this.navigationPrev = this.navigation.querySelector('a[data-action="prev"]');
    this.navigationNext = this.navigation.querySelector('a[data-action="next"]');
    this.navigationFirst = this.navigation.querySelector('a[data-action="first"]');
    this.navigationLast = this.navigation.querySelector('a[data-action="last"]');
    this.slides = Array.prototype.slice.call(this.container.querySelectorAll('.slide'));

    this.init();
  }

  init() {
    this.navigation.addEventListener('click', this.handleNavigate.bind(this));

    this.render();
  }

  handleNavigate(event) {
    const target = event.target;
    if (target.classList.contains('disabled')) {
      return;
    }

    const action = target.dataset.action;
    switch (action) {
      case 'next':
        this.index = this.index + 1;
        break;
      case 'prev':
        this.index = this.index - 1;
        break;
      case 'last':
        this.index = this.slides.length - 1;
        break;
      case 'first':
        this.index = 0;
        break;
      default:
        break;
    }

    this.render();
  }

  render() {
    const isFirstSlide = this.index === 0;
    const isLastSlide = this.index === this.slides.length - 1;
    this.navigationPrev.classList.toggle('disabled', isFirstSlide);
    this.navigationNext.classList.toggle('disabled', isLastSlide);
    this.navigationFirst.classList.toggle('disabled', isFirstSlide);
    this.navigationLast.classList.toggle('disabled', isLastSlide);

    this.slides.forEach((slide) => {
      slide.classList.remove('slide-current');
    });

    const currentSlide = this.slides[this.index];
    if (currentSlide) {
      currentSlide.classList.add('slide-current');
    }
  }

}

document.addEventListener('DOMContentLoaded', () => {
  new Slider(document.querySelector('.slider'));
});