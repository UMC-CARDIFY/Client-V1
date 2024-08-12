import axiosInstance from '..'; 

export const getNotes = async () => {
  try {
    const response = await axiosInstance.get('/folders/notes');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
  
};
