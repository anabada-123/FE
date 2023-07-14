import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const ProductCard = styled.li`
    width: 230px;
    /* height: 300px; */
    /* padding: 20px; */
    overflow: hidden;
    border-radius: 25px;
    border: 2px solid #333;
    box-shadow: 0px 8px 0px #333;
    transform: translateY(-8px);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    /* border-bottom: 10px solid #333; */
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
    }
`;

const ProductInfo = styled.div`
    /* padding: 20px; */
    h3 {
        font-size: 1.4rem;
        font-weight: bold;
        padding: 12px 20px 8px;
        /* margin-bottom: 12px; */
        border-bottom: 2px solid #333;
    }
    .prpduct-seller {
        font-size: 1.1rem;
        padding: 8px 20px;
        border-bottom: 2px solid #333;
        color: #bf2929;
    }
    .prpduct-data {
        font-size: 0.9rem;
        padding: 8px 20px 6px;
        text-align: end;
    }
`;

const ProductItem = ({ id, title, seller, date, srcImg, altImg }) => {
    return (
        <Link to={`/productdetail/${id}`}>
            <ProductCard key={id}>
                <ProductImgWrap>
                    <img src={'/img/img0.jpg'} alt={altImg} />
                </ProductImgWrap>
                <ProductInfo>
                    <h3>{title}</h3>
                    <p className="prpduct-seller">{seller}</p>
                    <p className="prpduct-data">{date}</p>
                </ProductInfo>
            </ProductCard>
        </Link>
    );
};

export default ProductItem;
