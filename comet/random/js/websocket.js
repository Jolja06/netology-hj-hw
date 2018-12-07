class Socket {
	constructor(container) {
		if (!(container instanceof Element)) return;

		this.cells = Array.prototype.slice.call(container.querySelectorAll('div'));
		this.socket = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');

		this.socket.addEventListener('message', this.setCard.bind(this));
		this.socket.addEventListener('error', console.error);
		window.addEventListener('beforeunload', this.handleClose.bind(this));
	}

	setCard({ data }) {
		const index = data - 1;
		this.cells.forEach((cell, cellIndex) => cell.classList.toggle('flip-it', cellIndex === index));
	}

	handleClose() {
		this.socket.close(1000);
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const container = document.querySelector('main');
	new Socket(container.querySelector('.websocket'));
});