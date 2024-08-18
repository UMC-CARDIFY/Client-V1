import axiosInstance from '..';

export const getNoteSort = async (order, page = 0, size = 6) => {
  try {
    const response = await axiosInstance.get(`/notes/sort`, {
      params: { order, page, size }
    });
    console.log('Get Note Sort Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching sorted notes:', error);
    throw error;
  }
};

export default getNoteSort;
