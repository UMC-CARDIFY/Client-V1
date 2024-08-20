import axiosInstance from '..';

export const getCategory = async () => {
    try {
        const response = await axiosInstance.get('/library/getCategory');
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
