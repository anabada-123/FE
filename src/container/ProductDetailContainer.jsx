import React from 'react';
import ProductDetail from '../components/ProductDetail';
import { useQuery } from 'react-query';
import { getTradingItem } from '../api/tradingItem';

const ProductDetailContainer = () => {
    const { data } = useQuery('tradingItems', getTradingItem);

    const productInfoMock = {
        itemName: '종원이가 먹다 만 빵1234',
        itemContent: '존맛탱인데 이걸 안사?',
        itemOneContent: '한줄소개',
        tradingPosition: '의정부',
        tradingItem: '너가 먹던 ',
        cate: '식품',
        multipleImage: ['/img/img0.jpg', '/img/img0.jpg', '/img/img0.jpg'],
        img: '/img/img0.jpg',
    };

    return <ProductDetail data={productInfoMock} />;
};

export default ProductDetailContainer;
