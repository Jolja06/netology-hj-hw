'use strict';
const isURL = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
class Converter {
  constructor(container, url) {
    if (!(container instanceof Element) && !(isURL.test(url))) {
      return;
    }

    this.currencies = [];
    this.url = url;
    this.xhr = new XMLHttpRequest();

    this.container = container;
    this.loader = document.querySelector('#loader');
    this.input = this.container.querySelector('#source');
    this.output = this.container.querySelector('#result');
    this.from = this.container.querySelector('#from');
    this.to = this.container.querySelector('#to');

    this.init();
  }

  init() {
    this.input.addEventListener('input', this.calculate.bind(this));
    this.from.addEventListener('change', this.calculate.bind(this));
    this.to.addEventListener('change', this.calculate.bind(this));
    this.xhr.addEventListener('load', this.handleLoad.bind(this));

    this.toggleLoader(true);
    this.fetchContent();
  }

  calculate() {
    this.output.value = (this.input.value * this.from.value / this.to.value).toFixed(2);
  }

  fetchContent() {
    this.xhr.open('GET', this.url, true);
    this.xhr.send();
  }

  handleLoad() {
    this.currencies = JSON.parse(this.xhr.responseText);
    this.toggleLoader(false);
    this.render();
    this.calculate();
  }

  toggleLoader(isForce) {
    this.container.classList.toggle('hidden', isForce);
    this.loader.classList.toggle('hidden', !isForce);
  }

  render() {
    [this.from, this.to].forEach(select => this.currencies.forEach(currency => {
      const option = document.createElement('option');
      option.value = currency.value;
      option.label = currency.code;
      option.title = currency.title;
      select.appendChild(option);
    }));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Converter(
    document.querySelector('#content'),
    'https://neto-api.herokuapp.com/currency'
  );
});