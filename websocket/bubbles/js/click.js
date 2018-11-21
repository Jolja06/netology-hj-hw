'use strict';

class Bubbles {
  constructor() {
    this.connection = new WebSocket('wss://neto-api.herokuapp.com/mouse');

    this.connection.addEventListener('open', this.init.bind(this));
    document.addEventListener('click', this.handleClick.bind(this));
  }

  init() {
    showBubbles(this.connection);
  }

  handleClick(event) {
    const { x, y } = event;
    this.connection.send(JSON.stringify({ x, y }));
  }
}

document.addEventListener('DOMContentLoaded', new Bubbles);