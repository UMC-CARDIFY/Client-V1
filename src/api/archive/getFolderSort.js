import axiosInstance from '..'; 

export const getFolderSort = async (order) => {
  try {
    const response = await axiosInstance.get(`folders/sort?order=${order}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
  
};
