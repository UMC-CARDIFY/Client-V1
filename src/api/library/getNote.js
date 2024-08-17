import axiosInstance from '..';

export const getNote = async (noteId) => {
    try {
        const response = await axiosInstance.get('/notes/getNote', {
            params: {
                noteId: noteId
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
