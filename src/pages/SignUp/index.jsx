import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Desktop, Laptop, Tablet } from '../../styles/MediaQuery';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const Body = styled.div`
display: flex;
width: 100vw;
height: 100vh;
justify-content: center;
align-items: center;
background: #EDEDED;
    `;

const Container = styled.div`
width: 72rem;
height: 47.5rem;
flex-shrink: 0;
background: #FFF;
box-shadow: 0px 4px 26.7px 0px rgba(0, 0, 0, 0.02), 0px 10px 60px 0px rgba(0, 74, 162, 0.03);
`

const LaptopContainer = styled(Container)`
width: 65rem;
height: 45rem;
`;

const TabletContainer = styled(Container)`
width: 61rem;
height: 42.5rem;
`

const SignUpBox = styled.div`
margin: 6.25rem 19rem 0 19rem;
position: relative;
`;

const LaptopSignUpBox = styled(SignUpBox)`
margin:  6rem 16rem 0 16rem;
`;


const TabletSignUpBox = styled(SignUpBox)`
margin: 4rem 16rem 0 16rem;
`;

const InputText = styled.p`
color: #000;
/* 16 Medium */
font-family: Pretendard;
font-size: 1rem;
font-style: normal;
font-weight: 500;
line-height: normal;
`;

const Input = styled.input`
display: flex;
width: 34rem;
padding: 0.875rem 1rem;
align-items: center;
gap: 0.5rem;
flex-shrink: 0;
border: 1px solid #D9D9D9;
background: #FFF;
/* 16 Medium */
font-family: Pretendard;
font-size: 1rem;
font-style: normal;
font-weight: 500;
line-height: normal;
margin-bottom: 1.6rem;
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

const PasswordInput = styled(Input)`
    `;

const PasswordCheckInput = styled(Input)`
    margin-bottom:0;
    `;

    const LaptopInput = styled(Input)`
width: 33rem;
`;
const LaptopPasswordInput = styled(LaptopInput)`
`;
const LaptopPasswordCheckInput = styled(LaptopInput)`
margin-bottom: 0;
`;
const TabletInput = styled(Input)`
width: 29rem;
`;
const TabletPasswordInput = styled(TabletInput)`
`;
const TabletPasswordCheckInput = styled(TabletInput)`
margin-bottom: 0;
`;

const PWeye = styled.div`
    display: flex;
    position: absolute;
    right: 1rem;
    top: 17.7rem;
    `;
const PWCheckeye = styled.div`
    display: flex;
    position: absolute;
    right: 1rem;
    top: 24.9rem;
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

const SignUpDiv = styled.div`
    display: flex;
    margin-top: 2rem;
    `;

const TabletSignUpDiv = styled(SignUpDiv)`

`;

const AgreeText = styled.div`
display: flex;
    color: var(--B1B1B1, #B1B1B1);
/* 16 Medium */
font-family: Pretendard;
font-size: 1rem;
font-style: normal;
font-weight: 500;
line-height: normal;
    `;

    const AgreeContent = styled.p`
color: #1062FE;
text-decoration-line: underline;
&:hover {
    cursor: pointer;
    }
    `;

    const VerifyButton = styled.button`
    display: flex;
    width: 34rem;
    padding: 1rem;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    border: 1px solid #D9D9D9;
    background: #FFF;
    color: var(--Black, #1F1F1F);
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    &:hover {
        cursor: pointer;
        }
    margin-top: 0.5rem;
        `;

    const LaptopVerifyButton = styled(VerifyButton)`
    width: 33rem;
    `;
    const TabletVerifyButton = styled(VerifyButton)`
    width: 29rem;
    `;

export function SignUp() {
    const navigate = useNavigate();

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordCheckVisible, setPasswordCheckVisible] = useState(false);

    const clickPasswordVisible = () => {
        setPasswordVisible(!passwordVisible);
    }
    const clickPasswordCheckVisible = () => {
        setPasswordCheckVisible(!passwordCheckVisible);
    }

    const clickVerify = () => {
        // 입력 정보 유효성 검사하기

        navigate('/signup/verify');
        // 인증하기 버튼 클릭
    }

    return (
        <>
        <Desktop>
        <Body>
        <Container>
            <SignUpBox>
            <InputText>이름 *</InputText>
            <Input type="text" placeholder="이름 입력"></Input>
            <InputText>이메일 *</InputText>
            <Input type="email" placeholder="cardify@example.com"></Input>
            <InputText>비밀번호 *</InputText>
            <PasswordInput type={passwordVisible? "text" : "password"} placeholder="비밀번호 입력">
            </PasswordInput> 
            {passwordVisible? <PWeye><ShowEye onClick={()=>clickPasswordVisible()}/></PWeye> : 
            <PWeye><HiddenEye onClick={()=>clickPasswordVisible()}/></PWeye>
            }
            <InputText>비밀번호 확인 *</InputText>
            <PasswordCheckInput type={passwordCheckVisible? "text" : "password"} placeholder="비밀번호 확인">
            </PasswordCheckInput>
            {passwordCheckVisible? <PWCheckeye><ShowEye onClick={()=>clickPasswordCheckVisible()}/></PWCheckeye> :
            <PWCheckeye><HiddenEye onClick={()=>clickPasswordCheckVisible()}/></PWCheckeye>
            }

            <SignUpDiv>
                <AgreeText>
                    <AgreeContent onClick={()=>navigate('/signup')}>이용약관</AgreeContent>
                    <p>과 &nbsp;</p>
                    <AgreeContent onClick={()=>navigate('/signup')}>개인정보취급방침</AgreeContent>
                    <p>을 확인하고, 동의합니다.</p>
                </AgreeText>
            </SignUpDiv>

            <VerifyButton onClick={()=>clickVerify()}>동의하고 인증하기</VerifyButton>
            </SignUpBox>
        </Container>
        </Body>
        </Desktop>

        <Laptop>
        <Body>
        <LaptopContainer>
            <LaptopSignUpBox>
            <InputText>이름 *</InputText>
            <LaptopInput type="text" placeholder="이름 입력"></LaptopInput>
            <InputText>이메일 *</InputText>
            <LaptopInput type="email" placeholder="cardify@example.com"></LaptopInput>
            <InputText>비밀번호 *</InputText>
            <LaptopPasswordInput type={passwordVisible? "text" : "password"} placeholder="비밀번호 입력">
            </LaptopPasswordInput>
            {passwordVisible? <PWeye><ShowEye onClick={()=>clickPasswordVisible()}/></PWeye> : 
            <PWeye><HiddenEye onClick={()=>clickPasswordVisible()}/></PWeye>
            }
            <InputText>비밀번호 확인 *</InputText>
            <LaptopPasswordCheckInput type={passwordCheckVisible? "text" : "password"} placeholder="비밀번호 확인">
            </LaptopPasswordCheckInput>
            {passwordCheckVisible? <PWCheckeye><ShowEye onClick={()=>clickPasswordCheckVisible()}/></PWCheckeye> :
            <PWCheckeye><HiddenEye onClick={()=>clickPasswordCheckVisible()}/></PWCheckeye>
            }
                        <SignUpDiv>
                <AgreeText>
                    <AgreeContent onClick={()=>navigate('/signup')}>이용약관</AgreeContent>
                    <p>과 &nbsp;</p>
                    <AgreeContent onClick={()=>navigate('/signup')}>개인정보취급방침</AgreeContent>
                    <p>을 확인하고, 동의합니다.</p>
                </AgreeText>
            </SignUpDiv>

            <LaptopVerifyButton onClick={()=>clickVerify()}>동의하고 인증하기</LaptopVerifyButton>
            </LaptopSignUpBox>
        </LaptopContainer>
        </Body>
        </Laptop>

        <Tablet>
        <Body>
        <TabletContainer>
            <TabletSignUpBox>
            <InputText>이름 *</InputText>
            <TabletInput type="text" placeholder="이름 입력"></TabletInput>
            <InputText>이메일 *</InputText>
            <TabletInput type="email" placeholder="cardify@example.com"></TabletInput>
            <InputText>비밀번호 *</InputText>
            <TabletPasswordInput type={passwordVisible? "text" : "password"} placeholder="비밀번호 입력">
            </TabletPasswordInput>
            {passwordVisible? <PWeye><ShowEye onClick={()=>clickPasswordVisible()}/></PWeye> : 
            <PWeye><HiddenEye onClick={()=>clickPasswordVisible()}/></PWeye>
            }
            <InputText>비밀번호 확인 *</InputText>
            <TabletPasswordCheckInput type={passwordCheckVisible? "text" : "password"} placeholder="비밀번호 확인">
            </TabletPasswordCheckInput>
            {passwordCheckVisible? <PWCheckeye><ShowEye onClick={()=>clickPasswordCheckVisible()}/></PWCheckeye> :
            <PWCheckeye><HiddenEye onClick={()=>clickPasswordCheckVisible()}/></PWCheckeye>
            }
                        <SignUpDiv>
                <AgreeText>
                    <AgreeContent onClick={()=>navigate('/signup')}>이용약관</AgreeContent>
                    <p>과 &nbsp;</p>
                    <AgreeContent onClick={()=>navigate('/signup')}>개인정보취급방침</AgreeContent>
                    <p>을 확인하고, 동의합니다.</p>
                </AgreeText>
            </SignUpDiv>

            <TabletVerifyButton onClick={()=>clickVerify()}>동의하고 인증하기</TabletVerifyButton>
            </TabletSignUpBox>
        </TabletContainer>
        </Body>
        </Tablet>
        </>
    )
}