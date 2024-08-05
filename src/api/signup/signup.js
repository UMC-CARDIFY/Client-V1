import axios from 'axios';
import config from './config';

export const signUp = async (name, email, password) => {
  try {
    const response = await axios.post(`${config.apiBaseUrl}/users/signup`, {
      name,
      email,
      password
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || '회원가입에 실패했습니다.');
  }
};