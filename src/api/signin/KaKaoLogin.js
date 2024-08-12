import axios from 'axios';
import config from '../config'; // config 파일에서 설정 불러옴

export const kakaoLogin = async (code) => {
  try {
    // 인가 코드를 백엔드의 `api/v1/auth/kakao`로 전달
    const response = await axios.post(`${config.apiBaseUrl}/auth/kakao`, { code });
    return response.data; // 백엔드로부터 받은 액세스 토큰 등의 데이터 반환
  } catch (error) {
    throw new Error(error.response?.data?.message || '카카오 로그인에 실패했습니다.');
  }
};
