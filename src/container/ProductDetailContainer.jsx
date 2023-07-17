import React, { useEffect, useState } from 'react';
import ProductDetail from '../components/ProductDetail';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { deleteTradingItems } from '../api/tradingItems';
import { getTradingItem } from '../api/tradingItem';
// import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateItem } from '../redux/modules/itemSlice';
const productInfoMock = {
    id: 1,
    itemName: '종원이가 먹다 만 빵1234',
    itemContent: '존맛탱인데 이걸 안사?',
    itemOneContent: '한줄소개',
    tradingPosition: '의정부',
    tradingItem: '너가 먹던 ',
    cate: '식품',
    multipleImage: ['/img/img0.jpg', '/img/img0.jpg', '/img/img0.jpg'],
    img: '/img/img0.jpg',
};

const ProductDetailContainer = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const mutation = useMutation((id) => deleteTradingItems(id), {
        onSuccess: () => {
            queryClient.invalidateQueries('tradingItem');
        },
    });
    const onClickDelete = (id) => {
        mutation.mutate(id);
    };
    const { data } = useQuery('tradingItem', () => getTradingItem(id), {
        onSuccess: (data) => {
            // onSuccess 콜백 함수의 내용을 여기에 추가하세요
            dispatch(updateItem(data));
        },
    });

    return <>{data && <ProductDetail data={data} btnDeleteEvent={onClickDelete} />}</>;
};

export default ProductDetailContainer;
