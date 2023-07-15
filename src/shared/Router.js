import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import ProductDetailPage from '../pages/ProductDetailPage';
import ProductRegPage from '../pages/ProductRegPage';
import ProductUpdatePage from '../pages/ProductUpdatePage';
import LoginPage from '../pages/LoginPage';

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productreg" element={<ProductRegPage />} />
            <Route path="/productdetail/:id" element={<ProductDetailPage />} />
            <Route path="/productdetail/:id/update" element={<ProductUpdatePage />} />
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    );
};

export default Router;
