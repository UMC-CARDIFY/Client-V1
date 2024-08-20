import axiosInstance from '..'; 

export const getFilteringFolder = async (color) => {
  try {
    // 쿼리 파라미터를 객체 형태로 전달
    const response = await axiosInstance.get('folders/filter', {
        params:{
            color:color
        }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching filtering folders:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export default getFilteringFolder;