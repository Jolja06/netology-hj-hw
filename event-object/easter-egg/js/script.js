'use strict';

class Navigation {
  constructor(nav) {
    if (!(nav instanceof Element)) {
      return;
    }

    this.nav = nav;

    document.addEventListener('keydown', this.toggleMenu.bind(this));
  }

  toggleMenu(event) {
    if ((event.ctrlKey && event.altKey) && event.code === 'KeyT') {
      this.nav.classList.toggle('visible');
    }
  }
}

class SecretCode {
  constructor(container) {
    if (!(container instanceof Element)) {
      return;
    }
    
    this.counter = 0;
    this.isCorrect = false;
    this.code = '';
    this.container = container;
    this.reference = 'YTNJKJUBZ';
    document.addEventListener('keydown', this.inputCode.bind(this));
  }

  inputCode(event) {
    this.code += event.code.slice(3);
    let ref = this.reference.slice(0, this.code.length);
    if (this.code.search(ref) !== -1 && this.counter < 9) {
      this.isCorrect = true;
      this.counter++;
    } else {
      this.isCorrect = false;
      this.code = '';
      this.counter = 0;
    }
    this.showSecret();
  }

  showSecret() {
    if (this.isCorrect && this.counter === 9) {
      this.container.classList.add('visible');
    }
  }
}

window.onload = () => {
  new Navigation(
    document.querySelector('nav')
  );
  new SecretCode(
    document.querySelector('.secret')
  );
};