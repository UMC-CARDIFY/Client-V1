import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Circle from './Circle';

const FiteringDiv = styled.div`
display: flex;
align-items: center;
cursor: pointer;
position: relative;
border-radius: 0.5rem;
padding: 0.5rem 1rem;
background-color: white;
box-shadow: 0px 4px 26px 0px rgba(0, 0, 0, 0.02), 0px 10px 60px 0px rgba(0, 74, 162, 0.03);
`;

const Dropdown = styled.div`
position: absolute;
top: 100%;
left: 0;
width: 100%;
margin-top: 0.5rem;
padding: 0.5rem 0;
border-radius: 0.5rem;
background-color: white;
box-shadow: 0px 4px 26px 0px rgba(0, 0, 0, 0.02), 0px 10px 60px 0px rgba(0, 74, 162, 0.03);
z-index: 10;
`;

const ColorMatrix = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); // 4개의 컬럼으로 설정합니다.
  gap: 0.5rem; // 각 색상 원 사이의 간격을 설정합니다.
`;

const SortIcon = styled.div`
width: 1rem;
height: 1rem;
background-color: gray;
margin-right: 0.5rem;
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
        <SortIcon />
        <div>필터링</div> 
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