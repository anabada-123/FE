import axios from 'axios';

//전체조회
const getTradingItems = async ({ currentPage }) => {
    try {
        const response = await axios.get(`http://localhost:3001/item`);
        return response.data;
    } catch (error) {
        // if (error.response.status === 401) {
        //     alert(error.response.data.message);
        // }
    }
};

const addTradingItems = async (formData) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        await axios.post('http://localhost:3001/item', formData, config);
        alert('상품등록에 성공했습니다');
    } catch (error) {
        alert('상품등록에 실패했습니다.');
    }
};

export { getTradingItems, addTradingItems };
