function saveInLocalStorage(items) {
	let count = localStorage.getItem('act-coutn');
	for (let j = 0; j < count; j++) {
		localStorage.removeItem('act' + j);
	}

	let local = items;
	localStorage.setItem('act-coutn', local.length);
	for (let j = 0; j < local.length; j++) {
		localStorage.setItem('act' + j, JSON.stringify(local[j]));
	}
}

function readFromLocalStorage() {
	let items = [];
	let count = localStorage.getItem('act-coutn');
	for (let j = 0; j < count; j++) {
		items[j] = JSON.parse(localStorage.getItem('act' + j));
	}
	return items
}

const saveHandler = {
	saveInLocalStorage: saveInLocalStorage,
	readFromLocalStorage: readFromLocalStorage
};

export default saveHandler;