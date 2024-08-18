import axiosInstance from '..';

export const getNotes = async () => {
  try {
    const response = await axiosInstance.get('/folders/notes');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }

};

export default getNotes;