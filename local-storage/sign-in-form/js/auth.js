'use strict';

const isURL = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
class Auth {
  constructor(form, url, action) {
    if (!(form instanceof Element) || !(isURL.test(url)) || typeof action !== 'string') {
      return;
    }

    this.form = form;
    this.url = url;
    this.action = action;
    this.button = this.form.querySelector('.button');
    this.data = {};
    this.output = this.form.querySelector('output');

    this.init();

  }

  init() {
    this.button.addEventListener('click', this.handleSubmit.bind(this));
  }

  handleSubmit(event) {
    event.preventDefault();
    this.fetchData();
    fetch(this.url, {
      body: JSON.stringify(this.data),
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((response) => {
      if (response.status >= 200 && response.status < 400) {
        return response;
      }
      throw new Error(response.statusText);
    }).then((response) => response.json()
    ).then((data) => {
      if (!data.error) {
        return this.output.innerHTML = `Пользователь ${data.name} успешно ${this.action}`
      }
      throw data.message;
    }).catch((err) => {
      this.output.innerText = err;
    });
  }

  fetchData() {
    const getData = new FormData(this.form);
    for (const [input, value] of getData) {
      this.data[input] = value;
    }
  }
}

const dictionary = {
  signin: 'авторизован',
  signup: 'зарегистрирован',
};

const signin = new Auth(
  document.querySelector('.sign-in-htm'),
  'https://neto-api.herokuapp.com/signin',
  dictionary.signin,
);

const signup = new Auth(
  document.querySelector('.sign-up-htm'),
  'https://neto-api.herokuapp.com/signup',
  dictionary.signup,
);

document.addEventListener('DOMContentLoaded', () => {
  signin;
  signup;

});