'use strict';

class Paint {
  constructor(canvas) {
    if (canvas.tagName !== 'CANVAS') {
      return
    }

    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.isDrawing = false;

    window.addEventListener('resize', this.init.bind(this));

    this.canvas.addEventListener('dblclick', this.init.bind(this));
    this.canvas.addEventListener('mousedown', this.startDrawing.bind(this));
    this.canvas.addEventListener('mousemove', this.handleDraw.bind(this));
    this.canvas.addEventListener('mouseup', this.handleStopDraw.bind(this));
    this.canvas.addEventListener('mouseout', this.handleStopDraw.bind(this));

    this.init();
    
  }
  init() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  startDrawing(event) {
    this.isDrawing = true;

    this.ctx.beginPath();
    this.ctx.moveTo(event.pageX, event.pageY)
  }

  handleDraw(event) {
    if (this.isDrawing) {
      const x = event.pageX;
      const y = event.pageY;

      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    }
  }

  handleStopDraw() {
    this.isDrawing = false;
  }
}


document.addEventListener('DOMContentLoaded', () => {
  new Paint(document.querySelector('#draw'));
});