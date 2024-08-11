import axios from 'axios';
import config from '../config';

export const saveNote = async (noteId, name, contents, token) => {
  try {
    const response = await axios.post(`${config.apiBaseUrl}/notes/write`, {
      noteId,
      name,
      contents
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || '노트 저장에 실패했습니다.');
  }
};
