'use strict';

function createElement(node) {
	if (!['object', 'string'].includes(typeof node)) {
	    return null;
	}
	
	if (typeof node === 'string') {
		return document.createTextNode(node);
	}

	const { name, props, childs } =  node;
	const elem = document.createElement(name);
	
	if (typeof props === 'object' && props !== null) {
		Object.keys(props).forEach(attr => elem.setAttribute(attr, props[attr]));
	}

	if (Array.isArray(childs)) {
		childs.forEach(child => {
			const childElem = createElement(child);
			if (childElem) {
				elem.appendChild(childElem);
			}
		});
	}

	return elem;
}