import axios from 'axios';

// const LINK = `http://3.38.191.164`;

export const signUp = async (signupData) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        console.log(signupData);
        const response = await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/register`,
            signupData,
            config
        );
        return response.data;
    } catch (error) {
        // if (error.response.status === 401) {
        //     alert(error.response.data.message);
        // }
    }
};

export const test = async (test) => {
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/test`);
};

export const login = async (logininfo) => {
    try {
        console.log(logininfo);
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            // credentials: 'include' // fatch 설정
        };
        const response = await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/login`,
            logininfo,
            config
        );

        // console.log(response);
        console.log(response.data);
        // console.log(document.cookie);
        return response.data;
    } catch (error) {}
};
// const token = response.data.Authorization;
// localStorage.setItem('accessToken', token);
// console.log(response.headers);
// console.log(error);
// return error.response.data;
// alert(error.response.data.message);
export const idAuthCheck = async (userid) => {
    try {
        const body = {
            userid: userid,
        };

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/register/id-check`,
            body,
            config
        );
        // alert(response.data.msg);
        return response.data;
    } catch (error) {
        if (error.response.status === 400) {
            return error.response.data;
        } else {
            console.log(error);
        }
        // return false;
    }
};

export const nickNameAuthCheck = async (nickName) => {
    try {
        const body = {
            nickname: nickName,
        };
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/register/nickname-check`,
            body,
            config
        );
        // alert(response.data.msg);
        return response.data;

        // return true;
    } catch (error) {
        if (error.response.status === 400) {
            // console.log(error.response.data.errorMsg);
            return error.response.data;
        } else {
            console.log(error);
        }
        return false;
    }
};

export const emailAuthCheck = async (email) => {
    try {
        const body = {
            email: email,
        };
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/register/email-send`,
            body,
            config
        );
        alert(response.data.msg);
        return true;
    } catch (error) {
        if (error.response.status === 400) {
            console.log(error.response.data.errorMsg);
        } else {
            console.log(error);
        }
        return false;
    }
};

//이메일 인증코드와 이메일 인증 요청
export const emailAuthCodeCheck = async (emailAuth) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        console.log(emailAuth);
        await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/register/email-check`,
            emailAuth,
            config
        );
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
        // if (error.response.status === 401) {
        //     localStorage.removeItem('accessToken');
        // }
        return false;
    }
};
