// client/src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import Loader from './Loader'; // Assuming you have a Loader component

const PrivateRoute = ({ children }) => {
    const { userInfo, loading } = useAuthContext();

    if (loading) {
        return <Loader />;
    }

    return userInfo ? children : <Navigate to={"/login?redirect=" + encodeURIComponent(window.location.pathname + window.location.search)} replace />;
};

export default PrivateRoute;