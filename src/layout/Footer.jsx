import React from 'react';
import styled from 'styled-components';
import { MONO_COLOR, BLUE_COLOR, PINK_COLOR, YELLOW_COLOR } from '../assets/colors';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { BsGithub } from 'react-icons/bs';

const FooterSt = styled.footer`
    width: 100%;
    /* height: 100px; */
    background-color: ${BLUE_COLOR.green};
    padding: 100px 0;
    color: ${MONO_COLOR[0]};

    .center {
        width: 100%;
        display: flex;
        justify-content: space-between;
        gap: 30px;
        /* align-items: ; */
        & > div {
            width: 25%;
            /* text-align: center; */
            p {
                font-size: 1.4rem;
                font-weight: bold;
                margin-bottom: 15px;
                font-family: 'SBAggroB';
            }
            pre {
                /* overflow: hidden; */
                /* width: 80%; */
                word-wrap: break-word;
                white-space: pre-wrap;
                text-overflow: ellipsis;
            }
        }
        @media screen and (max-width: 768px) {
            flex-direction: column;
            text-align: center;
            & > div {
                width: 80%;
                padding: 60px 20px;
                margin: 0 auto;
                p {
                    margin-bottom: 30px;
                }
            }
        }
    }
`;
const ProjectOutline = styled.div`
    pre {
        padding: 12px 0;
        line-height: 1.7;
        font-weight: bold;
    }
`;
const DevelopedPageList = styled.div`
    p {
        margin-bottom: 15px;
    }
    li {
        padding: 12px 16px;
        font-size: 1rem;

        margin-top: 20px;
        border: 2px solid #000;
        background-color: ${BLUE_COLOR.green};
        border-radius: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: bold;
        box-shadow: 0px 5px 0px #000;
        color: #000;
        transform: translateY(-5px);
        transition: all 0.2s ease-in-out;
        cursor: pointer;

        svg {
            stroke: none;
        }
        &:hover {
            border: 2px solid #000;
            box-shadow: 0px 0px 0px #000;
            transform: translateY(0);
            /* opacity: 0.6; */
            svg {
                stroke: #000;
            }
        }
        &:active {
            opacity: 1;
            filter: brightness(0.9);
        }
        @media screen and (max-width: 768px) {
            border: 2px solid #000;
            margin-bottom: 15px;
        }
    }
`;
const ProjectGithub = styled.div`
    pre {
        padding: 12px 0;
        line-height: 1.7;
        font-weight: bold;
        margin-bottom: 15px;
    }
`;
const GoGithubLink = styled.a`
    display: block;
    padding: 12px 16px;
    border-radius: 8px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* opacity: 0.6; */
    font-weight: bold;
    border: 2px solid #000;
    background-color: ${BLUE_COLOR.green};
    box-shadow: 0px 5px 0px #000;
    color: #000;
    transform: translateY(-5px);
    transition: all 0.2s ease-in-out;

    cursor: pointer;
    svg {
        stroke: #000;
    }
    span {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
    }
    &:hover {
        box-shadow: 0px 0px 0px #000;
        transform: translateY(0);
    }
    &:active {
        filter: brightness(0.9);
    }
`;
const Footer = () => {
    return (
        <FooterSt>
            <div className="center">
                <ProjectOutline>
                    <p>Introduce Project</p>
                    <pre>
                        주특기 주차 미니 프로젝트 주특기 주차 <br />
                        미니 프로젝트 주특기 주차 미니 프로젝트 주특기 주차 미니 프로젝트
                    </pre>
                </ProjectOutline>
                <DevelopedPageList>
                    <p>Developed pages</p>
                    <ul>
                        <Link to="/">
                            <li>
                                main page
                                <FiArrowRight size={25} />
                            </li>
                        </Link>
                        <Link to="/productuplode">
                            <li>
                                trading item uplode page
                                <FiArrowRight size={25} />
                            </li>
                        </Link>
                        <Link to="/productdetail/:id">
                            <li>
                                trading item detail page
                                <FiArrowRight size={25} />
                            </li>
                        </Link>
                        <Link to="/productdetail/:id/update">
                            <li>
                                trading item update page
                                <FiArrowRight size={25} />
                            </li>
                        </Link>
                        <Link to="/login">
                            <li>
                                login page
                                <FiArrowRight size={25} />
                            </li>
                        </Link>
                        <Link to="signup">
                            <li>
                                sing up page
                                <FiArrowRight size={25} />
                            </li>
                        </Link>
                    </ul>
                </DevelopedPageList>
                <ProjectGithub>
                    <p>more view Project</p>
                    <pre>
                        주특기 주차 미니 프로젝트 주특기 주차 <br />
                        미니 프로젝트 주특기 주차 미니 프로젝트 주특기 주차 미니 프로젝트
                    </pre>
                    <div className="link-box">
                        <GoGithubLink url="https://github.com/anabada-123/FE">
                            <span>
                                <BsGithub size={20} />
                                FE github
                            </span>
                            <FiArrowRight size={25} />
                        </GoGithubLink>
                        <GoGithubLink url="https://github.com/anabada-123/BE">
                            <span>
                                <BsGithub size={20} />
                                BE github
                            </span>
                            <FiArrowRight size={25} />
                        </GoGithubLink>
                    </div>
                </ProjectGithub>
            </div>
        </FooterSt>
    );
};

export default Footer;
