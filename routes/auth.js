const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const User = require('../models/user');
const passport = require('passport');



router.get('/', (req, res) => {
    res.render('auth/auth');
});

router.post('/signup', wrapAsync(async (req, res) => {  
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser =  await User.register(user, password);
        req.login(registeredUser, (err) => {
            req.flash('success_msg', 'Your account has been registered and Signed');
            res.redirect('/course',);
        })
    } catch (err) {
        req.flash('error_msg', err.message);
        res.redirect('/auth');
    }
}));

router.post('/signin', passport.authenticate('local', {
    failureRedirect: '/auth',
    failureFlash: { 
        type: 'error_msg',
        msg: 'Invalid username or password'
    }
}), (req, res) => {
    req.flash('success_msg', 'You are now signed in');
    res.redirect('/course');
});

router.post('/logout', (req, res) => {
    req.logout(function(err) {
        if(err) {return next(err);}
        req.flash('success_msg', 'You are now signed out');
        res.redirect('/auth');
    })
})

module.exports = router;