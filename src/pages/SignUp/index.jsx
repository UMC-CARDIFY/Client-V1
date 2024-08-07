import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IoChevronBack } from 'react-icons/io5';
import { useFormValidation } from './useFormValidation';
import { signUp } from '../../api/signup/signup';
import TermsModal from '../../components/Modal/TermsModal';
import PrivacyModal from '../../components/Modal/PrivacyModal';

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

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 1.5rem;
  margin-left: 7.87rem;
  margin-top: -2rem;
`;

const BackButton = styled(IoChevronBack)`
  font-size: 1.5rem;
  cursor: pointer;
  margin-right: 0.69rem;
`;

const Title = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const SignUpBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 34rem;
  align-items: center;

  @media screen and (max-width: 1440px) {
    width: 33rem;
  }

  @media screen and (max-width: 1200px) {
    width: 29rem;
  }
`;

const InputText = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  align-self: flex-start;
  margin: 0;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 0.5rem 0 2rem 0;

  @media screen and (max-width: 1440px) {
    margin-bottom: 2rem;
  }

  @media screen and (max-width: 1200px) {
    margin-bottom: 2rem;
  }
`;

const Input = styled.input`
  display: flex;
  width: 100%;
  height: 3.25rem;
  padding: 1rem;
  align-items: center;
  flex-shrink: 0;
  border-radius: 0.375rem;
  border: 1px solid;
  border-color: ${(props) => props.$hasError ? '#EA1215' : '#CACACA'};  
  background: var(--Grays-White, #FFF);

  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  box-sizing: border-box;

  &::placeholder {
    color: var(--B1B1B1, #B1B1B1);
  }

  &:focus {
    outline: none;
    border: 1px solid;
    border-color: ${(props) => props.$hasError ? '#EA1215' : '#699BF7'};  
  }
`;

const ErrorMessage = styled.p`
  position: absolute;
  top: 100%;
  left: 0;
  color: #EA1215;
  font-family: Pretendard;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0.25rem 0 0 0;
  align-self: flex-start;
`;

const PWeye = styled.div`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ShowEye = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  svg {
    width: 100%;
    height: 100%;
  }
`;

const AgreeText = styled.div`
  display: flex;
  color: var(--B1B1B1, #B1B1B1);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  align-self: flex-start;
`;

const AgreeContent = styled.p`
  color: #0F62FE;
  text-decoration-line: underline;
  &:hover {
    cursor: pointer;
  }
`;

const VerifyButton = styled.button`
  display: flex;
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
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
    background-color: #244BD7;
  }
`;

export const SignUp = () => {
  const navigate = useNavigate();
  const { errors, validateField } = useFormValidation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordCheckVisible, setPasswordCheckVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const clickPasswordVisible = () => {
    setPasswordVisible(!passwordVisible);
  }

  const clickPasswordCheckVisible = () => {
    setPasswordCheckVisible(!passwordCheckVisible);
  }

  const handleSignUp = async () => {
    try {
      const data = await signUp(name, email, password);
      alert('회원가입에 성공했습니다.');
      console.log(data);
      if (data) {
        navigate('/sign-in');
      }
    } catch (error) {
      alert('회원가입에 실패했습니다.');
      console.error(error);
    }
  };

  const clickVerify = () => {
    if (
      !errors.name &&
      !errors.email &&
      !errors.verificationCode &&
      !errors.password &&
      !errors.passwordCheck &&
      name &&
      email &&
      password &&
      passwordCheck === password
    ) {
      handleSignUp();
    }
  };

  return (
    <Body>
      <Container>
        <Header>
          <BackButton onClick={() => navigate(-1)} />
          <Title>회원가입</Title>
        </Header>
        <SignUpBox>
          <InputText>
            이름 <span style={{ color: '#699BF7' }}>*</span>
          </InputText>
          <InputWrapper>
            <Input
              id="name"
              type="text"
              placeholder="이름을 입력하세요."
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                validateField('name', e.target.value);
              }}
              $hasError={!!errors.name}
            />
            {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          </InputWrapper>

          <InputText>
            이메일 <span style={{ color: '#699BF7' }}>*</span>
          </InputText>
          <InputWrapper>
            <Input
              id="email"
              type="email"
              placeholder="이메일을 입력하세요."
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateField('email', e.target.value);
              }}
              $hasError={!!errors.email}
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </InputWrapper>

          <InputText>
            비밀번호 <span style={{ color: '#699BF7' }}>*</span>
          </InputText>
          <InputWrapper>
            <Input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="8~20자 이내, 영문/숫자 조합"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validateField('password', e.target.value);
              }}
              $hasError={!!errors.password}
            />
            <PWeye onClick={clickPasswordVisible}>
              <ShowEye>
                {passwordVisible ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                  <path
                    d="M12 9.5C11.2044 9.5 10.4413 9.81607 9.87868 10.3787C9.31607 10.9413 9 11.7044 9 12.5C9 13.2956 9.31607 14.0587 9.87868 14.6213C10.4413 15.1839 11.2044 15.5 12 15.5C12.7956 15.5 13.5587 15.1839 14.1213 14.6213C14.6839 14.0587 15 13.2956 15 12.5C15 11.7044 14.6839 10.9413 14.1213 10.3787C13.5587 9.81607 12.7956 9.5 12 9.5ZM12 17.5C10.6739 17.5 9.40215 16.9732 8.46447 16.0355C7.52678 15.0979 7 13.8261 7 12.5C7 11.1739 7.52678 9.90215 8.46447 8.96447C9.40215 8.02678 10.6739 7.5 12 7.5C13.3261 7.5 14.5979 8.02678 15.5355 8.96447C16.4732 9.90215 17 11.1739 17 12.5C17 13.8261 16.4732 15.0979 15.5355 16.0355C14.5979 16.9732 13.3261 17.5 12 17.5ZM12 5C7 5 2.73 8.11 1 12.5C2.73 16.89 7 20 12 20C17 20 21.27 16.89 23 12.5C21.27 8.11 17 5 12 5Z"
                    fill="#1A1A1A"
                  />
                </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M11.83 9L15 12.16V12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9H11.83ZM7.53 9.8L9.08 11.35C9.03 11.56 9 11.77 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.22 15 12.44 14.97 12.65 14.92L14.2 16.47C13.53 16.8 12.79 17 12 17C10.6739 17 9.40215 16.4732 8.46447 15.5355C7.52678 14.5979 7 13.3261 7 12C7 11.21 7.2 10.47 7.53 9.8ZM2 4.27L4.28 6.55L4.73 7C3.08 8.3 1.78 10 1 12C2.73 16.39 7 19.5 12 19.5C13.55 19.5 15.03 19.2 16.38 18.66L16.81 19.08L19.73 22L21 20.73L3.27 3M12 7C13.3261 7 14.5979 7.52678 15.5355 8.46447C16.4732 9.40215 17 10.6739 17 12C17 12.64 16.87 13.26 16.64 13.82L19.57 16.75C21.07 15.5 22.27 13.86 23 12C21.27 7.61 17 4.5 12 4.5C10.6 4.5 9.26 4.75 8 5.2L10.17 7.35C10.74 7.13 11.35 7 12 7Z"
                    fill="#1A1A1A"
                  />
                </svg>
                )}
              </ShowEye>
            </PWeye>
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          </InputWrapper>

          <InputText>
            비밀번호 확인 <span style={{ color: '#699BF7' }}>*</span>
          </InputText>
          <InputWrapper>
            <Input
              type={passwordCheckVisible ? 'text' : 'password'}
              placeholder="비밀번호 확인"
              value={passwordCheck}
              onChange={(e) => {
                setPasswordCheck(e.target.value);
                validateField('passwordCheck', e.target.value, password);
              }}
              $hasError={!!errors.passwordCheck}
            />
            <PWeye onClick={clickPasswordCheckVisible}>
              <ShowEye>
                {passwordCheckVisible ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                  <path
                    d="M12 9.5C11.2044 9.5 10.4413 9.81607 9.87868 10.3787C9.31607 10.9413 9 11.7044 9 12.5C9 13.2956 9.31607 14.0587 9.87868 14.6213C10.4413 15.1839 11.2044 15.5 12 15.5C12.7956 15.5 13.5587 15.1839 14.1213 14.6213C14.6839 14.0587 15 13.2956 15 12.5C15 11.7044 14.6839 10.9413 14.1213 10.3787C13.5587 9.81607 12.7956 9.5 12 9.5ZM12 17.5C10.6739 17.5 9.40215 16.9732 8.46447 16.0355C7.52678 15.0979 7 13.8261 7 12.5C7 11.1739 7.52678 9.90215 8.46447 8.96447C9.40215 8.02678 10.6739 7.5 12 7.5C13.3261 7.5 14.5979 8.02678 15.5355 8.96447C16.4732 9.90215 17 11.1739 17 12.5C17 13.8261 16.4732 15.0979 15.5355 16.0355C14.5979 16.9732 13.3261 17.5 12 17.5ZM12 5C7 5 2.73 8.11 1 12.5C2.73 16.89 7 20 12 20C17 20 21.27 16.89 23 12.5C21.27 8.11 17 5 12 5Z"
                    fill="#1A1A1A"
                  />
                </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M11.83 9L15 12.16V12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9H11.83ZM7.53 9.8L9.08 11.35C9.03 11.56 9 11.77 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.22 15 12.44 14.97 12.65 14.92L14.2 16.47C13.53 16.8 12.79 17 12 17C10.6739 17 9.40215 16.4732 8.46447 15.5355C7.52678 14.5979 7 13.3261 7 12C7 11.21 7.2 10.47 7.53 9.8ZM2 4.27L4.28 6.55L4.73 7C3.08 8.3 1.78 10 1 12C2.73 16.39 7 19.5 12 19.5C13.55 19.5 15.03 19.2 16.38 18.66L16.81 19.08L19.73 22L21 20.73L3.27 3M12 7C13.3261 7 14.5979 7.52678 15.5355 8.46447C16.4732 9.40215 17 10.6739 17 12C17 12.64 16.87 13.26 16.64 13.82L19.57 16.75C21.07 15.5 22.27 13.86 23 12C21.27 7.61 17 4.5 12 4.5C10.6 4.5 9.26 4.75 8 5.2L10.17 7.35C10.74 7.13 11.35 7 12 7Z"
                    fill="#1A1A1A"
                  />
                </svg>
                )}
              </ShowEye>
            </PWeye>
            {errors.passwordCheck && <ErrorMessage>{errors.passwordCheck}</ErrorMessage>}
          </InputWrapper>

          <AgreeText>
            <AgreeContent onClick={() => setShowTermsModal(true)}>이용약관</AgreeContent>
            <p>과 &nbsp;</p>
            <AgreeContent onClick={() => setShowPrivacyModal(true)}>개인정보취급방침</AgreeContent>
            <p>을 확인하고, 동의합니다.</p>
          </AgreeText>

          <VerifyButton onClick={clickVerify}>동의하고 회원가입 하기</VerifyButton>
        </SignUpBox>
      </Container>

      {showTermsModal && <TermsModal onClose={() => setShowTermsModal(false)} />}
      {showPrivacyModal && <PrivacyModal onClose={() => setShowPrivacyModal(false)} />}
    </Body>
  );
};

export default SignUp;