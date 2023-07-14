import React from 'react';
import styled from 'styled-components';
import ProductItem from './ProductItem';
const ProductListSt = styled.ul`
    padding: 20px 0 50px;
    /* background-color: beige; */
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 50px 0;
`;

export const ProductList = ({ data }) => {
    const productlistmock = [
        {
            id: 1,
            title: 'title',
            seller: 'seller',
            date: '2023.07.14',
            imgsrc: '../assets/img/img0.jpg',
            imgalt: 'img',
        },
        {
            id: 1,
            title: 'title',
            seller: 'seller',
            date: '2023.07.14',
        },
        {
            id: 1,
            title: 'title',
            seller: 'seller',
            date: '2023.07.14',
        },
        {
            id: 1,
            title: 'title',
            seller: 'seller',
            date: '2023.07.14',
        },
        {
            id: 1,
            title: 'title',
            seller: 'seller',
            date: '2023.07.14',
        },
        {
            id: 1,
            title: 'title',
            seller: 'seller',
            date: '2023.07.14',
        },
        {
            id: 1,
            title: 'title',
            seller: 'seller',
            date: '2023.07.14',
        },
        {
            id: 1,
            title: 'title',
            seller: 'seller',
            date: '2023.07.14',
        },
        {
            id: 1,
            title: 'title',
            seller: 'seller',
            date: '2023.07.14',
        },
        {
            id: 1,
            title: 'title',
            seller: 'seller',
            date: '2023.07.14',
        },
    ];

    return (
        <ProductListSt>
            {productlistmock &&
                productlistmock.map((item) => {
                    return (
                        <ProductItem
                            id={item.id}
                            title={item.title}
                            seller={item.seller}
                            date={item.date}
                            srcImg={item.imgsrc}
                            altImg={item.imgalt}
                        />
                    );
                })}
        </ProductListSt>
    );
};
