const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const methodOverride = require("method-override");
const ErrorHandler = require('./utils/ErrorHandler');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');

// Models
const Course = require('./models/course');
const User = require('./models/user');

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'secret cak',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: new Date() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    next();
})

// connect to mongodb
mongoose.connect("mongodb://127.0.0.1/qubisa_db")
.then((result) => {
    console.log("Connected to qubisa_db");
})
.catch((err) => {
    console.error(err);
}); 


app.get("/", (req, res) => {
    res.render("home");
});

// Router
app.use('/course', require('./routes/course'));   
app.use('/auth', require('./routes/auth'));


app.all('*', (req, res, next) => {
    next(new ErrorHandler('Page Not Found', 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if(!err.message) err.message = 'Oh no, Something went wrong';
    res.status(statusCode).render('error', { err } );
})

app.listen(8000, () => {
    console.log('Server running on http://localhost:8000');
});