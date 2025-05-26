import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookContext } from '../contexts/BookContext';
import { useAuthContext } from '../contexts/AuthContext';
import Loader from '../components/Loader';
import Message from '../components/Message';
import './AddBookPage.css';

function AddBookPage() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [isbn, setIsbn] = useState('');
    const [genre, setGenre] = useState(''); // Comma-separated string for simplicity
    const [publicationYear, setPublicationYear] = useState('');
    const [coverImage, setCoverImage] = useState('');

    const { addBook, loading, error, clearBookError } = useBookContext();
    const { userInfo } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/login'); // Redirect if not admin (though AdminRoute handles this)
        }
    }, [userInfo, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        clearBookError(); // Clear previous errors

        const bookData = {
            title,
            author,
            description,
            isbn,
            genre: genre.split(',').map(g => g.trim()).filter(g => g), // Convert string to array
            publicationYear: Number(publicationYear),
            coverImage,
        };

        await addBook(bookData, userInfo.token);

        if (!error && !loading) {
            alert('Book added successfully!');
            // Clear form or redirect
            setTitle('');
            setAuthor('');
            setDescription('');
            setIsbn('');
            setGenre('');
            setPublicationYear('');
            setCoverImage('');
            navigate('/books'); // Redirect to books list
        }
    };

    return (
        <div className="add-book-page">
            <h2>Add New Book</h2>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <form onSubmit={submitHandler} className="add-book-form">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="author">Author</label>
                    <input type="text" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea id="description" rows="5" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="isbn">ISBN</label>
                    <input type="text" id="isbn" value={isbn} onChange={(e) => setIsbn(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="genre">Genre (comma-separated)</label>
                    <input type="text" id="genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="publicationYear">Publication Year</label>
                    <input type="number" id="publicationYear" value={publicationYear} onChange={(e) => setPublicationYear(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="coverImage">Cover Image URL</label>
                    <input type="text" id="coverImage" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} />
                </div>
                <button type="submit" disabled={loading}>
                    Add Book
                </button>
            </form>
        </div>
    );
}

export default AddBookPage;