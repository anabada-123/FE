import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProductItem from './ProductItem';
const ProductListSt = styled.ul`
    padding: 20px 0 50px;
    margin: 0 auto;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 50px 20px;
`;

export const ProductList = ({ data }) => {
    return (
        <ProductListSt>
            {data &&
                data.map((item) => {
                    return (
                        <ProductItem
                            id={item.id}
                            title={item.itemName}
                            seller={'mock'}
                            date={item.day}
                            srcImg={item.img}
                            altImg={item.imgalt}
                        />
                    );
                })}
        </ProductListSt>
    );
};
