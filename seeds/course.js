const mongoose = require('mongoose');
const Course = require('../models/course');
// const hereMaps = require('../utils/hereMaps');

mongoose.connect('mongodb://127.0.0.1/qubisa_db')
    .then((result) => {
        console.log('connected to mongodb')
    }).catch((err) => {
        console.log(err)
    });

async function seedCourse() {
    const course = [
        {
            title: 'HTML and CSS Fundamentals',
            author: 'John Doe',
            category: 'Web Development',
        },
        {
            title: 'React.js for Beginners',
            author: 'Jane Smith',
            category: 'Web Development',
        },
        {
            title: 'Mobile App Development with Flutter',
            author: 'Alan Johnson',
            category: 'Mobile Development',
        },
        {
            title: 'Node.js Backend Development',
            author: 'Emily Williams',
            category: 'Web Development',
        },
        {
            title: 'iOS App Development with Swift',
            author: 'Alex Davis',
            category: 'Mobile Development',
        },
        {
            title: 'Cyber Security Essentials',
            author: 'Michael Brown',
            category: 'Cyber Security',
        },
        {
            title: 'Responsive Web Design Techniques',
            author: 'Jessica Miller',
            category: 'Web Development',
        },
        {
            title: 'Android App Development with Kotlin',
            author: 'Chris Thompson',
            category: 'Mobile Development',
        },
        {
            title: 'Network Security Best Practices',
            author: 'Sarah Turner',
            category: 'Cyber Security',
        },
        {
            title: 'JavaScript Modern Frameworks',
            author: 'David Lee',
            category: 'Web Development',
        },
        {
            title: 'Cross-platform Mobile App Development',
            author: 'Rachel Clark',
            category: 'Mobile Development',
        },
        {
            title: 'Ethical Hacking Fundamentals',
            author: 'Mark White',
            category: 'Cyber Security',
        },
    ]

    try {
        await Course.deleteMany({});
        await Course.insertMany(course);
        console.log('Data berhasil disimpan');
    } catch (err) {
        console.log('Terjadi kesalahan saat menyimpan data:', err);
    } finally {
        mongoose.disconnect();
    }
}

seedCourse();