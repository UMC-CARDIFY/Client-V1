import axiosInstance from '..';

export const addNote = async (currentFolderId) => {
    try {
        const response = await axiosInstance.get(`/notes/addNote`, {
            params: {
                folderId: currentFolderId,
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error adding note:", error.response?.data || error.message);
        throw error;
    }
};

export default addNote;
