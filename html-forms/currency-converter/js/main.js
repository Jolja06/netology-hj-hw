'use strict';
const isURL = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
class Converter {
  constructor(container, url) {
    if (!(container instanceof Element) && !(isURL.test(url))) {
      return;
    }

    this.container = container;
    this.currency = [];
    this.input = this.container.querySelector('#source');
    this.amount = this.input.value;
    this.from = this.container.querySelector('#from');
    this.loader = document.querySelector('#loader');
    this.output = this.container.querySelector('#result');
    this.selects = this.container.querySelectorAll('select');
    this.to = this.container.querySelector('#to');
    this.url = url;
    this.xhr = new XMLHttpRequest();

    this.xhr.addEventListener('load', this.handleLoad.bind(this));
    this.input.addEventListener('input', this.handleConversion.bind(this));
    this.from.addEventListener('change', this.handleConversion.bind(this));
    this.to.addEventListener('change', this.handleConversion.bind(this));

    this.fetchContent();
  }

  fetchContent() {
    this.xhr.open('GET', this.url, true);
    this.xhr.send();
    this.toggleLoader(true);
  }

  handleConversion() {
    this.amount = this.input.value;
    this.output.value = (this.from.value * this.amount / this.to.value).toFixed(2);
  }

  handleLoad() {
    this.currency = JSON.parse(this.xhr.responseText);
    this.toggleLoader(false);
    this.render();
  }

  renderCurrency(currency) {
    this.selects.forEach(select => {
      const option = document.createElement('option');
      option.value = currency.value;
      option.label = currency.code;
      option.title = currency.title;
      select.appendChild(option);
    });
    this.handleConversion();
  }

  render() {
    this.currency.forEach(this.renderCurrency.bind(this));
  }

  toggleLoader(isForce) {
    this.container.classList.toggle('hidden', isForce);
    this.loader.classList.toggle('hidden', !isForce);
  }

}

document.addEventListener('DOMContentLoaded', () => {
  new Converter(
    document.querySelector('#content'),
    'https://neto-api.herokuapp.com/currency'
  );
});