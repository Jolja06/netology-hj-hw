'use strict';

class Tabs {
  constructor(container) {
    if (!(container instanceof Element)) {
      return;
    }

    this.container = container;
    this.nav = this.container.querySelector('.tabs-nav');
    this.content = this.container.querySelector('.tabs-content');
    this.sample = this.nav.firstElementChild;
    this.nav.addEventListener('click', this.handleSetActive.bind(this));

    this.init();
  }

  init() {
    this.fetchContent();
    this.sample.parentNode.removeChild(this.sample);
    this.nav.firstElementChild.classList.add('ui-tabs-active');
    Array.from(this.content.children).forEach(article => {
      article.classList.add('hidden');
      article.parentNode.firstElementChild.classList.remove('hidden');
    })
  }

  fetchContent() {
    const navs = this.content.children;
    Array.from(navs).forEach(nav => {
      this.createNav(nav.dataset.tabTitle, nav.dataset.tabIcon)
    });
  }

  createNav(title, icon) {
    const template = this.sample.cloneNode(true);
    template.firstElementChild.classList.add(icon);
    template.firstElementChild.innerText = title;
    this.nav.appendChild(template);

  }

  handleSetActive(event) {
    const activeTab = event.target.classList[1];
    Array.from(this.nav.children).forEach(control => {
      control.classList.remove('ui-tabs-active');
    });
    event.target.parentNode.classList.add('ui-tabs-active');
    Array.from(this.content.children).forEach(article => {
      article.classList.add('hidden');
      article.dataset.tabIcon === activeTab ? article.classList.remove('hidden') : '';
    })
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Tabs(document.querySelector('#tabs'));
});