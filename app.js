const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/secret', (req, res) => {
    res.render('secret');
})

app.listen(3001);