'use strict';

class Widget {
	constructor(container) {
		this.url = 'https://neto-api.herokuapp.com/twitter/jsonp';

		this.description = container.querySelector('[data-description]');
		this.followers = container.querySelector('[data-followers]');
		this.following = container.querySelector('[data-following]');
		this.pic = container.querySelector('.avatar');
		this.tweets = container.querySelector('[data-tweets]');
		this.username = container.querySelector('[data-username]');
		this.wallpaper = container.querySelector('[data-wallpaper]');

		this.init();
	}

	init() {
		this.loadData()
			.then(this.render.bind(this));
	}

	loadData() {
		return new Promise((done, fail) => {
			window.callback = done;

			const script = document.createElement('script');
			script.src = this.url;
			document.getElementsByTagName('head')[0].appendChild(script);
		});
	}

	render({ description, followers, following, pic, tweets, username, wallpaper }) {
		this.description.innerHTML = description;
		this.followers.innerHTML = followers;
		this.following.innerHTML = following;
		this.pic.src = pic;
		this.tweets.innerHTML = tweets;
		this.username.innerHTML = username;
		this.wallpaper.src = wallpaper;
	}
}

document.addEventListener('DOMContentLoaded', () => {
	new Widget(document.querySelector('.container'));
});