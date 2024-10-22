const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = 3000;

const app = express();

app.use(express.static(path.join(__dirname, 'static')));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/o-nas', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'o-nas.html'));
});

app.get('/oferta', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'oferta.html'));
});

app.get('/kontakt', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'kontakt.html'));
});

app.post('/kontakt', (req, res) => {
    const { name, surname, email, message } = req.body;
    console.log(`[${name} ${surname}, ${email}, ${message}]`);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Adres strony: http://127.0.0.1:${port}`)
})