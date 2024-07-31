import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { IoChevronBack } from 'react-icons/io5';

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
    margin-bottom: 2rem;
  }

  @media screen and (max-width: 1200px) {
    margin-bottom: 1rem;
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
  border: 1px solid var(--Grays-Gray4, #CACACA);
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
    border: 1px solid #699BF7;
    background: #FFF;
  }
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

const SendMailButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  justify-content: center;
  align-items: center;
  padding: 0.25rem 0.75rem;
  background-color: ${(props) => (props.sent ? '#F0F0F0' : '#F2F4F8')};
  color: ${(props) => (props.sent ? '#767676' : '#0F62FE')};
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;

  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  &:hover {
    background-color: #EBEEF1;
  }
`;

const VerifyCodeButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  justify-content: center;
  align-items: center;
  padding: 0.25rem 0.75rem;
  background-color: #F2F4F8;
  color: #0F62FE;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;

  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  &:hover {
    background-color: #EBEEF1;
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
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordCheckVisible, setPasswordCheckVisible] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const clickPasswordVisible = () => {
        setPasswordVisible(!passwordVisible);
    }
    const clickPasswordCheckVisible = () => {
        setPasswordCheckVisible(!passwordCheckVisible);
    }

    const sendVerificationEmail = () => {
        setEmailSent(true);
        // 이메일 인증 요청 로직 추가하기
    };

    const clickVerify = () => {
        // 입력 정보 유효성 검사하기

        navigate('/signup/verify');
        // 인증하기 버튼 클릭
    }

    return (
      <Body>
        <Container>
          <Header> 
            <BackButton onClick={() => navigate(-1)} />
            <Title>회원가입</Title>
          </Header>
            <SignUpBox>
                <InputText>이름 <span style={{ color: '#699BF7' }}>*</span></InputText>
                <InputWrapper>
                  <Input id="name" type="text" placeholder="이름을 입력하세요." />
                </InputWrapper>

                <InputText>이메일 <span style={{ color: '#699BF7' }}>*</span></InputText>
                <InputWrapper>
                  <Input id="email" type="email" placeholder="이메일을 입력하세요." />
                  <SendMailButton onClick={sendVerificationEmail} sent={emailSent}>
                    {emailSent ? '메일 발송 완료' : '인증 메일 발송'}
                  </SendMailButton>
                </InputWrapper>
                
                <InputText>인증번호 <span style={{ color: '#699BF7' }}>*</span></InputText>
                <InputWrapper>
                  <Input id="verification" type="text" placeholder="이메일로 발송된 인증번호 6자리를 입력하세요" />
                  <VerifyCodeButton>인증 완료</VerifyCodeButton>
                </InputWrapper>

                <InputText>비밀번호 <span style={{ color: '#699BF7' }}>*</span></InputText>
                <InputWrapper>
                    <Input type={passwordVisible? "text" : "password"} placeholder="1~20자 이내, 영문/숫자 조합" />
                    {passwordVisible? <PWeye><ShowEye onClick={()=>clickPasswordVisible()}/></PWeye> : 
                    <PWeye><HiddenEye onClick={()=>clickPasswordVisible()}/></PWeye>
                    }
                </InputWrapper>

                <InputText>비밀번호 확인 <span style={{ color: '#699BF7' }}>*</span></InputText>
                <InputWrapper>
                    <Input type={passwordCheckVisible? "text" : "password"} placeholder="비밀번호 확인" />
                    {passwordCheckVisible? <PWCheckeye><ShowEye onClick={()=>clickPasswordCheckVisible()}/></PWCheckeye> :
                    <PWCheckeye><HiddenEye onClick={()=>clickPasswordCheckVisible()}/></PWCheckeye>
                    }
                </InputWrapper>

                <AgreeText>
                    <AgreeContent onClick={()=>navigate('/signup')}>이용약관</AgreeContent>
                    <p>과 &nbsp;</p>
                    <AgreeContent onClick={()=>navigate('/signup')}>개인정보취급방침</AgreeContent>
                    <p>을 확인하고, 동의합니다.</p>
                </AgreeText>

                <VerifyButton onClick={()=>clickVerify()}>동의하고 회원가입 하기</VerifyButton>
            </SignUpBox>
        </Container>
      </Body>
    )
}

export default SignUp;