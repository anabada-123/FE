import axios from 'axios';

//전체조회
// 본서버용
const getTradingItems = async (currentPage) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/items`, {
            params: { page: currentPage },
        });
        // console.log(currentPage);
        return response.data;
    } catch (error) {
        // if (error.response.status === 401) {
        //     alert(error.response.data.message);
        // }
    }
};

const deleteTradingItems = async (id) => {
    try {
        await axios.delete(`${process.env.REACT_APP_SERVER_URL}/items/${id}`);
        alert('상품 삭제 성공했습니다.');
    } catch (error) {
        alert('상품 삭제 실패했습니다.');
    }
};

const addTradingItems = async (formData) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/items`, formData, config);
        alert('상품등록에 성공했습니다');
    } catch (error) {
        alert('상품등록에 실패했습니다.');
    }
};

export { getTradingItems, addTradingItems, deleteTradingItems };
