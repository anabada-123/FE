import axios from 'axios';

// const LINK = `http://3.38.191.164`;

export const signUp = async (signupData) => {
    try {
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/register`, signupData);
        alert('회원가입에 성공했습니다');
    } catch (error) {
        if (error.response.status === 401) {
            alert(error.response.data.message);
        }
    }
};

export const login = async (body) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        console.log(body);
        const response = await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/login`,
            body,
            config
        );
        console.log(response.data);
        alert('로그인에 성공했습니다');
        // return response.data;
    } catch (error) {
        console.log(error);
        // alert(error.response.data.message);
    }
};

export const idAuthCheck = async (userid) => {
    try {
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/register/id-check`, userid);
        return true;
    } catch (error) {
        return false;
    }
};

export const emailAuthCheck = async (email, successKey) => {
    const body = {
        email,
        successKey,
    };
    try {
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/register/id-check`, body);
    } catch (error) {}
};

export const nickNameAuthCheck = async (nickName) => {
    try {
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/register/id-check`, nickName);
    } catch (error) {}
};

export const emailAuthcodeCheck = async (email) => {
    try {
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/register/id-check`, email);
    } catch (error) {}
};

export const authCheck = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
        await axios.get(`${process.env.REACT_APP_SERVER_URL}/user`, {
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        });
        return true;
    } catch (error) {
        if (error.response.status === 401) {
            localStorage.removeItem('accessToken');
        }
        return false;
    }
};
