import React from 'react';
import styled from 'styled-components';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';

const PageNum = styled.div`
    padding: 20px 0;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    button {
        width: 28px;
        height: 28px;
        /* background-color: none; */
        /* border:none */

        font-size: 1.2rem;
        font-weight: bold;
        color: hotpink;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #333;
        border-top: 2px solid #333;
        border-bottom: 2px solid #333;
        box-shadow: 0 3px 0 #333;
        transform: translateY(-3px);
        transition: all 0.2s ease-in-out;
        cursor: pointer;

        /* line-height: none; */
        &:first-child {
            width: 40px;
            border-left: 2px solid #333;
            border-radius: 10px 0 0 10px;
            background-color: #ffe8ad;
        }
        &:last-child {
            width: 40px;
            border-right: 2px solid #333;
            border-radius: 0 10px 10px 0;
            background-color: #ffe8ad;
        }
        &:hover {
            background-color: pink;
            box-shadow: 0 0px 0 #333;
            transform: translateY(0px);
        }
        &.active {
            background-color: pink;
            box-shadow: 0 0px 0 #333;
            transform: translateY(0px);
        }
    }
`;

const PaginationButton = ({ currentPage, totalPages, handleClick, maxButtons }) => {
    const renderPageButtons = () => {
        const buttons = [];
        const startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
        const endPage = Math.min(totalPages, startPage + maxButtons - 1);

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => handleClick(i)}
                    className={currentPage === i ? 'active' : ''}
                >
                    {i}
                </button>
            );
        }

        return buttons;
    };
    return (
        <PageNum>
            <button onClick={() => handleClick(currentPage - 1)}>
                <AiFillCaretLeft />
            </button>
            {renderPageButtons()}
            <button onClick={() => handleClick(currentPage + 1)}>
                <AiFillCaretRight />
            </button>
        </PageNum>
    );
};

export default PaginationButton;
