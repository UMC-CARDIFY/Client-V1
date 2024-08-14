import { useState } from 'react';
import styled from 'styled-components';
import Circle from './Circle'; // 수정된 Circle 컴포넌트 경로
import filterIcon from '../../../assets/filterIcon.svg';

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
  grid-template-columns: repeat(4, 1fr); 
  gap: 0.5rem;
`;

const FilteringDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColors, setSelectedColors] = useState([]); // 선택된 색상 배열

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCircleClick = (color) => {
    setSelectedColors((prevSelectedColors) =>
      prevSelectedColors.includes(color)
        ? prevSelectedColors.filter((c) => c !== color) // 선택 해제
        : [...prevSelectedColors, color] // 선택 추가
    );
  };

  const colors = [
    "#6698F5", "#5AA6C7", "#949AEC", "#A9A9A9",
    "#77CEC6", "#AECA99", "#FDB456", "#D49AE9",
    "#FD855F", "#ED83B1"
  ];

  return (
    <FiteringDiv onClick={toggleDropdown}>
      <img src={filterIcon} alt="필터 아이콘" />
      필터링
      {isOpen && (
        <Dropdown>
          <div>색상</div>
          <ColorMatrix>
            {colors.map((color, index) => (
              <Circle
                key={index}
                bgColor={color}
                isSelected={selectedColors.includes(color)}
                onClick={() => handleCircleClick(color)}
                isFilter={true} // 필터링 드롭다운에서 체크 표시를 활성화
              />
            ))}
          </ColorMatrix>
        </Dropdown>
      )}
    </FiteringDiv>
  );
};

export default FilteringDropdown;
