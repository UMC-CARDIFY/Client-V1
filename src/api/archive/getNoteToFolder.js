import axiosInstance from '..';

export const getNoteToFolder = async (folderId) => {
    try {
        const response = await axiosInstance.post('/notes/getNoteToFolder', {
            "folderId": folderId
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }

};