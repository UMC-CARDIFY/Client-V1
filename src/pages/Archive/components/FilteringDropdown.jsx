import styled from 'styled-components';
import { useState } from 'react';
import Circle from './Circle';

const FiteringDiv = styled.div`
display: flex;
cursor: pointer;
position: relative;
padding: 0.1875rem 0.5rem 0.1875rem 0.4375rem;
align-items: center;
gap: 0.3125rem;
border-radius: 0.3125rem;
background: var(--Main-Button, #ECEFF4);
color: var(--Grays-Black, #1A1A1A);
font-family: Pretendard;
font-size: 0.875rem;
font-style: normal;
font-weight: 500;
line-height: normal;
`;

const Dropdown = styled.div`
position: absolute;
top: 100%;
left: 0;
margin-top: 0.5rem;
padding: 1rem 1.3rem;
z-index: 10;
width: 8.25rem;
height: 8.5625rem;
box-sizing: border-box;
border-radius: 0.5rem;
border: 1px solid var(--grays-gray-5-divider, #E8E8E8);
background: var(--Grays-White, #FFF);
display: inline-flex;
flex-direction: column;
align-items: flex-start;
color: var(--Grays-Black, #1A1A1A);
font-family: Pretendard;
font-size: 0.875rem;
font-style: normal;
font-weight: 500;
line-height: normal;
`;

const ColorMatrix = styled.div`
  margin-top: 0.5rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr); // 4개의 컬럼으로 설정합니다.
  gap: 0.5rem; // 각 색상 원 사이의 간격을 설정합니다.
`;


const FilteringDropdown = () => {

const [isOpen, setIsOpen] = useState(false);
const [selectedColor, setSelectedColor] = useState( '#6698F5');
  
const toggleDropdown = () => {
  setIsOpen(!isOpen);
};

const handleCircleClick = (color) => {
    setSelectedColor(color);
  };


  const colors = [
    "#6698F5", "#5AA6C7", "#949AEC", "#A9A9A9",
    "#77CEC6", "#AECA99", "#FDB456", "#D49AE9",
    "#FD855F", "#ED83B1"
  ];



  return (
    <FiteringDiv onClick={toggleDropdown}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M18.8798 5.77734H5.10202C5.04386 5.78183 4.98954 5.80815 4.94997 5.85101C4.91041 5.89388 4.88851 5.95012 4.88869 6.00845V6.7729C4.88815 6.85125 4.9032 6.92893 4.93296 7.00141C4.96271 7.0739 5.00659 7.13974 5.06202 7.19512L10.3954 12.5285V16.9729L13.6176 18.5773V12.5196L18.9509 7.18623C19.0529 7.07617 19.11 6.93187 19.1109 6.78179V6.00845C19.1109 5.94716 19.0866 5.88838 19.0432 5.84503C18.9999 5.80169 18.9411 5.77734 18.8798 5.77734Z" stroke="#1A1A1A" strokeWidth="1.2"/>
</svg>필터링
        {isOpen && (
          <Dropdown>
            <div>색상</div>
            <ColorMatrix>
            {colors.map((color, index) => (
              <Circle
                key={index}
                bgColor={color}
                isSelected={selectedColor === color}
                onClick={() => handleCircleClick(color)}
              />
            ))}
          </ColorMatrix>
          </Dropdown>
        )}
      </FiteringDiv>
  )
}

export default FilteringDropdown