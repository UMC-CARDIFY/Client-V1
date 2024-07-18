import styled from 'styled-components';
import PropTypes from 'prop-types';

const TopBarContainer = styled.div`
  height: 8.25rem;
  width: 100%;
  display:flex;
  justify-content: space-between; 
  align-items:center;
  border-bottom: 1px solid var(--B1B1B1, #B1B1B1); 


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


const TopBar = ({ title, subtitle }) => {
  return (
    <TopBarContainer>
      <TopBarLeft>
        <div style={{fontSize:'1.875rem'}}>{title}</div>
        <div>{subtitle}</div>
      </TopBarLeft>
      <TopBarRight>
        <div>로고</div>
        <div>로고</div>
      </TopBarRight>
    </TopBarContainer>
  )
}

TopBar.propTypes = {
  title: PropTypes.string.isRequired, 
  subtitle: PropTypes.string.isRequired,
};

export default TopBar