import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../api/config';

const KakaoCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKakaoLogin = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code) {
        try {
          const response = await axios.post(`${config.apiBaseUrl}/auth/kakao`, { code });

          // 확인용 로그 출력
          console.log("응답 받은 데이터:", response.data);

          // 받아온 액세스 토큰을 로컬 스토리지에 저장
          localStorage.setItem('accessToken', response.data.accessToken);

          // 로그인 성공 후 대시보드로 이동
          alert('카카오 로그인 성공');
          navigate('/dashboard');
        } catch (error) {
          console.error('카카오 로그인 실패:', error);
          alert('카카오 로그인에 실패했습니다.');
          navigate('/sign-in');
        }
      }
    };

    handleKakaoLogin();
  }, [navigate]);

  return <div>로그인 중...</div>;
};

export default KakaoCallback;
