import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Button from '../components/common/Button';
import { MONO_COLOR } from '../assets/colors';
import { useNavigate } from 'react-router-dom';

const ImgBox = styled.div`
    width: 445px;
    height: 590px;
    border-radius: 25px;
    overflow: hidden;
    border: 2px solid #333;
    border-bottom: 5px solid #333;
`;

const ProductThumbnail = styled.div`
    border-bottom: 4px solid #333;
    height: 460px;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }
`;
const ProductImgs = styled.div`
    display: flex;
    align-items: center;
    img {
        width: 25%;
        height: 126px;
        object-fit: cover;
        object-position: center;
        border-right: 2px solid #333;
        cursor: pointer;
        &:nth-child(4) {
            border-right: none;
        }
        &:hover {
            filter: brightness(0.8);
        }
    }
`;

const ProductInfo = styled.div`
    width: 100%;
    padding: 80px 50px 30px;
    background-color: ${MONO_COLOR[2]};
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 50px;
    .core {
        width: calc(60% - 50px);
        /* height: 590px; */
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        h3 {
            width: 100%;
            /* min-height: 50px; */
            background-color: #fff;
            padding: 14px 20px 10px;
            margin-bottom: 20px;
            font-size: 2rem;
            border-radius: 16px;
            border: 2px solid #333;
            border-bottom: 5px solid #333;
            position: relative;
            word-wrap: break-word;
            text-overflow: ellipsis;
            .seller {
                font-size: 1rem;
                font-weight: bold;
                position: absolute;
                top: 0px;
                right: 0px;
                transform: translateY(-200%);
                color: #1b92d6;
            }
        }
        ul {
            width: 100%;
        }
        li {
            padding: 10px 0;
            margin-bottom: 10px;
        }
        p {
            font-size: 1.3rem;
            margin-bottom: 8px;
        }
        pre {
            /* min-height: 80px; */
            font-size: 1rem;
            background-color: #fff;
            padding: 16px 20px;
            border-radius: 16px;
            border: 2px solid #333;
            border-bottom: 5px solid #333;
            word-wrap: break-word;
            white-space: pre-wrap;
            text-overflow: ellipsis;
        }
        .btn-box {
            display: flex;
        }
    }
    .sub {
        width: 100%;
        padding-bottom: 60px;
        p {
            font-size: 1.3rem;
            margin-bottom: 8px;
        }
        pre {
            min-height: 400px;
            font-size: 1rem;
            background-color: #fff;
            padding: 40px 50px;
            border-radius: 16px;
            border: 2px solid #333;
            border-bottom: 5px solid #333;
            text-align: center;
            white-space: pre-wrap;
            word-break: break-word;
        }
    }
`;

// MEMO : 서버주소/static/img/${변수}
const ProductDetail = ({ data, btnDeleteEvent }) => {
    const nav = useNavigate();
    const [mainImg, setMainImg] = useState(data.img);
    const subImg = data.imgList;

    const onClickImageHandler = (idx) => {
        setMainImg(subImg[idx]);
    };

    try {
        return (
            <>
                {data && (
                    <>
                        <ProductInfo name="product_reg_form" encType="multipart/form-data">
                            <ImgBox>
                                <ProductThumbnail>
                                    <img src={mainImg} alt={'main_img'} />
                                </ProductThumbnail>
                                <ProductImgs>
                                    {data.imgList ? (
                                        data.imgList.map((img, idx) => {
                                            return (
                                                <img
                                                    key={idx}
                                                    src={img}
                                                    alt="img"
                                                    onClick={() => onClickImageHandler(idx)}
                                                />
                                            );
                                        })
                                    ) : (
                                        <img src="/img/img0.jpg" alt="img" />
                                    )}
                                </ProductImgs>
                            </ImgBox>
                            <div className="core">
                                <h3>
                                    {data.itemName} <span className="seller">너가 먹던 간식</span>
                                </h3>
                                <ul>
                                    <li>
                                        <p className="">상품 한 줄 설명</p>
                                        <pre>{data.itemOneContent}</pre>
                                    </li>
                                    <li>
                                        <p className="">이런 물품과 교환하고 싶어요</p>
                                        <pre>{data.tradingItem}</pre>
                                    </li>
                                    <li>
                                        <p className="">여기서 교환하고 싶어요 </p>
                                        <pre>{data.tradingPosition}</pre>
                                    </li>
                                </ul>
                                <div className="btn-box">
                                    <Button.Primary
                                        $width={'240px'}
                                        $center={'center'}
                                        onClick={() => btnDeleteEvent(data.id)}
                                    >
                                        삭제하기
                                    </Button.Primary>
                                    <Button.Secondary
                                        $width={'240px'}
                                        $center={'center'}
                                        onClick={() => nav(`/productdetail/${data.id}/update`)}
                                    >
                                        수정하기
                                    </Button.Secondary>
                                </div>
                            </div>
                            <div className="sub">
                                <p className="">상세 내용</p>
                                <pre>{data.itemContent}</pre>
                            </div>
                        </ProductInfo>
                    </>
                )}
            </>
        );
    } catch (error) {
        nav('/');
    }
};

export default ProductDetail;
