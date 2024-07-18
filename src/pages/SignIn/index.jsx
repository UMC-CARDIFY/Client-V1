import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Desktop, Laptop, Tablet } from '../../styles/MediaQuery';

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

const Logo = styled.div`
width: 19.125rem;
height: 3.25rem;
flex-shrink: 0;
border: 2px solid #000;
background: url(<path-to-image>) lightgray 50% / cover no-repeat;
margin: 11.81rem 26.25rem 0 26.25rem;
    `;

    const LaptopLogo = styled(Logo)`
    margin: 13rem 22rem 0 22rem;
    `;

const TabletLogo = styled(Logo)`
margin: 11.81rem 20.94rem 0 20.94rem;
`;

const SignInBox = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 5rem;
    margin-left: 18rem;
    `

const LaptopSignInBox = styled(SignInBox)`
margin-top: 2.5rem;
margin-left: 14rem; 
`;

const TabletSignInBox = styled(LaptopSignInBox)`
margin-left: 12rem;
`;

const InputBox = styled.div`
    display: flex;
    flex-direction: column;
    `;

const Input = styled.input`
    display: flex;
width: 27.5625rem;
padding: var(--font-size-md, 1rem);
align-items: center;
gap: 0.5rem;
border: 1px solid #D9D9D9;
background: #FFF;
flex: 1 0 0;

/* 16 Medium */
font-family: Pretendard;
font-size: 1rem;
font-style: normal;
font-weight: 500;
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

const TabletInput = styled(Input)`
width: 28.625rem;
`;
const TabletPasswordInput = styled(TabletInput)`
    margin-top: 1rem;
    `;    

const EmailInput = styled(Input)`
    `;

const PasswordInput = styled(Input)`
    margin-top: 1rem;
    `;

const SignInButton = styled.button`
margin-left: 1rem;
display: flex;
width: 7.4375rem;
padding: 2rem;
justify-content: center;
align-items: center;
gap: 0.5rem;
flex-shrink: 0;
border: 1px solid #D9D9D9;
background: #FFF;

font-family: Pretendard;
font-size: 1rem;
font-style: normal;
font-weight: 500;
line-height: normal;
&:hover {
    cursor: pointer;
    }
    `;

const TabletSignInButton = styled(SignInButton)`
width: 7.375rem;
height: 7.375rem;
`;

const SignUpDiv = styled.div`
    display: flex;
    margin-top: 2.13rem;
    margin-left: 18rem;
    `;

const LaptopSignUpDiv = styled(SignUpDiv)`
margin-top: 2rem;
margin-left: 14rem;
`;

const TabletSignUpDiv = styled(SignUpDiv)`
margin-top: 2.12rem;
margin-left: 12rem;
`;

const SignUpText = styled.p`    
    color: var(--B1B1B1, #B1B1B1);
/* 16 Medium */
font-family: Pretendard;
font-size: 1rem;
font-style: normal;
font-weight: 500;
line-height: normal;
margin-right: 0.75rem;
    `;

    const SignUpLink = styled.p`
    color: #000;
/* 16 Medium */
font-family: Pretendard;
font-size: 1rem;
font-style: normal;
font-weight: 500;
line-height: normal;
&:hover {
    cursor: pointer;
    }
    `;

    const KakaoSignInButton = styled.button`
    width:20rem;
display: inline-flex;
height: 3rem;
padding: 0.875rem 7.25rem 0.875rem 0.9375rem;
align-items: flex-start;
gap: 5.125rem;
flex-shrink: 0;
border: 1px solid #D9D9D9;
background: #FFF;
margin: 4rem 26rem 9.5rem 26rem;
&:hover {
    cursor: pointer;
    }
    `;

    const LaptopKakaoSignInButton = styled(KakaoSignInButton)`
    margin: 2.5rem 22.5rem 9.5rem 22.5rem;
    `;

const TabletKakaoSignInButton = styled(KakaoSignInButton)`
margin: 2.63rem 20.5rem 8.38rem 20.5rem;
`;

const KakaoLogo = styled.div`
width: var(--line-height-2xs, 1.25rem);
height: var(--line-height-2xs, 1.25rem);
    background: url(<path-to-image>) lightgray 50% / cover no-repeat;
    `;

    export const SignIn = () => {

    const navigate = useNavigate();

    let isLoginAvailable = false;

    const handleSignIn = () => {
        if (isLoginAvailable) {
            alert('로그인 성공');
        }
    }

    return (
        <>
        <Desktop>
        <Body>
        <Container>
            <Logo></Logo>
            <SignInBox>
            <InputBox>
            <EmailInput placeholder='이메일을 입력해주세요.' />
            <PasswordInput type='password' placeholder='비밀번호를 입력해주세요.' />
            </InputBox>
            <SignInButton onClick={()=>handleSignIn()}>로그인</SignInButton>
            </SignInBox>

            <SignUpDiv>
                <SignUpText>아직 계정이 없으신가요?</SignUpText>
                <SignUpLink onClick={()=>navigate('/signup')}>회원가입</SignUpLink>
            </SignUpDiv>

            <KakaoSignInButton> <KakaoLogo></KakaoLogo>
                카카오 로그인</KakaoSignInButton>
        </Container>
        </Body>
        </Desktop>

        <Laptop>
        <Body>
        <LaptopContainer>
            <LaptopLogo></LaptopLogo>
            <LaptopSignInBox>
            <InputBox>
            <TabletInput placeholder='이메일을 입력해주세요.' />
            <TabletPasswordInput type='password' placeholder='비밀번호를 입력해주세요.' />
            </InputBox>
            <SignInButton onClick={()=>handleSignIn()}>로그인</SignInButton>
            </LaptopSignInBox>

            <LaptopSignUpDiv>
                <SignUpText>아직 계정이 없으신가요?</SignUpText>
                <SignUpLink onClick={()=>navigate('/signup')}>회원가입</SignUpLink>
            </LaptopSignUpDiv>

            <LaptopKakaoSignInButton> <KakaoLogo></KakaoLogo>
                카카오 로그인</LaptopKakaoSignInButton>
        </LaptopContainer>
        </Body>
        </Laptop>

        <Tablet>
        <Body>
        <TabletContainer>
            <TabletLogo></TabletLogo>
            <TabletSignInBox>
            <InputBox>
            <TabletInput placeholder='이메일을 입력해주세요.' />
            <TabletPasswordInput type='password' placeholder='비밀번호를 입력해주세요.' />
            </InputBox>
            <TabletSignInButton onClick={()=>handleSignIn()}>로그인</TabletSignInButton>
            </TabletSignInBox>

            <TabletSignUpDiv>
                <SignUpText>아직 계정이 없으신가요?</SignUpText>
                <SignUpLink onClick={()=>navigate('/signup')}>회원가입</SignUpLink>
            </TabletSignUpDiv>

            <TabletKakaoSignInButton> <KakaoLogo></KakaoLogo>
                카카오 로그인</TabletKakaoSignInButton>
        </TabletContainer>
        </Body>
        </Tablet>
        </>
    )
}

export default SignIn;