import React from 'react';
import styled from 'styled-components';
import { BLUE_COLOR, YELLOW_COLOR } from '../../../assets/colors';

const ToggleBox = styled.div`
    width: ${(props) => props.$width || null};
    display: flex;
    button {
        background-color: ${YELLOW_COLOR[2]};
        width: 50%;
        text-align: center;
        padding: 12px;
        border: 2px solid #333;
        transition: all 0.3s ease-in-out;
        color: #777;
        box-shadow: 0 8px 0px #333;
        transform: translateY(-8px);
        /* background-color: ${YELLOW_COLOR[0]}; */
        &:first-child {
            border-radius: 10px 0 0 10px;
            &:hover {
                background-color: ${YELLOW_COLOR[1]};
                color: #000;
            }
            &.active {
                background-color: ${YELLOW_COLOR[0]};
            }
        }
        &:last-child {
            border-radius: 0 10px 10px 0;
            &:hover {
                background-color: ${BLUE_COLOR.Turkish};
                color: #000;
            }
            &.active {
                background-color: ${BLUE_COLOR.green};
            }
        }

        &.active {
            transform: translateY(0);
            box-shadow: none;
            color: #000;
            &:hover {
                transform: translateY(0px);
                box-shadow: none;
            }
        }
    }
`;

const ToggleButton = ({ toggle, onClickHandler, $width }) => {
    return (
        <ToggleBox $width={$width}>
            <button className={toggle ? `active` : ``} onClick={onClickHandler}>
                판매중
            </button>
            <button className={!toggle ? `active` : ``} onClick={onClickHandler}>
                판매완료
            </button>
        </ToggleBox>
    );
};

export default ToggleButton;
