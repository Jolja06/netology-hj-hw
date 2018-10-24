'use strict';

class Machine {
  constructor(drumKits) {
    if (!(drumKits instanceof HTMLCollection)) {
      return;
    }

    this.drumKits = drumKits;

    for (let drumKit of this.drumKits) {
      drumKit.addEventListener('click', this.playKit.bind(this, drumKit));
    }
  }

  playKit(drum) {
    drum.getElementsByTagName('audio')[0].play();
  }
}

window.onload = () => {
  new Machine(
    document.getElementsByClassName('drum-kit__drum')
  );
};