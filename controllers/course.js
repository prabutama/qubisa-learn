const Course = require('../models/course');

module.exports.index = async (req, res) => {
    let courses = await Course.find();
    if(req.query.search) {
        courses = await Course.find({ $or: [ { title: { $regex: new RegExp(req.query.search, 'i') } }, { category: { $regex: new RegExp(req.query.search, 'i') } } ] });
    }
    const coursesWithReviewCount = courses.map(course => {
        const reviewsCount = course.reviews.length;
        const totalRating = course.reviews.reduce((total, review) => total + review.rating, 0);
        const averageRating = reviewsCount > 0 ? (totalRating / reviewsCount).toFixed(1) : 0;
        return {
            ...course.toObject(),
            reviewsCount: course.reviews.length,
            totalRating: totalRating,
            averageRating: averageRating
        };
    });
    res.render('course/index', { courses : coursesWithReviewCount });
};

module.exports.create = async (req, res) => {
    if (req.user.username !== 'admin') {
        req.flash('error_msg', 'You are not Administrator');
        res.redirect('/course');
    }
    res.render('course/create');
};

module.exports.store = async (req, res, next) => {
    const course = await new Course(req.body.course);
    await course.save();
    req.flash('success_msg', 'Course Added successfully');
    res.redirect('/course');
};

module.exports.show = async (req, res) => {
    const course = await Course.findById(req.params.id); 
    const videos = course.video;
    const videoCount = videos.length;
    const reviews = course.reviews;
    const reviewsLength = reviews.length;
    const totalRating = course.reviews.reduce((total, review) => total + review.rating, 0);
    const averageRating = reviewsLength > 0 ? (totalRating / reviewsLength).toFixed(1) : 0;
    res.render('course/show', { course, videos, reviews, reviewsLength, averageRating, videoCount });
};

module.exports.edit = async (req, res) => {
    if (req.user.username !== 'admin') {
        req.flash('error_msg', 'You are not Administrator');
        res.redirect('/course');
    }
    const course = await Course.findById(req.params.id); 
    res.render('course/edit', { course });
};

module.exports.update = async (req, res) => {
    if (req.user.username !== 'admin') {
        req.flash('error_msg', 'You are not Administrator');
        res.redirect('/course');
    } else {
        await Course.findByIdAndUpdate(req.params.id, req.body.course);
        req.flash('success_msg', 'Course Updated successfully');
        res.redirect("/course");
    }
};

module.exports.destroy = async (req, res, next) => {
    if (req.user.username !== 'admin') {
        req.flash('error_msg', 'You are not Administrator');
        res.redirect('/course');
    } else {
        await Course.findByIdAndDelete(req.params.id);
        req.flash('success_msg', 'Course Deleted successfully');
        res.redirect("/course");
    }
};
