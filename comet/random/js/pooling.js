'use strict';

class Pooling {
	constructor(container) {
		if (!(container instanceof Element)) return;

		this.container = container;
		this.cells = this.container.querySelectorAll('div');

		this.xhr = new XMLHttpRequest();
		this.xhr.addEventListener('load', this.handleLoad.bind(this));

		setInterval(this.fetchData.bind(this), 5000);

	}


	fetchData() {
		this.xhr.open('GET', 'https://neto-api.herokuapp.com/comet/pooling', true);
		this.xhr.send();
	}

	handleLoad() {
		if (this.xhr.status === 200) {
			this.setCard(this.xhr.responseText);
		} else {
			console.error(this.xhr.responseText);
		}
	}

	setCard(number) {
		Array.from(this.cells).forEach(cell => cell.classList.remove('flip-it'));
		this.cells[number - 1].classList.add('flip-it');
	}
}

document.addEventListener('DOMContentLoaded', () => {
	new Pooling(document.querySelector('.pooling'))
});