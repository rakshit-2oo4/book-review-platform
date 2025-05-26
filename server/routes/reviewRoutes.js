const express = require('express');
const router = express.Router();
const { getReviewsForBook, submitReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');
const { body } = require('express-validator');

router.route('/:bookId').get(getReviewsForBook);
router.route('/')
    .post(protect, [
        body('bookId').notEmpty().withMessage('Book ID is required'),
        body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
        body('comment').isLength({ max: 500 }).withMessage('Comment cannot exceed 500 characters')
    ], submitReview);

module.exports = router;