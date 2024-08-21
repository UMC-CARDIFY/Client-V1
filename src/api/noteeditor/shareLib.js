// 노트 자료실 업로드 API
import axiosInstance from '..';

export const shareLib = async (noteId, category) => {
  try {
    const response = await axiosInstance.post('/notes/shareLib', {
      noteId,
      category
    });

    return response.data;
  } catch (error) {
    console.error('노트 자료실 업로드 중 오류 발생:', error);
    throw error;
  }
};