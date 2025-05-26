const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, maxlength: 500 },
    createdAt: { type: Date, default: Date.now }
});

ReviewSchema.index({ book: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Review', ReviewSchema);