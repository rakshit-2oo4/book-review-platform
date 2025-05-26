import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import Loader from './Loader';

const AdminRoute = ({ children }) => {
    const { userInfo, loading } = useAuthContext();

    if (loading) {
        return <Loader />;
    }


    return userInfo && userInfo.isAdmin ? children : <Navigate to="/login" replace />;
};

export default AdminRoute;