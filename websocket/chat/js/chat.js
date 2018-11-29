'use strict';

class Chat {
  constructor(container) {
    if (!(container instanceof Element)) {
      return;
    }
    
    this.status = container.querySelector('.chat-status');
    this.content = container.querySelector('.messages-content');
    this.templates = Array.prototype.slice.call(container.querySelector('.messages-templates').children);
    
    this.form = container.querySelector('form');
    this.submit = this.form.querySelector('button');
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
    
    this.connection = new WebSocket('wss://neto-api.herokuapp.com/chat');
    this.connection.addEventListener('open', this.handleConnect.bind(this));
    this.connection.addEventListener('message', this.handleMessageReceived.bind(this));
    this.connection.addEventListener('close', this.handleConnect.bind(this));
  }

  handleConnect({ type }) {
    const isOpen = type === 'open';
    
    const { online, offline } = this.status.dataset;
    this.status.innerHTML = isOpen ? online : offline;
    this.submit.toggleAttribute('disabled', !isOpen);
    
    const template = this.templates[3].cloneNode(true);
    template.firstElementChild.textContent = isOpen ? 'Пользователь появился в сети' : 'Пользователь не в сети';
    this.content.appendChild(template);
  }

  handleMessageReceived({ data: message }) {
    let template;
    if (message === '...') {
      template = this.templates[0].cloneNode(true);
      this.content.appendChild(template);
      
      return;
    }
    
    template = this.templates[1].cloneNode(true);
    template.querySelector('.message-text').textContent = message;
    template.querySelector('.timestamp').innerHTML = `${new Date().getHours()}:${new Date().getMinutes()}`;
    this.content.appendChild(template);
  }

  handleSubmit(event) {
    event.preventDefault();
    
    const { target } = event;
    const input = target.querySelector('input');
    const message = input.value;
    input.value = '';
    
    const template = this.templates[2].cloneNode(true);
    template.querySelector('.message-text').textContent = message;
    template.querySelector('.timestamp').innerHTML = `${new Date().getHours()}:${new Date().getMinutes()}`;
    this.content.appendChild(template);
    
    this.connection.send(message);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Chat(document.querySelector('.chat'));
});

