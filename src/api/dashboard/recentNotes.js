import axios from 'axios';
import config from '../config';

export const getRecentNotes = async (size) => {
  try {
    const token = localStorage.getItem('accessToken'); // 로컬스토리지에서 토큰 가져오기
    const headers = {};

    if (token) {
      headers.Authorization = `Bearer ${token}`;
      console.log('Authorization Header:', headers.Authorization); // 토큰이 제대로 설정되었는지 확인
    } else {
      console.log('토큰이 없습니다. 인증이 필요한 요청에 실패할 수 있습니다.');
    }

    const response = await axios.get(`${config.apiBaseUrl}/notes/recent-notes`, {
      headers,
      params: {
        page: 0,
        size: size, // 화면 크기에 따라 3 또는 4로 설정
      },
    });

    console.log('API 응답 데이터:', response.data); // API 응답 데이터 확인
    return response.data;
  } catch (error) {
    console.error('Error fetching recent notes:', error);
    throw error;
  }
};
