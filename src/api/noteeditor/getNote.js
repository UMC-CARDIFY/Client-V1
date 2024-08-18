import axios from 'axios';
import config from '../../api/config';

// 노트 데이터를 가져오는 함수
export const getNote = async (noteId) => {
  try {
    const token = localStorage.getItem('accessToken'); // 토큰 가져오기

    if (!token) {
      throw new Error('로그인이 필요합니다.');
    }

    // noteId와 API 경로를 출력하여 확인
    console.log('Fetching note with ID:', noteId);
    console.log('API URL:', `${config.apiBaseUrl}/notes/getNote`);

    // GET 요청으로 노트 데이터 가져오기
    const response = await axios.get(`${config.apiBaseUrl}/notes/getNote`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        noteId: noteId,
      },
    });
    
    if (response.status === 200) {
      console.log('Fetched Note Data:', response.data); // 이 줄을 추가하여 데이터를 콘솔에 출력
      return response.data; // 성공적으로 데이터를 받아오면 리턴
    } else {
      throw new Error(`노트 데이터를 불러오는 데 실패했습니다. 상태 코드: ${response.status}`);
    }
  } catch (error) {
    console.error('노트 조회 중 오류 발생:', error);
    throw error; // 오류 발생 시 호출된 곳에서 처리하도록 오류 던지기
  }
};
