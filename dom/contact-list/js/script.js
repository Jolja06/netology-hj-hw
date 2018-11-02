'use strict';

class ContactList {
  constructor(container, list) {
    if (!(container instanceof Element) || typeof list !== 'object') {
      return;
    }
    
    this.container = container;
    this.list = list;

    this.createList();
    
  }
  createList() {
    for (let item of this.list) {
      let listItem = document.createElement('li');
      listItem.dataset.email = item.email;
      listItem.dataset.phone = item.phone;
      listItem.innerHTML = `<strong> ${item.name} </strong>`;
      this.container.appendChild(listItem);
    }
  }
}

document.addEventListener('DOMContentLoaded', new ContactList(
  document.querySelector('.contacts-list'),
  JSON.parse(loadContacts()),
));
