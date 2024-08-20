import axiosInstance from '..';

export const download = async (libraryId, folderId, isContainCard) => {
    try {
        const response = await axiosInstance.post('/library/download', {
            libraryId: libraryId,
            folderId: folderId,
            isContainCard: isContainCard
        });
        return response.data.noteId;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getFolders = async () => {
    try {
        const response = await axiosInstance.get('/folders');
        console.log(response.data);
        return response.data.foldersList;
    } catch (error) {
        console.error("Error fetching folders:", error.response?.data || error.message);
        throw error;
    }
};
