import axiosInstance from '..';

export const deleteNote = async (noteId) => {
    try {
        const response = await axiosInstance.delete(`/notes/deleteNote`, {
            params: {
                noteId: noteId
            }
        }
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching note:", error.response?.data || error.message);
        throw error;
    }

};