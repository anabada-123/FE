import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const ProductCard = styled.li`
    width: calc(20% - 16px);
    min-width: 230px;
    /* height: 300px; */
    /* padding: 20px; */
    overflow: hidden;
    border-radius: 25px;
    border: 2px solid #333;
    box-shadow: 0px 8px 0px #333;
    transform: translateY(-8px);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    &:hover {
        box-shadow: 0 0px 0 #333;
        transform: translateY(0px);
    }
`;

const ProductImgWrap = styled.div`
    width: 100%;
    height: 200px;
    border-bottom: 2px solid #333;
    overflow: hidden;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }
`;

const ProductInfo = styled.div`
    /* padding: 20px; */
    h3 {
        height: 65px;
        display: flex;
        align-items: center;
        font-size: 1.4rem;
        font-weight: bold;
        padding: 10px 20px 6px;
        /* margin-bottom: 12px; */
        border-bottom: 2px solid #333;
        line-height: 1.05;
        /* white-space: nowrap; */
        overflow: hidden;
        white-space: pre-wrap;
        text-overflow: ellipsis;
    }
    .prpduct-seller {
        font-size: 1.1rem;
        padding: 8px 20px;
        border-bottom: 2px solid #333;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #bf2929;
    }
    .prpduct-data {
        font-size: 0.9rem;
        padding: 8px 20px 6px;
        text-align: end;
    }
`;

const ProductItem = ({ id, title, seller, date, srcImg, altImg }) => {
    const regex = /^(\d{4}-\d{2}-\d{2})/;
    const match = date.match(regex)?.[0];
    const maxTitleLength = 15;
    const titleText =
        title.length > maxTitleLength ? title.slice(0, maxTitleLength) + '...' : title;
    return (
        <ProductCard>
            <Link to={`/productdetail/${id}`}>
                <ProductImgWrap>
                    <img src={srcImg} alt={altImg} />
                </ProductImgWrap>
                <ProductInfo>
                    <h3>{titleText}</h3>
                    <p className="prpduct-seller">{seller}</p>
                    <p className="prpduct-data">{match}</p>
                </ProductInfo>
            </Link>
        </ProductCard>
    );
};

export default ProductItem;
