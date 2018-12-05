'use strict';

class Limitation {
  constructor() {
    this.textare = document.querySelector('textarea');
    this.block = document.querySelector('.block');
    this.message = document.querySelector('.message');
    this.timeout;

    this.textare.addEventListener('focus', this.handleFocus.bind(this));
    this.textare.addEventListener('blur', this.handleFocus.bind(this));

    this.textare.addEventListener('keydown', this.handleChange.bind(this));
    this.textare.addEventListener('keydown', this.debounce(this.stopChange.bind(this), 2000));

  }

  handleChange(event) {
    this.message.classList.remove('view');
    this.block.classList.add('active');
  }

  stopChange() {
    this.message.classList.add('view');
    this.block.classList.remove('active');
  }

  handleFocus(event) {
    this.block.classList.toggle('active', event.type === 'focus');
    this.message.classList.remove('view');

    if (event.type === 'blur') window.clearTimeout(this.timeout);
  }

  debounce(callback, delay) {
    return () => {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(function() {
        this.timeout = null;
        callback();
      }, delay);
    }
  }
}

document.addEventListener('DOMContentLoaded', new Limitation);
