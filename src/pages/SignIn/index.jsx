import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Body = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: var(--Main-BackGround, #F2F4F8);
`;

const Container = styled.div`
  width: 72rem;
  height: 47.5rem;
  flex-shrink: 0;
  border-radius: 0.75rem;
  background: var(--Grays-White, #FFF);
  box-shadow: 0px 4px 26.7px 0px rgba(0, 0, 0, 0.02), 0px 10px 60px 0px rgba(0, 74, 162, 0.03);

  @media (max-width: 1440px) {
    width: 65rem;
    height: 45rem;
  }

  @media (max-width: 1200px) {
    width: 61rem;
    height: 42.5rem;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10.62rem;

  @media (max-width: 1440px) {
    margin-top: 9.37rem;
  }

  @media (max-width: 1200px) {
    margin-top: 8.06rem;
  }
`;

const ImageLogo = styled.div`
  width: 3.88131rem;
  height: 3.25rem;
  flex-shrink: 0;

  & > svg {
    width: 100%;
    height: 100%;
  }
`;

const TextLogo = styled.div`
  width: 14.12644rem;
  height: 2.33381rem;
  flex-shrink: 0;
  margin-left: 1rem;

  & > svg {
    width: 100%;
    height: 100%;
  }
`;

const SignInBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;

  @media (max-width: 1440px) {
    margin-top: 4.5rem;
  }

  @media (max-width: 1200px) {
    margin-top: 4.5rem;
  }
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  display: flex;
  width: 29rem;
  height: 1.1875rem;
  padding: 1rem;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  border-radius: 0.375rem;
  border: 1px solid var(--Grays-Gray4, #CACACA);
  background: var(--Grays-White, #FFF);

  /* 16 Medium */
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &::placeholder {
    color: var(--B1B1B1, #B1B1B1);
  }

  &:focus {
    outline: none;
    border: 1px solid #699BF7;
    background: #FFF;
  }
`;

const EmailInput = styled(Input)``;

const PasswordInput = styled(Input)``;

const SignUpDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3.13rem;
`;

const SignUpText = styled.div`
  color: var(--Grays-Gray3, #B1B1B1);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-right: 0.75rem;
`;

const SignUpLink = styled.div`
  color: var(--Grays-Black, #1A1A1A);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &:hover {
    cursor: pointer;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4.25rem;

  @media (max-width: 1440px) {
    margin-top: 3.25rem;
  }

  @media (max-width: 1200px) {
    margin-top: 2.75rem;
  }
`;

const LoginButton = styled.button`
  display: flex;
  width: 20rem;
  height: 2.6875rem; !important
  padding: 3.25rem 2rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  border: none;
  border-radius: 0.375rem;
  background: var(--Main-Primary, #0F62FE);

  color: var(--Grays-White, #FFF);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &:hover {
    cursor: pointer;
  }
`;

const KakaoSignInButton = styled.button`
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
  margin-top: 0.62rem;
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

export const SignIn = () => {
  const navigate = useNavigate();
  let isLoginAvailable = false;

  const handleSignIn = () => {
    if (isLoginAvailable) {
      alert('로그인 성공');
    }
  };

  return (
    <Body>
      <Container>
        <LogoContainer>
          <ImageLogo>
            <svg xmlns="http://www.w3.org/2000/svg" width="63" height="52" viewBox="0 0 63 52" fill="none">
              <path d="M36.2497 52L10.1389 26.1298L35.9903 0L62.1011 25.8606L36.2497 51.9952V52ZM12.6737 24.7317L28.5158 40.5854L46.2425 25.9519L28.5158 9.51219L12.6737 24.7317Z" fill="#79A5F8"/>
              <path d="M26.1108 52L0 26.1298L25.8514 0L51.9622 25.8606L26.1108 51.9952V52ZM15.849 26.0529L26.0291 36.1413L36.1036 25.9519L25.9235 15.8635L15.849 26.0529Z" fill="#1062FE"/>
            </svg>
          </ImageLogo>
          <TextLogo>
            <svg xmlns="http://www.w3.org/2000/svg" width="227" height="38" viewBox="0 0 227 38" fill="none">
              <path d="M227 1.26221L213.705 25.6476V36.8151H205.771V25.6476L192.476 1.26221H201.543L210.087 18.0571L218.587 1.26221H227Z" fill="#1062FE"/>
              <path d="M163.375 36.8151V1.26221H189.443V8.24192H171.309V16.3122H187.438V23.2047H171.309V36.8151H163.375Z" fill="#1062FE"/>
              <path d="M149.157 1.26221H157.091V36.8151H149.157V1.26221Z" fill="#1062FE"/>
              <path d="M111.568 36.8151V1.26221H125.343C137.113 1.26221 144.392 8.54728 144.392 19.0605C144.392 29.5737 137.113 36.8151 125.343 36.8151H111.568ZM119.502 29.7918H125.474C132.274 29.7918 136.459 25.9093 136.459 19.0605C136.459 12.2116 132.274 8.28555 125.474 8.28555H119.502V29.7918Z" fill="#1062FE"/>
              <path d="M107.894 36.8151H98.6966L91.8091 25.604H85.4883V36.8151H77.5547V1.26221H91.8527C100.876 1.26221 106.151 6.06076 106.151 13.4331C106.151 18.3189 103.84 22.0705 99.6556 24.0335L107.894 36.8151ZM85.4883 8.28555V18.5806H91.504C95.6888 18.5806 98.2171 16.7921 98.2171 13.4331C98.2171 10.0741 95.6888 8.28555 91.504 8.28555H85.4883Z" fill="#1062FE"/>
              <path d="M65.139 36.8151L62.6543 29.9227H48.8794L46.3947 36.8151H38.1995L51.9744 1.26221H60.2132L73.9881 36.8151H65.139ZM51.3205 23.0302H60.2132L55.7669 10.6412L51.3205 23.0302Z" fill="#1062FE"/>
              <path d="M19.9832 37.6877C9.04173 37.6877 0.977295 29.7919 0.977295 19.0169C0.977295 8.242 9.04173 0.346191 19.9832 0.346191C29.7477 0.346191 36.2864 6.23533 37.7249 13.7385H29.7041C28.8759 10.3359 25.2578 7.63127 20.1576 7.63127C13.706 7.63127 8.91095 12.3862 8.91095 19.0169C8.91095 25.604 13.706 30.4026 20.1576 30.4026C25.2578 30.4026 29.4426 27.0436 30.0528 23.8155H38.0737C36.9839 30.9697 29.8349 37.6877 19.9832 37.6877Z" fill="#1062FE"/>
            </svg>
          </TextLogo>
        </LogoContainer>
        <SignInBox>
          <InputBox>
            <EmailInput placeholder='이메일을 입력해주세요.' />
            <PasswordInput type='password' placeholder='비밀번호를 입력해주세요.' />
          </InputBox>
        </SignInBox>

        <SignUpDiv>
          <SignUpText>아직 계정이 없으신가요?</SignUpText>
          <SignUpLink onClick={() => navigate('/signup')}>회원가입</SignUpLink>
        </SignUpDiv>

        <ButtonContainer>
          <LoginButton onClick={handleSignIn}>로그인</LoginButton>
          <KakaoSignInButton>
            <KakaoLogo>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                <g clipPath="url(#clip0_1850_13627)">
                  <path fillRule="evenodd" clipRule="evenodd" d="M9.00002 1.1001C4.02917 1.1001 0 4.21306 0 8.05238C0 10.4401 1.5584 12.5451 3.93152 13.7971L2.93303 17.4446C2.84481 17.7669 3.21341 18.0238 3.49646 17.837L7.87334 14.9483C8.2427 14.9839 8.61808 15.0047 9.00002 15.0047C13.9705 15.0047 17.9999 11.8919 17.9999 8.05238C17.9999 4.21306 13.9705 1.1001 9.00002 1.1001Z" fill="#1A1A1A"/>
                </g>
                <defs>
                  <clipPath id="clip0_1850_13627">
                    <rect width="17.9999" height="18" fill="white" transform="translate(0 0.5)"/>
                  </clipPath>
                </defs>
              </svg>
            </KakaoLogo>
            <KakaoButtonText>카카오 로그인</KakaoButtonText>
          </KakaoSignInButton>
        </ButtonContainer>
      </Container>
    </Body>
  );
};

export default SignIn;
