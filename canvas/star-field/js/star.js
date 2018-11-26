'use strict';

class Stars {
  constructor(canvas) {
    if (canvas.tagName !== 'CANVAS') {
      return;
    }
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.number = 200;
    this.colors = [ '#ffffff', '#ffe9c4', '#d4fbff' ];

    this.canvas.addEventListener('click', this.render.bind(this))
    this.init();
  }

  init() {
    this.canvas.style.backgroundColor = '#000000';
    this.render();
  }

  randomNumber() {
    this.number = Math.round( 199.5 + Math.random() * 201);
  }

  renderStar() {
    const radius = (Math.random() * 1.1) / 2;
    const x = Math.random() * 800;
    const y = Math.random() * 400;
    const randomColor = Math.round(-0.5 + Math.random() * 3);

    this.ctx.beginPath();
    this.ctx.globalAlpha = 0.8 + Math.random() * (1 - 0.8);
    this.ctx.fillStyle = this.colors[randomColor];
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  render() {
    this.randomNumber();
    this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
    for (let i = 0; i <= this.number; i++) {
      this.renderStar();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Stars(document.querySelector('canvas'))
});