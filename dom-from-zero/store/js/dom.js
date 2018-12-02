'use strict';

function createElement(node) {
	const { name, props, childs } =  node;

	if (typeof node === 'string') {
		return document.createTextNode(node);
	}

	const elem = document.createElement(name);
	
	if (typeof props === 'object' && props !== null) {
		Object.keys(props).forEach(attr => elem.setAttribute(attr, props[attr]));
	}

	if (childs instanceof Array) {
		childs.forEach(child => {
			const childElem = createElement(child);
			elem.appendChild(childElem);
		});
	}

	return elem;
}