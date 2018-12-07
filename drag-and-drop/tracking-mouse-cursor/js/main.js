'use strict';

class Eye {
  constructor(eye) {
    if (!(eye instanceof Element)) return;

    this.eye = eye;

    this.move = this.throttle(this.move.bind(this));

    document.addEventListener('mousemove', this.move);

  }

  move(event) {
    const {left, top, width, height} = this.eye.getBoundingClientRect();

    const x = left + (width / 2);
    const y = top + (height / 2);
    const rad = Math.atan2(event.pageY - y, event.pageX - x);
    const rotation = rad * (180 / Math.PI) - 45;

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
