import axiosInstance from '..'; 

export const getFolderFilterSort = async (color, order, page, size) => {
  try {
    const response = await axiosInstance.get('folders/sort-filter', {
        params:{
            size: size,
            page: page,
            order: order,
            color:color
        }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching filtering folders:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export default getFolderFilterSort;