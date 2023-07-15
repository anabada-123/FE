import React from 'react';
import styled, { css } from 'styled-components';
import { BLUE_COLOR, YELLOW_COLOR } from '../../assets/colors';
const InputBox = styled.div`
    width: ${(props) => props.$width || `100%`};
    text-align: start;
`;

const InputSt = styled.input`
    font-size: 1.1rem;
    width: 100%;
    min-height: 42px;
    padding: 8px 12px;
    border: 2px solid #333;
    border-radius: 10px;
    box-shadow: 0 5px 0 #333;
    transform: translateY(-5px);
    transition: all 0.2s ease-in-out;
    ${({ $label }) => {
        if ($label) {
            return css`
                margin-top: 12px;
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
const InputFileWrapSt = styled.div`
    display: flex;
    .label {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30%;
        padding: 8px 12px;
        background-color: ${YELLOW_COLOR[0]};
        border-radius: 10px 0 0 10px;
        border: 2px solid #333;
        box-shadow: 0 5px 0 #333;
        transform: translateY(-5px);
        transition: all 0.2s ease-in-out;
        cursor: pointer;
        &:hover {
            box-shadow: 0 0px 0 #333;
            transform: translateY(0px);
        }
        &:focus {
            box-shadow: 0 0px 0 #333;
            border: 2px solid hotpink;
            transform: translateY(0px);
        }
    }
`;

const InputFake = styled.input`
    font-size: 1.1rem;
    width: 100%;
    min-height: 42px;
    padding: 8px 12px;
    border: 2px solid #333;
    border-radius: 0 10px 10px 0;
`;

const InputFileSt = styled.input.attrs({ type: 'file' })`
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
`;

const Input = ({ label, $width, ...restProps }) => {
    return (
        <InputBox $width={$width}>
            {label ? <label>{label}</label> : null}
            <InputSt {...restProps} $label={label} />
        </InputBox>
    );
};

const InputFileWrap = ({ children }) => {
    return <InputFileWrapSt>{children}</InputFileWrapSt>;
};

export const InputFile = ({ label, $width, $idName, $value, ...restProps }) => {
    return (
        <InputBox $width={$width}>
            <InputFileWrap>
                {label ? (
                    <label htmlFor={$idName} className="label">
                        {label}
                    </label>
                ) : null}
                <InputFake type="text" value={$value} readOnly />
            </InputFileWrap>
            <InputFileSt type="file" id={$idName} {...restProps} $label={label} />
        </InputBox>
    );
};

export default Input;
