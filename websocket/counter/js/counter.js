'use strict';

const isServer = /^(wss?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
class Counter {
  constructor(container, server) {
    if (!(container instanceof Element) || !(isServer.test(server))) {
      return;
    }

    this.container = container;
    this.server = server;
    this.connection = new WebSocket(this.server);
    this.counter = this.container.querySelector('.counter');
    this.errors = this.container.querySelector('.errors');

    this.connection.addEventListener('open', this.init.bind(this));

    window.addEventListener('beforeunload', () => {
      this.connection.addEventListener('close', this.handleClose.bind(this));
    });
  }

  init() {
    this.connection.addEventListener('message', this.render.bind(this));
  }

  render(event) {
    const data = JSON.parse(event.data);
    this.counter.innerHTML = data.connections;
    this.errors.innerHTML = data.errors;
  }

  handleClose(event) {
    this.render(event);
    this.connection.close(1000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Counter(
    document.querySelector('.container'),
    'wss://neto-api.herokuapp.com/counter'
  );
});
