// Create web server
// npm install express
const express = require('express');
const app = express();
const port = 3000;

// npm install body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// npm install mysql
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test'
});

app.get('/comments', (req, res) => {
    connection.query('SELECT * FROM comments', (err, rows) => {
        if (err) throw err;
        res.send(rows);
    });
});

app.post('/comments', (req, res) => {
    connection.query('INSERT INTO comments (name, comment) VALUES (?, ?)', [req.body.name, req.body.comment], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});