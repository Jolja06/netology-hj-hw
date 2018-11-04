'use strict';

class ContactList {
  constructor(container, contacts) {
    if (!(container instanceof Element) || !Array.isArray(contacts)) {
      return;
    }

    this.container = container;
    this.contacts = contacts;

    this.render();

  }
  renderContact(contact) {
    const contactElement = document.createElement('li');
    contactElement.dataset.email = contact.email;
    contactElement.dataset.phone = contact.phone;

    const nameElement = document.createElement('strong');
    nameElement.innerHTML = contact.name;

    contactElement.appendChild(nameElement);
    this.container.appendChild(contactElement);
  }

  render() {
    this.contacts.forEach(this.renderContact.bind(this))
  }
}

const contacts = JSON.parse(loadContacts());
document.addEventListener('DOMContentLoaded', () => {
  new ContactList(
    document.querySelector('.contacts-list'),
    contacts);
});
