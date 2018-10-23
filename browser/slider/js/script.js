'use strict';

class Slider {
  constructor(container, images) {
    if (!(container instanceof Element) || !Array.isArray(images)) {
      return;
    }

    this.container = container;
    this.images = images;
    this.index = -1;
    this.interval = 5000;

    this.start();
  }

  changeImage() {
    this.index = (this.index + 1) % this.images.length;
    this.render();
  }

  render() {
    this.container.src = 'i/' + this.images[this.index];
  }

  start() {
    setInterval(this.changeImage.bind(this), this.interval);
  }
}

window.onload = () => {
  new Slider(
    document.getElementById('slider'),
    [
      'airmax-jump.png',
      'airmax-on-foot.png',
      'airmax-playground.png',
      'airmax-top-view.png',
      'airmax.png',
    ],
  );
};