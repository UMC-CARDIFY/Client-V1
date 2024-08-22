import axiosInstance from '../path_to_axios_instance';

export const getImageCard = async (imgCardId) => {
  try {
    const response = await axiosInstance.get(`/api/v1/cards/view/${imgCardId}/Image`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch image card:', error);
    throw error;
  }
};