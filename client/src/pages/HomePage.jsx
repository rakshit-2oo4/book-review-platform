import React, { useEffect } from 'react';
import { useBookContext } from '../contexts/BookContext';
import BookCard from '../components/BookCard';
import Loader from '../components/Loader';
import Message from '../components/Message';
import './HomePage.css'; // Optional: for page-specific styles

function HomePage() {
    const { books, loading, error, fetchBooks } = useBookContext();

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    return (
        <div className="home-page">
            <h1 className="text-center">Welcome to the Book Review Platform!</h1>
            <p className="tagline text-center">Discover, read, and review your next favorite book.</p>

            <h2 className="featured-books-heading">Featured Books</h2>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <div className="featured-books-grid">
                    {books.length > 0 ? (
                        books.slice(0, 4).map((book) => (
                            <BookCard key={book._id} book={book} />
                        ))
                    ) : (
                        <p className="text-center">No featured books available yet. Check back soon!</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default HomePage;