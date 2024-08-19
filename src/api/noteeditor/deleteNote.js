import axios from 'axios';
import config from '../config';

export const deleteNote = async (noteId, token) => {
  try {
    const response = await axios.delete(`${config.apiBaseUrl}/notes/deleteNote`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        noteId: noteId,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Failed to delete note:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
    throw error;
  }
};