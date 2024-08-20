import axiosInstance from '..'; 

export const getFolderSort = async (order, currentPage, pageSize) => {
  try {
    // 쿼리 파라미터를 객체 형태로 전달
    const response = await axiosInstance.get('folders/sort', {
      params: {
        order: order,
        page: currentPage,
        size: pageSize
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching sorted folders:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export default getFolderSort;
