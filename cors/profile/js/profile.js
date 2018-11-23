'use strict';

class Profile {
  constructor(container) {
    if (!(container instanceof Element)) {
      return;
    }

    this.container = container;
    this.url = 'https://neto-api.herokuapp.com/profile/me';
    this.callbackName = 'Profile' + Number(new Date());
    this.fetchCounter = 0;

    this.description = container.querySelector('[data-description]');
    this.name = container.querySelector('[data-name]');
    this.pic = container.querySelector('[data-pic]');
    this.position = container.querySelector('[data-position]');
    this.technologies = container.querySelector('[data-technologies]');

    this.user = {};
    this.technologiesList = [];

    this.init();

  }

  init() {
    this.loadData(this.url)
      .then(this.handleUserInfo.bind(this));
  }

  handleUserInfo(data) {
    this.user = data;
    const userTechnologies = `https://neto-api.herokuapp.com/profile/${this.user.id}/technologies`;

    this.loadData(userTechnologies)
      .then(this.handleUserTechnology.bind(this));

  }
  
  handleUserTechnology(technologies) {
    this.technologiesList = technologies;
    this.render();
  }

  loadData(url) {
    return new Promise((done, fail) => {
      this.fetchCounter++;
      const callbackName = this.callbackName + this.fetchCounter;
      window[callbackName] = done;

      const script = document.createElement('script');
      script.src = url + `?callback=${callbackName}`;
      document.getElementsByTagName('head')[0].appendChild(script);
    });
  }
  renderTechnologyCard(technology) {
    const dev = document.createElement('span');
    dev.className = 'devicons';
    dev.classList.add(`devicons-${technology}`);

    this.technologies.appendChild(dev);
  }
  
  render() {
    const { pic, name, position, description } = this.user;
    this.pic.src = pic;
    this.name.innerHTML = name;
    this.position.innerHTML = position;
    this.description.innerHTML = description;
    this.technologiesList.forEach(technology => this.renderTechnologyCard(technology))

    this.container.style.display = 'initial';
  }

}

document.addEventListener('DOMContentLoaded', () => {
  new Profile(document.querySelector('.content'));
});