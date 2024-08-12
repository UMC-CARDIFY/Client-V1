import styled from 'styled-components';
import PropTypes from 'prop-types';

const TopBarContainer = styled.div`
  width: 100%;
  background: var(--Grays-White, #FFF);
`;

const TopBarLeft = styled.div`
  margin: 0 0 0 3.69rem;
  gap: 0.5rem;
  width: 100%; 
`;

const TopBarRight = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  margin-right: 8rem;

  @media (max-width: 1440px) {
    gap: 1.5rem;
    margin-right: 5rem;
  }

  @media (max-width: 1200px) {
    gap: 1.5rem;
    margin-right: 3rem;
  }
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between; 
  align-items: center;
  margin: 2.19rem 0;
`;

const TabBar = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 2rem;
  width: 100%;
  height: 3.5rem;
  padding: 0rem 52.875rem 0rem 0rem;
align-items: flex-start;
gap: 0.5rem;
`;

const Tab = styled.div`
display: flex;
width: 6.3125rem;
padding: var(--UI-Component-None, 1rem) var(--UI-Component-None, 0.5rem) var(--UI-Component-None, 0.765rem) var(--UI-Component-None, 0.5rem);
flex-direction: column;
justify-content: flex-end;
align-items: center;
gap: var(--UI-Component-None, 0.875rem);
flex-shrink: 0;
cursor: pointer;

color: ${({ active }) => (active ? 'var(--Main-Primary, #0F62FE);' : 'var(--Grays-Black, #1A1A1A)')};
border-bottom: ${({ active }) => (active ? '0.125rem solid var(--Main-Primary, #0F62FE);' : 'none')};
font-family: Pretendard;
font-size: 1.25rem;
font-style: normal;
font-weight: 600;
line-height: normal;
`;

const Title = styled.div`
  color: var(--Grays-Black, #1A1A1A);
  font-family: Pretendard;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const Subtitle = styled.div`
  color: var(--Grays-Gray2, #767676);
  font-family: Pretendard;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: 0.5rem;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  border-radius: var(--line-height-md, 1.625rem);
  background: var(--Grays-Gray7, #F0F0F0);
`;

const NotificationButton = styled(Button)`
  width: 3.25rem;
  height: 3.25rem;
  padding: var(--UI-Component-None, 0.8125rem) var(--UI-Component-None, 0.9375rem);
`;

const MyPageButton = styled(Button)`
  width: 3.25rem;
  height: 3.25rem;
  padding: var(--UI-Component-None, 0.88469rem) var(--UI-Component-None, 0.9375rem);
`;

const TopBar = ({ title, subtitle, selectedTab, setSelectedTab }) => {
  const handleTabClick = (tab) => {
    console.log(`Tab clicked: ${tab}`);
    setSelectedTab(tab);
  };

  const isArchive = title === '아카이브';

  return (
    <TopBarContainer>
      <Top>
        <TopBarLeft>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </TopBarLeft>
        <TopBarRight>
            <NotificationButton>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="26" viewBox="0 0 22 26" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M7.61313 2.7708C8.02246 1.3993 9.22294 0 11.0011 0C12.7798 0 13.9791 1.39936 14.3915 2.76827C14.3936 2.77082 14.3963 2.77404 14.3999 2.77775C14.4083 2.78654 14.4179 2.79463 14.427 2.80091C14.4339 2.80568 14.438 2.80774 14.4385 2.80798C15.4736 3.23317 16.6919 3.91234 17.6449 5.15582C18.6054 6.4093 19.2303 8.14938 19.2303 10.577C19.2303 12.9975 19.4862 14.3249 19.8632 15.236C20.1937 16.035 20.6283 16.5601 21.2467 17.3075C21.337 17.4166 21.4313 17.5305 21.5297 17.6506L21.5299 17.6509C22.6697 19.0438 21.5934 21 19.8377 21H2.17022C0.417763 21 -0.676639 19.0537 0.47256 17.6506C0.571045 17.5304 0.665356 17.4164 0.755742 17.3072C1.37407 16.56 1.80872 16.0348 2.13951 15.2358C2.5168 14.3245 2.77338 12.9972 2.77481 10.577M7.61313 2.7708C7.61155 2.77266 7.60958 2.77488 7.60716 2.77737C7.59937 2.78543 7.59016 2.79321 7.58098 2.79953C7.57245 2.80539 7.56732 2.80767 7.56733 2.80769L7.56678 2.80791C6.53123 3.23336 5.31246 3.91125 4.35947 5.15443C3.39897 6.40742 2.7749 8.14725 2.77481 10.5765M11.0011 1.82609C10.2965 1.82609 9.6236 2.41228 9.36319 3.30612L9.36252 3.30839C9.19461 3.87919 8.72969 4.30521 8.26373 4.49643C8.26367 4.49646 8.2636 4.49649 8.26353 4.49652C7.38928 4.85572 6.49551 5.3739 5.81338 6.26375C5.13879 7.14376 4.60517 8.47389 4.60517 10.577V10.5776C4.60371 13.1018 4.34037 14.7032 3.83124 15.9329C3.38832 17.0028 2.77002 17.7462 2.15655 18.4838C2.0674 18.591 1.97835 18.6981 1.88996 18.806L1.88991 18.8061C1.85348 18.8506 1.84329 18.887 1.8408 18.9145C1.83798 18.9456 1.84384 18.9828 1.86344 19.0211C1.89745 19.0876 1.98213 19.1739 2.17022 19.1739H19.8377C20.019 19.1739 20.1023 19.0904 20.137 19.0222C20.1742 18.949 20.1696 18.8762 20.1123 18.806C20.0239 18.6982 19.9349 18.5912 19.8458 18.484C19.2323 17.7463 18.6139 17.0027 18.1713 15.9327C17.6625 14.7028 17.3999 13.1012 17.3999 10.577C17.3999 8.47657 16.8659 7.14597 16.1908 6.26492C15.508 5.37398 14.6139 4.85479 13.7414 4.49647C13.2703 4.30313 12.8103 3.87113 12.6433 3.30985L12.6427 3.30753C12.3789 2.41185 11.7058 1.82609 11.0011 1.82609Z" fill="#646464"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M7.8 20C8.24183 20 8.6 20.3838 8.6 20.8571V21.7143C8.6 22.3963 8.85286 23.0503 9.30294 23.5326C9.75303 24.0148 10.3635 24.2857 11 24.2857C11.6365 24.2857 12.247 24.0148 12.6971 23.5326C13.1471 23.0503 13.4 22.3963 13.4 21.7143V20.8571C13.4 20.3838 13.7582 20 14.2 20C14.6418 20 15 20.3838 15 20.8571V21.7143C15 22.8509 14.5786 23.941 13.8284 24.7447C13.0783 25.5485 12.0609 26 11 26C9.93913 26 8.92172 25.5485 8.17157 24.7447C7.42143 23.941 7 22.8509 7 21.7143V20.8571C7 20.3838 7.35817 20 7.8 20Z" fill="#646464"/>
              </svg>
            </NotificationButton>
            <MyPageButton onClick={() => window.location.href = '/mypage'}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" viewBox="0 0 22 24" fill="none">
                <path d="M11.0004 12C8.20307 12 5.73883 9.37186 5.50087 6.14086C5.37925 4.50156 5.8869 2.98389 6.92865 1.86811C7.95453 0.762911 9.40345 0.154785 11.0004 0.154785C12.5869 0.154785 14.0305 0.768199 15.0617 1.87869C16.1087 3.00504 16.6164 4.51743 16.4947 6.14086C16.2568 9.37186 13.7925 12 11.0004 12ZM11.0004 1.84696C9.87938 1.84696 8.86936 2.26472 8.16605 3.02091C7.45216 3.78768 7.10315 4.85586 7.18776 6.01923C7.35698 8.34597 9.10203 10.3131 10.9952 10.3131C12.8883 10.3131 14.6333 8.34597 14.8026 6.01923C14.8872 4.87173 14.5381 3.80883 13.8137 3.03148C13.1157 2.26472 12.1109 1.84696 11.0004 1.84696Z" fill="#646464"/>
                <path d="M20.3075 23.8452H1.69355C1.18589 23.8452 0.731121 23.6337 0.413838 23.2582C0.0701144 22.8458 -0.0673749 22.2852 0.033098 21.7194C0.477294 19.2446 1.87334 17.1611 4.06259 15.7069C6.00859 14.4113 8.47282 13.6974 11.0005 13.6974C13.5282 13.6974 15.9924 14.4113 17.9384 15.7069C20.1277 17.1664 21.5237 19.2446 21.9679 21.7194C22.0684 22.2852 21.9309 22.8458 21.5872 23.2582C21.2699 23.6337 20.8151 23.8452 20.3075 23.8452ZM1.70412 22.153H20.2969C20.3075 22.1266 20.3128 22.0843 20.3022 22.0155C19.4825 17.4625 14.9031 15.3843 11.0005 15.3843C7.09793 15.3843 2.51848 17.4625 1.69883 22.0155C1.68826 22.0843 1.69355 22.1266 1.70412 22.153Z" fill="#646464"/>
              </svg>
            </MyPageButton>
        </TopBarRight>
      </Top>  
      {isArchive && (
        <TabBar>
          <Tab active={selectedTab === '폴더'} onClick={() => handleTabClick('폴더')}>폴더</Tab>
          <Tab active={selectedTab === '노트'} onClick={() => handleTabClick('노트')}>노트</Tab>
        </TabBar>
      )}  
    </TopBarContainer>
  );
}

TopBar.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  selectedTab: PropTypes.string.isRequired,
  setSelectedTab: PropTypes.func.isRequired,
};

export default TopBar;
