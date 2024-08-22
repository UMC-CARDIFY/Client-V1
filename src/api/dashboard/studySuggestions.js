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

export const getStudySuggestions = async (date) => {
  try {
    const isToday = (inputDate) => {
      const today = new Date();
      return (
        inputDate.getDate() === today.getDate() &&
        inputDate.getMonth() === today.getMonth() &&
        inputDate.getFullYear() === today.getFullYear()
      );
    };

    const adjustedDate = isToday(date)
      ? date
      : new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0); 


    const formattedDate = formatDateForBackend(adjustedDate);

    const response = await axios.post(
      `${config.apiBaseUrl}/cards/study-suggestion`,
      { date: formattedDate },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );

    console.log("API 요청 날짜:", formattedDate); // 요청한 날짜 확인
    console.log("API 응답 데이터:", response.data); 
    return response.data.reduce((acc, item) => {
      const dateKey = item.remainTime.split('T')[0];
      const cardData = {
        name: item.noteName,
        folderName: item.folderName,
        cardId: item.cardId,
        remainTime: item.remainTime,
        color: item.color 
      };
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(cardData);
      return acc;
    }, {});
  } catch (error) {
    console.error('Error details:', error.response?.data || error.message);
    throw error;
  }
};
