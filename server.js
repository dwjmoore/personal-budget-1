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

app.get('/envelopes/:id', (req, res) => {
	const id = Number(req.params.id);
	const envelope = envelopes.find((envelope) => {
		return envelope.id === id;
	});
	if (envelope) {
		res.json(envelope);
	} else {
		res.status(404).send(`Could not find an envelope with id ${id}.`);
	}
});

app.post('/envelopes', (req, res) => {
	let { title, budget } = req.body;
	let firstLetter = title.charAt(0);
	const remainingLetters = title.slice(1);
	firstLetter = firstLetter.toUpperCase();
	title = firstLetter + remainingLetters;
	const index = envelopes.findIndex((envelope) => {
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

app.put('/envelopes', (req, res) => {
	const { id, amountChanged } = req.body;
	const envelope = envelopes.find((envelope) => {
		return envelope.id === id;
	});
	if (!amountChanged) {
		res.status(400).send(`Invalid amount entered.`);
		return;
	}
	if (envelope) {
		envelope.budget += amountChanged;
		res.send(`The budget changed by ${amountChanged}. The new budget for ${envelope.title} is ${envelope.budget}.`);
		return;
	}
	res.status(404).send(`Could not find an envelope with id ${id}.`);
})

app.listen(3000, () => console.log('server started'));