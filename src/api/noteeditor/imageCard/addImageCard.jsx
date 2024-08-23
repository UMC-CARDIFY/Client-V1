import axiosInstance from "../..";

const getNoteIdFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get('noteId');
};

export const addImageCard = async (imageFile, imageCard) => {
  const noteId = Number(getNoteIdFromUrl());
  console.log('Extracted noteId:', noteId);

  const updatedImageCard = {
    ...imageCard,
    noteId,
  };
  console.log('Updated imageCard:', updatedImageCard);

  const formData = new FormData();
  formData.append('image', imageFile);
  formData.append('imageCard', JSON.stringify(updatedImageCard));

  try {
    const response = await axiosInstance.post('/cards/add/Image', formData, {
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
