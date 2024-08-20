import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ButtonContainer = styled.div`
  display: flex;
  width: 4rem;
  height: 4rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  cursor: pointer;
  border-radius: 50%;
  transition: background-color 0.3s, transform 0.3s;

  background-color: ${({ $isClicked }) => ( $isClicked ? '##E3EAF6' : '#FFF')}; /* 클릭 시 배경색 변경 */

  &:hover {
    background-color: #EDEDED; /* 호버 시 배경색 변경 */
  }

  svg {
    width: 1.79875rem;
    height: 1.40938rem;
    flex-shrink: 0;
    fill: none;
    display: block;
    margin: 0 auto; 

    stroke: ${({ $isHovered, $isClicked }) => 
      $isClicked ? '#0F62FE' : 
      $isHovered ? '#646464' : '#B1B1B1'}; /* 상태에 따라 stroke 색상 변경 */
    }
  }
`;

const FlashcardButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleClick = () => {
    setIsClicked(!isClicked);    
    navigate('/Flashcard'); // 플래시카드 페이지로 이동
  };

  return (
    <ButtonContainer       
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      $isHovered={isHovered}
      $isClicked={isClicked}
    >  
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="26" viewBox="0 0 32 26" fill="none">
        <path d="M7.81846 6.2672L7.99227 5.35878L8.6875 1.7251L30.3901 5.65605L27.6092 20.1908L24.8964 19.6994L24.2182 19.5766" stroke="#B1B1B1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="1.61035" y="7.2749" width="22" height="17" stroke="#B1B1B1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="6.71035" y1="14.1749" x2="18.5104" y2="14.1749" stroke="#B1B1B1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="6.71035" y1="18.1749" x2="14.5104" y2="18.1749" stroke="#B1B1B1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </ButtonContainer>
  );
};

export default FlashcardButton;