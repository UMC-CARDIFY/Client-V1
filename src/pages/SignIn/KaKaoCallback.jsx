import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const KakaoCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKakaoLogin = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code) {
        try {
          // 인가 코드를 백엔드로 전달
          const response = await axios.post('http://localhost:8080/oauth2/callback/kakao', { code });
          
          console.log(response.data); // 백엔드 응답 데이터를 로그로 출력
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
