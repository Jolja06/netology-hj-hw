'use strict';

class Feedback {
  constructor(form, output) {
    if (!(form instanceof Element) && !(output instanceof Element)) {
      return;
    }

    this.values = {};

    this.form = form;
    this.output = output;

    this.init();
  }

  init() {
    this.form.querySelectorAll('input, textarea').forEach(field => {
      const name = field.name;
      this.values[name] = field.value;
      field.addEventListener('input', this.handleChange.bind(this, name));

      if (['phone', 'zip'].includes(name)) {
        field.addEventListener('keydown', this.filterKeys.bind(this));
      }
    });

    this.form.querySelector('button').addEventListener('click', () => this.submitForm(event, true));
    this.output.querySelector('button').addEventListener('click', () => this.submitForm(event, false));

  }

  handleChange(name) {
    this.values[name] = event.target.value;
    this.render();
  }

  filterKeys(event) {
    if (/^Key/.test(event.code)) {
      event.preventDefault();
    }
  }

  submitForm(event, isForce) {
    event.preventDefault();

    Object.keys(this.values).forEach(name => {
      const output = this.output.querySelector(`output#${name}`);
      if (output) {
        output.value = this.values[name];
      }
    });

    this.form.classList.toggle('hidden', isForce);
    this.output.classList.toggle('hidden', !isForce);
  }

  isValid() {
    return !Object.values(this.values).some(value => value === '');
  }

  render() {
    this.form.querySelector('button').disabled = !this.isValid();
  }

}

document.addEventListener('DOMContentLoaded', () => {
  new Feedback(
    document.querySelector('.contentform'),
    document.querySelector('#output')
  );
});