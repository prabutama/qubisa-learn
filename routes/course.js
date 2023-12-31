const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const Course = require('../models/course');
const isValidObjectId = require('../middlewares/isValidObjectId');
const isAuth = require('../middlewares/isAuth');

router.get('/', isAuth, wrapAsync(async (req, res) => {
    const courses = await Course.find(); 
    res.render('course/index', { courses });
}));

router.post('/', isAuth,  wrapAsync(async (req, res, next) => {
    const course = await new Course(req.body.course);
    await course.save();
    req.flash('success_msg', 'Course Added successfully');
    res.redirect('/course');
}));

router.get('/create', isAuth, wrapAsync(async (req, res) => {
    if (req.user.username !== 'admin') {
        req.flash('error_msg', 'You are not Administrator');
        res.redirect('/course');
    }
    res.render('course/create');
}));

router.get('/:id', isAuth, isValidObjectId('/course'), wrapAsync(async (req, res) => {
    const course = await Course.findById(req.params.id); 
    const videos = course.video;
    const reviews = course.reviews;
    res.render('course/show', { course, videos, reviews });
}));

router.get('/:id/edit', isAuth, isValidObjectId('/course'), wrapAsync(async (req, res) => {
    if (req.user.username !== 'admin') {
        req.flash('error_msg', 'You are not Administrator');
        res.redirect('/course');
    }
    const course = await Course.findById(req.params.id); 
    res.render('course/edit', { course });
}));

router.put("/:id", isAuth, isValidObjectId('/course'), wrapAsync(async (req, res) => {
    if (req.user.username !== 'admin') {
        req.flash('error_msg', 'You are not Administrator');
        res.redirect('/course');
    } else {
        await Course.findByIdAndUpdate(req.params.id, req.body.course);
        req.flash('success_msg', 'Course Updated successfully');
        res.redirect("/course");
    }
}));

router.delete('/:id', isAuth, isValidObjectId('/course'), wrapAsync(async (req, res, next) => {
    if (req.user.username !== 'admin') {
        req.flash('error_msg', 'You are not Administrator');
        res.redirect('/course');
    } else {
        await Course.findByIdAndDelete(req.params.id);
        req.flash('success_msg', 'Course Deleted successfully');
        res.redirect("/course");
    }
}));

router.get('/:id/modul', isAuth, isValidObjectId('/course'), wrapAsync(async (req, res) => {
    const course = await Course.findById(req.params.id); 
    const videos = course.video;
    res.render('course/modul', { course, videos });
}));

router.post('/:id/modul', isAuth, isValidObjectId('/course'), wrapAsync(async (req, res, next) => { 
    if (req.user.username !== 'admin') {
        req.flash('error_msg', 'You are not Administrator');
        res.redirect('/course');
    } else {
        const { video } = req.body;
        const course = await Course.findById(req.params.id);
        course.video.push({
            title: video.title,
            url: video.url
        });
        await course.save();
        req.flash('success_msg', 'Modul Added successfully');
        res.redirect(`/course/${req.params.id}`);
    }
}));

router.delete('/:course_id/modul/:modul_id', isAuth, isValidObjectId('/course'), wrapAsync(async (req, res, next) => {
    if (req.user.username !== 'admin') {
        req.flash('error_msg', 'You are not Administrator');
        res.redirect('/course');
    } else {
        const { course_id, modul_id } = req.params;
        const course = await Course.findByIdAndUpdate(course_id, { $pull: { video:{ _id: modul_id} } });
        await course.save();
        req.flash('success_msg', 'Modul Deleted successfully');
        res.redirect(`/course/${course_id}`);
    }
}));

router.post('/:id/reviews', isAuth, isValidObjectId('/course'), wrapAsync(async (req, res, next) => { 
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
}));

router.delete('/:course_id/reviews/:reviews_id', isAuth, isValidObjectId('/course'), wrapAsync(async (req, res, next) => {
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
}));

module.exports = router;