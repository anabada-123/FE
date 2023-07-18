import React, { useEffect, useState } from 'react';
import ProductDetail from '../components/ProductDetail';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { deleteTradingItems } from '../api/tradingItems';
import { getTradingItem } from '../api/tradingItem';
// import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateItem } from '../redux/modules/itemSlice';

const ProductDetailContainer = () => {
    const { id } = useParams();
    const nav = useNavigate();
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const mutation = useMutation((id) => deleteTradingItems(id), {
        onSuccess: () => {
            queryClient.invalidateQueries('tradingItem');
        },
    });

    const { data } = useQuery('tradingItem', () => getTradingItem(id), {
        onSuccess: (data) => {
            // onSuccess 콜백 함수의 내용을 여기에 추가하세요
            // dispatch(updateItem(data));
            // console.log(data.img);
            // console.log(data.imgList);
        },
    });

    const onClickDelete = async (id) => {
        await mutation.mutateAsync(id);
        nav('/');
    };

    return <>{data && <ProductDetail data={data} btnDeleteEvent={onClickDelete} />}</>;
};

export default ProductDetailContainer;
