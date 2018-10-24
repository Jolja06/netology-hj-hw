'use strict';

class Menu {
  constructor(toggle) {
    if (!(toggle instanceof Element)) {
      return;
    }

    this.toggle = toggle;

    this.toggle.addEventListener('click', this.toggleProfile.bind(this));
  }

  toggleProfile() {
    this.toggle.classList.toggle('active');
  }

}

window.onload = () => {
  new Menu(
    document.getElementsByClassName('wrapper-dropdown')[0]
  )
};