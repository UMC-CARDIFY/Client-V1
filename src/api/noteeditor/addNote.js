// src/api/addNote.js
import axiosInstance from '..';

export const addNoteToFolder = async (folderId) => {
  try {
    const response = await axiosInstance.get('/notes/addNote', {
      params: {
        folderId,
      },
    });

    return response.data;
  } catch (error) {
    console.error('노트 생성 중 오류 발생:', error);
    throw error;
  }
};
