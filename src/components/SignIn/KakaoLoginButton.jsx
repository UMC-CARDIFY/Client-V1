import config from '../../api/config';
import styled from 'styled-components';

const KakaoButton = styled.button`
  display: flex;
  width: 20rem;
  height: 2.8125rem;
  padding: 0;
  justify-content: flex-start;
  align-items: center;
  flex-shrink: 0;
  border: none;
  border-radius: 0.375rem;
  background: var(--kakao-bg, #FEE500);
  margin-top: 0.67rem;
  position: relative;

  &:hover {
    cursor: pointer;
  }
`;

const KakaoLogo = styled.div`
  width: 1.125rem;
  height: 1.125rem;
  margin-left: 0.875rem;

  & > svg {
    width: 100%;
    height: 100%;
  }
`;

const KakaoButtonText = styled.span`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: var(--Grays-Black, #1A1A1A);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 1.40625rem */
`;

const KakaoLoginButton = () => {
  const handleLogin = () => {
    try {
      const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${config.kakao.clientId}&redirect_uri=${config.kakao.redirectUri}&response_type=code`;
      window.location.href = kakaoAuthUrl;
    } catch (error) {
      console.error('카카오 로그인 URL 리다이렉트 중 오류 발생:', error);
      // 사용자에게 오류 메시지를 표시하는 로직을 추가할 수 있습니다.
    }
  };

  return (
    <KakaoButton onClick={handleLogin}>
      <KakaoLogo>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
          <g clipPath="url(#clip0_1850_13627)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.00002 1.1001C4.02917 1.1001 0 4.21306 0 8.05238C0 10.4401 1.5584 12.5451 3.93152 13.7971L2.93303 17.4446C2.84481 17.7669 3.21341 18.0238 3.49646 17.837L7.87334 14.9483C8.2427 14.9839 8.61808 15.0047 9.00002 15.0047C13.9705 15.0047 17.9999 11.8919 17.9999 8.05238C17.9999 4.21306 13.9705 1.1001 9.00002 1.1001Z"
              fill="#1A1A1A"
            />
          </g>
          <defs>
            <clipPath id="clip0_1850_13627">
              <rect width="17.9999" height="18" fill="white" transform="translate(0 0.5)" />
            </clipPath>
          </defs>
        </svg>
      </KakaoLogo>
      <KakaoButtonText>카카오 로그인</KakaoButtonText>
    </KakaoButton>
  );
};

export default KakaoLoginButton;
