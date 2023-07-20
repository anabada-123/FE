import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../components/common/Input';
import Button from '../components/common/Button/Button';
import useInput from '../hooks/useInput';
import Modal, { IntentCheckModel } from '../components/common/Modal';

import { useNavigate } from 'react-router-dom';
import { YELLOW_COLOR, PINK_COLOR, BLUE_COLOR, MONO_COLOR } from '../assets/colors';
import { useMutation, useQueryClient } from 'react-query';
import {
    signUp,
    idAuthCheck,
    emailAuthCheck,
    nickNameAuthCheck,
    emailAuthCodeCheck,
} from '../api/auth';

import { Link } from 'react-router-dom';
import { BsBack } from 'react-icons/bs';

const SignUpPageStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .welcome-join {
        width: 100%;
        height: 200px;
        /* font-size: 40px; */
        padding: 50px 0 0;
        margin-bottom: 20px;
        text-align: center;
        /* position: absolute; */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        /* top: 0; */
        border-bottom: 5px solid #333;
        border-radius: 15px;
        z-index: 1;
        background-color: ${YELLOW_COLOR[1]};
        h2 {
            font-size: 3rem;
        }
    }
    .go-login {
        font-size: 1rem;
        font-weight: bold;
        padding: 15px 30px;
        margin-bottom: 20px;
        border: 2px solid ${YELLOW_COLOR[1]};
        border-radius: 10px;
        opacity: 0.6;
        cursor: pointer;
        &:hover {
            border: 2px solid ${MONO_COLOR[1]};
        }
        &:active {
            opacity: 1;
            background-color: ${YELLOW_COLOR[0]};
        }
    }
`;

const SignUpForm = styled.form`
    width: 600px;
    /* height: 500px; */
    padding: 60px 100px 50px;
    margin: 0 auto;
    /* background-color: aliceblue; */
    text-align: center;
    border: 2px solid #333;
    box-shadow: 0 8px 0 #333;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;

    & > div {
        width: 100%;
    }
    input {
        margin-bottom: 30px;
    }
    & > button {
        margin: 40px 0 20px;
        width: 100%;
    }
    /* .go-login {
        position: absolute;
        z-index: 999;
    } */

    .pw-check-box {
        position: relative;
    }
    .pw-check-masseg {
        position: absolute;
        color: ${PINK_COLOR[0]};
        top: 0;
        right: 12px;
        font-size: 0.9rem;
    }
    @media screen and (max-width: 768px) {
        width: 90%;
        padding: 50px 30px;
        gap: 60px;
        & > button {
            width: 80%;
        }
    }
`;

const CheckBox = styled.div`
    width: 100%;
    /* height: 100%; */
    display: flex;
    justify-content: center;
    align-items: flex-end;
    /* margin-top: 30px; */
    position: relative;

    .coreValue {
        position: absolute;
        top: 0;
        right: 12px;
        font-size: 0.9rem;
        color: ${PINK_COLOR[0]};
    }
    button {
        margin: 0;
        margin-left: 20px;
        margin-bottom: 30px;
    }
    @media screen and (max-width: 768px) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 50px;
        button {
            width: 80%;
            margin-left: 0;
        }
    }
    /* span {
        position: absolute;
        color: ${BLUE_COLOR.Turkish};
    } */
`;
const BackGroundFixed = styled.div`
    /* position: absolute;
    top: 0;
    left: 0; */
    width: 100%;
    padding-bottom: 100px;
    /* height: 100%; */
    background-color: ${YELLOW_COLOR[1]};
`;
const SignUpPage = () => {
    const nav = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenIntentCheck, setIsOpenIntentCheck] = useState(false);
    const [massage, setMassage] = useState('');
    const openModal = () => {
        setIsOpen(true);
    };
    const handleClose = () => {
        setIsOpen(false);
    };
    const openModalIntentCheck = () => {
        setIsOpenIntentCheck(true);
    };
    const handleIntentCheck = () => {
        setIsOpenIntentCheck(false);
        nav('/login');
    };

    const [nickName, setNickName, onChangeNickNameHandler] = useInput('');
    const [nicknameCheck, setNicknameCheck] = useState(false);
    const nickNameCheckMutation = useMutation(() => nickNameAuthCheck(nickName), {
        onSuccess: (data) => {
            if (data.msg) {
                setMassage(data.msg);
                setNicknameCheck(true);
            }
            if (data.errorMsg) {
                setMassage(data.errorMsg);
                setNicknameCheck(false);
            }
            openModal();
        },
    });
    const onClickNickNameCheckHandler = async (e) => {
        e.preventDefault();
        if (!nickName) {
            setMassage('닉네임을 입력해주세요.');
            openModal();
            return;
        }
        const nickname = {
            nickname: nickName,
        };
        await nickNameCheckMutation.mutateAsync(nickname);
    };

    const [userId, setUserId, onChangeUserIDHandler] = useInput('');
    const [userIdCheck, setUserIdCheck] = useState(false);
    const idCheckMutation = useMutation((userId) => idAuthCheck(userId), {
        onSuccess: (data) => {
            if (data.msg) {
                setMassage(data.msg);
                setUserIdCheck(true);
            }
            if (data.errorMsg) {
                setMassage(data.errorMsg);
                setUserIdCheck(false);
            }
            openModal();
        },
    });
    const onClickIDCheckHandler = async (e) => {
        e.preventDefault();
        if (!userId) {
            setMassage('아이디를 입력해주세요');
            openModal();
            return;
        }
        await idCheckMutation.mutateAsync(userId);
    };

    const [userpw, setUserpw, onChangeUserpwHandler] = useInput('');
    const [passwordCheck, setPasswordCheck, onChangepasswordCheckHandler] = useInput('');

    //이메일 인증

    const [email, setEmail, onChangeEmailHandler] = useInput('');

    const emailCheckMutation = useMutation((email) => emailAuthCheck(email), {
        onSuccess: (data) => {
            if (data.msg) {
                if (data.msg) {
                    setMassage(data.msg);
                    openModal();
                }
            }
        },
    });
    const onClickEmailCodeHandler = async (e) => {
        e.preventDefault();
        if (!email) {
            setMassage('이메일 주소를 입력해주세요');
            openModal();
            return;
        }
        await emailCheckMutation.mutateAsync(email);
    };

    const [emailAuthCode, setEmailAuthCode, onChangeEmailAuthCheckCodeHandler] = useInput('');
    const [MailAuthCheck, setMailAuthCheck] = useState(false);
    const emailAuthcodeCheckMutation = useMutation(
        (emailAuthData) => emailAuthCodeCheck(emailAuthData),
        {
            onSuccess: (data) => {
                if (data.msg) {
                    setMassage(data.msg);
                    setMailAuthCheck(true);
                }
                if (data.errorMsg) {
                    setMassage(data.errorMsg);
                    setUserIdCheck(false);
                }
                openModal();
            },
        }
    );
    const onChangeEmailAuthCodeCheckHandler = async (e) => {
        e.preventDefault();
        if (!emailAuthCode) {
            setMassage('이메일 인증코드를 입력해주세요');
            openModal();
            return;
        }
        const emailAuthData = {
            email: email,
            successKey: emailAuthCode,
        };
        await emailAuthcodeCheckMutation.mutateAsync(emailAuthData);
        // console.log(emailAuthData);
    };

    const [phonenumber, setPhonenumber, onChangePhonenumberHandler] = useInput('');

    const signupMutation = useMutation((userLoginInfo) => signUp(userLoginInfo), {
        onSuccess: (data) => {
            setMassage(data.msg);
            openModalIntentCheck();
        },
    });

    // const authCheckMutation = useMutation((userLoginInfo) => authCheck(userLoginInfo));

    const SignUpOnSubmitHandler = async (e) => {
        e.preventDefault();

        if (userpw !== passwordCheck) {
            setMassage('비밀번호가 일치하지 않습니다.');
            openModal();
            return;
        } else if (!nicknameCheck) {
            setMassage('닉네임 중복체크를 해주세요');
            openModal();
            return;
        } else if (!userIdCheck) {
            setMassage('아이디 중복체크를 해주세요');
            openModal();
            return;
        } else if (!MailAuthCheck) {
            setMassage('이메일 인증를 해주세요');
            openModal();
            return;
        }

        const userLoginInfo = {
            userid: userId,
            nickname: nickName,
            userpw,
            email,
            phonenumber,
            successKey: emailAuthCode,
        };
        await signupMutation.mutateAsync(userLoginInfo);
    };

    return (
        <>
            <BackGroundFixed>
                <SignUpPageStyle onSubmit={SignUpOnSubmitHandler}>
                    <div className="welcome-join">
                        <h2>만나서 반가워요~!</h2>
                    </div>
                    <Link to="/login" className="go-login">
                        이미 회원이신가요?
                    </Link>
                    <SignUpForm>
                        <div className="core-info">
                            <div className="userId-wrap">
                                <CheckBox>
                                    <Input
                                        label={'아이디'}
                                        value={userId}
                                        placeholder="아이디을 입력해주세요"
                                        onChange={onChangeUserIDHandler}
                                        $coreValue={userId ? false : true}
                                        readOnly={userIdCheck}
                                    />
                                    {/* <span className="coreValue">* 중복체크 해주세요</span> */}
                                    <Button.Secondary
                                        $width={'120px'}
                                        $center={'center'}
                                        onClick={onClickIDCheckHandler}
                                    >
                                        중복 확인
                                    </Button.Secondary>
                                </CheckBox>
                            </div>
                            <div className="password-wrap">
                                <Input
                                    label={'비밀번호'}
                                    value={userpw}
                                    type={'password'}
                                    placeholder="비밀번호을 입력해주세요"
                                    onChange={onChangeUserpwHandler}
                                    $coreValue={userpw ? false : true}
                                />
                                <div className="pw-check-box">
                                    <Input
                                        label={'비밀번호 확인'}
                                        type={'password'}
                                        value={passwordCheck}
                                        placeholder="입력한 비밀번호와 똑같이 입력해주세요"
                                        onChange={onChangepasswordCheckHandler}
                                    />
                                    {userpw !== passwordCheck && passwordCheck ? (
                                        <span className="pw-check-masseg">
                                            * 비밀번호와 동일하지 않습니다
                                        </span>
                                    ) : null}
                                </div>
                            </div>
                        </div>

                        <div className="sub-info">
                            <div className="nickName-wrap">
                                <CheckBox>
                                    <Input
                                        label={'닉네임'}
                                        value={nickName}
                                        placeholder="닉네임을 입력해주세요"
                                        onChange={onChangeNickNameHandler}
                                        $coreValue={nickName ? false : true}
                                        readOnly={nicknameCheck}
                                    />
                                    {/* <span className="coreValue">* 중복체크 해주세요</span> */}
                                    <Button.Secondary
                                        $width={'120px'}
                                        $center={'center'}
                                        onClick={onClickNickNameCheckHandler}
                                    >
                                        중복 확인
                                    </Button.Secondary>
                                </CheckBox>
                            </div>
                            <div className="email-wrap">
                                <CheckBox>
                                    <Input
                                        label={'이메일'}
                                        value={email}
                                        placeholder="example@gmail.com"
                                        onChange={onChangeEmailHandler}
                                        $coreValue={email ? false : true}
                                        readOnly={MailAuthCheck}
                                    />
                                    {/* <span className="coreValue">* 중복체크 해주세요</span> */}
                                    <Button.Secondary
                                        $width={'120px'}
                                        $center={'center'}
                                        onClick={onClickEmailCodeHandler}
                                    >
                                        인증 코드
                                    </Button.Secondary>
                                </CheckBox>
                                <CheckBox>
                                    <Input
                                        label={'인증코드'}
                                        value={emailAuthCode}
                                        placeholder="인증코드을 입력해주세요"
                                        onChange={onChangeEmailAuthCheckCodeHandler}
                                        $coreValue={emailAuthCode ? false : true}
                                        readOnly={MailAuthCheck}
                                    />
                                    {/* <span className="coreValue">* 중복체크 해주세요</span> */}
                                    <Button.Secondary
                                        $width={'120px'}
                                        $center={'center'}
                                        onClick={onChangeEmailAuthCodeCheckHandler}
                                    >
                                        인증 확인
                                    </Button.Secondary>
                                </CheckBox>
                            </div>
                            <div className="phonenumber-wrap">
                                <Input
                                    label={'전화번호'}
                                    value={phonenumber}
                                    placeholder="전화번호를 입력해주세요"
                                    onChange={onChangePhonenumberHandler}
                                    $coreValue={phonenumber ? false : true}
                                />
                            </div>
                        </div>
                        <Button.Primary $width={'120px'} $center={'center'}>
                            회원가입
                        </Button.Primary>
                    </SignUpForm>
                </SignUpPageStyle>
                <Modal isOpen={isOpen} handleClose={handleClose}>
                    {massage && massage}
                </Modal>
                <IntentCheckModel
                    isOpenIntentCheck={isOpenIntentCheck}
                    onClickEvent={handleIntentCheck}
                >
                    {massage && massage}
                </IntentCheckModel>
            </BackGroundFixed>
        </>
    );
};

export default SignUpPage;
