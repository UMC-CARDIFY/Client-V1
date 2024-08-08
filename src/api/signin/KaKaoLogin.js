import axios from 'axios';
import config from '../config';

export const kakaoLogin = async (code) => {
  try {
    const response = await axios.post(`${config.apiBaseUrl}/users/kakao-login`, { code });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || '카카오 로그인에 실패했습니다.');
  }
};
