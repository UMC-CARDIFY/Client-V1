
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { kakaoLogin } from '../../api/signin/KaKaoLogin';

const KakaoCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKakaoLogin = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code'); // URL에서 인가 코드 추출

      console.log(code)
      if (code) {
        console.log('인가 코드:', code); // 인가 코드를 콘솔에 출력

        try {
          // 인가 코드를 백엔드로 보내고 응답을 받아옴
          const response = await kakaoLogin(code);

          // 받아온 액세스 토큰을 로컬 스토리지에 저장
          localStorage.setItem('accessToken', response.accessToken);

          // 로그인 성공 후 대시보드로 이동
          navigate('/dashboard');
        } catch (error) {
          console.error('카카오 로그인 실패:', error.response?.data || error.message);
          alert('카카오 로그인에 실패했습니다: ' + (error.response?.data?.message || error.message));
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
