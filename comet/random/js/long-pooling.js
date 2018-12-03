class LongPooling extends Pooling {
	constructor(container, url) {
		super(container, 'https://neto-api.herokuapp.com/comet/long-pooling');
	}

	init() {
		this.fetch();
	}

	handleLoad() {
		super.handleLoad();

		this.fetch();
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const container = document.querySelector('main');
	new LongPooling(container.querySelector('.long-pooling'));
});