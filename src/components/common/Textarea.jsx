import React from 'react';
import styled, { css } from 'styled-components';
import { PINK_COLOR } from '../../assets/colors';
const TextareaBox = styled.div`
    width: 100%;
    text-align: start;
    .coreValue {
        /* position: absolute; */
        color: ${PINK_COLOR[0]};
        font-size: 0.9rem;
        margin-left: 4px;
    }
`;

const TextareaSt = styled.textarea`
    width: 100%;
    min-height: ${(props) => props.$heigth || `80px`};
    padding: ${(props) => props.$padding || `12px`};
    border: 2px solid #333;
    box-shadow: 0 5px 0 #333;
    border-radius: 10px;
    transform: translateY(-5px);
    transition: all 0.2s ease-in-out;
    font-size: 1.1rem;
    &::-webkit-scrollbar {
        display: none;
    }
    ${({ $label }) => {
        if ($label) {
            return css`
                margin-top: 12px;
            `;
        }
    }}
    ${({ $center }) => {
        if ($center) {
            return css`
                text-align: center;
            `;
        }
    }}
    &:hover {
        box-shadow: 0 0px 0 #333;
        transform: translateY(0px);
    }
    &:focus {
        box-shadow: 0 0px 0 #333;
        border: 2px solid hotpink;
        transform: translateY(0px);
    }
`;

const Textarea = ({ label, $coreValue, ...restProps }) => {
    return (
        <TextareaBox>
            <label htmlFor="">{label}</label>
            {$coreValue ? <span className="coreValue">* 필수 입력란 입니다</span> : null}
            <TextareaSt {...restProps} $label={label}></TextareaSt>
        </TextareaBox>
    );
};

export default Textarea;
