var express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');
const multer = require('../middleware/FileUpload');
const authCheck = require('../middleware/check-auth');
//=> End of declared dependencies

// @desc    Create new content
// @route   POST /api/v1/content/new
// @access  private
router.post('/new', multer.upload.any(), contentController.createNewContent)

// @desc    Fetch all content by pagination
// @route   POST /api/v1/content/all/limit/:limit/page/:page/sortByDate/:sortByDate
// @access  private
router.get('/all/limit/:limit/page/:page/sortByDate/:sortByDate', contentController.getAllContents)

// @desc    Fetch all content by user passion and pagination
// @route   GET /api/v1/content/passion/:passionId/user/:userId/limit/:limit/page/:page/sortByDate/:sortByDate
// @access  private
router.get('/passion/:passionId/user/:userId/limit/:limit/page/:page/sortByDate/:sortByDate', contentController.getContentsByUserPassion)

// // @desc    Fetch all content by passion and pagination
// // @route   GET /api/v1/content/passion/:passionId/limit/:limit/page/:page/sortByDate/:sortByDate
// // @access  private
router.get('/passion/:passionId/limit/:limit/page/:page/sortByDate/:sortByDate', contentController.getAllContentsByPassion)

module.exports = router;