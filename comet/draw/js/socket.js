'use strict';

class Paint {
	constructor() {

		this.socket = new WebSocket('wss://neto-api.herokuapp.com/draw');

		this.socket.addEventListener('open', this.connection.bind(this));
		this.socket.addEventListener('close', this.connection.bind(this));
		this.socket.addEventListener('error', this.printError.bind(this));

		window.addEventListener('beforeunload', this.handleClose.bind(this));
	}

	connection(event) {
		event.type === 'open'
			? window.editor.addEventListener('update', this.sendDraw.bind(this))
			: window.editor.removeEventListener('update', this.sendDraw.bind(this));
	}

	handleClose() {
		this.socket.close(1000);
	}

	printError(event) {
		console.error(event.data);
	}

	sendDraw(event) {
		event.canvas.toBlob(blob => this.socket.send(blob));
	}

}

document.addEventListener('DOMContentLoaded', new Paint);
