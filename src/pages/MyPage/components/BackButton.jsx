import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import backIcon from '../../../assets/backIcon.svg'

const StyledBackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.875rem;
  height: 1.875rem;
  flex-shrink: 0;
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 1rem;
  font-size: 1.5rem;
  font-weight: bold;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const BackButton = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <StyledBackButton onClick={handleBackClick}>
      <img src={backIcon} alt="backIcon" />
    </StyledBackButton>
  );
};

export default BackButton;
