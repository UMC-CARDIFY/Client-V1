import axiosInstance from '..';

export const getNotes = async (page = 0, size = 6) => {
  try {
    const response = await axiosInstance.get(`folders/notes`, {
      params: { page, size }
    });
    console.log('Get Notes Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
};

export default getNotes;
