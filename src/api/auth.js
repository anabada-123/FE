import axios from 'axios';

// const LINK = `http://3.38.191.164`;

export const signUp = async (signupData) => {
    try {
        await axios.post(`http://3.38.191.164/register`, signupData);
        alert('회원가입에 성공했습니다');
    } catch (error) {
        if (error.response.status === 401) {
            alert(error.response.data.message);
        }
    }
};

export const login = async (userid, password) => {
    try {
        const body = {
            id: userid,
            password,
        };
        console.log(body);
        const response = await axios.get(`http://3.38.191.164/login`, body);
        const token = response.data.token;
        localStorage.setItem('accessToken', token);
        alert('로그인에 성공했습니다');
        // return response.data;
    } catch (error) {
        alert(error.response.data.message);
    }
};

export const authCheck = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
        await axios.get(`http://3.38.191.164/user`, {
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
