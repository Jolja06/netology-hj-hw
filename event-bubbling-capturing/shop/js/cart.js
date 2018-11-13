'use strict';

class Cart {
  constructor(container, load) {
    if (!(container) instanceof Element || !(load) instanceof Element) {
      return;
    }

    this.container = container;
    this.load = load;
    this.buttons = [];

    this.load.addEventListener('click', this.init.bind(this));
    this.init();
  }

  init() {
    const btns = this.container.querySelectorAll('.add-to-cart');
    this.buttons = [];
    Array.from(btns).forEach(btn => {
      if (!this.buttons.includes(btn)) {
        this.buttons.push(btn);
      }
    });

    this.buttons.forEach(button => {
      button.addEventListener('click', this.handleClick.bind(this));
    })
  }

  handleClick(event) {
    event.preventDefault();
    addToCart({ title: event.target.dataset.title, price: event.target.dataset.price });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Cart(
    document.querySelector('.items-list'),
    document.querySelector('.show-more')
  );
});
