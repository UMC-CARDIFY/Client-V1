import { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const PaletteContainer = styled.div`
  position: absolute;
  display: flex;
  padding: var(--UI-Component-None, 0.4375rem) var(--UI-Component-None, 0.5rem);
  justify-content: center;
  align-items: flex-start;
  gap: var(--UI-Component-None, 0.5rem);
  border-radius: 0.25rem;
  background: var(--Grays-White, #FFF);
  /* default */
  box-shadow: 0px 4px 26px 0px rgba(0, 0, 0, 0.02), 0px 10px 60px 0px rgba(0, 74, 162, 0.03);
`;

const ColorCircle = styled.div`
  width: var(--line-height-3xs, 1.125rem);
  height: var(--line-height-3xs, 1.125rem);
  flex-shrink: 0;
  border-radius: 50%;
  background-color: ${props => props.color};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const InnerCircle = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: white;
`;

const colors = [
  '#1A1A1A', '#919191', '#6698F5', '#4BB5E3', '#8A81F1',
  '#43C4B8', '#96C076', '#F5A43B', '#F5734A', '#EB69A2', '#C473E0'
];

const ColorPalette = ({ onSelectColor }) => {
  const [selectedColor, setSelectedColor] = useState(null);

  const handleClick = (color) => {
    setSelectedColor(color);
    onSelectColor(color);
  };

  return (
    <PaletteContainer>
      {colors.map(color => (
        <ColorCircle 
          key={color} 
          color={color} 
          onClick={() => handleClick(color)}
        >
          {selectedColor === color && <InnerCircle />}
        </ColorCircle>
      ))}
    </PaletteContainer>
  );
};

ColorPalette.propTypes = {
  onSelectColor: PropTypes.func.isRequired,
};

export default ColorPalette;
