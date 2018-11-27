'use strict';

class Paint {
  constructor(canvas) {
    if (canvas.tagName !== 'CANVAS') {
      return
    }

    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.isDrawing = false;
    this.isReduce = true;

    window.addEventListener('resize', this.init.bind(this));

    this.canvas.addEventListener('dblclick', this.init.bind(this));
    this.canvas.addEventListener('mousedown', this.startDrawing.bind(this));
    this.canvas.addEventListener('mousemove', this.handleDraw.bind(this));
    this.canvas.addEventListener('mouseup', this.handleStopDraw.bind(this));
    this.canvas.addEventListener('mouseout', this.handleStopDraw.bind(this));
    this.hue = 0;

    this.init();
    
  }
  init() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = 5;
    this.hue = 0;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  startDrawing(event) {
    this.isDrawing = true;
    this.ctx.moveTo(event.pageX, event.pageY);
  }

  handleDraw(event) {
    if (this.isDrawing) {

      this.ctx.moveTo(event.pageX, event.pageY);

      // this.changeWidth(this.isReduce);
      // this.changeColor(event.shiftKey);
      this.ctx.lineTo(event.offsetX, event.offsetY);
      this.ctx.stroke();
    }
  }
  
  changeWidth(isReduce) {
    // isReduce ? this.ctx.lineWidth-- : this.ctx.lineWidth++;
    //
    // if (this.isReduce && this.ctx.lineWidth <= 5) {
    //   this.ctx.beginPath();
    //   this.isReduce = false;
    // }
    //
    // if (!this.isReduce && this.ctx.lineWidth >= 100) {
    //   this.isReduce = true;
    // }
    if (isReduce) {

      this.ctx.lineWidth < 100 ? this.ctx.lineWidth++ : this.ctx.lineWidth = this.ctx.lineWidth;

    }
  }
  
  changeColor(isShift) {
    switch (isShift) {
      case true:
        this.hue === 0 ? this.hue = 359 : this.hue--;
        break;

      case false:
        this.hue === 359 ? this.hue = 0 : this.hue++;

      default:
        break;
    }

    this.ctx.strokeStyle = `hsl(${this.hue} 100% 50%)`;
    console.log('Line 75: ', this.hue);
  }

  handleStopDraw() {
    this.isDrawing = false;
  }
}


document.addEventListener('DOMContentLoaded', () => {
  new Paint(document.querySelector('#draw'));
});