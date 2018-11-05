'use strict';

class Subscribe {
  constructor(container) {
    if (!(container instanceof Element)) {
      return;
    }

    this.container = container;

    this.nav = document.querySelector('nav');
    this.controls = this.nav.querySelectorAll('a');
    this.content = this.container.querySelector('#content');
    this.loader = this.container.querySelector('#preloader');
    this.nav.addEventListener('click', this.sendRequest.bind(this));

    this.xhrRequest('GET', 'components/email-tab.html', true);

  }

  sendRequest(event) {
    event.preventDefault();
    const item = event.target.closest('a');
    this.xhrRequest('GET', item.href, true);
    this.setActive(item);
  }

  setActive(target) {
    this.controls.forEach(control => control.classList.remove('active'));
    target.classList.add('active');
  }

  xhrRequest(method, url, async = true) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, async);
    xhr.addEventListener('loadstart', () => this.showLoader());
    xhr.send();
    xhr.addEventListener('load', () => this.onLoad(xhr))
  }

  showLoader() {
    this.content.classList.add('hidden');
    this.loader.classList.remove('hidden');
  }

  onLoad(response) {

    this.loader.classList.add('hidden');
    this.content.classList.remove('hidden');
    if (response.status >= 200 && response.status < 400) {
      this.content.innerHTML = response.responseText;
    } else {
      this.content.innerHTML = `<p>Кажется, что-то пошло не так, попробуйте позднее</p>`
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Subscribe(
    document.querySelector('.tabs')
  );
});
