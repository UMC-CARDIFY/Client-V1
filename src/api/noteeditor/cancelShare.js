// 노트 자료실 공유 취소 API 
import axiosInstance from '..';

export const cancelShare = async (noteId) => {
  try {
    const response = await axiosInstance.delete(`/notes/cancelShare`, {
      params: {
        noteId: noteId,
      },
    });

    return response.data;
  } catch (error) {
    console.error('공유 취소 중 오류 발생:', error);
    throw error;
  }
};