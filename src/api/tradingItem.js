import axios from 'axios';

const getTradingItem = async (id) => {
    try {
        const response = await axios.get(`http://localhost:3001/item/${id}`);
        return response.data;
    } catch (error) {
        // if (error.response.status === 401) {
        //     alert(error.response.data.message);
        // }
    }
};

const updateTradingItem = async (id, formData) => {
    try {
        console.log(id + formData);
        await axios.put(`http://localhost:3001/item/${id}`, formData);
        alert('상품등록에 성공했습니다');
    } catch (error) {
        alert('상품등록에 실패했습니다.');
    }
};

export { getTradingItem, updateTradingItem };
