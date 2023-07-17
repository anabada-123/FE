import styled from 'styled-components';
import { BLUE_COLOR, YELLOW_COLOR } from '../assets/colors';

export const ProductForm = styled.form`
    width: 100%;
    padding: 50px;
    /* background-color: antiquewhite; */
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 50px;
    .core {
        width: calc(60% - 50px);
        height: 590px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .sub {
        width: 100%;
        height: 600px;
    }
`;

export const ImgBox = styled.div`
    width: 40%;
    height: 590px;
    border-radius: 25px;
    overflow: hidden;
    border: 2px solid #333;
    border-bottom: 8px solid #333;

    .preview-img-title {
        position: absolute;
        top: 12px;
        left: 10px;
        background-color: ${YELLOW_COLOR[0]};
        padding: 12px 20px;
        border: 2px solid #333;
        border-radius: 14px;
        font-size: 1.1rem;
    }
`;

export const ProductThumbnail = styled.div`
    border-bottom: 4px solid #333;
    height: 460px;
    position: relative;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }
`;
export const ProductImgs = styled.div`
    display: flex;
    align-items: center;
    img {
        width: 25%;
        height: 126px;
        object-fit: cover;
        object-position: center;
        border-right: 2px solid #333;
        &:nth-child(4) {
            border-right: none;
        }
    }
`;

export const NoneImg = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #efefef;
    &.multiple {
        width: 25%;
        height: 120px;
        border-right: 2px solid #333;
    }
    p {
        margin-top: 15px;
        color: #777;
    }
`;
