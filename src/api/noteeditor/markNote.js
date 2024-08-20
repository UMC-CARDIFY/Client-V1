import axios from 'axios';
import config from '../config';

export const markNote = async (noteId, isMark, token) => {
  try {
    const response = await axios.get(`${config.apiBaseUrl}/notes/markNote`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        noteId: noteId,
        isMark: isMark,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Failed to mark note as favorite:', error);
    throw error;
  }
};