import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { BookProvider } from './contexts/BookContext.jsx';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BookListingPage from './pages/BookListingPage';
import BookDetailsPage from './pages/BookDetailsPage';
import UserProfilePage from './pages/UserProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddBookPage from './pages/AddBookPage';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

function App() {
    return (
        <Router>
            <AuthProvider>
                <BookProvider>
                    {/* Global styles imported in main.jsx */}
                    <Header />
                    <main>
                        <Routes>
                            <Route path="/" element={<HomePage />} exact />
                            <Route path="/books" element={<BookListingPage />} />
                            <Route path="/books/:id" element={<BookDetailsPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/profile" element={<PrivateRoute><UserProfilePage /></PrivateRoute>} />
                            <Route path="/admin/addbook" element={<AdminRoute><AddBookPage /></AdminRoute>} />
                            {/* Add more routes for admin management, etc. */}
                        </Routes>
                    </main>
                    <Footer />
                </BookProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;