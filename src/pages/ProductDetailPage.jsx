import React from 'react';
import styled from 'styled-components';
import ProductDetailContainer from '../container/ProductDetailContainer';
const ProductRegPageSt = styled.div`
    margin: 30px 0 120px;
    display: flex;
    justify-content: center;
    border: 2px solid #333;
    border-radius: 20px;
    box-shadow: 0 5px 0 #333;
    overflow: hidden;
`;
const ProductDetailPage = () => {
    return (
        <div className="center" style={{ paddingTop: `50px`, paddingBottom: `50px` }}>
            <h2 className="section-title">아나바다 물품 상세페이지</h2>
            <ProductRegPageSt>
                <ProductDetailContainer />
            </ProductRegPageSt>
        </div>
    );
};

export default ProductDetailPage;
