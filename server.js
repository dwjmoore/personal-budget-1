const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

app.post('/envelopes', (req, res) => {
	let { title, budget } = req.body;
	let firstLetter = title.charAt(0);
	let remainingLetters = title.slice(1);
	firstLetter = firstLetter.toUpperCase();
	title = firstLetter + remainingLetters;
	let index = envelopes.findIndex((envelope) => {
		return envelope.title === title;
	});
	console.log(index);
	if (index === -1) {
		res.status(201).send(`Data Received: { title: "${title}", budget: "${budget}" }`);
		const newEnvelope = { id: newID, title, budget };
		envelopes.push(newEnvelope);
		newID++;
	} else {
		res.status(409).send(`An envelope with the title ${title} already exists.`);
	}
});

app.listen(3000, () => console.log('server started'));