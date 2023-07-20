import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProductItem from './ProductItem';
const ProductListSt = styled.ul`
    padding: 20px 0 50px;
    margin: 0 auto;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 50px 17px;
    @media screen and (max-width: 768px) {
        padding: 30px 0 50px;
        justify-content: center;
    }
    @media screen and (max-width: 500px) {
        padding: 30px 24px 50px;
        justify-content: center;
    }
`;

export const ProductList = ({ data }) => {
    return (
        <ProductListSt>
            {data &&
                data.map((item) => {
                    return (
                        <ProductItem
                            key={`item-${item.id}`}
                            id={item.id}
                            title={item.itemName}
                            place={item.tradingPosition}
                            date={item.day}
                            srcImg={item.img}
                            altImg={item.imgalt}
                        />
                    );
                })}
        </ProductListSt>
    );
};
