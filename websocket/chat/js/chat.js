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
    this.templates = container.querySelector('.messages-templates').children;
    this.server = server;
    this.socket = new WebSocket(this.server);
    this.submit = container.querySelector('.message-submit');
    this.form = container.querySelector('form');

    this.socket.addEventListener('open', this.connection.bind(this));
    this.socket.addEventListener('message', this.getMessage.bind(this));
    this.socket.addEventListener('close', this.connection.bind(this));
    this.form.addEventListener('submit', this.handleSubmit.bind(this));

  }

  connection(event) {
    this.stauts.innerHTML = (event.type === 'open') ? this.stauts.dataset.online : this.stauts.dataset.offline;
    event.type === 'open' ? this.submit.removeAttribute('disabled') : this.submit.setAttribute('disabled');
    const template = Array.from(this.templates)[3];
    const status = template.cloneNode(true);
    event.type === 'open' ? status.firstElementChild.textContent = 'Пользователь появился в сети' : 'Пользователь не в сети';
    this.content.appendChild(status);
  }


  getMessage(event) {
    const message = event.data;
    const template = Array.from(this.templates);
    if (message === '...') {
      const typing = template[0].cloneNode(true);
      this.content.appendChild(typing);
    } else {
      const messagePers = template[1].cloneNode(true);
      messagePers.querySelector('.message-text').textContent = message;
      messagePers.querySelector('.timestamp').innerHTML = `${new Date().getHours()}:${new Date().getMinutes()}`;
      this.content.appendChild(messagePers);
    }

  }

  handleSubmit(event) {
    event.preventDefault();
    const target = event.target;
    let messageValue = target.querySelector('input');
    const template = Array.from(this.templates)[2];
    const message = template.cloneNode(true);
    message.querySelector('.message-text').textContent = messageValue.value;
    message.querySelector('.timestamp').innerHTML = `${new Date().getHours()}:${new Date().getMinutes()}`;
    this.content.appendChild(message);
    this.socket.send(messageValue.value);
    messageValue.value = ''
  }

}

document.addEventListener('DOMContentLoaded', () => {
  new Chat(
    document.querySelector('.chat'),
    'wss://neto-api.herokuapp.com/chat'
  );
});