import axiosInstance from '..';

export const getMyPageInfo = async () => {
    try {
        const response = await axiosInstance.get('/api/v1/users/mypage');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching my page info:", error.response?.data || error.message);
        throw error;
    }
};

export default getMyPageInfo;