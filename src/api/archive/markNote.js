import axiosInstance from '..';

export const markNote = async (noteId, markState) => {
    const isMark = markState === "ACTIVE"; 

    try {
        const response = await axiosInstance.get(`/notes/markNote`, {
            params: {
                noteId: noteId,
                isMark: isMark
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error marking note:", error.response?.data || error.message);
        throw error;
    }
};

export default markNote;
