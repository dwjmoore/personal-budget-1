const express = require('express');

const app = express();

const envelopes = [
	{
		id: 1,
		title: 'Rent',
		budget: 1500
	},
	{
		id: 2,
		title: 'Groceries',
		budget: 700
	},
	{
		id: 3,
		title: 'Car',
		budget: 300
	}
];

let newID = 4;

app.get('/', (req, res) => {
	res.send('Welcome to the budgeting API.');
});

app.get('/envelopes', (req, res) => {
	res.json(envelopes);
});

app.listen(3000, () => console.log('server started'));