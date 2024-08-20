import axiosInstance from '..'; 

export const getFilteringNote = async (color) => {
  try {
    // 쿼리 파라미터를 객체 형태로 전달
    const response = await axiosInstance.get('folders/notes/filter', {
        params:{
            color:color
        }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching filtering notes:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export default getFilteringNote;