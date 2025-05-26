import React from 'react';
import Rating from './Rating';
import './ReviewCard.css';

function ReviewCard({ review }) {
    return (
        <div className="review-card">
            <div className="review-header">
                <span className="reviewer-name"><strong>{review.user?.username || 'Anonymous User'}</strong></span>
                <span className="review-date">{new Date(review.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="review-rating">
                <Rating value={review.rating} />
            </div>
            <p className="review-comment">{review.comment}</p>
        </div>
    );
}

export default ReviewCard;