const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    title: String,
    author: String,
    category: String,
    image: String,
});

module.exports = mongoose.model('Course', courseSchema);