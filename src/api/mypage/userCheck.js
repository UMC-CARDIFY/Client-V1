import axiosInstance from '..';

export const userCheck = async () => {
    try {
        const response = await axiosInstance.get('/users/check');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error :", error.response?.data || error.message);
        throw error;
    }
};

export default userCheck;