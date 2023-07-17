import React from 'react';
import styled from 'styled-components';

const LoginPageSt = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    padding: 0 100px;
    background-color: aliceblue;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .welcome {
        width: 50%;
        height: 100%;
        background-color: aqua;
    }
    .login-box {
        width: 50%;
    }
`;

const LoginForm = styled.form`
    width: 500px;
    height: 600px;
    background-color: yellow;
    margin-bottom: 100px;
`;

const LoginPage = () => {
    return (
        <LoginPageSt>
            <div className="welcome"></div>
            <div className="login-box">
                <LoginForm></LoginForm>
            </div>
        </LoginPageSt>
    );
};

export default LoginPage;
