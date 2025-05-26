import React, { useEffect, useState } from 'react';
import { useBookContext } from '../contexts/BookContext';
import BookCard from '../components/BookCard';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Pagination from '../components/Pagination'; // You'll need to create this
import { useSearchParams } from 'react-router-dom';
import './BookListingPage.css'; // Page-specific CSS

function BookListingPage() {
    const [searchParams] = useSearchParams();
    const pageNumber = searchParams.get('pageNumber') || 1;
    const keyword = searchParams.get('keyword') || '';

    const { books, loading, error, page, pages, fetchBooks } = useBookContext();
    const [searchTerm, setSearchTerm] = useState(keyword);

    useEffect(() => {
        fetchBooks(pageNumber, keyword);
    }, [fetchBooks, pageNumber, keyword]);

    const handleSearch = (e) => {
        e.preventDefault();
        // This would typically involve navigating with new search params
        // For simplicity, directly calling fetchBooks here
        fetchBooks(1, searchTerm);
    };

    return (
        <div className="book-listing-page">
            <h1>All Books</h1>
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search books..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                    <div className="book-grid">
                        {books.map((book) => (
                            <BookCard key={book._id} book={book} />
                        ))}
                    </div>
                    <Pagination page={page} pages={pages} keyword={keyword} baseUrl="/books" />
                </>
            )}
        </div>
    );
}

export default BookListingPage;