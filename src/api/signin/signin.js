// api/signin/signin.js
import axios from 'axios';
import config from '../config'; // config import 추가

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${config.apiBaseUrl}/users/login`, {
      email,
      password
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || '입력하신 이메일 또는 비밀번호가 잘못 되었습니다. 이메일과 비밀번호를 정확히 입력해 주세요.');
  }
};
