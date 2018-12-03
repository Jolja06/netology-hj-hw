'use strict';

class TrashBin {
	constructor() {
		this.movedIcon = null;

		this.shiftX = 0;
		this.shiftY = 0;

		document.addEventListener('mousedown', this.dragStart.bind(this));
		document.addEventListener('mousemove', this.drag.bind(this));
		document.addEventListener('mouseup', this.dragStop.bind(this));
	}

	dragStart(event) {
		if (event.target.classList.contains('logo')) {
			this.movedIcon = event.target;
			this.shiftX = this.movedIcon.offsetWidth / 2;
			this.shiftY = this.movedIcon.offsetHeight / 2;
		}
	}

	drag(event) {
		if (this.movedIcon) {
			event.preventDefault();
			this.movedIcon.style.left = `${event.pageX - this.shiftX}px`;
			this.movedIcon.style.top = `${event.pageY - this.shiftY}px`;
			this.movedIcon.classList.add('moving');
		}
	}

	dragStop(event) {
		if (this.movedIcon) {
			const check = document.elementFromPoint(event.clientX, event.clientY).closest('#trash_bin');

			if (check) {
				this.movedIcon.style.display = 'none';
			}

			this.movedIcon.classList.remove('moving');
			this.movedIcon = null;
		}
	}
}

document.addEventListener('DOMContendLoaded', new TrashBin);