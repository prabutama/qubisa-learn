const User = require('../models/user');

module.exports.signupForm = (req, res) => {
    res.render('auth/auth');
};

module.exports.signup = async (req, res) => {  
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
};

module.exports.signin = (req, res) => {
    req.flash('success_msg', 'You are now signed in');
    res.redirect('/course');
};

module.exports.logout = (req, res) => {
    req.logout(function(err) {
        if(err) {return next(err);}
        req.flash('success_msg', 'You are now logged out');
        res.redirect('/auth');
    });
};

