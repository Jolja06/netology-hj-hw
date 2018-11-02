'use strict';

class Basket {
  constructor(container, helper) {
    if (!(container instanceof Element) || typeof helper !== 'function') {
      return;
    }
  }
}

document.addEventListener('DOMContentLoaded',
  new Basket(
    document.querySelector('#container'),
    getPriceFormatted
  )
);