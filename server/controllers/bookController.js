const Book = require('../models/Book');
const Review = require('../models/Review');
const asyncHandler = require('express-async-handler');

const getBooks = asyncHandler(async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword ? {
        title: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {};

    const count = await Book.countDocuments({ ...keyword });
    const books = await Book.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1));

    res.json({ books, page, pages: Math.ceil(count / pageSize) });
});


const getBookById = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (book) {
        res.json(book);
    } else {
        res.status(404);
        throw new Error('Book not found');
    }
});

const createBook = asyncHandler(async (req, res) => {
    const { title, author, description, isbn, genre, publicationYear, coverImage } = req.body;
    const bookExists = await Book.findOne({ isbn });
    if (bookExists) {
        res.status(400);
        throw new Error('Book with this ISBN already exists');
    }

    const book = new Book({
        title, author, description, isbn, genre, publicationYear, coverImage
    });

    const createdBook = await book.save();
    res.status(201).json(createdBook);
});

module.exports = { getBooks, getBookById, createBook };