const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const localStrategy = require('passport-local');
const bodyParser = require('body-parser');

const User = require('./models/user');

mongoose.connect('mongodb://localhost:27017/auth-demo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express();

app.set('view engine', 'ejs');

app.use(require('express-session')({
    secret: 'Kyra is the best and cutest dog',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({
    extended: true
}))

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// =========
// -> ROUTES 
// =========

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/secret', isLoggedIn, (req, res) => {
    res.render('secret');
})

//Auth Routes 

//show sign up form
app.get('/register', (req, res) => {
    res.render('register');
})

//handling user sign up
app.post('/register', (req, res) => {
    User.register(new User({
        username: req.body.username
    }), req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.render('register');
        } else {
            passport.authenticate('local')(req, res, () => {
                res.redirect('/secret');
            })
        }
    })
})

// Login Routes

//render login form 
app.get('/login', (req, res) => {
    res.render('login');
})

//login logic
app.post('/login', passport.authenticate('local', {
    successRedirect: '/secret',
    failureRedirect: '/login'
}), (req, res) => {

})

//logout logic
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

//middleware
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } 
    res.redirect('/login');
}

app.listen(3001);