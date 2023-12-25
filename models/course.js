const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    title: String,
    author: String,
    description1: String,
    description2: String,
    image: String,
    link: String,
    category: String,
})