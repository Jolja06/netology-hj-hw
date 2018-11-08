'use strict';

class Feedback {
  constructor(form, popup) {
    if (!(form instanceof Element) && !(popup instanceof Element)) {
      return;
    }

    this.form = form;
    this.popup = popup;
    this.inputs = {};
    this.isSubmited = false;
    this.form.querySelectorAll('input, textarea').forEach(field => field.addEventListener('input', this.handleChange.bind(this, field.name)));
    this.form.querySelector('button').addEventListener('click', this.submitForm.bind(this));
    this.popup.querySelector('button').addEventListener('click', this.submitForm.bind(this));
    document.getElementsByName('zip')[0].addEventListener('keydown', this.handleInputNumbers.bind(this));
    document.getElementsByName('phone')[0].addEventListener('keydown', this.handleInputNumbers.bind(this));

    this.createObj();
  }

  handleChange(name) {
    this.inputs[name] = event.target.value;
    this.checkCompleted();
  }

  handleInputNumbers(event) {
    if (/^Key/.test(event.code)) {
      event.preventDefault();
    }
  }


  createObj() {
    this.form.querySelectorAll('input, textarea').forEach(field => {
      this.inputs[field.name] = undefined;
      this.inputs.isComplete = false;
    });

  }

  checkCompleted() {
    for(let key in this.inputs) {
      (this.inputs[key] !== '' && this.inputs[key] !== undefined) ? this.inputs.isComplete = true : this.inputs.isComplete = false;
    }
    this.inputs.isComplete ? this.form.querySelector('button').disabled = false : this.form.querySelector('button').disabled = true;
  }

  outputMessage() {
    this.popup.querySelectorAll('output').forEach(output => {
      output.value = this.inputs[output.id];
    })
  }

  submitForm(event) {
    event.preventDefault();
    this.isSubmited = !this.isSubmited;
    this.outputMessage();
    this.toggle(this.isSubmited);
  }

  toggle(isForce) {
    this.popup.classList.toggle('hidden', !isForce);
    this.form.classList.toggle('hidden', isForce);
  }

}

document.addEventListener('DOMContentLoaded', () => {
  new Feedback(document.querySelector('.contentform'), document.querySelector('#output'));
});