import React, { useState } from 'react';
import styled from 'styled-components';

const MyPageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 6rem;
  position: relative;
`;

const BackIcon = styled.div`
  position: absolute;
  left: 28rem;
  width: 3rem;
  height: 3rem;
  background: #ccc;
  cursor: pointer;
`;

const ProfileImageContainer = styled.div`
  position: relative;
  width: 8rem;
  height: 8rem;
  margin-bottom: 1rem;
`;

const ProfileImage = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid var(--B1B1B1, #B1B1B1);
`;

const EditIcon = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: var(--line-height-xl, 2.5rem);
  height: var(--line-height-xl, 2.5rem);
  flex-shrink: 0;
  border-radius: var(--line-height-2xs, 1.25rem);
  border: 1px solid var(--B1B1B1, #B1B1B1);
  background: #ccc;
  cursor: pointer;
`;

const ContentDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InfoBox = styled.div`
  display: flex;
  width: 29.75rem;
  padding: 1rem 0.5rem;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #D9D9D9;
`;

const IconPlaceholder = styled.div`
  width: 2rem;
  height: 2rem;
  background: #ccc;
  cursor: pointer;
`;

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 2.75rem;
  height: 1.5rem;

  input {
    display: none;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #C8C8C8;
    transition: 0.4s;
    border-radius: 14px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 1.5rem;
    width: 1.5rem;
    left: 0;
    bottom: 0;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: #2196F3;
  }

  input:checked + .slider:before {
    transform: translateX(20px);
  }
`;

const SectionTitle = styled.p`
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  align-self: flex-start;
`;

const Nickname = styled.span`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const NicknameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 3.5rem;
`;

const Text = styled.span`
  color: #000;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  flex: 1;
  margin-left: 0.5rem;
`;

const Text2 = styled.span`
  color: #000;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  justify-content: flex-end;
  margin-right: 0.5rem;
`;

export const MyPage = () => {
  const [isNotificationOn, setIsNotificationOn] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <MyPageContainer>
      <Header>
        <BackIcon />
        <ProfileImageContainer>
          <ProfileImage />
          <EditIcon />
        </ProfileImageContainer>
        <NicknameContainer>
          <Nickname>이름</Nickname>
          <IconPlaceholder />
        </NicknameContainer>
      </Header>
      <ContentDiv>
        <Section>
          <InfoBox>
            <IconPlaceholder />
            <Text>요금제</Text>
            <Text2>등급</Text2>
            <IconPlaceholder />
          </InfoBox>
          <InfoBox>
            <IconPlaceholder />
            <Text>내 포인트</Text>
            <Text2>XXXX P</Text2>
            <IconPlaceholder />
          </InfoBox>
        </Section>
        
        <Section>
         <SectionTitle>환경설정</SectionTitle>
          <InfoBox>
            <IconPlaceholder />
            <Text>알림</Text>
            <Text2>{isNotificationOn ? "ON" : "OFF"}</Text2>
            <Switch>
              <input 
                type="checkbox" 
                checked={isNotificationOn}
                onChange={() => setIsNotificationOn(!isNotificationOn)}
              />
              <span className="slider"></span>
            </Switch>
          </InfoBox>
          <InfoBox>
            <IconPlaceholder />
            <Text>테마</Text>
            <Text2>{isDarkMode ? "다크모드" : "라이트모드"}</Text2>
            <Switch>
              <input 
                type="checkbox" 
                checked={isDarkMode}
                onChange={() => setIsDarkMode(!isDarkMode)}
              />
              <span className="slider"></span>
            </Switch>
          </InfoBox>
        </Section>
        
        <Section>
        <SectionTitle>기타 정보</SectionTitle>
          <InfoBox>
            <IconPlaceholder />
            <Text>이용약관</Text>
            <IconPlaceholder />
          </InfoBox>
          <InfoBox>
            <IconPlaceholder />
            <Text>개인정보처리방침</Text>
            <IconPlaceholder />
          </InfoBox>
        </Section>
        <InfoBox>
          <IconPlaceholder />
          <Text>로그아웃</Text>
          <IconPlaceholder />
        </InfoBox>
      </ContentDiv>
    </MyPageContainer>
  );
};
