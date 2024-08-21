import styled from 'styled-components'; 

export const MyPageContainer = styled.div`
  display: flex;  
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.header`
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
  margin: 8rem 0 4rem 27rem;

  @media screen and (max-width: 1440px) {
    margin-left: 12.5rem;
  }

  @media screen and (max-width: 1200px) {
    margin-left: 5rem;
  }
`;

export const ContentDiv = styled.div`
  display: flex;
  align-items: center;
  width: 59rem;
  height: 33rem;
  gap: 1.5rem;
`;

export const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
`;

export const RightSection = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
`;

export const AlarmSection = styled.div`
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

export const PointSection = styled.div`
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

export const AttendanceSection = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 14.25rem;
  flex-shrink: 0;
  border: none;
  border-radius: 0.625rem;
  background: #F8F8F8;
`;

export const AttendanceLeftSection = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 2.5rem;
`;

export const AttendanceRightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
`;

export const InfoSection = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 3.875rem;
  flex-shrink: 0;
  border: none;
  border-radius: 0.625rem;
  background: #F8F8F8;
  justify-content: space-between;
`;

export const FlexRow = styled.div`
  display: flex;
  align-items: center;
`;

export const SectionText = styled.span`
  color: #000;
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
`;

export const PointText = styled(SectionText)`
  font-size: 1.45725rem;
  cursor: pointer;
`;

export const InfoText = styled(SectionText)`
  color: #5B5B5B;
  font-size: 1rem;
  line-height: 1.5625rem;
  cursor: pointer;

  &:hover {
    color: darkblue;
  }
`;

export const NotificationText = styled(SectionText)`
  color: var(--Grays-Black, #1A1A1A);
  font-size: 1rem;
  font-weight: 300;
  line-height: normal;
`;

export const InstagramId = styled.a`
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

export const AttendanceImage = styled.div`
  width: 8.19113rem;
  height: 7.4375rem;
  flex-shrink: 0;
  border-radius: 0.625rem;
  background: #E0DEDE;
`;

export const Divider = styled.div`
  top: 50%;
  left: 50%;
  width: 0.0625rem;
  height: 2.3125rem;
  background: #B2B2B2;
`;