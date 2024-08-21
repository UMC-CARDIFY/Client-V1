import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'; 
import Switch from './components/Switch';
import ProfileSection from './components/ProfileSection';
import BackButton from './components/BackButton';
import LogoutButton from './components/LogoutButton';
import AttendanceButton from './components/AttendanceButton';
import TermsModal from '../../components/Modal/TermsModal';
import PrivacyModal from '../../components/Modal/PrivacyModal';
import AttendanceModal from './components/Modal/AttendanceModal';
import alarmIcon from '../../assets/alarmIcon.svg';
import instagramIcon from '../../assets/instagram.svg';
import pointIcon from '../../assets/pointIcon.svg';
import angleRight from '../../assets/angleRight.svg';

const MyPageContainer = styled.div`
  display: flex;  
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  position: relative;
  align-self: flex-start;
  color: #000;
  font-family: pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  margin : 8rem 0 4rem 27rem;

  @media screen and (max-width: 1440px) {
    margin-left: 12.5rem;
  }

  @media screen and (max-width: 1200px) {
    margin-left: 5rem;
  }
`;

const ContentDiv = styled.div`
  display: flex;
  align-items: center;
  width: 59rem;
  height: 33rem;
  gap: 1.5rem;
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
`;

const RightSection = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
`;

const AlarmSection = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 5rem;
  flex-shrink: 0;
  border: none;
  border-radius: 0.625rem;
  background: #F8F8F8;
  justify-content: space-between;
`;

const PointSection = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 5rem;
  flex-shrink: 0;
  border: none;
  border-radius: 0.625rem;
  background: #F8F8F8;
  justify-content: space-between;
`;

const AttendanceSection = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 14.25rem;
  flex-shrink: 0;
  border: none;
  border-radius: 0.625rem;
  background: #F8F8F8;
`;

const AttendanceLeftSection = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 2.5rem;
`;

const AttendanceRightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
`;

const InfoSection = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 3.875rem;
  flex-shrink: 0;
  border: none;
  border-radius: 0.625rem;
  background: #F8F8F8;
  justify-content: space-between;
`
const FlexRow = styled.div`
  display: flex;
  align-items: center;
`;

const SectionText = styled.span`
  color: #000;
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
`;
const PointText = styled(SectionText)`
  font-size: 1.45725rem;
  cursor: pointer;
`
const InfoText = styled(SectionText)`
  color: #5B5B5B;
  font-size: 1rem;
  line-height: 1.5625rem;
  cursor: pointer;

  &:hover {
    color: darkblue;
  }
`;
const NotificationText = styled(SectionText)`
  color: var(--Grays-Black, #1A1A1A);
  font-size: 1rem;
  font-weight: 300;
  line-height: normal;
`;
const InstagramId = styled.a`
  color: #5B5B5B;
  font-family: Pretendard;
  font-size: 1.1575rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.80856rem; 
  cursor: pointer;

  &:hover {
    color: darkblue;
  }
`;

const AttendanceImage = styled.div`
  width: 8.19113rem;
  height: 7.4375rem;
  flex-shrink: 0;
  border-radius: 0.625rem;
  background: #E0DEDE;
`;

const Divider = styled.div`
  top: 50%;
  left: 50%;
  width: 0.0625rem;
  height: 2.3125rem;
  background: #B2B2B2;
`

export const MyPage = () => {
  const navigate = useNavigate();
  const [isNotificationOn, setIsNotificationOn] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);

  return (
    <MyPageContainer>
      <Header>
        <BackButton />마이페이지
      </Header>
      <ContentDiv>
        <LeftSection>
          <ProfileSection />
          <LogoutButton />
        </LeftSection>
        <RightSection>
          <AlarmSection>
          <FlexRow>
            <img src={alarmIcon} alt="alarmIcon" style={{margin: '0 0.75rem 0 1.5rem'}} />
            <SectionText>알림</SectionText>
            </FlexRow>
            <FlexRow>
              <NotificationText>{isNotificationOn ? "ON" : "OFF" }</NotificationText>
              <Switch onChange={(checked) => setIsNotificationOn(checked)} />
            </FlexRow>
          </AlarmSection>

          <PointSection>
          <FlexRow>
            <img src={pointIcon} alt="pointIcon" style={{margin: '0 0.75rem 0 1.5rem'}} />
            <SectionText>내 포인트</SectionText>
            </FlexRow>
            <FlexRow>
             <PointText onClick={() => navigate('point')}>9,500P</PointText>
             <img src={angleRight} alt="angleRight" onClick={() => navigate('point')} style={{margin: '0 2rem 0 2.5rem', cursor: 'pointer'}} />
             </FlexRow>
          </PointSection>
          <AttendanceSection>
            <AttendanceLeftSection>
              <SectionText>출석해서 포인트 받고</SectionText>
              <SectionText style={{fontWeight: '600', fontSize:'1.3125rem'}}>학습 자료로 교환하기</SectionText>
              <AttendanceButton onClick={() => setShowAttendanceModal(true)} />
            </AttendanceLeftSection>
            <AttendanceRightSection> 
              <AttendanceImage />
            </AttendanceRightSection>
          </AttendanceSection>
          <InfoSection>
          <FlexRow>
            <img src={instagramIcon} alt="instagramIcon" style={{margin: '0 0.75rem 0 1.5rem'}} />
            <InstagramId onClick={() => window.open('https://instagram.com/cardify_official', '_blank')}>
              @cardify_official
            </InstagramId>
            </FlexRow>
            <Divider />
            <FlexRow style={{ gap: '1rem', marginRight: '2rem'}}>
            <InfoText onClick={() => setShowTermsModal(true)} >이용약관</InfoText>
            <InfoText onClick={() => setShowPrivacyModal(true)}>개인정보취급방침</InfoText>
            </FlexRow>
          </InfoSection>
        </RightSection>

      </ContentDiv>
      {showTermsModal && <TermsModal onClose={() => setShowTermsModal(false)} />}
      {showPrivacyModal && <PrivacyModal onClose={() => setShowPrivacyModal(false)} />}
      {showAttendanceModal && <AttendanceModal onClose={() => setShowAttendanceModal(false)} />}
    </MyPageContainer>
  );
};

export default MyPage;