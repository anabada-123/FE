import React, { useEffect } from 'react';
import { Route, Routes, Outlet, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import ProductDetailPage from '../pages/ProductDetailPage';
import ProductCreatePage from '../pages/ProductCreatePage';
import ProductUpdatePage from '../pages/ProductUpdatePage';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import { authCheck } from '../api/auth';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthCheck } from '../redux/modules/auth';
const Router = () => {
    // const auth = useSelector((state) => state.auth.isAuth);
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     const checkIsAuth = async () => {
    //         try {
    //             const authResult = await authCheck();
    //             dispatch(isAuthCheck(authResult));
    //         } catch (e) {
    //             dispatch(isAuthCheck(false));
    //         }
    //     };
    //     checkIsAuth();
    //     if (auth) {
    //         return;
    //     }
    // }, [auth]);

    // const AuthRoutes = ({ isAuth }) => {
    //     return !isAuth ? <Outlet /> : <Navigate to={'/'} />;
    // };
    // const UserRoutes = ({ isAuth }) => {
    //     return isAuth ? <Outlet /> : <Navigate to={'/login'} />;
    // };

    return (
        <Routes>
            {/* <Route element={<AuthRoutes isAuth={auth} />}> */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            {/* </Route> */}
            {/* <Route element={<UserRoutes isAuth={auth} />}> */}
            <Route path="/" element={<Home />} />
            <Route path="/productcreate" element={<ProductCreatePage />} />
            <Route path="/productdetail/:id" element={<ProductDetailPage />} />
            <Route path="/productdetail/:id/update" element={<ProductUpdatePage />} />
            {/* </Route> */}
        </Routes>
    );
};

export default Router;
