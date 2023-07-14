import React from 'react';
import styled, { css } from 'styled-components';

const InputBox = styled.div`
    width: ${(props) => props.$width || `100%`};
    text-align: start;
`;

const InputSt = styled.input`
    width: 100%;
    min-height: 42px;
    padding: 8px 12px;
    border: 2px solid #333;
    border-radius: 10px;
    box-shadow: 0 3px 0 #333;
    transform: translateY(-3px);
    transition: all 0.2s ease-in-out;
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

const Input = ({ label, value, type, onChangeHandler, $width, multiple, ref }) => {
    return (
        <InputBox $width={$width}>
            {label ? <label>{label}</label> : null}
            <InputSt
                value={value}
                type={type}
                onChange={onChangeHandler}
                multiple={multiple}
                $label={label}
                ref={ref}
            />
        </InputBox>
    );
};

export default Input;
