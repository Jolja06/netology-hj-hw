'use strict';

const isURL = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
class Catalog {
  constructor(container, card, url) {
    if (!(container instanceof Element) || !(card instanceof Element) || !(isURL.test(url))) {
      return;
    }

    this.books = [];

    this.container = container;
    this.card = card;
    this.url = url;
    this.xhr = new XMLHttpRequest();

    this.xhr.addEventListener('load', this.handleLoad.bind(this));

    this.fetchContent();
  }

  handleLoad() {
    this.books = JSON.parse(this.xhr.responseText);
    this.render();
  }

  fetchContent() {
    this.xhr.open('GET', this.url, true);
    this.xhr.send();
  }

  renderBook(book) {
    const bookElement = document.createElement('li');
    bookElement.dataset.title = book.title;
    bookElement.dataset.author = book.author.name;
    bookElement.dataset.info = book.info;
    bookElement.dataset.price = book.price;

    const bookCover = document.createElement('img');
    bookCover.setAttribute('src', book.cover.small);
    bookElement.appendChild(bookCover);

    this.container.appendChild(bookElement);
  }

  render() {
    this.books.forEach(this.renderBook.bind(this));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Catalog(
    document.querySelector('#content'),
    document.querySelector('#card'),
    'https://neto-api.herokuapp.com/book/',
  )
});