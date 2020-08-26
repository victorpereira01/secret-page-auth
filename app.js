const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const localStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const bodyParser = require('body-parser');

const User = require('./models/user');

mongoose.connect('mongodb://localhost:27017/auth-demo', {
    useNewUrlParser:true,
    useUnifiedTopology: true
});

const app = express();

app.set('view engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session());
app.use(require('express-session')({
    secret: 'Kyra is the best and cutest dog',
    resave: false,
    saveUninitialized: false
}));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/secret', (req, res) => {
    res.render('secret');
})

app.listen(3001);