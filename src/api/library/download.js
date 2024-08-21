import axiosInstance from '..';

export const download = async (libraryId, folderId, isDownloadContain) => {
    console.log(libraryId, folderId, isDownloadContain);
    try {
        const response = await axiosInstance.post('/library/download', {
            libraryId: libraryId,
            folderId: folderId,
            isEdit: isDownloadContain
        });
        return response.data.noteId;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.code === 2003) {
            alert('본인이 작성한 노트입니다');
        } else {
            console.error(error);
        }
        throw error; // Rethrow the error so it can be handled by the caller
    }
};
