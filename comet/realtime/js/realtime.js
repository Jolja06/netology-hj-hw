'use strict';

const ctx = document.getElementById('chart').getContext('2d');
const realtime = new Chart(ctx).Bar({
	labels: [],
	datasets: [{
		fillColor: 'rgba(0,60,100,1)',
		strokeColor: 'black',
		data: []
	}]
}, {
	responsive: true,
	barValueSpacing: 2
});

let addedRecordsCount = 0;
const addRecord = ({ online, time }) => {
	realtime.addData([online], time);
	addedRecordsCount++;
	if (addedRecordsCount > 10) {
		realtime.removeData();
		addedRecordsCount--;
	}
};

const ws = new WebSocket('wss://neto-api.herokuapp.com/realtime');
ws.addEventListener('message', event => {
	const data = JSON.parse(event.data);
	const records = Array.isArray(data) ? data : [data];

	records.forEach(addRecord);
});

