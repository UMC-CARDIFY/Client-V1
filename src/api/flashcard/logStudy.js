import axiosInstance from '..';

export const logStudy = async (studyCardSetId, page) => {
    try {
        const response = await axiosInstance.get(`/cards/${studyCardSetId}/study-log`, {
            params: {
                studyCardSetId: studyCardSetId,
                page: page
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default logStudy;