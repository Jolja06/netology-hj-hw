'use strict';

class DrumSet {
  constructor(container) {
    if (!(container instanceof Element)) {
      return;
    }

    this.container = container;
    this.isPlaying = false;

    this.container.addEventListener('click', this.play.bind(this));
  }

  play(event) {
    const item = event.target.closest('li').querySelector('audio');
    
    if (item.currentTime > 0) {
      item.pause();
      item.currentTime = 0;
      item.play();
    } else {
      item.play();
    }
  }
}

window.onload = () => {
  new DrumSet(document.querySelector('ul'));
};