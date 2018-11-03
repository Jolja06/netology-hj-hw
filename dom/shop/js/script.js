'use strict';

class Basket {
  constructor(container, helper) {
    if (!(container instanceof Element) || typeof helper !== 'function') {
      return;
    }

    this.container = container;
    this.helper = helper;

    this.btnsAdd = this.container.querySelectorAll('.add');
    this.cartCount = this.container.querySelector('#cart-count');
    this.totalPrice = this.container.querySelector('#cart-total-price');

    this.intermediatePrice = 0;
    this.btnsAdd.forEach(btn => btn.addEventListener('click', this.addProduct.bind(this)))
  }

  addProduct(event) {
    const price = event.target.getAttribute('data-price');
    this.setCount();
    this.setPrice(price);
  }

  setCount() {
    this.cartCount.innerHTML++;
  }

  setPrice(price) {
    this.intermediatePrice += +price;
    this.totalPrice.innerHTML = this.helper(this.intermediatePrice);
  }
}

document.addEventListener('DOMContentLoaded',
  new Basket(
    document.querySelector('#container'),
    getPriceFormatted
  )
);
