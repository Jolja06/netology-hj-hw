'use strict';

class Player {
  constructor(container, songs) {
    if (!(container) instanceof Element || !Array.isArray(songs)) {
      return;
    }

    this.index = 0;
    this.isPlaying = false;
    this.songs = songs;

    this.container = container;
    this.player = this.container.querySelector('audio');
    this.title = container.querySelector('.title');

    this.btnPlay = this.container.querySelector('.playstate');
    this.btnStop = this.container.querySelector('.stop');
    this.btnNext = this.container.querySelector('.next');
    this.btnBack = this.container.querySelector('.back');

    this.btnPlay.addEventListener('click', () => this.togglePlaying());
    this.btnStop.addEventListener('click', () => this.togglePlaying(true));
    this.btnNext.addEventListener('click', this.goForward.bind(this));
    this.btnBack.addEventListener('click', this.goBack.bind(this));
  }

  changeSong() {
    this.title.title = this.songs[this.index].title;
    this.player.src = this.songs[this.index].url;
  }

  goBack() {
    this.index = this.index <= 0 ? this.songs.length - 1 : this.index - 1;
    this.changeSong();
    this.isPlaying ? this.player.play() : this.player.pause();
  }

  goForward() {
    this.index = (this.index + 1) % this.songs.length;
    this.changeSong();
    this.isPlaying ? this.player.play() : this.player.pause();
  }

  reset() {
    this.isPlaying = false;
    this.container.classList.remove('play');
    this.player.pause();
    this.player.currentTime = 0;
  }

  togglePlaying(isReset) {
    if (isReset) {
      this.reset();
      return;
    }

    this.isPlaying = !this.isPlaying;
    this.container.classList.toggle('play', this.isPlaying);
    this.isPlaying ? this.player.play() : this.player.pause();
  }
}

window.onload = () => {
  new Player(
    document.querySelector('.mediaplayer'),
    [
      {
        title: 'LA Chill Tour',
        url: 'https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/LA%20Chill%20Tour.mp3'
      },
      {
        title: 'This is it band',
        url: 'https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/This%20is%20it%20band.mp3'
      },
      {
        title: 'LA Fusion Jam',
        url: 'https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/LA%20Fusion%20Jam.mp3'
      }
    ]
  )
};