'use strict';

class List {
  constructor(container) {
    if (!(container instanceof Element)) {
      return;
    }
    
    this.container = container;

    this.isChecked = false;
    this.counter = 0;
    this.total = 0;

    this.container.addEventListener('change', this.taskChanged.bind(this));

    this.init();
  }

  init() {
    const inputs = this.container.querySelectorAll('input');
    inputs.forEach(input => {
      if (input.type === 'checkbox') {
        this.total++;
      }

      if (input.type === 'checkbox' && input.checked) {
        this.counter++;
      }
    });

    this.setOutput();
  }

  taskChanged(event) {
    this.isChecked = event.target.checked;
    this.isChecked ? this.counter++ : this.counter--;
    
    this.setOutput();
    this.isCompleted();
  }

  isCompleted() {
    (this.counter === this.total) ?  this.container.classList.add('complete') : this.container.classList.remove('complete');
  }

  setOutput() {
    const output = this.container.querySelector('output');
    output.value = `${this.counter} из ${this.total}`
  }
}

document.addEventListener('DOMContentLoaded', () => {
    new List(document.querySelector('.list-block'))
});