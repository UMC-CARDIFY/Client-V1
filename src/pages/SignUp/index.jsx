import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { IoChevronBack } from 'react-icons/io5';
import { useFormValidation } from './useFormValidation';
import axios from 'axios';

const Body = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 72rem;
  height: auto;
  flex-shrink: 0;

  @media screen and (max-width: 1440px) {
    width: 65rem;
  }

  @media screen and (max-width: 1200px) {
    width: 53rem;
  }
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 1.5rem;
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
  margin: 0.25rem 0 3rem 0;

  @media screen and (max-width: 1440px) {
    margin-bottom: 2.5rem;
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
  border-color: ${(props) => props.hasError ? '#EA1215' : '#CACACA'};  
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
    border-color: ${(props) => props.hasError ? '#EA1215' : '#699BF7'};  
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
const PWCheckeye = styled.div`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const ShowEye = styled(AiFillEye)`
    width: 1.5rem;
    height: 1.5rem;
        &:hover {
            cursor: pointer;
            }
`;
const HiddenEye = styled(AiFillEyeInvisible)`
    width: 1.5rem;
    height: 1.5rem;
        &:hover {
            cursor: pointer;
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
  margin-top: 1rem;
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
    border: 1px solid #D9D9D9;
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

    const clickPasswordVisible = () => {
        setPasswordVisible(!passwordVisible);
    }
    const clickPasswordCheckVisible = () => {
        setPasswordCheckVisible(!passwordCheckVisible);
    }

    const handleSignUp = async () => {
      try {
          const response = await axios.post('http://3.37.13.40:8080/api/v1/users/signup', {
              name,
              email,
              password
          });
          if (response.status === 200) {
              alert('회원가입에 성공했습니다.');
              navigate('/signup/verify');
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
                hasError={!!errors.name}
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
                hasError={!!errors.email}
              />
              {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            </InputWrapper>
  
            <InputText>
              비밀번호 <span style={{ color: '#699BF7' }}>*</span>
            </InputText>
            <InputWrapper>
              <Input
                type={passwordVisible ? 'text' : 'password'}
                placeholder="1~20자 이내, 영문/숫자 조합"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  validateField('password', e.target.value);
                }}
                hasError={!!errors.password}
              />
              {passwordVisible ? (
                <PWeye>
                  <ShowEye onClick={clickPasswordVisible} />
                </PWeye>
              ) : (
                <PWeye>
                  <HiddenEye onClick={clickPasswordVisible} />
                </PWeye>
              )}
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
                hasError={!!errors.passwordCheck}
              />
              {passwordCheckVisible ? (
                <PWCheckeye>
                  <ShowEye onClick={clickPasswordCheckVisible} />
                </PWCheckeye>
              ) : (
                <PWCheckeye>
                  <HiddenEye onClick={clickPasswordCheckVisible} />
                </PWCheckeye>
              )}
              {errors.passwordCheck && <ErrorMessage>{errors.passwordCheck}</ErrorMessage>}
            </InputWrapper>
  
            <AgreeText>
              <AgreeContent onClick={() => navigate('/signup')}>이용약관</AgreeContent>
              <p>과 &nbsp;</p>
              <AgreeContent onClick={() => navigate('/signup')}>개인정보취급방침</AgreeContent>
              <p>을 확인하고, 동의합니다.</p>
            </AgreeText>
  
            <VerifyButton onClick={clickVerify}>동의하고 회원가입 하기</VerifyButton>
          </SignUpBox>
        </Container>
      </Body>
    );
  };
  
  export default SignUp;