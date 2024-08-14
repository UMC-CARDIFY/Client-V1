import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { kakaoLogin } from '../../api/signin/KaKaoLogin';

const KakaoCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKakaoLogin = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code'); // URL에서 인가 코드 추출

      if (code) {
        console.log('인가 코드:', code); // 인가 코드를 콘솔에 출력

        try {
          const data = await kakaoLogin(code);
          localStorage.setItem('accessToken', data.accessToken);
          navigate('/dashboard');
        } catch (error) {
          console.error('카카오 로그인 실패:', error);
          alert('카카오 로그인에 실패했습니다.');
          navigate('/sign-in');
        }
      } else {
        console.error('인가 코드를 받지 못했습니다.');
      }
    };

    handleKakaoLogin();
  }, [navigate]);

  return <div>로그인 중...</div>;
};

export default KakaoCallback;
