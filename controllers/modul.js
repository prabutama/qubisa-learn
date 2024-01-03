const Course = require('../models/course');

module.exports.index = async (req, res) => {
    const course = await Course.findById(req.params.id); 
    const videos = course.video;
    res.render('course/modul', { course, videos });
};

module.exports.store = async (req, res, next) => { 
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
};

module.exports.destroy = async (req, res, next) => {
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
};