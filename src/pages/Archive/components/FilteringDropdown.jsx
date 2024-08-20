import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Circle from './Circle'; 
import filterIcon from '../../../assets/filterIcon.svg';

const FilteringDiv = styled.div`
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

const Button = styled.button`
  display: flex;
  width: 96px;
  height: var(--font-size-2xl, 28px);
  justify-content: center;
  align-items: center;
  margin-top: 0.75rem;
  flex-shrink: 0;
  border-radius: 4px;
  background: var(--Main-Button, #ECEFF4);
  border: none;
  cursor: pointer;
`;

const FilteringDropdown = ({ onFilterApply, type }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColors, setSelectedColors] = useState([]);
  const dropdownRef = useRef(null);
  const filterDivRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterDivRef.current &&
        !filterDivRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = (event) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleCircleClick = (event, color) => {
    event.stopPropagation();
    setSelectedColors((prevSelectedColors) =>
      prevSelectedColors.includes(color)
        ? prevSelectedColors.filter((c) => c !== color)
        : [...prevSelectedColors, color]
    );
  };

  const handleApplyClick = (event) => {
    event.stopPropagation();
    setIsOpen(false);
    onFilterApply(selectedColors, type);
  };

  const colorMap = {
    blue: '#6698F5',
    ocean: '#5AA6C7',
    lavender: '#949AEC',
    gray: '#A9A9A9',
    mint: '#77CEC6',
    sage: '#AECA99',
    orange: '#FDB456',
    plum: '#D49AE9',
    coral: '#FD855F',
    rose: '#ED83B1',
  };

  // 색상 이름만으로 배열을 구성합니다.
  const colorNames = Object.keys(colorMap);

  return (
    <FilteringDiv onClick={toggleDropdown} ref={filterDivRef}>
      <img src={filterIcon} alt="필터 아이콘" />
      필터링
      {isOpen && (
        <Dropdown ref={dropdownRef}>
          <div>색상</div>
          <ColorMatrix>
            {colorNames.map((colorName) => (
              <Circle
                key={colorName}
                bgColor={colorMap[colorName]}
                isSelected={selectedColors.includes(colorName)}
                onClick={(event) => handleCircleClick(event, colorName)}
                isFilter={true}
              />
            ))}
          </ColorMatrix>
          <Button onClick={handleApplyClick}>적용하기</Button>
        </Dropdown>
      )}
    </FilteringDiv>
  );
};

export default FilteringDropdown;
