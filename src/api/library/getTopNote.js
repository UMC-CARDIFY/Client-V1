import axiosInstance from '..';

export const getTopNote = async () => {
    try {
        const response = await axiosInstance.get('/library/getTopNote');
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }

};
