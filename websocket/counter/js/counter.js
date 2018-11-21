'use strict';

class Counter {
  constructor(container) {
    if (!(container instanceof Element)) {
      return;
    }

    this.connection = new WebSocket('wss://neto-api.herokuapp.com/counter');
    this.counter = container.querySelector('.counter');
    this.errors = container.querySelector('.errors');

    this.connection.addEventListener('open', this.init.bind(this));
    window.addEventListener('beforeunload', this.handleClose.bind(this));
  }

  init() {
    this.connection.addEventListener('message', this.render.bind(this));
  }

  render({ data }) {
    const parsedData = JSON.parse(data);

    this.counter.innerHTML = parsedData.connections;
    this.errors.innerHTML = parsedData.errors;
  }

  handleClose() {
    this.connection.close(1000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Counter(document.querySelector('.container'));
});
