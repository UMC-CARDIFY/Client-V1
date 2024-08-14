import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledCloseButton = styled.button`
  width: var(--line-height-xl, 3rem);
  height: var(--line-height-xl, 3rem);
  flex-shrink: 0;
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 0.5rem;
  margin-right: 1.5rem;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const CloseButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/archive'); // 현재 폴더의 아카이브 페이지로 이동하도록 수정해야함
  };

  return (
    <StyledCloseButton onClick={handleClick}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M13.621 28.58C13.3007 28.9232 12.7628 28.9417 12.4196 28.6214C12.0764 28.3011 12.0579 27.7632 12.3782 27.42L18.8369 20.5L12.3782 13.58C12.0579 13.2368 12.0764 12.6989 12.4196 12.3786C12.7628 12.0583 13.3007 12.0768 13.621 12.42L19.9996 19.2542L26.3782 12.42C26.6985 12.0768 27.2364 12.0583 27.5796 12.3786C27.9228 12.6989 27.9413 13.2368 27.621 13.58L21.1623 20.5L27.621 27.42C27.9413 27.7632 27.9228 28.3011 27.5796 28.6214C27.2364 28.9417 26.6985 28.9232 26.3782 28.58L19.9996 21.7458L13.621 28.58Z" fill="#B1B1B1"/>
      </svg>
    </StyledCloseButton>
  );
};

export default CloseButton;