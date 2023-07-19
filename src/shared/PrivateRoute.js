// import { ReactElement } from "react";
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ isAuth }) => {
    const isAuthenticated = localStorage.getItem('accessToken');
    if (isAuth) {
        return isAuthenticated === null || isAuthenticated === 'false' ? (
            <Navigate to="/login" />
        ) : (
            <Outlet />
        );
    }
    return isAuthenticated === null || isAuthenticated === 'false' ? (
        <Outlet />
    ) : (
        <Navigate to="/" />
    );
};

export default PrivateRoute;
