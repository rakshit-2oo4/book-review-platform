import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import './BookCard.css';

function BookCard({ book }) {
    return (
        <div className="book-card">
            <Link to={`/books/${book._id}`}>
                <img src={book.coverImage || 'https://via.placeholder.com/150'} alt={book.title} className="book-card-image" />
                <h3 className="book-card-title">{book.title}</h3>
            </Link>
            <p className="book-card-author">by {book.author}</p>
            <div className="book-card-rating">
                <Rating value={book.averageRating} text={`${book.numOfReviews} reviews`} />
            </div>
        </div>
    );
}

export default BookCard;