'use strict';

class Player {
  constructor(player, title, audio) {
    if (!(player) instanceof Element || !(title) instanceof Element || !Array.isArray(audio)) {
      return;
    }

    this.player = player;
    this.title = title;
    this.audio = audio;
    this.index = 0;
    this.isPlay = false;

    this.btnPlay = this.player.getElementsByClassName('playstate')[0];
    this.btnStop = this.player.getElementsByClassName('stop')[0];
    this.btnNext = this.player.getElementsByClassName('next')[0];
    this.btnBack = this.player.getElementsByClassName('back')[0];
    this.track = this.player.getElementsByTagName('audio')[0];

    this.btnPlay.addEventListener('click', this.playSong.bind(this));
    this.btnStop.addEventListener('click', this.stopSong.bind(this));
    this.btnNext.addEventListener('click', this.nextSong.bind(this));
    this.btnBack.addEventListener('click', this.backSong.bind(this));
  }

  playSong() {
    !this.isPlay ? this.track.play() : this.track.pause();
    this.isPlay = this.player.classList.toggle('play');
  }

  stopSong() {
    this.track.pause();
    this.track.currentTime = 0;
    this.player.classList.remove('play');
    this.isPlay = false;
  }

  nextSong() {
    this.stopSong();
    this.index = (this.index + 1) % this.audio.length;
    this.title.title = this.audio[this.index].title;
    this.track.src = this.audio[this.index].url;
  }

  backSong() {
    this.stopSong();
    this.index <= 0 ? this.index = this.audio.length - 1 : this.index--;
    this.title.title = this.audio[this.index].title;
    this.track.src = this.audio[this.index].url;
  }

}

window.onload = () => {
  new Player(
    document.getElementsByClassName('mediaplayer')[0],
    document.getElementsByClassName('title')[0],
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