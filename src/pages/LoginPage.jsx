import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Input from '../components/common/Input';
import Button from '../components/common/Button/Button';
import useInput from '../hooks/useInput';
import { Link } from 'react-router-dom';
import { login } from '../api/auth';
import { useMutation } from 'react-query';
import { PINK_COLOR, YELLOW_COLOR, MONO_COLOR } from '../assets/colors';
import Modal, { IntentCheckModel } from '../components/common/Modal';
import { test } from '../api/auth';
const LoginPageSt = styled.div`
    width: 100%;
    height: 100vh;
    /* padding: 0 100px; */
    overflow: hidden;
    background-color: ${YELLOW_COLOR[1]};
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 768px) {
        flex-direction: column;
    }
    .welcome {
        width: 50%;
        height: 100%;
        /* background-color: aqua; */
        @media screen and (max-width: 768px) {
            display: none;
        }
    }
    .login-box {
        width: 50%;
        min-width: 600px;
        height: 100%;
        padding: 0 100px;
        /* background-color: #3a6f6f; */
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const LoginForm = styled.form`
    /* padding: 100px 30px 0; */
    width: 500px;
    height: 600px;
    /* background-color: yellow; */
    margin-bottom: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 2px solid #333;
    box-shadow: 0 8px 0 #333;
    border-radius: 15px;

    h2 {
        font-size: 2rem;
        margin-bottom: 50px;
    }
    .input-box {
        width: 70%;
        margin-bottom: 50px;
        input {
            margin-bottom: 20px;
        }
    }
    button {
        margin-bottom: 20px;
    }
    .go-signup {
        font-size: 1rem;
        font-weight: bold;
        padding: 12px 18px;
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
    @media screen and (max-width: 768px) {
        width: 80%;
        .input-box {
            width: 80%;
        }
    }
    @media screen and (max-width: 400px) {
        width: 74%;
    }
`;

const LoginPage = () => {
    const [isOpenIntentCheck, setIsOpenIntentCheck] = useState(false);

    const [massage, setMassage] = useState('');
    const openModalIntentCheck = () => {
        setIsOpenIntentCheck(true);
    };
    const handleIntentCheck = () => {
        setIsOpenIntentCheck(false);
        window.location.reload();
    };
    const [userID, setUserID, userIDHandler] = useInput();
    const [password, setPassword, passwordHandler] = useInput();

    // const loginSearch = useQuery('items', () => login(userID, password));
    const mutation = useMutation((userLoginInfo) => login(userLoginInfo), {
        onSuccess: () => {
            setMassage('로그인 성공했습니다');
            openModalIntentCheck();
        },
    });
    // const mutation = useMutation(test);

    const LoginOnSubmitHandler = async (e) => {
        e.preventDefault();
        const userLoginInfo = {
            userid: userID,
            userpw: password,
        };
        // const json = JSON.parse(userLoginInfo);
        await mutation.mutateAsync(userLoginInfo);
    };
    return (
        <>
            <LoginPageSt>
                <div className="welcome"></div>
                <div className="login-box">
                    <LoginForm onSubmit={LoginOnSubmitHandler}>
                        <h2>로그인</h2>
                        <div className="input-box">
                            <Input
                                label={'아이디'}
                                value={userID}
                                onChange={userIDHandler}
                                placeholder="아이디"
                            />
                            <Input
                                label={'비밀번호'}
                                value={password}
                                type={'password'}
                                onChange={passwordHandler}
                                placeholder="비밀번호"
                            />
                        </div>
                        <Button.Primary $width={'120px'} $center={'center'}>
                            로그인
                        </Button.Primary>
                        <Link to="/signup" className="go-signup">
                            회원이 아니신가요?
                        </Link>
                    </LoginForm>
                </div>
            </LoginPageSt>
            <IntentCheckModel
                isOpenIntentCheck={isOpenIntentCheck}
                onClickEvent={handleIntentCheck}
            >
                {massage && massage}
            </IntentCheckModel>
        </>
    );
};

export default LoginPage;
