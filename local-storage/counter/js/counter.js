'use strict';

class Counter {
  constructor(container) {
    if (!(container instanceof Element)) {
      return;
    }
    this.count = localStorage.count;
    this.container = container;
    this.view = this.container.querySelector('#counter');
    this.buttons = this.container.querySelector('.wrap-btns');

    this.init();
  }

  init() {
    this.buttons.addEventListener('click', this.handleChange.bind(this));
    this.render();
  }

  handleChange(event) {
    const target = event.target;
    switch (target.id) {
      case 'increment' :
        this.count = localStorage.count = +this.count + 1;
        break;
      case 'decrement' :
        this.count = localStorage.count = +this.count - 1;
        break;
      case 'reset' :
        this.count = localStorage.count = '0';
        break;

      default:
        break;
    }
    this.render();
  }

  render() {
    this.view.innerText = this.count;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Counter(document.querySelector('.wrap'));
});
