import axiosInstance from '..';

export const deleteFolder = async (folderId) => {
    try {
        const response = await axiosInstance.delete(`/folders/${folderId}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching folders:", error.response?.data || error.message);
        throw error;
    }

};

export default deleteFolder;