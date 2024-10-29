const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = 3000;
const mysql = require('mysql');

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
    //nowa część
    const sql = 'INSERT INTO messages (name, surname, email, message) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, surname, email, message], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500);
        }

        res.redirect('/');
    });
});

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'messages'
});

db.connect(err => {
    if (err) throw err;
});

app.get('/api/contact-messages', (req, res) => {
    const sql = 'SELECT * FROM messages';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500);
        }
        res.json(results);
    });
});

app.get('/api/contact-messages/:id', (req, res) => {
    const sql = 'SELECT * FROM messages WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Błąd podczas pobierania wiadomości' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'Wiadomość nie znaleziona' });
        }
        res.json(result[0]);
    });
});

app.listen(port, () => {
    console.log(`Adres strony: http://127.0.0.1:${port}`)
})