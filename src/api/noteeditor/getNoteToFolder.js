// 특정 폴더 내 노트 조회 API
import axiosInstance from '..';

export const getNotesByFolder = async (folderId) => {
  try {
    const response = await axiosInstance.post('/notes/getNoteToFolder', {
      folderId,
      page: 0,
      size: 20,
      order: 'asc',
    });

    return response.data;
  } catch (error) {
    console.error('노트 목록을 가져오는 중 오류 발생:', error);
    throw error;
  }
};