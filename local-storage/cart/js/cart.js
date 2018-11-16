'use strict';
const isURL = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
class Cart {
  constructor(product, url) {
    if (!(product instanceof Element) || !(isURL.test(url))) {
      return;
    }

    this.product = product;
    this.url = url;

    this.init();
  }

  init() {
    this.fetchColors();
    this.fetchSizes();
    this.render();
  }

  fetchColors() {
    fetch(this.url + '/colors')
      .then((response) => {
      if (response.status >= 200 && response.status < 400) {
        return response;
      }
      throw new Error(response.statusText);
      })
      .then((response) => response.json())
      .then((data) => this.renderColor(data))
      .catch((error) => console.error(error));
  }
  
  fetchSizes() {
    fetch(this.url + '/sizes')
      .then((response) => {
        if (response.status >= 200 && response.status < 400) {
          return response;
        }
        throw new Error(response.statusText);
      })
      .then((response) => response.json())
      .then((data) => this.renderSize(data))
      .catch((error) => console.error(error));
  }
  
  renderColor(colors) {
    const markup = document.querySelector('#colorSwatch');

    const template = `
      ${colors.map((color, index) => `
         <div data-value="${color.type}" class="swatch-element color ${color.type} ${color.isAvailable ? 'available' : 'soldout'}">
        <div class="tooltip">${color.title}</div>
        <input quickbeam="color" id="swatch-${index}-${color.type}" type="radio" name="color" value="${color.type}" ${color.isAvailable ? '' : 'disabled'} ${color.type === 'red' ? 'checked' : ''}>
        <label for="swatch-${index}-${color.type}" style="border-color: ${color.title};">
          <span style="background-color: ${color.title};"></span>
          <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
        </label>
      </div>
      `).join('')}
    `;

    markup.innerHTML = `<div class="header">Цвет</div>` + template;
  }

  renderSize(sizes) {
    const container = document.querySelector('#sizeSwatch');

    const template = `
      ${sizes.map((size, index) => `
        <div data-value="${size.type}" class="swatch-element plain ${size.type} ${size.isAvailable ? 'available' : 'soldout'}">
          <input id="swatch-${index}-${size.type}" type="radio" name="size" value="${size.type}" ${size.isAvailable ? '' : 'disabled'} ${size.title === 'XL' ? 'checked' : ''}>
          <label for="swatch-${index}-${size.type}">
            ${size.title}
            <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
          </label>
        </div>
      `).join('')}
    `;

    container.innerHTML = `<div class="header">Размер</div>` + template;
  }

  render() {
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Cart(
    document.querySelector('.product-detail'),
    'https://neto-api.herokuapp.com/cart')
});