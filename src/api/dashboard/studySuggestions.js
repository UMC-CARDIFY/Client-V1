import axios from 'axios';
import config from '../config';

// Helper function to format date as required by the backend (local time)
const formatDateForBackend = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

// 특정 날짜의 학습 제안 카드 가져오기
// 특정 날짜의 학습 제안 카드 가져오기
export const getStudySuggestions = async (date) => {
  try {
    const formattedDate = formatDateForBackend(date); // 날짜를 ISO 8601 형식으로 변환
    const response = await axios.post(
      `${config.apiBaseUrl}/cards/study-suggestion`,
      { date: formattedDate }, // 올바른 형식으로 전달
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );

    return response.data; // 전체 배열을 반환
  } catch (error) {
    console.error('Error fetching study suggestions:', error.response?.data || error.message);
    throw error;
  }
};


// 이번 달 학습 예정 일자 가져오기
export const getMonthlyStudyDates = async (year, month) => {
  try {
    const response = await axios.get(
      `${config.apiBaseUrl}/cards/study-suggestion/${year}/${month}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );
    return response.data; // 날짜 리스트 반환
  } catch (error) {
    console.error('Error fetching study dates:', error.response?.data || error.message);
    throw error;
  }
};
