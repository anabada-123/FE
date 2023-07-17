import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsFillChatFill, BsPersonFill } from 'react-icons/bs';
import { IoMdLogOut } from 'react-icons/io';
import { BiAddToQueue } from 'react-icons/bi';
import { GiCube } from 'react-icons/gi';
import { BLUE_COLOR } from '../assets/colors';
import Input from '../components/common/Input';
import Button from '../components/common/Button/Button';
const HeaderSt = styled.header`
    width: 100%;
    background-color: #efefef;
    border-bottom: 2px solid #333;
    background-color: hotpink;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .center {
        width: 100%;
        height: 100%;
    }
    .logo {
        width: 100%;
        padding: 30px 0 20px;
        /* margin-right: 24px; */
        display: flex;
        align-items: center;
        border-bottom: 3px solid #333;
        & > .center {
            display: flex;
            align-items: center;
        }
    }
    form {
        width: 50%;
        display: flex;
        align-items: center;
    }
`;
const Navbar = styled.nav`
    width: 100%;
    padding: 12px 0 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const Logo = styled.div`
    /* width: 50px; */
    /* height: 60px; */
    display: inline-block;
    margin-left: 12px;
    font-size: 4rem;
    font-weight: bold;
`;

const NavIcon = styled.nav`
    width: 50%;
    height: 40px;
    /* background-color: pink; */
    display: flex;
    gap: 16px;
    justify-content: end;
    align-items: center;
    .head-icon {
        background-color: ${BLUE_COLOR.green};
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        padding: 5px;
        border-radius: 10px;
        border: 2px solid #333;
        cursor: pointer;
        &:hover {
            filter: brightness(0.8);
        }
        &:active {
            background-color: ${BLUE_COLOR.Turkish};
        }
    }
`;

const Header = () => {
    return (
        <HeaderSt>
            <div className="logo">
                <div className="center">
                    <Link to="/">
                        <GiCube size={50} fill={'#fff'} />
                        <Logo>logo</Logo>
                    </Link>
                </div>
            </div>
            <div className="center">
                <Navbar>
                    <form action="">
                        <Input $width="90%" />
                        <Button.Icon $padding={'5px 6px'}>
                            <AiOutlineSearch size={24} fill={'hotpink'} />
                        </Button.Icon>
                    </form>
                    <NavIcon>
                        <Link to="/productcreate" className="head-icon">
                            <BiAddToQueue size={24} />
                        </Link>
                        <Link to="/" className="head-icon">
                            <BsPersonFill size={25} />
                        </Link>
                        <Link to="/" className="head-icon">
                            <BsFillChatFill size={20} />
                        </Link>
                        <Link to="/" className="head-icon">
                            <IoMdLogOut size={24} />
                        </Link>
                    </NavIcon>
                </Navbar>
            </div>
        </HeaderSt>
    );
};

export default Header;
