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
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        await axios.put(`${process.env.REACT_APP_SERVER_URL}/items/${id}`, formData, config);
        const msg = '상품등록을 수정했습니다';
        return msg;
    } catch (error) {
        const msg = '상품등록 수정을 실패했습니다';
        return msg;
    }
};

export { getTradingItem, updateTradingItem };
