import React, { useState } from 'react';
import styled from 'styled-components';
import { MONO_COLOR, PINK_COLOR } from '../../assets/colors';
import Button from './Button/Button';
const ModalBack = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    /* backdrop-filter: 50px; */
    z-index: 1;
`;

const ModalStyle = styled.div`
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 460px;
    height: 360px;
    background-color: ${MONO_COLOR[2]};
    border: 4px solid ${MONO_COLOR[1]};
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 20px 50px;
    z-index: 20;

    .modal-content {
        font-size: 1.3rem;
    }
    .modal-text-box {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const ModalTitle = styled.p`
    padding: 20px 20px 10px;
    font-size: 1.6rem;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: center;
    text-transform: uppercase;
    color: #333;
`;

const Modal = ({ children, isOpen, handleClose, subText }) => {
    return (
        <>
            {isOpen && (
                <ModalBack onClick={handleClose}>
                    <ModalStyle>
                        <div className="modal-text-box">
                            <ModalTitle>{children}</ModalTitle>
                            {subText && <p className="modal-content">{subText}</p>}
                        </div>
                        <Button.Primary onClick={handleClose}>확인</Button.Primary>
                    </ModalStyle>
                </ModalBack>
            )}
        </>
    );
};

export default Modal;
