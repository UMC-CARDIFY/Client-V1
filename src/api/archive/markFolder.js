import axiosInstance from '..';

export const markFolder = async (folderId, data) => {
    try {
        const response = await axiosInstance.patch(`/folders/${folderId}/mark-folders`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching folders:", error.response?.data || error.message);
        throw error;
    }

};