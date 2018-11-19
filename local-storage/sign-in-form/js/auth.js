'use strict';

const isURL = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
class Auth {
  constructor(form, url, action) {
    if (!(form instanceof Element) || !(isURL.test(url)) || typeof action !== 'string') {
      return;
    }

    this.action = action;
    this.url = url;

    this.form = form;
    this.output = this.form.querySelector('output');

    this.form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  handleSubmit(event) {
    event.preventDefault();

    fetch(
      this.url,
      {
        body: JSON.stringify(this.getData()),
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      }
    )
      .then((response) => {
        if (response.status < 200 && response.status >= 400) {
          throw new Error(response.statusText);
        }
      return response.json();
    })
      .then((data) => {
        if (data.error) {
          throw new Error(data.message);
        }
        this.output.innerHTML = `Пользователь ${data.name} успешно ${this.action}`
    })
      .catch((err) => {
        this.output.innerText = err.message;
      });
  }

  getData() {
    const data = {};
    for (const [input, value] of new FormData(this.form)) {
      data[input] = value;
    }
    return data;
  }
}

const dictionary = {
  signin: 'авторизован',
  signup: 'зарегистрирован',
};

document.addEventListener('DOMContentLoaded', () => {
  new Auth(
    document.querySelector('.sign-in-htm'),
    'https://neto-api.herokuapp.com/signin',
    dictionary.signin,
  );
  new Auth(
    document.querySelector('.sign-up-htm'),
    'https://neto-api.herokuapp.com/signup',
    dictionary.signup,
  );
});