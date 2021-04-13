const fetch = require('node-fetch');

const {
	initial,
	actAsUser,
} = require('./db');

function getDate(offset) {
	const d = new Date();
	const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
	return new Date(utc + (3600000*offset));
}

const sendData = (url, data) => fetch(url, {
	method: 'post',
	body:    JSON.stringify(data),
	headers: { 'Content-Type': 'application/json' },
}).then(res => res.json());

module.exports = {
	getDate,
	sendData,
	initial,
	actAsUser,
}
