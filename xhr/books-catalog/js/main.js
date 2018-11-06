'use strict';

const isURL = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
class Catalog {
  constructor(container, card, server) {
    if (!(container instanceof Element) || !(card instanceof Element) || !(isURL.test(server))) {
      return;
    }

    this.container = container;
    this.card = card;
    this.url = server;

    this.bookList = [];
    this.xhrRequest('GET', this.url, true);
  }

  xhrRequest(method, url, async = true) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, async);
    xhr.send();
    xhr.addEventListener('load', () => this.onLoad(xhr));
  }

  onLoad(response) {
    this.bookList = JSON.parse(response.responseText);
    this.render();
  }

  renderBook(book) {
    const bookElement = document.createElement('li');
    const bookCover = document.createElement('img');
    bookElement.dataset.title = book.title;
    bookElement.dataset.author = book.author.name;
    bookElement.dataset.info = book.info;
    bookElement.dataset.price = book.price;

    bookCover.setAttribute('src', book.cover.small);
    bookElement.appendChild(bookCover);
    this.container.appendChild(bookElement);
  }

  render() {
    this.bookList.forEach(this.renderBook.bind(this));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Catalog(
    document.querySelector('#content'),
    document.querySelector('#card'),
    'https://neto-api.herokuapp.com/book/',
  )
});