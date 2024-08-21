import axiosInstance from '..'; 

export const getNoteFilterSort = async (color, order, page, size) => {
  try {
    const response = await axiosInstance.get('folders/notes/sort-filter', {
        params: {
            size: size,
            page: page,
            order: order,
            color: color
        }
    });
    return response.data;
  } catch (error) {
    console.error('Error getNoteFilterSort:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export default getNoteFilterSort;
