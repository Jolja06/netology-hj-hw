'use strict';

class Cart {
  constructor(container) {
    if (!(container instanceof Element)) {
      return;
    }

    this.count = 0;
    this.total = 0;

    this.container = container;
    this.countElement = this.container.querySelector('#cart-count');
    this.totalElement = this.container.querySelector('#cart-total-price');

    this.container.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick(event) {
    const price = event.target.getAttribute('data-price');
    if (!price) {
      return;
    }

    this.add(Number(price));
  }

  add(price) {
    this.count++;
    this.total += price;
    this.render();
  }

  render() {
    this.countElement.innerHTML = this.count;
    this.totalElement.innerHTML = getPriceFormatted(this.total);
  }
}

document.addEventListener('DOMContentLoaded', () => {
    new Cart(document.querySelector('#container'));
});
