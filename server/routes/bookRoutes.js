const express = require('express');
const router = express.Router();
const { getBooks, getBookById, createBook } = require('../controllers/bookController');
const { protect, admin } = require('../middleware/authMiddleware');
const { body } = require('express-validator');

router.route('/')
    .get(getBooks)
    .post(protect, admin, [
        body('title').notEmpty().withMessage('Title is required'),
        body('author').notEmpty().withMessage('Author is required'),
        body('isbn').notEmpty().withMessage('ISBN is required')
    ], createBook);

router.route('/:id').get(getBookById);

module.exports = router;