const Review = require('../models/Review');
const Book = require('../models/Book');
const asyncHandler = require('express-async-handler');

const getReviewsForBook = asyncHandler(async (req, res) => {
    const reviews = await Review.find({ book: req.params.bookId }).populate('user', 'username');
    res.json(reviews);
});

const submitReview = asyncHandler(async (req, res) => {
    const { bookId, rating, comment } = req.body;

    const book = await Book.findById(bookId);
    if (!book) {
        res.status(404);
        throw new Error('Book not found');
    }

    const alreadyReviewed = await Review.findOne({
        book: bookId,
        user: req.user._id,
    });

    if (alreadyReviewed) {
        res.status(400);
        throw new Error('You have already reviewed this book');
    }

    const review = new Review({
        book: bookId,
        user: req.user._id,
        rating,
        comment,
    });

    const createdReview = await review.save();

    const reviews = await Review.find({ book: bookId });
    book.numOfReviews = reviews.length;
    book.averageRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
    await book.save();

    res.status(201).json({ message: 'Review added', review: createdReview });
});

module.exports = { getReviewsForBook, submitReview };