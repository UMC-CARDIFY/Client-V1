import axiosInstance from '..';

export const getFolders = async () => {
  try {
    const response = await axiosInstance.get('/folders');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching folders:", error.response?.data || error.message);
    throw error;
  }

};