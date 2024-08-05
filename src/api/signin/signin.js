import axios from 'axios';

export const login = async (email, password) => {
  try {
    const response = await axios.post('/api/v1/users/login', {
      email,
      password
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || '로그인에 실패했습니다.');
  }
};
