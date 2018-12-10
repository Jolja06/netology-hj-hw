'use strict';

const isURL = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
class Plane {
	constructor(container, url) {
		if (!(container instanceof Element) || !isURL.test(url)) return;
    
    this.url = url;
    
    const controls = container.querySelector('.header-bar');
    this.plane = controls.querySelector('#acSelect');
    this.buttonShow = controls.querySelector('#btnSeatMap');
    this.buttonFill = controls.querySelector('#btnSetFull');
    this.buttonClear = controls.querySelector('#btnSetEmpty');
    
    this.view = container.querySelector('.main-view');
    this.title = this.view.querySelector('#seatMapTitle');
		this.scheme = this.view.querySelector('#seatMapDiv');
    
		const footer = container.querySelector('.total-bar');
		this.total = footer.querySelector('#totalPax');
		this.adults = footer.querySelector('#totalAdult');
		this.child = footer.querySelector('#totalHalf');

		this.init();
	}

	init() {
		this.buttonFill.disabled = true;
		this.buttonClear.disabled = true;
    
    this.toggleSeats = this.toggleSeats.bind(this);
    this.buttonShow.addEventListener('click', this.fetchData.bind(this));
    this.buttonFill.addEventListener('click', this.toggleSeats);
    this.buttonClear.addEventListener('click', this.toggleSeats);
    
    this.scheme.addEventListener('click', this.setBusy.bind(this));
	}

	fetchData(event) {
		event.preventDefault();
    
    const id = this.plane.value;
		fetch(this.url + id)
			.then(response => {
				if (response.status >= 200 && response.status < 300) return response;
				throw new Error(response.statusText);
			})
			.then(result => result.json())
			.then(data => { 
				this.renderTitle(data);
        this.renderScheme(data);
        this.buttonFill.disabled = false;
        this.buttonClear.disabled = false;
			})
      .catch(console.error);
	}
  
	createElem(tag, attrs, children) {
		const el = document.createElement(tag);
		if (typeof attrs === 'object' && attrs !== null) {
			Object.keys(attrs).forEach(attr => el.setAttribute(attr, attrs[attr]));
		}

		if (typeof children === 'string') {
			el.textContent = children;
		} else if (children instanceof Array) {
			children.forEach(child => el.appendChild(child));
		}

		return el;
	}

	renderTitle(plane) {
		this.title.innerText = `${plane.title} (${plane.passengers} пассажиров)`;
	}

	renderScheme(data) {
		this.buttonClear.disabled = false;
		this.buttonFill.disabled = false;

		Array.from(this.scheme.children).forEach(child => child.parentNode.removeChild(child));
		data.scheme.forEach((item, index) => {
			const letters = item === 4 ? [].concat('', data.letters4, '') : ((item === 6) ? data.letters6 : []);
			const row = this.createElem('div', {class: 'row seating-row text-center'}, [
				this.createElem('div', {class: 'col-xs-1 row-number'}, [
					this.createElem('h2', {class: ''}, `${index + 1}`)
				])
			]);

			const sideLeft = this.createElem('div', {class: 'col-xs-5'});
			const sideRight = this.createElem('div', {class: 'col-xs-5'});

			letters.forEach((letter, index) => {
				index <= 2 ? sideLeft.appendChild((this.renderSeat(letter))) : sideRight.appendChild(this.renderSeat(letter));
			});

			row.appendChild(sideLeft);
			row.appendChild(sideRight);

			this.scheme.appendChild(row);
		});

		this.renderFooter();
	}

	renderSeat(data) {
		if (data !== '') {
			const seat = this.createElem('div', {class: 'col-xs-4 seat'}, [
				this.createElem('span', {class: 'seat-label'}, data)
			]);

			return seat;
		}

		return this.createElem('div', {class: 'col-xs-4 no-seat'});
	}

	setBusy(event) {
		const target = event.target.closest('div');

		if (target.classList.contains('seat')) {
			if (event.altKey) {
				target.classList.remove('adult');
				target.classList.toggle('half');
			} else {
				target.classList.remove('half');
				target.classList.toggle('adult')
			}
		}

		const block = event.target.closest('#seatMapDiv');
		const seats = block.querySelectorAll('.seat');

		const adults = (Array.from(seats).filter(seat => seat.classList.contains('adult'))).length;
		const children = (Array.from(seats).filter(seat => seat.classList.contains('half'))).length;

		this.renderFooter(adults, children);
	}

	renderFooter(adult = 0, child = 0) {
		this.total.textContent = adult + child;
		this.adults.textContent = adult;
		this.child.textContent = child;
	}

	toggleSeats(event) {
		event.preventDefault();
		const seats = Array.from(this.view.querySelectorAll('.seat'));
    
    const { id } = event.target;
    const isFill = id === 'btnSetFull';
    seats.forEach(({classList}) => {
      classList.toggle('adult', isFill);
      if (!isFill) {
        classList.remove('half');
      }
    })
	}
}

document.addEventListener('DOMContentLoaded', () => {
	new Plane(
		document.body,
		'https://neto-api.herokuapp.com/plane/',
	);
});
