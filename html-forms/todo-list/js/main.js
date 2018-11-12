'use strict';

class TodoList {
  constructor(container) {
    if (!(container instanceof Element)) {
      return;
    }

    this.counter = 0;
    this.total = 0;

    this.container = container;
    this.output = this.container.querySelector('output');

    this.init();
  }

  init() {
    const fields = this.container.querySelectorAll('input[type="checkbox"]');
    this.total = fields.length;
    this.counter = Array.prototype.reduce.call(
      fields,
      (counter, field) => counter + Number(field.checked),
      0,
    );

    this.container.addEventListener('change', this.handleChange.bind(this));

    this.render();
  }

  handleChange(event) {
    if (event.target.checked) {
      this.counter++;
    } else {
      this.counter--;
    }

    this.render();
  }

  render() {
    this.output.value = `${this.counter} из ${this.total}`;
    this.container.classList.toggle('complete', this.counter === this.total);
  }
}

document.addEventListener('DOMContentLoaded', () => {
    new TodoList(document.querySelector('.list-block'))
});