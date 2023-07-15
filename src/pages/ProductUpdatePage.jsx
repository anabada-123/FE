import React, { useState } from 'react';
import styled from 'styled-components';
import ProductUpdateContainer from '../container/ProductUpdateContainer';
import { BLUE_COLOR, PINK_COLOR, MONO_COLOR, YELLOW_COLOR } from '../assets/colors';
const ProductRegPageSt = styled.div`
    margin: 30px 0 0;
    display: flex;
    justify-content: center;
    /* border: 2px solid #333; */
    border-radius: 20px;
    /* box-shadow: 0 5px 0 #333; */
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
    font-size: 2rem;
    /* background-color: ${YELLOW_COLOR[0]}; */
    color: ${MONO_COLOR[0]};
`;
const ProductUpdatePage = () => {
    return (
        <div style={{ backgroundColor: BLUE_COLOR.Lavender }}>
            <TitleWrap>
                <SectionTitle>아나바다 수정하기</SectionTitle>
            </TitleWrap>
            <div className="center">
                <ProductRegPageSt>
                    <ProductUpdateContainer />
                </ProductRegPageSt>
            </div>
        </div>
    );
};

export default ProductUpdatePage;
