'use strict';

class Gallery {
    constructor(container, images) {
        if (!(container instanceof Element) || !Array.isArray(images)) {
            return;
        }

        this.images = images;
        this.index = -1;

        this.image = container.querySelector('#currentPhoto');
        this.nextButton = container.querySelector('#nextPhoto');
        this.prevButton = container.querySelector('#prevPhoto');

        this.nextButton.addEventListener('click', this.goForward.bind(this));
        this.prevButton.addEventListener('click', this.goBack.bind(this));
    }

    goBack() {
        this.index = this.index <= 0 ? this.images.length - 1 : this.index - 1;
        this.render();
    }

    goForward() {
        this.index = (this.index + 1) % this.images.length;
        this.render();
    }

    render() {
        this.image.src = 'i/' + this.images[this.index];
    }
}

window.onload = () => {
  new Gallery(
    document.querySelector('.article-gallery'),
    [
      'breuer-building.jpg',
      'guggenheim-museum.jpg',
      'headquarters.jpg',
      'IAC.jpg',
      'new-museum.jpg',
    ],
  );
};