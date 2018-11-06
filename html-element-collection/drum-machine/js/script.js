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
    const player = event.target.closest('li').querySelector('audio');

    if (player.currentTime > 0) {
      player.pause();
      player.currentTime = 0;
      player.play();
    } else {
      player.play();
    }
  }
}

window.onload = () => {
  new DrumSet(document.querySelector('ul'));
};
