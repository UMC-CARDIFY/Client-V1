import axiosInstance from '..';

export const getNoteSort = async (order) => {
  try {
    const response = await axiosInstance.get(`/folders/notes/sort?order=${order}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }

};

export default getNoteSort;