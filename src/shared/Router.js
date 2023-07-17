import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import ProductDetailPage from '../pages/ProductDetailPage';
import ProductCreatePage from '../pages/ProductCreatePage';
import ProductUpdatePage from '../pages/ProductUpdatePage';
import LoginPage from '../pages/LoginPage';

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productreg" element={<ProductCreatePage />} />
            <Route path="/productdetail/:id" element={<ProductDetailPage />} />
            <Route path="/productdetail/:id/update" element={<ProductUpdatePage />} />
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    );
};

export default Router;
