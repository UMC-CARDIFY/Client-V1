import axiosInstance from '..';

export const checkDownload = async (libraryId) => {
    console.log('libraryId', libraryId);
    try {
        const response = await axiosInstance.get('/library/checkDownload', {
            params: {
                libraryId: libraryId
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }

};
