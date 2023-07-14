import axios from 'axios';

const getTradingItem = async (id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/item/${id}`);
        return response.data;
    } catch (error) {
        // if (error.response.status === 401) {
        //     alert(error.response.data.message);
        // }
    }
};

export { getTradingItem };
