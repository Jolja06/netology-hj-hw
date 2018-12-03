class Pooling {
	constructor(container, url = 'https://neto-api.herokuapp.com/comet/pooling') {
		if (!(container instanceof Element)) return;

		this.cells = Array.prototype.slice.call(container.querySelectorAll('div'));
		this.url = url;
			this.xhr = new XMLHttpRequest();

		this.xhr.addEventListener('load', this.handleLoad.bind(this));

		this.init();
	}

	init() {
		setInterval(this.fetch.bind(this), 5000);
	}

	fetch() {
		this.xhr.open('GET', 'https://neto-api.herokuapp.com/comet/pooling', true);
		this.xhr.send();
	}

	handleLoad() {
		const result = this.xhr.responseText;
		if (this.xhr.status === 200) {
			this.setCard(result - 1);
		} else {
			console.error(result);
		}
	}

	setCard(index) {
		this.cells.forEach((cell, cellIndex) => cell.classList.toggle('flip-it', cellIndex === index));
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const container = document.querySelector('main');
	new Pooling(container.querySelector('.pooling'));
});