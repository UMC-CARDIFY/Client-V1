  import styled from 'styled-components';
  import PropTypes from 'prop-types';
  //import { useState } from 'react';

  const TopBarContainer = styled.div`
    width: 100%;
    border-bottom: 1px solid var(--B1B1B1, #B1B1B1); 
    box-sizing: border-box;

  `;

  const TopBarLeft = styled.div`
    margin: 0 0 0 3.69rem;
    gap:0.5rem;
    width: 100%; 
  `;

  const TopBarRight = styled.div`
    display: flex;
    flex-direction: row;
    gap: 2rem;
    margin-left: auto;  
    margin-right: 8rem;
  `;

  const Top = styled.div`
    display:flex;
    justify-content: space-between; 
    align-items:center;
    margin: 2.19rem 0;
  `;

  const TapBar = styled.div`
    display:flex;
    flex-direction: row;
    margin: 0 2rem;
  `;

  const Tap = styled.div`
    padding: 1rem 2.06rem;
    background-color: ${({ active }) => (active ? 'lightblue' : 'transparent')};
  `;


  const TopBar = ({ title, subtitle , selectedTab, setSelectedTab}) => {

    //const [selectedTab, setSelectedTab] = useState('폴더'); // 초기 선택된 탭 설정

    const handleTabClick = (tab) => {
      console.log(`Tab clicked: ${tab}`); 
      setSelectedTab(tab);
    };



    const isArchive = title === '아카이브';


    return (
      <div>
      <TopBarContainer isArchive={isArchive}> 
        <Top>
          <TopBarLeft>
          <div style={{fontSize:'1.875rem'}}>{title}</div>
          <div>{subtitle}</div>
        </TopBarLeft>
        <TopBarRight>
          <div>로고</div>
          <div>로고</div>
        </TopBarRight>
        </Top>  
        {isArchive && (
              <TapBar>
              <Tap active={selectedTab === '폴더'} onClick={() => handleTabClick('폴더')}>폴더</Tap>
              <Tap active={selectedTab === '노트'} onClick={() => handleTabClick('노트')}>노트</Tap>
            </TapBar>
          )}  
      </TopBarContainer>
        </div>
        
    )
  }

  TopBar.propTypes = {
    title: PropTypes.string.isRequired, 
    subtitle: PropTypes.string.isRequired,
    selectedTab: PropTypes.string.isRequired,
  setSelectedTab: PropTypes.func.isRequired,

  };

  export default TopBar