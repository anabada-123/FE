import React from 'react';
import styled, { css } from 'styled-components';

const TextareaBox = styled.div`
    width: 100%;
    text-align: start;
`;

const TextareaSt = styled.textarea`
    width: 100%;
    min-height: ${(props) => props.$heigth || `80px`};
    padding: 12px;
    border: 2px solid #333;
    box-shadow: 0 3px 0 #333;
    border-radius: 10px;
    transform: translateY(-3px);
    transition: all 0.2s ease-in-out;
    &::-webkit-scrollbar {
        display: none;
    }
    ${({ $label }) => {
        if ($label) {
            return css`
                margin-top: 8px;
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

const Textarea = ({ label, value, type, onChangeHandler, $heigth }) => {
    return (
        <TextareaBox>
            <label htmlFor="">{label}</label>
            <TextareaSt
                value={value}
                type={type}
                onChange={onChangeHandler}
                $heigth={$heigth}
                $label={label}
            ></TextareaSt>
        </TextareaBox>
    );
};

export default Textarea;
