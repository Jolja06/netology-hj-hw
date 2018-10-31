'use strict';

const Keys = {
  ALT: 'Alt',
  SHIFT: 'Shift',
};

const Octaves = {
  HIGHER: 'higher',
  LOWER: 'lower',
  MIDDLE: 'middle',
};

const mapOctaveKeyToOctave = {
  [Keys.ALT]: Octaves.HIGHER,
  [Keys.SHIFT]: Octaves.LOWER,
};

class Piano {
  constructor(container, octaves) {
    if (!container instanceof Element || !Array.isArray(octaves)) {
      return;
    }

    this.index = null;
    this.isPlaying = false;
    this.lastOctaveKey = null;
    this.octaves = octaves;

    this.container = container;
    this.container.addEventListener('click', this.handleClick.bind(this));
    document.addEventListener('keydown', this.handleSetOctave.bind(this));
    document.addEventListener('keyup', this.handleRemoveOctave.bind(this));
  }

  handleClick(event) {
    this.setIndex(event.target);
    this.setAudio(mapOctaveKeyToOctave[this.lastOctaveKey] || Octaves.MIDDLE);
    this.play();
  }

  handleSetOctave(event) {
    if (!this.isPlaying) {
      return;
    }

    switch (event.key) {
      case Keys.ALT:
        this.setAudio(Octaves.HIGHER);
        this.lastOctaveKey = Keys.ALT;
        break;
      case Keys.SHIFT:
        this.setAudio(Octaves.LOWER);
        this.lastOctaveKey = Keys.SHIFT;
        break;
      default:
        break;
    }
  }

  handleRemoveOctave(event) {
    if (!this.isPlaying) {
      return;
    }

    if (this.lastOctaveKey === event.key) {
      this.setAudio(Octaves.MIDDLE);
      this.lastOctaveKey = null;
    }
  }

  play() {
    const player = this.container.querySelectorAll('audio')[this.index];
    if (player) {
      player.play();
      this.isPlaying = true;
    }
  }

  setAudio(octave = Octaves.MIDDLE) {
    const player = this.container.querySelectorAll('audio')[this.index];
    player.src = 'sounds/' + this.octaves[this.index][octave];

    this.container.classList.remove(Octaves.HIGHER, Octaves.LOWER, Octaves.MIDDLE);
    this.container.classList.add(octave);
  }

  setIndex(target) {
    const item = target.closest('li');
    if (!item) {
      return;
    }

    this.index = Array.from(this.container.children).indexOf(item);
  }
}

window.onload = () => {
  new Piano(
    document.querySelector('.set'),
    [
      {
        [Octaves.HIGHER]: 'higher/first.mp3',
        [Octaves.LOWER]: 'lower/first.mp3',
        [Octaves.MIDDLE]: 'middle/first.mp3',
      },
      {
        [Octaves.HIGHER]: 'higher/second.mp3',
        [Octaves.LOWER]: 'lower/second.mp3',
        [Octaves.MIDDLE]: 'middle/second.mp3',
      },
      {
        [Octaves.HIGHER]: 'higher/third.mp3',
        [Octaves.LOWER]: 'lower/third.mp3',
        [Octaves.MIDDLE]: 'middle/third.mp3',
      },
      {
        [Octaves.HIGHER]: 'higher/fourth.mp3',
        [Octaves.LOWER]: 'lower/fourth.mp3',
        [Octaves.MIDDLE]: 'middle/fourth.mp3',
      },
      {
        [Octaves.HIGHER]: 'higher/fifth.mp3',
        [Octaves.LOWER]: 'lower/fifth.mp3',
        [Octaves.MIDDLE]: 'middle/fifth.mp3',
      },
    ],
  );
};
