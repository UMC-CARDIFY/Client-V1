import axiosInstance from '..';

export const getNoteToCategory = async (category, order) => {
    try {
        const response = await axiosInstance.get('/library/getNoteToCategory', {
            params: {
                category: category,
                order: order
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }

};
