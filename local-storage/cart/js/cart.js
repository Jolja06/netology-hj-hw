'use strict';

const URL = 'https://neto-api.herokuapp.com/cart';

class Cart {
  constructor(container) {
    if (!(container instanceof Element)) {
      return;
    }

    this.total = 0;
    this.container = container;
    this.form = this.container.querySelector('form');
    
    this.init();
  }

  init() {
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    
    const buttonAdd = this.container.querySelector('#AddToCart');
    buttonAdd.addEventListener('click', this.handleAdd.bind(this));
    
    return Promise.all([
      this.fetch(`${URL}/colors`),
      this.fetch(`${URL}/sizes`),
      this.fetch(URL),
    ])
      .then((data) => {
        this.renderColor(data[0]);
        this.renderSize(data[1]);
        this.renderCart(data[2]);
      });
  }
  
  fetch(url, method = 'GET', data) {
    return fetch(url, {
      body: data,
      credentials: 'same-origin',
      method,
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 400) {
          return response.json();
        }
      
        throw new Error(response.statusText);
      })
      .catch(console.error);
  }
  
  handleAdd(event) {
    event.preventDefault();
    
    const data = new FormData(this.form);
    data.append('productId', this.form.dataset.productId);
    
    this.fetch(URL, 'POST', data)
      .then((data) => this.renderCart(data));
  }
  
  handleRemove(event) {
    event.preventDefault();
    
    const data = new FormData(this.form);
    data.append('productId', this.form.dataset.productId);
    
    this.fetch(`${URL}/remove`, 'POST', data)
      .then((data) => this.renderCart(data));
  }
  
  renderCart(items) {    
    const markup = document.querySelector('#quick-cart');
    
    if (!items || !items.length) {
      markup.innerHTML = '';
      return;
    }
    
    const sum = items.reduce((acc, item) => {
      const {
        price,
        quantity,
      } = item;
      
      return acc + quantity * price;
    }, 0);
    
    const products = `
      ${items.map(item => (`
        <div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-${item.productId}" style="opacity: 1;">
          <div class="quick-cart-product-wrap">
            <img src="${item.pic}" title="${item.title}">
            <span class="s1" style="background-color: #000; opacity: .5">$${item.price}.00</span>
            <span class="s2"></span>
          </div>
          <span class="count hide fadeUp" id="quick-cart-product-count-${item.productId}">${item.quantity}</span>
          <span class="quick-cart-product-remove remove" data-id="${item.id}"></span>
        </div>

      `)).join('')}
    `;
    
    const cart = `
      <a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico ${sum ? 'open' : ''}">
        <span>
          <strong class="quick-cart-text">Оформить заказ<br></strong>
          <span id="quick-cart-price">${sum}.00</span>
        </span>
      </a>
    `;
    
    markup.innerHTML = products + cart;
    
    const buttonRemove = document.querySelector('.remove');
    buttonRemove.addEventListener('click', this.handleRemove.bind(this));
  }
  
  renderColor(colors) {
    const markup = this.container.querySelector('#colorSwatch');

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
    const markup = this.container.querySelector('#sizeSwatch');
    
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

    markup.innerHTML = `<div class="header">Размер</div>` + template;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Cart(document.querySelector('.product-detail'));
});

