import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../components/common/Input';
import Button from '../components/common/Button/Button';
import useInput from '../hooks/useInput';
import { Link } from 'react-router-dom';
import { login } from '../api/auth';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { PINK_COLOR, YELLOW_COLOR } from '../assets/colors';
const LoginPageSt = styled.div`
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
    .welcome {
        width: 50%;
        height: 100%;
        /* background-color: aqua; */
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
    .go-signup:hover {
        color: ${PINK_COLOR[0]};
    }
`;

const LoginPage = () => {
    const [userID, setUserID, userIDHandler] = useInput();
    const [password, setPassword, passwordHandler] = useInput();

    // const loginSearch = useQuery('items', () => login(userID, password));
    const queryClient = useQueryClient();
    const mutation = useMutation((userLoginInfo) => login(userLoginInfo), {
        onSuccess: () => {
            queryClient.invalidateQueries('tradingItem');
        },
    });

    const LoginOnSubmitHandler = async (e) => {
        e.preventDefault();
        const userLoginInfo = {
            id: userID,
            password,
        };
        await mutation.mutateAsync(userLoginInfo);
    };
    return (
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
                            onChange={passwordHandler}
                            placeholder="비밀번호"
                        />
                    </div>
                    <Button.Primary $width={'120px'} $center={'center'}>
                        로그인
                    </Button.Primary>
                    <Link to="/signup">
                        <span className="go-signup">회원이 아니신가요?</span>
                    </Link>
                </LoginForm>
            </div>
        </LoginPageSt>
    );
};

export default LoginPage;
