const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
        title: String,
        url: String,
    });

const reviewSchema = new mongoose.Schema({
    author: String,
    rating: Number,
    body: String,
})

const courseSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    category : {
        type: String,
        enum: ['Web Development', 'Mobile Development', 'Cyber Security',],
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    video: [videoSchema],
    reviews: [reviewSchema],
});

module.exports = mongoose.model('Course', courseSchema);