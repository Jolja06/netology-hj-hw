'use strict';

const isServer = /^(wss?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
class Chat {
  constructor(container, server) {
    if (!(container instanceof Element) || !(isServer.test(server))) {
      return;
    }

    this.container = container;
    this.content = container.querySelector('.messages-content');
    this.stauts = container.querySelector('.chat-status');
    this.templates = container.querySelector('.messages-templates');
    this.notification = this.templates.querySelector('.message.message-status');
    this.server = server;
    this.connection = new WebSocket(this.server);
    this.submit = container.querySelector('.message-submit');

    this.connection.addEventListener('open', this.open.bind(this));
    this.connection.addEventListener('message', this.message.bind(this));
  }

  // open(event) {
  //   this.stauts.innerHTML = this.stauts.dataset.online;
  //   this.submit.removeAttribute('disabled');
  //   const notifOnline = this.notification.cloneNode(true);
  //   notifOnline.firstElementChild.textContent = 'Пользователь появился в сети';
  //   this.content.appendChild(notifOnline);
  // }

  // message(event) {
  //   const message = event.data;
  //   if (message === '...') {
  //     const typing = this.templates.querySelector('.message.loading').cloneNode(true);
  //     this.content.appendChild(typing);
  //   } else {
  //     const messagePers = this.templates.querySelector('.message').cloneNode(true);
  //     messagePers.textContent = message;
  //     this.content.appendChild(messagePers);
  //   }

    
  // }
}

document.addEventListener('DOMContentLoaded', () => {
  new Chat(
    document.querySelector('.chat'),
    'wss://neto-api.herokuapp.com/chat'
  );
})