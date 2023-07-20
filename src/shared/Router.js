import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Outlet, Navigate } from 'react-router-dom';
import ScrollToTop from '../utils/ScrollToTop';
import Home from '../pages/Home';
import ProductDetailPage from '../pages/ProductDetailPage';
import ProductCreatePage from '../pages/ProductCreatePage';
import ProductUpdatePage from '../pages/ProductUpdatePage';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import PrivateRoute from './PrivateRoute';
import Layout from '../layout/Layout';

const Router = () => {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route element={<PrivateRoute isAuth={false} />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/productuplode" element={<ProductCreatePage />} />
                        <Route path="/productdetail/:id" element={<ProductDetailPage />} />
                        <Route path="/productdetail/:id/update" element={<ProductUpdatePage />} />
                    </Route>
                </Route>
                <Route element={<PrivateRoute isAuth={false} />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
