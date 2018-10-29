'use strict';

class DrumSet {
  constructor(container) {
    if (!(container instanceof Element)) {
      return;
    }

    this.container = container;

    this.container.addEventListener('click', this.play.bind(this));
  }

  play(event) {
    const item = event.target.closest('li');
    item.querySelector('audio').play();
  }
}

window.onload = () => {
  new DrumSet(document.querySelector('ul'));
};