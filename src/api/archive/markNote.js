import axiosInstance from '..';

export const markNote = async (noteId, markState) => {
    const isMark = markState.markState == "ACTIVE";
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
        console.error("Error fetching folders:", error.response?.data || error.message);
        throw error;
    }

};