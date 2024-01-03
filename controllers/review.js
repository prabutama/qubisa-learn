const Course = require('../models/course');

module.exports.store = async (req, res, next) => { 
    const { reviews } = req.body;
    const course = await Course.findById(req.params.id);
    course.reviews.push({
        author: req.user.username,
        rating: reviews.rating,
        body: reviews.body
    });
    await course.save();
    req.flash('success_msg', 'Reviews Added successfully');
    res.redirect(`/course/${req.params.id}`);
}; 

module.exports.destroy = async (req, res, next) => {
    if (req.user.username !== 'admin') {
        req.flash('error_msg', 'You are not Administrator');
        res.redirect('/course');
    } else {
        const { course_id, reviews_id } = req.params;
        const course = await Course.findByIdAndUpdate(course_id, { $pull: { reviews:{ _id: reviews_id} } });
        await course.save();
        req.flash('success_msg', 'Reviews Deleted successfully');
        res.redirect(`/course/${course_id}`);
    }
};