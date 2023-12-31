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
            title: 'HTML Fundamentals',
            author: 'John Doe',
            category: 'Web Development',
            image: '/img/html.svg',
            video: [
                { title: 'HTML introduction', url: 'https://www.youtube.com/embed/qLfn209bThs?si=FcYh4ZOOyF_nY8f6'},
                { title: 'How HTML work?', url: 'https://www.youtube.com/embed/OjPhwAapQfs?si=CG514MPiMZkNVHnO'},
            ]
        },
        {
            title: 'React.js for Beginners',
            author: 'Jane Smith',
            category: 'Web Development',
            image: '/img/react.svg',
        },
        {
            title: 'Mobile App Development with Flutter',
            author: 'Alan Johnson',
            category: 'Mobile Development',
            image: '/img/flutter.svg'
        },
        {
            title: 'Node.js Backend Development',
            author: 'Emily Williams',
            category: 'Web Development',
            image: '/img/node.svg'
        },
        {
            title: 'iOS App Development with Swift',
            author: 'Alex Davis',
            category: 'Mobile Development',
            image: '/img/swift.svg'
        },
        {
            title: 'Cyber Security Essentials',
            author: 'Michael Brown',
            category: 'Cyber Security',
            image: '/img/cyber.svg'
        },
        {
            title: 'CSS Techniques',
            author: 'Jessica Miller',
            category: 'Web Development',
            image: '/img/css.svg'
        },
        {
            title: 'Android App Development with Kotlin',
            author: 'Chris Thompson',
            category: 'Mobile Development',
            image: '/img/kotlin.svg'
        },
        {
            title: 'Network Security Best Practices',
            author: 'Sarah Turner',
            category: 'Cyber Security',
            image: '/img/network.svg'
        },
        {
            title: 'Python for Cyber Security',
            author: 'David Lee',
            category: 'Cyber Security',
            image: '/img/python.svg'
        },
        {
            title: 'Introduction Android',
            author: 'Rachel Clark',
            category: 'Mobile Development',
            image: '/img/android.svg'
        },
        {
            title: 'Kali Linux Fundamental',
            author: 'Mark White',
            category: 'Cyber Security',
            image: '/img/kali.svg',
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