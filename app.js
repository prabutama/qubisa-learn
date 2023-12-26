const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');

// Models
const Course = require('./models/course');

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// connect to mongodb
mongoose.connect("mongodb://127.0.0.1/qubisa_db")
.then((result) => {
    console.log("Connected to qubisa_db");
})
.catch((err) => {
    console.error(err);
}); 

app.get("/", (req, res) => {
    res.render("home");
});


app.get('/', (req, res) => {
    res.render('home');
});

app.get('/course', async (req, res) => {
    const courses = await Course.find(); 
    res.render('course/index', { courses });
});

app.get('/course/:id', async (req, res) => {
    const course = await Course.findById(req.params.id); 
    res.render('course/show', { course });
});

app.listen(8000, () => {
    console.log('Server running on http://localhost:8000');
});