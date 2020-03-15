var express = require('express');
const router = express.Router();
const classroomController = require('../controllers/classroomController');

// @desc    Create new content
// @route   POST /api/v1/class/new
// @access  private
router.post('/new', classroomController.addClassContent)


// @desc    Create new content
// @route   POST /api/v1/class/new
// @access  private
router.post('/teacher', classroomController.teacherClassContent)

module.exports = router;