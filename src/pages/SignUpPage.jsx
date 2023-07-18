import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../components/common/Input';
import Button from '../components/common/Button/Button';
import useInput from '../hooks/useInput';
import { YELLOW_COLOR, PINK_COLOR, BLUE_COLOR } from '../assets/colors';
import { useMutation, useQueryClient } from 'react-query';
import {
    signUp,
    idAuthCheck,
    emailAuthCheck,
    nickNameAuthCheck,
    emailAuthcodeCheck,
    authCheck,
} from '../api/auth';

import { Link } from 'react-router-dom';
import { BsBack } from 'react-icons/bs';

const SignUpPageStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    h2 {
        width: 100%;
        height: 200px;
        font-size: 40px;
        padding: 50px 0 0;
        margin-bottom: 50px;
        text-align: center;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0;
        border-bottom: 5px solid #333;
        border-radius: 15px;
        z-index: 999;
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
    }
    .go-login:hover {
        color: ${PINK_COLOR[0]};
    }
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
    span {
        position: absolute;
        color: ${BLUE_COLOR.Turkish};
    }
`;
const BackGroundFixed = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${YELLOW_COLOR[1]};
`;
const SignUpPage = () => {
    const [nickName, setNickName, onChangeNickNameHandler] = useInput('');
    const [userId, setUserId, onChangeUserIDHandler] = useInput('');
    const [userpw, setUserpw, onChangeUserpwHandler] = useInput('');
    const [passwordCheck, setPasswordCheck, onChangepasswordCheckHandler] = useInput('');
    const [email, setEmail, onChangeEmailHandler] = useInput('');
    const [emailCheckCode, setEmailCheckCode, onChangeEmailCheckCodeHandler] = useInput('');
    const [phonenumber, setPhonenumber, onChangePhonenumberHandler] = useInput('');

    const [nicknameCheck, setNicknameCheck] = useState(false);
    const [userIdCheck, setUserIdCheck] = useState(false);
    const [emailCheck, setEmailCheck] = useState(false);
    const [authCodeCheck, setAuthCodeCheck] = useState(false);

    // const signup = useMutation((userLoginInfo) => signUp(userLoginInfo));
    // const signup = useMutation((userLoginInfo) => idAuthCheck(userLoginInfo));
    // const signup = useMutation((userLoginInfo) => emailAuthCheck(userLoginInfo));
    // const signup = useMutation((userLoginInfo) => nickNameAuthCheck(userLoginInfo));
    // const signup = useMutation((userLoginInfo) => emailAuthcodeCheck(userLoginInfo));
    // const signup = useMutation((userLoginInfo) => authCheck(userLoginInfo));

    const onClickIDCheckHandler = (e) => {
        e.preventDefault();
        console.log(userId);
    };
    const onClickNickNameCheckHandler = (e) => {
        e.preventDefault();
        console.log(nickName);
    };
    const onClickSendAuthCodeHandler = (e) => {
        e.preventDefault();
        console.log(email);
    };
    const onClickEmailCheckHandler = (e) => {
        e.preventDefault();
        console.log(emailCheckCode);
    };

    const SignUpOnSubmitHandler = async (e) => {
        e.preventDefault();

        if (userpw !== passwordCheck) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        } else if (!nicknameCheck) {
            alert('닉네임 중복체크를 해주세요');
        } else if (!userIdCheck) {
            alert('아이디 중복체크를 해주세요');
        } else if (!emailCheck) {
            alert('이메일 중복체크를 해주세요');
        }

        const userLoginInfo = {
            userId,
            nickName,
            userpw,
            email,
            phonenumber,
        };
        console.log(userLoginInfo);
        // await mutation.mutateAsync(userLoginInfo);
    };

    return (
        <>
            <BackGroundFixed></BackGroundFixed>
            <SignUpPageStyle onSubmit={SignUpOnSubmitHandler}>
                <h2>만나서 반가워요~!</h2>
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
                                placeholder="비밀번호을 입력해주세요"
                                onChange={onChangeUserpwHandler}
                                $coreValue={userpw ? false : true}
                            />
                            <div className="pw-check-box">
                                <Input
                                    label={'비밀번호 확인'}
                                    value={passwordCheck}
                                    placeholder="위에 입력한 비밀번호와 똑같이 입력해주세요"
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
                        <div className="email-wrap">
                            <CheckBox>
                                <Input
                                    label={'이메일'}
                                    value={email}
                                    placeholder="example@gmail.com"
                                    onChange={onChangeEmailHandler}
                                    $coreValue={email ? false : true}
                                />
                                {/* <span className="coreValue">* 중복체크 해주세요</span> */}
                                <Button.Secondary
                                    $width={'120px'}
                                    $center={'center'}
                                    onClick={onClickIDCheckHandler}
                                >
                                    인증 코드
                                </Button.Secondary>
                            </CheckBox>
                            <CheckBox>
                                <Input
                                    label={'인증코드'}
                                    value={emailCheckCode}
                                    placeholder="인증코드을 입력해주세요"
                                    onChange={onChangeEmailCheckCodeHandler}
                                    $coreValue={emailCheckCode ? false : true}
                                />
                                {/* <span className="coreValue">* 중복체크 해주세요</span> */}
                                <Button.Secondary
                                    $width={'120px'}
                                    $center={'center'}
                                    onClick={onClickIDCheckHandler}
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

                    <Link to="/login">
                        <span className="go-login">이미 회원이신가요?</span>
                    </Link>
                </SignUpForm>
            </SignUpPageStyle>
        </>
    );
};

export default SignUpPage;
