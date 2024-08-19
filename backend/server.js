const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

let cards = [];

app.post('/create-card', (req, res) => {
    const { cno, name, deposit } = req.body;
    cards.push({ cno, name, deposit });
    res.sendStatus(200);
});

app.post('/deposit', (req, res) => {
    const { cno, amount } = req.body;
    const card = cards.find(c => c.cno === cno);
    if (card) {
        card.deposit += amount;
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

app.post('/withdraw', (req, res) => {
    const { cno, amount } = req.body;
    const card = cards.find(c => c.cno === cno);
    if (card) {
        if (amount <= card.deposit) {
            card.deposit -= amount;
            res.sendStatus(200);
        } else {
            res.sendStatus(400);
        }
    } else {
        res.sendStatus(404);
    }
});

app.post('/balance', (req, res) => {
    const { cno } = req.body;
    const card = cards.find(c => c.cno === cno);
    if (card) {
        res.json(card);
    } else {
        res.sendStatus(404);
    }
});

app.get('/all-cards', (req, res) => {
    res.json(cards);
});

app.post('/close-card', (req, res) => {
    const { cno } = req.body;
    cards = cards.filter(c => c.cno !== cno);
    res.sendStatus(200);
});

app.post('/modify-card', (req, res) => {
    const { cno, name, deposit } = req.body;
    const card = cards.find(c => c.cno === cno);
    if (card) {
        card.name = name;
        card.deposit = deposit;
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});