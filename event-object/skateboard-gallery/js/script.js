'use strict';

class Gallery {
  constructor(view, nav) {
    if (!(view instanceof Element) || !(nav instanceof Element)) {
      return;
    }

    this.activeButton = nav.querySelector('.gallery-current');

    this.view = view;
    this.nav = nav;
    this.nav.addEventListener('click', this.setActive.bind(this));

    this.controls = this.nav.querySelectorAll('a');
  }

  setActive(event) {
    event.preventDefault();

    this.activeButton.classList.remove('gallery-current');
    this.activeButton = event.target.closest('a');
    this.activeButton.classList.add('gallery-current');

    this.view.src = this.activeButton.href;
  }
}

window.onload = () => {
  new Gallery(
    document.querySelector('#view'),
    document.querySelector('#nav'),
  );
};