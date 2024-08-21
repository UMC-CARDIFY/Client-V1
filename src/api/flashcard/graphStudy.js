import axiosInstance from '..';

export const graphStudy = async (studyCardSetId) => {
    try {
        const response = await axiosInstance.get(`/cards/${studyCardSetId}/study-graph`, {
            params: {
                studyCardSetId: studyCardSetId
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching graph:", error.response?.data || error.message);
        throw error;
    }
};

export default graphStudy;