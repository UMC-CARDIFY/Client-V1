import axiosInstance from '..';

export const getTopCategory = async () => {
    try {
        const response = await axiosInstance.get('/library/getTopCategory');
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }

};
