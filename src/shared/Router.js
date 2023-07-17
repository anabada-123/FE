import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import ProductDetailPage from '../pages/ProductDetailPage';
import ProductCreatePage from '../pages/ProductCreatePage';
import ProductUpdatePage from '../pages/ProductUpdatePage';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productcreate" element={<ProductCreatePage />} />
            <Route path="/productdetail/:id" element={<ProductDetailPage />} />
            <Route path="/productdetail/:id/update" element={<ProductUpdatePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
        </Routes>
    );
};

export default Router;
