import axios from 'axios';
import config from '../config';

let isLoginProcessing = false;

export const kakaoLogin = async (code) => {
  if (isLoginProcessing) {
    console.warn('카카오 로그인 처리 중입니다. 중복 요청을 방지합니다.');
    return;
  }

  isLoginProcessing = true;

  try {
    console.log('카카오 로그인 요청 시작:', code);
    const response = await axios.post(
      `${config.apiBaseUrl}/oauth2/callback/kakao`, 
      { code },
      {
        timeout: 10000, // 10초 타임아웃 설정
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('카카오 로그인 응답 받음:', response.data);
    return response.data;
  } catch (error) {
    console.error('카카오 로그인 에러:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || '카카오 로그인에 실패했습니다.');
  } finally {
    isLoginProcessing = false;
  }
};