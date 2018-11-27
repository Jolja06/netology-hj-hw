'use strict';

class Background {
  constructor(canvas) {
    if (canvas.tagName !== 'CANVAS') {
      return;
    }

    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.ctx.strokeStyle = '#ffffff';
    this.number = Math.round(50 - 0.5 + Math.random() * (200 - 50 + 1));
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.x = Math.floor(Math.random() * this.width);
    this.y = Math.floor(Math.random() * this.height);


    // this.createFigure();
    this.createCircle();
    this.createCross();

  }

  createFigure() {
    for (let i = this.number; i >= 0; i--) {
      this.number % 2 ? this.createCross() : this.createCircle();
      this.number--;
    }
  }

  randomSize() {
    return (0.1 + Math.random() * 0.5);
  }

  createCross() {
    const size = this.randomSize();
    this.ctx.beginPath();
    this.ctx.lineWidth = size * 5;



    this.ctx.stroke();

  }

  createCircle() {
    const size = this.randomSize();
    this.ctx.beginPath();
    this.ctx.lineWidth = size * 5;
    this.ctx.arc(75, 75, size * 12, 0, 2 * Math.PI);
    this.ctx.stroke();
  }

}

document.addEventListener('DOMContentLoaded', () => {
  new Background(document.querySelector('#wall'));
});