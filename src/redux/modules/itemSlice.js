import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: 1,
    itemName: '종원이가 먹다 만 빵1234',
    itemContent: '존맛탱인데 이걸 안사?',
    itemOneContent: '한줄소개',
    tradingPosition: '의정부',
    tradingItem: '너가 먹던 ',
    cate: '식품',
    multipleImage: ['/img/img0.jpg', '/img/img0.jpg', '/img/img0.jpg'],
    img: '이미지파일',
};

export const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {
        updateItem: (state, action) => {
            return {
                ...state,
                item: action.payload,
            };
        },
    },
});

export const { updateItem } = itemSlice.actions;
export default itemSlice.reducer;
