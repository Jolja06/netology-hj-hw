'use strict';

class Socket {
	constructor(container) {
		if (!(container instanceof Element)) return;

		this.container = container;
		this.cells = this.container.querySelectorAll('div');
		this.socket = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');

		this.socket.addEventListener('message', this.setCard.bind(this));
		this.socket.addEventListener('error', this.onError.bind(this));
		window.addEventListener('beforeunload', this.handleClose.bind(this));

	}

	setCard(event) {
		const number = event.data;

		Array.from(this.cells).forEach(cell => cell.classList.remove('flip-it'));
		this.cells[number - 1].classList.add('flip-it');
	}

	onError(event) {
		console.error(event.data);
	}

	handleClose() {
		this.socket.close(1000);
	}
}

document.addEventListener('DOMContentLoaded', () => {
	new Socket(document.querySelector('.websocket'));
});
