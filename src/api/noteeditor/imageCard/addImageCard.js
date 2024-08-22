import axiosInstance from '../path_to_axios_instance';

export const addImageCard = async (imageFile, imageCard) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  formData.append('imageCard', JSON.stringify(imageCard));

  try {
    const response = await axiosInstance.post('/api/v1/cards/add/Image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to upload image card:', error);
    throw error;
  }
};
