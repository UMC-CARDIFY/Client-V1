import React, {useState} from 'react';
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
width: 16.875rem;
height: 2.875rem;
flex-shrink: 0;
border: 2px solid #000;
background: url(<path-to-image>) lightgray 50% / cover no-repeat;
margin-top:14rem;
margin-left : 27.56rem;
`;
const LaptopLogo = styled(Logo)`
margin-top: 12.8rem;
margin-left: 24rem;
`;
const TabletLogo = styled(Logo)`
margin-top: 11.5rem;
margin-left: 22rem;
`;

const GuideText = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
align-self: stretch;
margin-top: 4.5rem;
`;
const Name = styled.p`
color: #0F62FE;
`;

const ButtonBox = styled.div`
display: flex;
justify-content: center;
align-items: center;
align-self: stretch;
margin-top:5rem;
`;

    const Button = styled.button`
    display: inline-flex;
padding: 1rem 2rem;
justify-content: center;
align-items: center;
gap: 0.5rem;
background: #EBEBEB;
border: none;
    box-sizing: border-box;
    color: #000;
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    &:hover {
        cursor: pointer;
        }
        `;

export function CompleteSignUp() {
    const navigate = useNavigate();
    
    const startStudy = () => {
        // 학습 시작하기 버튼 클릭
    }


    return (
        <>
        <Desktop>
        <Body>
        <Container>
        <Logo>
        </Logo>
        <GuideText>
            <div style={{display:"flex",flexDirection:"row",marginBottom:"-1.2rem"}}>
            <Name>가입한 이름</Name>
            <p>님, 회원 가입을 축하드립니다!</p>
            </div>
            <p>
            지금 바로 카디파이의 다양한 서비스를 만나보세요.
            </p>
        </GuideText>

        <ButtonBox>
            <Button onClick={()=>startStudy()}>학습 시작하기</Button>
        </ButtonBox>

        </Container>
        </Body>
        </Desktop>

        <Laptop>
        <Body>
        <LaptopContainer>
            <LaptopLogo></LaptopLogo>
            <GuideText>
            <div style={{display:"flex",flexDirection:"row",marginBottom:"-1.2rem"}}>
            <Name>가입한 이름</Name>
            <p>님, 회원 가입을 축하드립니다!</p>
            </div>
            <p>
            지금 바로 카디파이의 다양한 서비스를 만나보세요.
            </p>
        </GuideText>

        <ButtonBox>
            <Button onClick={()=>startStudy()}>학습 시작하기</Button>
        </ButtonBox>
        </LaptopContainer>
        </Body>
        </Laptop>

        <Tablet>
        <Body>
        <TabletContainer>
            <TabletLogo></TabletLogo>
            <GuideText>
            <div style={{display:"flex",flexDirection:"row",marginBottom:"-1.2rem"}}>
            <Name>가입한 이름</Name>
            <p>님, 회원 가입을 축하드립니다!</p>
            </div>
            <p>
            지금 바로 카디파이의 다양한 서비스를 만나보세요.
            </p>
        </GuideText>
        <ButtonBox>
            <Button onClick={()=>startStudy()}>학습 시작하기</Button>
        </ButtonBox>
        </TabletContainer>
        </Body>
        </Tablet>

        </>
    )
}