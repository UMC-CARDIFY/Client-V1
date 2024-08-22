import axiosInstance from '..';

export const getCards = async () => {
    try {
        const response = await axiosInstance.get(`/cards/sort-filter`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching folders:", error.response?.data || error.message);
        throw error;
    }
};

export default getCards;

