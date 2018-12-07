'use strict';

class Cart {
  constructor(container) {
    if (!(container) instanceof Element ) {
      return;
    }

    this.container = container;

    this.container.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick(event) {
    const target = event.target;
    if (target.tagName !== 'A' || !target.classList.contains('add-to-cart')) {
      return;
    }

    event.preventDefault();
    const {
      price,
      title,
    } = target.dataset;
    addToCart({ title, price });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Cart(
    document.querySelector('.items-list')
  );
});
