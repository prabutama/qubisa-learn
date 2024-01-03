const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const User = require('../models/user');
const passport = require('passport');
const AuthController = require('../controllers/auth');



router.get('/', AuthController.signupForm);
router.post('/signup', wrapAsync(AuthController.signup));
router.post('/signin', passport.authenticate('local', {
    failureRedirect: '/auth',
    failureFlash: { 
        type: 'error_msg',
        msg: 'Invalid username or password'
    }
}), AuthController.signin);
router.post('/logout', AuthController.logout);

module.exports = router;