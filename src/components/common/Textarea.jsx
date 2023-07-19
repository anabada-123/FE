import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { PINK_COLOR, BLUE_COLOR } from '../../assets/colors';

const TextareaBox = styled.div`
    width: 100%;
    text-align: start;
    position: relative;
    .coreValue {
        /* position: absolute; */
        color: ${PINK_COLOR[0]};
        font-size: 0.9rem;
        margin-left: 4px;
        position: absolute;
        right: 12px;
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
    ${({ $coreStyle }) => {
        if ($coreStyle) {
            return css`
                border: 2px solid ${PINK_COLOR[0]};
                box-shadow: 0 5px 0 ${PINK_COLOR[0]};
            `;
        }
    }}
    &:hover {
        box-shadow: 0 0px 0 #333;
        transform: translateY(0px);
    }
    &:focus {
        box-shadow: 0 0px 0 #333;
        border: 2px solid ${BLUE_COLOR.Turkish};
        outline: 3px solid ${BLUE_COLOR.green};
        transform: translateY(0px);
    }
`;

const Textarea = ({ label, $coreValue, value, ...restProps }) => {
    const [coreValueClick, setCoreValueClick] = useState(false);
    const [coreNoneStyle, setCoreNoneStyle] = useState(false);
    useEffect(() => {
        if (value === '' && $coreValue === true && coreValueClick === true) {
            setCoreNoneStyle(true);
        } else if (value !== '') {
            setCoreNoneStyle(false);
        }
    }, [value, $coreValue, coreValueClick]);
    return (
        <TextareaBox>
            <label htmlFor="">{label}</label>
            {coreNoneStyle ? <span className="coreValue">* 필수 입력란 입니다</span> : null}
            <TextareaSt
                {...restProps}
                $label={label}
                $coreStyle={coreNoneStyle}
                value={value}
                onClick={() => setCoreValueClick(true)}
            ></TextareaSt>
        </TextareaBox>
    );
};

export default Textarea;
