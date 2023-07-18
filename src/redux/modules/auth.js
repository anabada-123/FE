import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuth: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        isAuthCheck: (state, action) => {
            console.log(action.payload);
            return { ...state, isAuth: action.payload };
        },
    },
});

export const { isAuthCheck } = authSlice.actions;
export default authSlice.reducer;
