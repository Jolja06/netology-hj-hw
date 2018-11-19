'use strict';

class Counter {
  constructor(container) {
    if (!(container instanceof Element)) {
      return;
    }
    this.count = localStorage.count ? Number(localStorage.count) : 0;

    this.view = container.querySelector('#counter');
    this.controls = container.querySelector('.wrap-btns');

    this.init();
  }

  init() {
    this.controls.addEventListener('click', this.handleChange.bind(this));
    this.render();
  }

  handleChange(event) {
    const target = event.target;
    if (target.tagName !== 'BUTTON') {
      return;
    }

    switch (target.id) {
      case 'increment' :
        this.count++;
        break;
      case 'decrement' :
        if (this.count > 0) {
          this.count--;
        }
        break;
      case 'reset' :
        this.count = 0;
        break;

      default:
        break;
    }
    localStorage.count = this.count;
    this.render();
  }

  render() {
    this.view.innerText = this.count;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Counter(document.querySelector('.wrap'));
});
