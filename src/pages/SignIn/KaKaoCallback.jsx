import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { kakaoLogin } from '../../api/signin/KaKaoLogin';

const KakaoCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKakaoLogin = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code) {
        try {
          const data = await kakaoLogin(code);
          localStorage.setItem('accessToken', data.accessToken);
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
