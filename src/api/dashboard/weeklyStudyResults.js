import axios from 'axios';
import config from '../config'; // API 기본 URL이 설정된 파일

export const getWeeklyStudyResults = async () => {
  try {
    const response = await axios.get(`${config.apiBaseUrl}/cards/weekly-count`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weekly study results:', error);
    throw error;
  }
};
