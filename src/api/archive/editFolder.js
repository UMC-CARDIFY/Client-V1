import axiosInstance from '..';

export const editFolder = async (folderId, data) => {
    console.log("data", data);
    try {
        const response = await axiosInstance.patch(`/folders/${folderId}`,
            {
                "name": data.folderName,
                "color": data.selectedColor
            }
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching folders:", error.response?.data || error.message);
        throw error;
    }

};