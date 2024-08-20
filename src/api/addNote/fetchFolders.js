import axios from 'axios';
import config from '../../api/config';

// 폴더 목록을 조회하는 함수
export const fetchFolders = async ( ) => {
  try {
    const response = await axios.get(`${config.apiBaseUrl}/folders`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Authorization 토큰 추가
      },
    });

    return response.data.foldersList;
  } catch (error) {
    console.error('폴더 목록을 가져오는 중 오류가 발생했습니다:', error);
    throw error;
  }
};
