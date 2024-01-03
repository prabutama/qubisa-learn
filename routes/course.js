const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const Course = require('../models/course');
const isValidObjectId = require('../middlewares/isValidObjectId');
const isAuth = require('../middlewares/isAuth');
const CourseController = require('../controllers/course');
const ModulController = require('../controllers/modul');
const ReviewController = require('../controllers/review');

router.get('/', isAuth, wrapAsync(CourseController.index));
router.post('/', isAuth,  wrapAsync(CourseController.store));
router.get('/create', isAuth, wrapAsync(CourseController.create));
router.get('/:id', isAuth, isValidObjectId('/course'), wrapAsync(CourseController.show));
router.get('/:id/edit', isAuth, isValidObjectId('/course'), wrapAsync(CourseController.edit));
router.put("/:id", isAuth, isValidObjectId('/course'), wrapAsync(CourseController.update));
router.delete('/:id', isAuth, isValidObjectId('/course'), wrapAsync(CourseController.destroy));

router.get('/:id/modul', isAuth, isValidObjectId('/course'), wrapAsync(ModulController.index));
router.post('/:id/modul', isAuth, isValidObjectId('/course'), wrapAsync(ModulController.store));
router.delete('/:course_id/modul/:modul_id', isAuth, isValidObjectId('/course'), wrapAsync(ModulController.destroy));

router.post('/:id/reviews', isAuth, isValidObjectId('/course'), wrapAsync(ReviewController.store));
router.delete('/:course_id/reviews/:reviews_id', isAuth, isValidObjectId('/course'), wrapAsync(ReviewController.destroy));

module.exports = router;