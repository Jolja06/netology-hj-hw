'use strict';

class Recipe {
  constructor(container) {
    if (!(container instanceof Element)) {
      return;
    }

    this.callbackName = 'Recipe' + Number(new Date());
    this.fetchCounter = 0;
    this.url = 'https://neto-api.herokuapp.com/food/42';

    this.title = container.querySelector('[data-title]');
    this.ingredients = container.querySelector('[data-ingredients]');
    this.pic = container.querySelector('[data-pic]');

    this.rating = container.querySelector('[data-rating]');
    this.votes = container.querySelector('[data-votes]');
    this.consumers = container.querySelector('[data-consumers]');
    this.stars = container.querySelector('[data-star]');

    this.init();
  }

  init() {
    const url = this.loadData(this.url);
    const rating = this.loadData(this.url + '/rating');
    const consumers = this.loadData(this.url + '/consumers');

    Promise.all([url, rating, consumers])
      .then(this.render.bind(this));
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

  renderConsumer(user) {
    const consumer = document.createElement('img');
    consumer.src = user.pic;
    consumer.title = user.title;
    this.consumers.appendChild(consumer);
  }

  render(data) {
    const [ recipe, rating, consumers ] = data;
    
    this.title.innerHTML = recipe.title;
    this.pic.style.backgroundImage = `url(${recipe.pic})`;
    this.ingredients.innerHTML = recipe.ingredients;

    this.rating.innerHTML = Number(rating.rating).toFixed(2);
    this.votes.innerHTML = `(${rating.votes} оценок)`;
    this.stars.style.width = `${rating.rating * 100 / 10}%`;

    Array.from(consumers.consumers).forEach(consumer => this.renderConsumer(consumer));

    const rounding = consumers.total - (consumers.total % 10);
    const total = document.createElement('span');
    total.innerHTML = `(+${rounding})`;
    this.consumers.appendChild(total);
  }

}

document.addEventListener('DOMContentLoaded', () => {
  new Recipe(document.querySelector('.food'));
});