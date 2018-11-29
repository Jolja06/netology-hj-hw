'use strict';

class LongPolling {
	constructor(container) {
		if (!(container instanceof Element)) return;

		this.container = container;
		this.cells = this.container.querySelectorAll('div');
		this.url = 'https://neto-api.herokuapp.com/comet/long-pooling';

		this.xhr = new XMLHttpRequest();
		this.xhr.addEventListener('load', this.handleLoad.bind(this));

		this.fetchData();
	}

	fetchData() {
		this.xhr.open('GET', this.url, true);
		this.xhr.send();
	}

	handleLoad() {
		if (this.xhr.status >= 200 && this.xhr.status < 400) {
			this.setCard(this.xhr.responseText.trim());
		} else {
			console.error(this.xhr.responseText.trim());
		}
		this.fetchData();
	}

	setCard(number) {
		Array.from(this.cells).forEach(cell => cell.classList.remove('flip-it'));
		this.cells[number - 1].classList.add('flip-it');
	}
}

document.addEventListener('DOMContentLoaded', () => {
	new LongPolling(document.querySelector('.long-pooling'))
});