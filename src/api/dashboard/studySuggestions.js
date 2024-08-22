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
  const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

  // 시간대 오프셋은 이제 고려하지 않음
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
};

export const getStudySuggestions = async (date) => {
  try {
    // 날짜가 오늘인지 확인
    const isToday = (inputDate) => {
      const today = new Date();
      return (
        inputDate.getDate() === today.getDate() &&
        inputDate.getMonth() === today.getMonth() &&
        inputDate.getFullYear() === today.getFullYear()
      );
    };

    // 오늘 날짜는 현재 시간을 그대로 사용, 다른 날짜는 12:00 고정
    const adjustedDate = isToday(date)
      ? date
      : new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0);

    // 백엔드에서 요구하는 타임스탬프 형식으로 변환 (로컬 시간으로 유지)
    const formattedDate = formatDateForBackend(adjustedDate);

    const response = await axios.get(`${config.apiBaseUrl}/cards/study-suggestion`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      params: {
        date: formattedDate, // 포맷팅된 날짜를 API에 전달
      },
    });

    // 데이터 가공 및 반환
    return response.data.reduce((acc, item) => {
      const dateKey = item.remainTime.split('T')[0]; // 날짜만 추출하여 키로 사용
      const cardData = {
        name: item.noteName,
        folderName: item.folderName,
        cardId: item.cardId,
        remainTime: item.remainTime,
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
