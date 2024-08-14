import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { kakaoLogin } from '../../api/signin/KaKaoLogin';

const KakaoCallback = () => {
  const navigate = useNavigate();
  const loginAttempted = useRef(false);

  useEffect(() => {
    const handleKakaoLogin = async () => {
      if (loginAttempted.current) return;
      loginAttempted.current = true;

      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (!code) {
        alert('인증 코드가 없습니다.');
        navigate('/sign-in');
        return;
      }

      try {
        console.log('카카오 로그인 시도:', code);
        const response = await kakaoLogin(code);
        console.log('카카오 로그인 응답:', response);

        if (!response || typeof response !== 'object') {
          throw new Error('잘못된 응답 형식');
        }

        const { accessToken, refreshToken } = response;

        if (!accessToken) {
          throw new Error('액세스 토큰이 없습니다.');
        }

        localStorage.removeItem('accessToken');
        localStorage.setItem('accessToken', accessToken);

        if (refreshToken) {
          localStorage.setItem('refreshToken', refreshToken);
        }

        console.log('로그인 성공, 대시보드로 이동');
        // alert('로그인 성공!');
        navigate('/dashboard', { replace: true });
      } catch (error) {
        console.error('카카오 로그인 실패:', error);
        alert(error.message || '카카오 로그인에 실패했습니다.');
        navigate('/sign-in');
      }
    };

    handleKakaoLogin();
  }, [navigate]);

  return <div>카카오 로그인 처리 중...</div>;
};

export default KakaoCallback;