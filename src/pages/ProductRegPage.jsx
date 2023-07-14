import React, { useState } from 'react';
import styled from 'styled-components';
import ProductRegContainer from '../container/ProductRegContainer';
const ProductRegPageSt = styled.div`
    margin: 30px 0 60px;
    display: flex;
    justify-content: center;
    border: 2px solid #333;
    border-radius: 20px;
    box-shadow: 0 5px 0 #333;
    overflow: hidden;
`;

const ProductRegPage = () => {
    return (
        <>
            <h2 className="section-title">아나바다 등록하기</h2>
            <ProductRegPageSt>
                <ProductRegContainer />
            </ProductRegPageSt>
        </>
    );
};

export default ProductRegPage;
