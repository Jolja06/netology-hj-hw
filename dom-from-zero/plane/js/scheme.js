'use strict';

const isURL = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
class Plane {
	constructor(controls, view, footer, url) {
		if (!(controls instanceof Element) || !(view instanceof Element) || !(footer instanceof Element) || !(isURL.test(url))) return;

		this.controls = controls;
		this.view = view;
		this.footer = footer;
		this.url = url;
		this.plane = this.controls.querySelector('#acSelect');
		this.seatMap = this.controls.querySelector('#btnSeatMap');

		this.seatMapTitle = this.view.querySelector('#seatMapTitle');
		this.seatMapScheme = this.view.querySelector('#seatMapDiv');

		this.id = this.plane.value;
		this.plane.addEventListener('change', this.fetchId.bind(this));
		this.seatMap.addEventListener('click', this.fetchData.bind(this));
		this.seatMapScheme.addEventListener('click', this.setBusy.bind(this));

		this.total = this.footer.querySelector('#totalPax');
		this.adults = this.footer.querySelector('#totalAdult');
		this.child = this.footer.querySelector('#totalHalf');

		this.setFull = this.controls.querySelector('#btnSetFull');
		this.setEmpty = this.controls.querySelector('#btnSetEmpty');

		this.setFull.addEventListener('click', this.changeAll.bind(this));
		this.setEmpty.addEventListener('click', this.changeAll.bind(this));


		this.init();

	}

	init() {
		this.setFull.disabled = true;
		this.setEmpty.disabled = true;

	}

	fetchId(event) {
		this.id = event.target.value;
	}

	fetchData(event) {
		event.preventDefault();
		fetch(this.url + this.id)
			.then(response => {
				if (response.status >= 200 && response.status < 300) return response;
				throw new Error(response.statusText);
			})
			.then(result => result.json())
			.then(data => { 
				this.renderTitle(data);
				return data;
			})
			.then(data => this.renderScheme(data))
	}

	renderTitle(plane) {
		this.seatMapTitle.innerText = `${plane.title} (${plane.passengers} пассажиров)`;
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

	renderScheme(data) {
		this.setEmpty.disabled = false;
		this.setFull.disabled = false;

		Array.from(this.seatMapScheme.children).forEach(child => child.parentNode.removeChild(child));
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

			this.seatMapScheme.appendChild(row);
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

	changeAll(event) {
		event.preventDefault();
		const seats = this.view.querySelectorAll('.seat');

		event.target.id === 'btnSetFull' ? Array.from(seats).forEach(seat => seat.classList.add('adult')) : Array.from(seats).forEach(seat => seat.classList.remove('half', 'adult'));
	}

}

document.addEventListener('DOMContentLoaded', () => {
	new Plane(
		document.querySelector('.header-bar'),
		document.querySelector('.main-view'),
		document.querySelector('.total-bar'),
		'https://neto-api.herokuapp.com/plane/',
	)
});