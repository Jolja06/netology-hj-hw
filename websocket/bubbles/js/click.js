'use strict';
const isServer = /^(wss?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
class Bubbles {
  constructor(server) {
    if (!(isServer.test(server))) {
      return;
    }
    this.server = server;
    this.connection = new WebSocket(this.server);

    this.click = document.addEventListener('click', this.handleClick.bind(this));

    this.init();
  }

  init() {
    this.connection.addEventListener('open', () => showBubbles(this.connection));
  }

  handleClick(event) {
    this.connection.send(JSON.stringify({
      x: event.x,
      y: event.y,
    }))
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Bubbles('wss://neto-api.herokuapp.com/mouse');
});