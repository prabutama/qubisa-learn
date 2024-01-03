module.exports = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.flash('error_msg', 'You must be Signed in');
        return res.redirect('/auth');
    }
    next();
}
