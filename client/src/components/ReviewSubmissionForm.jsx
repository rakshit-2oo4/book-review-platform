import React, { useState } from 'react';
import { useBookContext } from '../contexts/BookContext';
import { useAuthContext } from '../contexts/AuthContext';
import Message from './Message';
import Loader from './Loader';
import './ReviewSubmissionForm.css';

function ReviewSubmissionForm({ bookId, onReviewSubmitted }) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const { submitReview, loading, error, clearBookError } = useBookContext();
    const { userInfo } = useAuthContext();

    const submitHandler = async (e) => {
        e.preventDefault();
        clearBookError(); // Clear previous errors

        if (rating === 0) {
            alert('Please select a rating for the book.');
            return;
        }

        if (!userInfo) {
            alert('You must be logged in to submit a review.');
            return;
        }

        await submitReview(bookId, { rating, comment }, userInfo.token);

        if (!error) { // If submission was successful (or no error immediately after dispatch)
            setRating(0);
            setComment('');
            onReviewSubmitted(); // Callback to re-fetch reviews/book data on parent
            alert('Review submitted successfully!');
        }
    };

    return (
        <div className="review-form-container">
            {loading && <Loader />}
            {error && <Message variant="danger">{error}</Message>}
            <form onSubmit={submitHandler} className="review-form">
                <div className="form-group">
                    <label htmlFor="rating">Rating</label>
                    <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        required
                    >
                        <option value="0">Select...</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="comment">Comment</label>
                    <textarea
                        id="comment"
                        rows="5"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write your thoughts on the book..."
                        maxLength="500"
                    ></textarea>
                </div>
                <button type="submit" disabled={loading}>
                    Submit Review
                </button>
            </form>
        </div>
    );
}

export default ReviewSubmissionForm;