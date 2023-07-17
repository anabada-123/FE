import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../components/common/Input';
import Button from '../components/common/Button/Button';
import useInput from '../hooks/useInput';
import { YELLOW_COLOR, PINK_COLOR } from '../assets/colors';
import { useMutation, useQueryClient } from 'react-query';
import { signUp } from '../api/auth';

import { Link } from 'react-router-dom';

const SignUpPageStyle = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    /* padding: 0 100px; */
    overflow: hidden;
    background-color: ${YELLOW_COLOR[1]};
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    h2 {
        font-size: 40px;
        margin-bottom: 50px;
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
`;

const IDBox = styled.div`
    width: 100%;
    /* height: 100%; */
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin-top: 30px;
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
`;
const SignUpPage = () => {
    const [name, setName, onChangeNameHandler] = useInput('');
    const [userID, setUserID, onChangeUserIDHandler] = useInput('');
    const [password, setPassword, onChagepasswordHandler] = useInput('');
    const [passwordCheck, setPasswordCheck, onChagepasswordCheckHandler] = useInput('');

    const mutation = useMutation((userLoginInfo) => signUp(userLoginInfo));

    const onClickIDCheckHandler = (e) => {
        e.preventDefault();
    };

    const SignUpOnSubmitHandler = async (e) => {
        e.preventDefault();
        const userLoginInfo = {
            id: userID,
            name,
            password,
        };
        await mutation.mutateAsync(userLoginInfo);
    };
    return (
        <SignUpPageStyle onSubmit={SignUpOnSubmitHandler}>
            <SignUpForm>
                <h2>만나서 반가워요~!</h2>
                <Input
                    label={'닉네임'}
                    value={name}
                    placeholder="성함을 입력해주세요"
                    onChange={onChangeNameHandler}
                    $coreValue={name ? false : true}
                />
                <IDBox>
                    <Input
                        label={'아이디'}
                        value={userID}
                        placeholder="아이디을 입력해주세요"
                        onChange={onChangeUserIDHandler}
                        $coreValue={userID ? false : true}
                    />
                    <span className="coreValue">* 중복체크 해주세요</span>
                    <Button.Secondary
                        $width={'120px'}
                        $center={'center'}
                        onClick={onClickIDCheckHandler}
                    >
                        중복 확인
                    </Button.Secondary>
                </IDBox>
                <Input
                    label={'비밀번호'}
                    value={password}
                    placeholder="비밀번호을 입력해주세요"
                    onChange={onChagepasswordHandler}
                    $coreValue={password ? false : true}
                />
                <Input
                    label={'비밀번호 확인'}
                    value={passwordCheck}
                    placeholder="위에 입력한 비밀번호와 똑같이 입력해주세요"
                    onChange={onChagepasswordCheckHandler}
                    $coreValue={passwordCheck ? false : true}
                />
                <Button.Primary $width={'120px'} $center={'center'}>
                    회원가입
                </Button.Primary>
                <Link to="/login">
                    <span className="go-login">이미 회원이신가요?</span>
                </Link>
            </SignUpForm>
        </SignUpPageStyle>
    );
};

export default SignUpPage;
