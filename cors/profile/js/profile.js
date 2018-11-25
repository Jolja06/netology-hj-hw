'use strict';

class Profile {
  constructor(container) {
    if (!(container instanceof Element)) {
      return;
    }

    /* Data. */
    this.user = {};
    this.userTechnologies = [];

    /* Utils. */
    this.baseUrl = 'https://neto-api.herokuapp.com/profile';
    this.callbackName = 'Profile' + Number(new Date());
    this.fetchCounter = 0;

    /* Elements. */
    this.container = container;
    this.description = container.querySelector('[data-description]');
    this.name = container.querySelector('[data-name]');
    this.pic = container.querySelector('[data-pic]');
    this.position = container.querySelector('[data-position]');
    this.technologies = container.querySelector('[data-technologies]');

    this.init();
  }

  init() {
    this.loadUser()
      .then(this.handleLoadUser.bind(this))
      .then(this.loadTechnologies.bind(this))
      .then(this.handleUserTechnologies.bind(this))
      .then(this.render.bind(this));
  }

  fetch(url) {
    return new Promise((done, fail) => {
      this.fetchCounter++;
      const callbackName = this.callbackName + this.fetchCounter;
      window[callbackName] = done;

      const script = document.createElement('script');
      script.src = url + `?callback=${callbackName}`;
      document.getElementsByTagName('head')[0].appendChild(script);
    });
  }

  loadUser() {
    return this.fetch(`${this.baseUrl}/me`);
  }

  loadTechnologies() {
    return this.fetch(`${this.baseUrl}/${this.user.id}/technologies`);
  }

  handleLoadUser(user) {
    this.user = user;
  }

  handleUserTechnologies(technologies) {
    this.userTechnologies = technologies;
  }

  render() {
    const { pic, name, position, description } = this.user;
    this.pic.src = pic;
    this.name.innerHTML = name;
    this.position.innerHTML = position;
    this.description.innerHTML = description;
    this.userTechnologies.forEach(technology => this.renderTechnology(technology));

    this.container.style.display = 'initial';
  }

  renderTechnology(technology) {
    const dev = document.createElement('span');
    dev.className = 'devicons';
    dev.classList.add(`devicons-${technology}`);

    this.technologies.appendChild(dev);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Profile(document.querySelector('.content'));
});
