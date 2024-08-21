import axiosInstance from '..';

export const deleteCardSet = async (studyCardSetId) => {
    try {
        const response = await axiosInstance.delete(`/cards/${studyCardSetId}`, {
            params: {
                studyCardSetId: studyCardSetId
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default deleteCardSet;