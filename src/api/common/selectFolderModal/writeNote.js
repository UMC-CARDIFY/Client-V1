import axios from 'axios';
import config from '../../config';

export const writeNote = async (folderId) => {
  try {
    const response = await axios.get(
      `${config.apiBaseUrl}/notes/addNote`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        params: { folderId },  // folderId를 쿼리 파라미터로 전달
      }
    );

    return response.data;  // noteId와 createdAt이 반환됨
  } catch (error) {
    console.error('노트 작성 중 오류가 발생했습니다:', error);
    throw error;
  }
};
