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
        /* height: 590px; */
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 20px;
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
        cursor: pointer;
        &:nth-child(4) {
            border-right: none;
        }
        &:hover {
            filter: brightness(0.8);
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

export const ToggleIsSale = styled.div`
    /* min-height: 54px; */
    display: flex;
    button {
        background-color: ${YELLOW_COLOR[2]};
        width: 50%;
        text-align: center;
        padding: 12px;
        border: 2px solid #333;
        transition: all 0.3s ease-in-out;
        color: #777;
        &:first-child {
            border-radius: 10px 0 0 10px;
            &:hover {
                background-color: ${YELLOW_COLOR[1]};
            }
        }
        &:last-child {
            border-radius: 0 10px 10px 0;
            &:hover {
                background-color: ${BLUE_COLOR.Turkish};
            }
            &.active {
                background-color: ${BLUE_COLOR.green};
            }
        }

        &.active {
            box-shadow: 0 8px 0px #333;
            transform: translateY(-8px);
            background-color: ${YELLOW_COLOR[0]};
            color: #000;
            &:hover {
                transform: translateY(0px);
                box-shadow: none;
            }
        }
    }
`;
