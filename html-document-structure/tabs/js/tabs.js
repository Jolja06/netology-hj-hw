'use strict';

class Tabs {
  constructor(container) {
    if (!(container instanceof Element)) {
      return;
    }

    this.index = 0;

    this.container = container;
    this.navigation = this.container.querySelector('.tabs-nav');
    this.articles = Array.prototype.slice.call(this.container.querySelectorAll('[data-tab-title]'));
    this.tabs = [];

    this.init();
  }

  init() {
    this.initTabs();
    this.render();

    this.navigation.addEventListener('click', this.handleNavigate.bind(this));
  }

  initTabs() {
    const sampleTab  = this.navigation.firstElementChild;
    this.navigation.innerHTML = '';

    this.articles.forEach((article, index) => {
      const tab = sampleTab.cloneNode(true);
      tab.firstElementChild.classList.add(article.dataset.tabIcon);
      tab.firstElementChild.innerHTML = article.dataset.tabTitle;
      tab.dataset.index = index;
      this.tabs.push(tab);
      this.navigation.appendChild(tab);
    });
  }

  handleNavigate(event) {
    const item = event.target.closest('li');
    if (!item) {
      return;
    }

    this.index = item.dataset.index;
    this.render();
  }

  render() {
    this.tabs.forEach((tab) => {
      tab.classList.remove('ui-tabs-active');
    });
    this.tabs[this.index].classList.add('ui-tabs-active');

    this.articles.forEach((article) => {
      article.classList.add('hidden');
    });
    this.articles[this.index].classList.remove('hidden');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Tabs(document.querySelector('#tabs'));
});