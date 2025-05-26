const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    genre: { type: [String] },
    publicationYear: { type: Number },
    coverImage: { type: String },
    averageRating: { type: Number, default: 0 },
    numOfReviews: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Book', BookSchema);