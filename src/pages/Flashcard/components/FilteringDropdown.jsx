import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Circle from './Circle'; 
import filterIcon from '../../../assets/filterIcon.svg';
import closeIcon from '../../../assets/closeIcon.svg'; // X 버튼 아이콘

const FilteringDiv = styled.div`
  display: flex;
  cursor: pointer;
  position: relative;
  padding: 0.1875rem 0.5rem 0.1875rem 0.4375rem;
  align-items: center;
  gap: 0.3125rem;
  border-radius: 0.3125rem;
  background: ${({ isOpen, hasSelectedColors }) => (isOpen || hasSelectedColors ? '#DCE8FF' : '#ECEFF4')};
  color: var(--Grays-Black, #1A1A1A);
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  &:hover {
    background: ${({ isOpen, hasSelectedColors }) => (isOpen || hasSelectedColors ? '#DCE8FF' : '#E3EAF6')};
  }

  &:active {
    background: #DCE8FF;
  }
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

const SelectedColorsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const SelectedColorCircle = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;

const ExtraColors = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--Grays-Black, #1A1A1A);
`;

const CloseButton = styled.img`
  width: 12px;
  height: 12px;
  cursor: pointer;
`;

const Line = styled.div`
border: 1px solid var(--grays-gray-5-divider, #E8E8E8);
width: 100%;
margin: 0.81rem 0 1rem 0;
`;

const StatusDiv = styled.div`
display: flex;
width: 100%;
padding: 0.5rem 0.75rem;
justify-content: center;
align-items: center;
gap: 0.5rem;
border-radius: 0.25rem;
background: var(--Grays-Gray8, #F4F4F4);
margin-top: 0.38rem;
box-sizing: border-box;

&:hover {
  background: #F0F0F0;
}
`;

const FilteringDropdown = ({ onFilterApply, type }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColors, setSelectedColors] = useState([]);
  const [filtersApplied, setFiltersApplied] = useState(false);
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

  useEffect(() => {
    setSelectedColors([]);
    setFiltersApplied(false);
  }, []);

  const toggleDropdown = (event) => {
    event.stopPropagation();
    setIsOpen(prev => !prev);
  };

  const handleCircleClick = (event, color) => {
    event.stopPropagation();
    if (filtersApplied) return; // 필터가 적용되었으면 색상 변경 불가

    setSelectedColors(prevSelectedColors =>
      prevSelectedColors.includes(color)
        ? prevSelectedColors.filter(c => c !== color)
        : [...prevSelectedColors, color]
    );
  };

  const handleApplyClick = (event) => {
    event.stopPropagation();
    setIsOpen(false);
    setFiltersApplied(true);
    onFilterApply(selectedColors, type);
  };

  const handleClearColors = (event) => {
    event.stopPropagation();
    setSelectedColors([]);
    setFiltersApplied(false);
    onFilterApply([], type);
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

  const colorNames = Object.keys(colorMap);
  const maxVisibleColors = 3;
  const visibleColors = selectedColors.slice(0, maxVisibleColors);
  const extraColorCount = selectedColors.length - maxVisibleColors;

  return (
    <FilteringDiv 
      onClick={toggleDropdown} 
      ref={filterDivRef} 
      isOpen={isOpen} 
      hasSelectedColors={selectedColors.length > 0}
    >
      {filtersApplied && selectedColors.length > 0 ? (
        <SelectedColorsContainer>
          <CloseButton src={closeIcon} alt="Clear filter" onClick={handleClearColors} />
          {visibleColors.map(colorName => (
            <SelectedColorCircle key={colorName} color={colorMap[colorName]} />
          ))}
          {extraColorCount > 0 && (
            <ExtraColors>+{extraColorCount}</ExtraColors>
          )}
        </SelectedColorsContainer>
      ) : (
        <>
          <img src={filterIcon} alt="필터 아이콘" />
          필터링
        </>
      )}
      {isOpen && !filtersApplied && (
        <Dropdown ref={dropdownRef}>
          <div>학습 상태</div>
          <StatusDiv>학습 전</StatusDiv>
          <StatusDiv>학습 중</StatusDiv>
          <StatusDiv>영구 보관</StatusDiv>

<Line />
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
