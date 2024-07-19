import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Switch from './components/Switch';
import LogoutButton from './components/LogoutButton';

const MyPageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6rem 0;

  @media screen and (max-width: 1440px) {
    padding: 5.5rem 0;
  }

  @media screen and (max-width: 1024px) {
     padding: 4rem 0;
  }
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const BackButton = styled.div`
  position: absolute;
  left: 28rem;
  width: 3rem;
  height: 3rem;
  background: #ccc;
  cursor: pointer;

  @media screen and (max-width: 1440px) {
    left: 14rem;
  }

  @media screen and (max-width: 1024px) {
     left: 11rem;
  }
`;

const ProfileImageContainer = styled.div`
  position: relative;
  width: 8.5rem;
  height: 8.5rem;
  margin-bottom: 1rem;

  @media screen and (max-width: 1440px) {
    width: 8rem;
    height: 8rem;
    margin-bottom: 0.5rem;
  }
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
  width: 2.5rem;
  height: 2.5rem;
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

  @media screen and (max-width: 1024px) {
    gap: 16px;
  }
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;  

const InfoBox = styled.div`
  display: flex;
  width: 38.125rem;
  height: 2.69rem;
  padding: 1rem;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  border: 1px solid #D9D9D9;
  border-bottom: 1px solid transparent;

  &.clickable {
    cursor: pointer;
  }

  @media screen and (max-width: 1440px) {
    width: 28.25rem;
    height: 2rem;
    padding: 0.75rem;
  }

  @media screen and (max-width: 1024px) {
   width: 28.5rem;
   height: 1.875rem;
   padding: 0.5rem;
  }
`;

const LastInfoBox = styled(InfoBox)`
  border-bottom: 1px solid #D9D9D9;
`;

const IconPlaceholder = styled.div`
  width: 2rem;
  height: 2rem;
  background: #ccc;
  cursor: pointer;
`;

const SectionTitle = styled.p`
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  align-self: flex-start;
`;

const Nickname = styled.span`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

const NicknameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 3.5rem;

  @media screen and (max-width: 1440px) {
    margin-bottom: 2.5rem;
  }
`;

const Text = styled.span`
  color: #000;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  flex: 1;
  margin-left: 1rem;
`;

const Text2 = styled.span`
  color: #000;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  justify-content: flex-end;
  margin-right: 0.5rem;
`;

export const MyPage = () => {
  const navigate = useNavigate();
  const [isNotificationOn, setIsNotificationOn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <MyPageContainer>
      <Header>
        <BackButton onClick={() => navigate(-1)} />
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
          <InfoBox className="clickable" onClick={() => navigate('/mypage/subscription')}>
            <IconPlaceholder />
            <Text>요금제</Text>
            <Text2>등급</Text2>
            <IconPlaceholder />
          </InfoBox>
          <LastInfoBox className="clickable" onClick={() => navigate('/mypage/point')}>
            <IconPlaceholder />
            <Text>내 포인트</Text>
            <Text2>XXXX P</Text2>
            <IconPlaceholder />
          </LastInfoBox>
        </Section>
        <Section>
         <SectionTitle>환경설정</SectionTitle>
          <InfoBox>
            <IconPlaceholder />
            <Text>알림</Text>
            <Text2>{isNotificationOn ? "ON" : "OFF"}</Text2>
            <Switch 
              onChange={(checked) => setIsNotificationOn(checked)} 
            />
          </InfoBox>
          <LastInfoBox>
            <IconPlaceholder />
            <Text>테마</Text>
            <Text2>{isDarkMode ? "다크모드" : "라이트모드"}</Text2>
            <Switch 
              onChange={(checked) => setIsDarkMode(checked)} 
            />
          </LastInfoBox>
        </Section>
        <Section>
        <SectionTitle>기타 정보</SectionTitle>
          <InfoBox className="clickable">
            <IconPlaceholder />
            <Text>이용약관</Text>
            <IconPlaceholder />
          </InfoBox>
          <LastInfoBox className="clickable"> 
            <IconPlaceholder />
            <Text>개인정보처리방침</Text>
            <IconPlaceholder />
          </LastInfoBox>
        </Section>
        <LogoutButton />
      </ContentDiv>
    </MyPageContainer>
  );
};

export default MyPage;