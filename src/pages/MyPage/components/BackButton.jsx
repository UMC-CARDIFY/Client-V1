import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiChevronLeft } from 'react-icons/fi';

const StyledBackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 1rem;
  font-size: 1.5rem;
  font-weight: bold;

  @media screen and (max-width: 1024px) {
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 1.5rem;
  }

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
      <FiChevronLeft />
    </StyledBackButton>
  );
};

export default BackButton;
