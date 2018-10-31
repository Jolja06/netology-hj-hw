'use strict';

class Piano {
  constructor(container, octaves) {
    if (!container instanceof Element || !Array.isArray(octaves)) {
      return;
    }

    this.container = container;
    this.octaves = octaves;
    this.octaveActivated = 1;

    this.keys = document.querySelectorAll('audio');

    this.container.addEventListener('click', this.play.bind(this));
    document.addEventListener('keydown', this.changeOctave.bind(this));
    document.addEventListener('keyup', this.changeOctave.bind(this));

    this.setOctave();
  }

  changeOctave(event) {
    switch (event.key) {
      case 'Shift':
        event.type === 'keydown' ? this.octaveActivated = 0 : this.octaveActivated = 1;
        break;

      case 'Alt':
        event.type === 'keydown' ? this.octaveActivated = 2 : this.octaveActivated = 1;
        break;

      default:
        this.octaveActivated = 1;

    }
    this.setOctave();
    this.changeView();
  }

  changeView() {
    switch (this.octaveActivated) {
      case 0:
        this.container.classList.remove('middle');
        this.container.classList.add('lower');
        break;

      case 2:
        this.container.classList.remove('middle');
        this.container.classList.add('higher');
        break;

      default:
        this.container.classList.remove('lower', 'higher');
        this.container.classList.add('middle');
        break;
    }
  }

  setOctave() {
    this.keys.forEach((key, index) => key.src = 'sounds/' + this.octaves[this.octaveActivated][index]);
  }

  play(event) {
    const item = event.target.closest('li');
    item.querySelector('audio').play();
  }

}

window.onload = () => {
  new Piano(
    document.querySelector('.set'),
    [
      ['lower/first.mp3', 'lower/second.mp3', 'lower/third.mp3', 'lower/fourth.mp3', 'lower/fifth.mp3'],
      ['middle/first.mp3', 'middle/second.mp3', 'middle/third.mp3', 'middle/fourth.mp3', 'middle/fifth.mp3'],
      ['higher/first.mp3', 'higher/second.mp3', 'higher/third.mp3', 'higher/fourth.mp3', 'higher/fifth.mp3'],
    ]
  )
};