'use strict';

class Subscribe {
  constructor(container) {
    if (!(container instanceof Element)) {
      return;
    }

    this.container = container;
    this.xhr = new XMLHttpRequest();

    this.nav = document.querySelector('nav');
    this.controls = this.nav.querySelectorAll('a');
    this.content = this.container.querySelector('#content');
    this.loader = this.container.querySelector('#preloader');

    this.nav.addEventListener('click', this.handleClick.bind(this));
    this.xhr.addEventListener('load', this.handleLoad.bind(this));

    this.init();

  }

  init() {
    const activeLink = this.nav.querySelector('a.active');
    if (activeLink) {
      this.fetchContent(activeLink.href);
    }
  }

  handleClick(event) {
    const target = event.target;
    if (target.tagName === 'A') {
      event.preventDefault();
      this.fetchContent(target.href);
      this.setActiveTab(target);
    }
  }

  handleLoad() {
    this.toggleLoader(false);
    if (this.xhr.status === 200) {
      this.content.innerHTML = this.xhr.responseText;
    } else {
      this.content.innerHTML = `<p>Кажется, что-то пошло не так, попробуйте позднее</p>`;
    }
  }

  fetchContent(url) {
    this.xhr.open('GET', url, true);
    this.xhr.send();
    this.toggleLoader(true);
  }

  setActiveTab(target) {
    this.controls.forEach(control => control.classList.remove('active'));
    target.classList.add('active');
  }

  toggleLoader(isForce) {
    this.content.classList.toggle('hidden', isForce);
    this.loader.classList.toggle('hidden', !isForce);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Subscribe(document.querySelector('.tabs'));
});
