// api/signin/signin.js
import axios from 'axios';
import config from '../config'; // config import 추가

export const login = async (email, password) => {
  const data = {
    email: email,
    password: password,
  };
  try {
    const response = await axios.post(`${config.apiBaseUrl}/users/login`, data);

    localStorage.setItem('accessToken', response.data.accessToken);

    // console.log('accessToken',response.data.accessToken)
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || '입력하신 이메일 또는 비밀번호가 잘못 되었습니다. 이메일과 비밀번호를 정확히 입력해 주세요.';
    throw new Error(errorMessage);
  }
};
