import axiosInstance from '..';

export const difficultySelect = async (cardId, difficulty) => {
    console.log(cardId, difficulty);
    try {
        const response = await axiosInstance.post(`/cards/difficulty`, {
            cardId: cardId,
            difficulty: difficulty
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching folders:", error.response?.data || error.message);
        throw error;
    }
};

export default difficultySelect;