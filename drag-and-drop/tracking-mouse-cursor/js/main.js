'use strict';

class Eyes {
	constructor() {
		this.cat = document.querySelector('.cat');
		this.rightEye = this.cat.querySelector('.cat_eye_right');
		this.leftEye = this.cat.querySelector('.cat_eye_left');

		this.cat.addEventListener('mousemove', this.throttle(this.moution.bind(this)));
	}

	moution(e) {
	}

	throttle(callback) {
		let isWaiting = false;
		return function () {
			if (!isWaiting) {
				callback.apply(this, arguments);
				isWaiting = true;
				requestAnimationFrame(() => {
					isWaiting = false;
				});
			}
		}
	}
}

document.addEventListener('DOMContentLoaded', new Eyes);