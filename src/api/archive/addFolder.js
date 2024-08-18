import axiosInstance from '..';

export const addFolder = async (data) => {
    console.log("data", data);
    try {
        const response = await axiosInstance.post(`/folders/addFolder`,
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

export default addFolder;