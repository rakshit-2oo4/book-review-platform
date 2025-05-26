import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBookContext } from '../contexts/BookContext';
import { useAuthContext } from '../contexts/AuthContext';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Rating from '../components/Rating';
import ReviewCard from '../components/ReviewCard';
import ReviewSubmissionForm from '../components/ReviewSubmissionForm';
import './BookDetailsPage.css';

function BookDetailsPage() {
    const { id: bookId } = useParams();
    const { book, loading, error, fetchBookById } = useBookContext();
    const { userInfo } = useAuthContext();

    const [reviews, setReviews] = useState([]);
    const [reviewsLoading, setReviewsLoading] = useState(false);
    const [reviewsError, setReviewsError] = useState(null);

    const fetchReviewsForBook = async () => {
        setReviewsLoading(true);
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/reviews/${bookId}`);
            setReviews(data);
            setReviewsLoading(false);
        } catch (err) {
            setReviewsError(err.response && err.response.data.message ? err.response.data.message : err.message);
            setReviewsLoading(false);
        }
    };

    useEffect(() => {
        fetchBookById(bookId);
        fetchReviewsForBook();
    }, [bookId, fetchBookById]); 

    const onReviewSubmitted = () => {
        fetchReviewsForBook();
        fetchBookById(bookId);
    };

    return (
        <div className="book-details-page">
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : book ? (
                <div className="book-details-content">
                    <div className="book-main-info">
                        <img src={book.coverImage || 'https://via.placeholder.com/200'} alt={book.title} className="book-cover" />
                        <div className="book-text-info">
                            <h1>{book.title}</h1>
                            <p className="book-author">by {book.author}</p>
                            <div className="book-rating">
                                <Rating value={book.averageRating} text={`${book.numOfReviews} reviews`} />
                            </div>
                            <p className="book-genre">Genre(s): {book.genre?.join(', ') || 'N/A'}</p>
                            <p className="book-year">Published: {book.publicationYear || 'N/A'}</p>
                            <p className="book-isbn">ISBN: {book.isbn}</p>
                            <p className="book-description">{book.description}</p>
                        </div>
                    </div>

                    <hr className="divider" />

                    <div className="book-reviews-section">
                        <h2>Reviews</h2>
                        {reviewsLoading ? (
                            <Loader />
                        ) : reviewsError ? (
                            <Message variant="danger">{reviewsError}</Message>
                        ) : reviews.length === 0 ? (
                            <Message variant="info">No reviews yet for this book.</Message>
                        ) : (
                            <div className="reviews-list">
                                {reviews.map((review) => (
                                    <ReviewCard key={review._id} review={review} />
                                ))}
                            </div>
                        )}

                        <h3>Write a Review</h3>
                        {userInfo ? (
                            <ReviewSubmissionForm bookId={bookId} onReviewSubmitted={onReviewSubmitted} />
                        ) : (
                            <Message variant="info">Please <a href="/login">log in</a> to write a review.</Message>
                        )}
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default BookDetailsPage;