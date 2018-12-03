'use strict';

class Paint {
	constructor() {
		this.socket = new WebSocket('wss://neto-api.herokuapp.com/draw');

		this.handleConnect = this.handleConnect.bind(this);
		this.handlePaint = this.handlePaint.bind(this);
		this.send = this.send.bind(this);

		this.socket.addEventListener('open', this.handleConnect);
		this.socket.addEventListener('close', this.handleConnect);
		this.socket.addEventListener('error', console.error);
		window.addEventListener('beforeunload', this.handleClose.bind(this));
	}

	handleClose() {
		this.socket.close(1000);
	}

	handleConnect({ type }) {
		if (type === 'open') {
			window.editor.addEventListener('update', this.handlePaint)
		} else {
			window.editor.removeEventListener('update', this.handlePaint);
		}
	}

	handlePaint({ canvas }) {
		canvas.toBlob(this.send);
	}

	send(data) {
		this.socket.send(data)
	}
}

document.addEventListener('DOMContentLoaded', new Paint);
