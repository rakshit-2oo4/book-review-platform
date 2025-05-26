import React, { createContext, useReducer, useContext } from 'react';
import axios from 'axios';

const BookContext = createContext();

const initialState = {
    books: [],
    book: null,
    loading: false,
    error: null,
    page: 1,
    pages: 1,
};

const bookReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_BOOKS_REQUEST':
        case 'FETCH_BOOK_REQUEST':
        case 'ADD_BOOK_REQUEST':
        case 'SUBMIT_REVIEW_REQUEST':
            return { ...state, loading: true, error: null };
        case 'FETCH_BOOKS_SUCCESS':
            return {
                ...state,
                loading: false,
                books: action.payload.books,
                page: action.payload.page,
                pages: action.payload.pages,
                error: null,
            };
        case 'FETCH_BOOK_SUCCESS':
            return { ...state, loading: false, book: action.payload, error: null };
        case 'ADD_BOOK_SUCCESS':
            return { ...state, loading: false, books: [...state.books, action.payload], error: null };
        case 'SUBMIT_REVIEW_SUCCESS':
            // You might want to refetch the book or update reviews in state
            return { ...state, loading: false, error: null };
        case 'BOOK_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case 'CLEAR_BOOK_ERROR':
            return { ...state, error: null };
        default:
            return state;
    }
};

export const BookProvider = ({ children }) => {
    const [state, dispatch] = useReducer(bookReducer, initialState);
    // Use import.meta.env for Vite environment variables
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

    const fetchBooks = async (pageNumber = '', keyword = '') => {
        dispatch({ type: 'FETCH_BOOKS_REQUEST' });
        try {
            const { data } = await axios.get(`<span class="math-inline">\{API\_BASE\_URL\}/books?pageNumber\=</span>{pageNumber}&keyword=${keyword}`);
            dispatch({ type: 'FETCH_BOOKS_SUCCESS', payload: data });
        } catch (error) {
            dispatch({
                type: 'BOOK_FAILURE',
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
        }
    };

    const fetchBookById = async (id) => {
        dispatch({ type: 'FETCH_BOOK_REQUEST' });
        try {
            const { data } = await axios.get(`<span class="math-inline">\{API\_BASE\_URL\}/books/</span>{id}`);
            dispatch({ type: 'FETCH_BOOK_SUCCESS', payload: data });
        } catch (error) {
            dispatch({
                type: 'BOOK_FAILURE',
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
        }
    };

    const addBook = async (bookData, token) => {
        dispatch({ type: 'ADD_BOOK_REQUEST' });
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.post(`${API_BASE_URL}/books`, bookData, config);
            dispatch({ type: 'ADD_BOOK_SUCCESS', payload: data });
        } catch (error) {
            dispatch({
                type: 'BOOK_FAILURE',
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
        }
    };

    const submitReview = async (bookId, reviewData, token) => {
        dispatch({ type: 'SUBMIT_REVIEW_REQUEST' });
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios.post(`${API_BASE_URL}/reviews`, { bookId, ...reviewData }, config);
            dispatch({ type: 'SUBMIT_REVIEW_SUCCESS' });
        } catch (error) {
            dispatch({
                type: 'BOOK_FAILURE',
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
        }
    };

    const clearBookError = () => dispatch({ type: 'CLEAR_BOOK_ERROR' });

    return (
        <BookContext.Provider value={{
            ...state,
            fetchBooks,
            fetchBookById,
            addBook,
            submitReview,
            clearBookError
        }}>
            {children}
        </BookContext.Provider>
    );
};

export const useBookContext = () => {
    return useContext(BookContext);
};