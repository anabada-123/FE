import React, { useState } from 'react';
import styled from 'styled-components';
import ProductCreateContainer from '../container/ProductCreateContainer';
import { BLUE_COLOR, PINK_COLOR, MONO_COLOR, YELLOW_COLOR } from '../assets/colors';
const ProductRegPageSt = styled.div`
    padding: 30px 0 60px;
    display: flex;
    justify-content: center;
    border-radius: 20px;
    overflow: hidden;
`;

const TitleWrap = styled.div`
    /* height: 100px; */
    padding: 80px 0 30px;
    background-color: ${MONO_COLOR[3]};
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 4px solid #333;
`;

const SectionTitle = styled.h2`
    width: 100%;
    max-width: 1280px;
    padding: 0 30px;
    font-size: 2rem;
    /* background-color: ${YELLOW_COLOR[0]}; */
    color: ${MONO_COLOR[0]};
`;

const ProductCreatePage = () => {
    return (
        <div style={{ backgroundColor: BLUE_COLOR.green }}>
            <TitleWrap>
                <SectionTitle>아나바다 등록하기</SectionTitle>
            </TitleWrap>
            <div className="center">
                <ProductRegPageSt>
                    <ProductCreateContainer />
                </ProductRegPageSt>
            </div>
        </div>
    );
};

export default ProductCreatePage;
