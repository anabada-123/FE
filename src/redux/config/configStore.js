import { configureStore } from '@reduxjs/toolkit';
import item from '../modules/itemSlice';
import auth from '../modules/auth';
// import auth from '../modules/auth';
const store = configureStore({
    reducer: {
        item,
        auth,
    },
});

export default store;
