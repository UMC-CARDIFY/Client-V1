import axiosInstance from '..';

export const studyCardSet = async (studyCardSetId, page) => {
    try {
        const response = await axiosInstance.get(`/cards/${studyCardSetId}`, {
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

export default studyCardSet;