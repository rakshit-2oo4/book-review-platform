import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import styles from './Header.module.css'; // Import CSS Modules

function Header() {
    const { userInfo, logout } = useAuthContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>
                <Link to="/" className={styles.logo}>Book Review Platform</Link>
                <ul className={styles.navList}>
                    <li><Link to="/books" className={styles.navLink}>Books</Link></li>
                    {userInfo ? (
                        <>
                            <li><Link to="/profile" className={styles.navLink}>Profile</Link></li>
                            {userInfo.isAdmin && (
                                <li><Link to="/admin/addbook" className={styles.navLink}>Add Book</Link></li>
                            )}
                            <li><button onClick={handleLogout} className={styles.logoutButton}>Logout</button></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login" className={styles.navLink}>Login</Link></li>
                            <li><Link to="/register" className={styles.navLink}>Register</Link></li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;