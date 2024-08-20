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
