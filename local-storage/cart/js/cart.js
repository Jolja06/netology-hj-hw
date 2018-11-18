'use strict';
const isURL = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
class Cart {
  constructor(product, url) {
    if (!(product instanceof Element) || !(isURL.test(url))) {
      return;
    }

    this.product = product;
    this.url = url;
    this.button = this.product.querySelector('#AddToCart');
    this.total = 0;
    this.init();
  }

  init() {
    this.fetchColors();
    this.fetchSizes();
    this.button.addEventListener('click', this.handleAddToCart.bind(this));
    this.renderCart();
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

  handleAddToCart(event) {
    event.preventDefault();
    const form = event.target.closest('form');
    let data = new FormData(form);
    data.append("productId", form.dataset.productId);
    
    fetch(this.url, {
      body: data,
      credentials: 'same-origin',
      method: 'POST',
    })
    .then((response) => {
        if (response.status >= 200 && response.status < 400) {
          return response;
        }
        throw new Error(response.statusText);
    })
    .then((responce) => responce.json())
    .then((data) => this.updateProductToCart(data, 'add'))
    .catch((error) => console.error(error));
  }
  
  handleRemove(event) {
    event.preventDefault();
    let data = new FormData();
    data.append("productId", event.target.dataset.id);

    fetch(this.url + '/remove', {
      body: data,
      credentials: 'same-origin',
      method: 'POST',
    })
    .then((response) => {
        if (response.status >= 200 && response.status < 400) {
          return response;
        }
        throw new Error(response.statusText);
    })
    .then((responce) => responce.json())
    .then((data) => this.updateProductToCart(data, 'remove'))
    .catch((error) => console.error(error));
  }

  updateProductToCart(items) {
    const goods = document.querySelector('#quick-cart');
    let price = 0;
    let quantity = 0;
    const template = `
      ${items.map((item) => {
        quantity = item.quantity;
        price = item.price;
        return `
        <div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-${item.productId}" style="opacity: 1;">
          <div class="quick-cart-product-wrap">
            <img src="${item.pic}" title="${item.title}">
            <span class="s1" style="background-color: #000; opacity: .5">$${item.price}.00</span>
            <span class="s2"></span>
          </div>
          <span class="count hide fadeUp" id="quick-cart-product-count-${item.productId}">${item.quantity}</span>
          <span class="quick-cart-product-remove remove" data-id="${item.id}"></span>
        </div>

      `}).join('')}
    `;
    goods.innerHTML = template + this.renderCart(price, quantity);
    const remove = document.querySelector('.remove');
    remove.addEventListener('click', this.handleRemove.bind(this));

  }

  renderCart(price = 0, quantity = 0) {
    const goods = document.querySelector('#quick-cart');
    const cart = `
      <a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico ${quantity !== 0 ? 'open' : ''}">
        <span>
          <strong class="quick-cart-text">Оформить заказ<br></strong>
          <span id="quick-cart-price">${price*quantity}.00</span>
        </span>
      </a>
    `
    goods.innerHTML = cart;
    return cart;
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
}

document.addEventListener('DOMContentLoaded', () => {
  new Cart(
    document.querySelector('.product-detail'),
    'https://neto-api.herokuapp.com/cart')
});