import React, { createContext, useReducer, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

const initialState = {
    userInfo: userInfoFromStorage,
    loading: false,
    error: null,
};

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_REQUEST':
        case 'REGISTER_REQUEST':
        case 'UPDATE_PROFILE_REQUEST':
            return { ...state, loading: true, error: null };
        case 'LOGIN_SUCCESS':
        case 'REGISTER_SUCCESS':
            return { ...state, loading: false, userInfo: action.payload, error: null };
        case 'UPDATE_PROFILE_SUCCESS':
            return { ...state, loading: false, userInfo: action.payload, error: null };
        case 'LOGOUT':
            return { ...state, userInfo: null };
        case 'AUTH_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case 'CLEAR_AUTH_ERROR':
            return { ...state, error: null };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    // Use import.meta.env for Vite environment variables
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

    useEffect(() => {
        if (state.userInfo) {
            localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
        } else {
            localStorage.removeItem('userInfo');
        }
    }, [state.userInfo]);

    const login = async (email, password) => {
        dispatch({ type: 'LOGIN_REQUEST' });
        try {
            const config = { headers: { 'Content-Type': 'application/json' } };
            const { data } = await axios.post(`${API_BASE_URL}/users/login`, { email, password }, config);
            dispatch({ type: 'LOGIN_SUCCESS', payload: data });
        } catch (error) {
            dispatch({
                type: 'AUTH_FAILURE',
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
        }
    };

    const register = async (username, email, password) => {
        dispatch({ type: 'REGISTER_REQUEST' });
        try {
            const config = { headers: { 'Content-Type': 'application/json' } };
            const { data } = await axios.post(`${API_BASE_URL}/users/register`, { username, email, password }, config);
            dispatch({ type: 'REGISTER_SUCCESS', payload: data });
        } catch (error) {
            dispatch({
                type: 'AUTH_FAILURE',
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
        }
    };

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    const updateProfile = async (userData, token) => {
        dispatch({ type: 'UPDATE_PROFILE_REQUEST' });
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.put(`${API_BASE_URL}/users/profile`, userData, config);
            dispatch({ type: 'UPDATE_PROFILE_SUCCESS', payload: data });
        } catch (error) {
            dispatch({
                type: 'AUTH_FAILURE',
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
        }
    };

    const clearAuthError = () => dispatch({ type: 'CLEAR_AUTH_ERROR' });

    return (
        <AuthContext.Provider value={{ ...state, login, register, logout, updateProfile, clearAuthError }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    return useContext(AuthContext);
};