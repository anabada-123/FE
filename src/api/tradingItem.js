import axios from 'axios';

const getTradingItem = async (id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/items/${id}`);
        return response.data;
    } catch (error) {
        // if (error.response.status === 401) {
        //     alert(error.response.data.message);
        // }
    }
};

const updateTradingItem = async (id, formData) => {
    try {
        // console.log(id + formData);
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        await axios.put(`${process.env.REACT_APP_SERVER_URL}/items/${id}`, formData, config);
        alert('상품등록에 성공했습니다');
    } catch (error) {
        alert('상품등록에 실패했습니다.');
    }
};

export { getTradingItem, updateTradingItem };
