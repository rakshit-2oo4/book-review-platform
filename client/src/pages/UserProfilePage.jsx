import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import Loader from '../components/Loader';
import Message from '../components/Message';
import './UserProfilePage.css';

function UserProfilePage() {
    const { userInfo, loading, error, updateProfile, clearAuthError } = useAuthContext();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null); // For local success/error messages

    useEffect(() => {
        if (!userInfo) {
            // Redirect or handle case where user is not logged in (though PrivateRoute handles this)
            // console.log('User not logged in on profile page.');
        } else {
            setUsername(userInfo.username);
            setEmail(userInfo.email);
        }
    }, [userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        clearAuthError(); // Clear global auth errors
        setMessage(null); // Clear local messages

        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        const userData = { username, email };
        if (password) { // Only send password if it's being updated
            userData.password = password;
        }

        // Call updateProfile from AuthContext
        await updateProfile(userData, userInfo.token);

        if (!error && !loading) { // Check for global error from context after updateProfile
            setMessage('Profile Updated Successfully!');
            setPassword('');
            setConfirmPassword('');
        } else if (error) {
            setMessage(error); // Display error from context
        }
    };

    return (
        <div className="user-profile-page">
            <h2>User Profile</h2>
            {message && <Message variant={message.includes('Success') ? 'success' : 'danger'}>{message}</Message>}
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <form onSubmit={submitHandler} className="profile-form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter new password (optional)"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        Update Profile
                    </button>
                </form>
            )}
        </div>
    );
}

export default UserProfilePage;