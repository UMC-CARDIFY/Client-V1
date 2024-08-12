import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { kakaoLogin } from '../../api/signin/KaKaoLogin'; // API 호출 모듈 불러옴

const KakaoCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKakaoLogin = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code'); // URL에서 인가 코드 추출

      if (code) {
        try {
          // 인가 코드를 백엔드로 보내고 응답을 받아옴
          const data = await kakaoLogin(code);

          // 받아온 액세스 토큰을 로컬 스토리지에 저장
          localStorage.setItem('accessToken', data.accessToken);

          // 로그인 성공 후 대시보드로 이동
          navigate('/dashboard');
        } catch (error) {
          console.error('카카오 로그인 실패:', error);
          alert('카카오 로그인에 실패했습니다.');
          navigate('/sign-in'); // 실패 시 로그인 페이지로 이동
        }
      }
    };

    handleKakaoLogin();
  }, [navigate]);

  return <div>로그인 중...</div>; // 로딩 중 메시지 표시
};

export default KakaoCallback;
