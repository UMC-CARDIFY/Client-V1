import axiosInstance from '..';

export const completedStudy = async (studyCardSetId) => {
    try {
        const response = await axiosInstance.get(`/cards/${studyCardSetId}/study-completed`, {
            params: {
                studyCardSetId: studyCardSetId
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching folders:", error.response?.data || error.message);
        throw error;
    }
};

export default completedStudy;