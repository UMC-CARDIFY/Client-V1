import styled from 'styled-components';

const TopBarContainer = styled.div`
  height: 8.25rem;
  width: 100%;
  display:flex;
  justify-content: space-between; 
  background: gray;
  align-items:center;

`;

const TopBarLeft = styled.div`
  margin: 0 0 0 3.69rem;
  gap:0.5rem;
`;

const TopBarRight = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  margin-left: auto;  
  margin-right: 8rem;
`;


const TopBar = () => {
  return (
    <TopBarContainer>
      <TopBarLeft>
        <div style={{fontSize:'1.875rem'}}>대시보드</div>
        <div>카디파이 한 눈에 보기</div>
      </TopBarLeft>
      <TopBarRight>
        <div>로고</div>
        <div>로고</div>
      </TopBarRight>
    </TopBarContainer>
  )
}

export default TopBar