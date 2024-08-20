import axiosInstance from '..';

export const getFolders = async (page = 0, size = 6) => {
  try {
    const response = await axiosInstance.get(`/folders`, {
      params: { page, size }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getFolders;