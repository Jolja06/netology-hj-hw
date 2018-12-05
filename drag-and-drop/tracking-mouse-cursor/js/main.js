'use strict';

class Eye {
	constructor(eye) {
		if (!(eye instanceof Element)) return;

		document.addEventListener('mousemove', (event) => this.throttle(this.movement(event)));
		this.eye = eye;
	}

  movement(event) {
			const {left, top, width, height} = this.eye.getBoundingClientRect();
			const x = left + width / 2;
			const y = top + height / 2;
			const rad = Math.atan2(event.pageX - x, event.pageY - y);
			const rotation = (rad * (180 / Math.PI) * -1) + 180;

			this.eye.style.transform = `rotate(${rotation}deg)`;
	}

	throttle(callback) {
		let isWaiting = false;
		return function() {
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

document.addEventListener('DOMContentLoaded', () => {
	new Eye(document.querySelector('.cat_position_for_right_eye'));
	new Eye(document.querySelector('.cat_position_for_left_eye'));
});
