import axiosInstance from '..';

export const postNoteSearch = async (folderId,searchTxt ) => {
    console.log("folderId,searchTxt", folderId,searchTxt);
    try {
        const response = await axiosInstance.post(`/notes/search`,
            {
                "folderId": folderId,
                "searchTxt": searchTxt
              }
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching folders:", error.response?.data || error.message);
        throw error;
    }

};

export default postNoteSearch;