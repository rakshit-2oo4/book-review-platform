// client/src/components/Footer.jsx
import React from 'react';
import './Footer.css'; // Optional: for specific footer styles

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container text-center">
                <p>&copy; {currentYear} Book Review Platform. All rights reserved.</p>
                <p>Designed for educational purposes.</p>
            </div>
        </footer>
    );
}

export default Footer;