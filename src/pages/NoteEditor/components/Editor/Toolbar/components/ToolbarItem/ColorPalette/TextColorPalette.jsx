import { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const PaletteContainer = styled.div`
  position: absolute;
  left: -11.5rem;
  display: flex;
  padding: var(--UI-Component-None, 0.4375rem) var(--UI-Component-None, 0.5rem);
  justify-content: center;
  align-items: flex-start;
  gap: var(--UI-Component-None, 0.5rem);
  border-radius: 0.25rem;
  background: var(--Grays-White, #FFF);
  box-shadow: 0px 4px 26px 0px rgba(0, 0, 0, 0.02), 0px 10px 60px 0px rgba(0, 74, 162, 0.03);
`;

const ColorCircle = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'hoverColor',
})`
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

  &:hover {
    background-color: ${props => props.hoverColor || props.color};
  }
`;

const InnerCircle = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: white;
`;

const colors = [
  { color: '#1A1A1A', hoverColor: '#333333' },
  { color: '#919191', hoverColor: '#A1A1A1' },
  { color: '#6698F5', hoverColor: '#81A9F7' },
  { color: '#4BB5E3', hoverColor: '#66C4EA' },
  { color: '#8A81F1', hoverColor: '#A19BF7' },
  { color: '#43C4B8', hoverColor: '#66D1C5' },
  { color: '#96C076', hoverColor: '#A8CF8B' },
  { color: '#F5A43B', hoverColor: '#F7B25A' },
  { color: '#F5734A', hoverColor: '#F7876C' },
  { color: '#EB69A2', hoverColor: '#F085B3' },
  { color: '#C473E0', hoverColor: '#D490EB' },
];

const ColorPalette = ({ onSelectColor }) => {
  const [selectedColor, setSelectedColor] = useState(null);

  const handleClick = (color) => {
    setSelectedColor(color);
    onSelectColor(color);
  };

  return (
    <PaletteContainer>
 {colors.map(({ color, hoverColor }) => (
        <ColorCircle 
          key={color} 
          color={color} 
          hoverColor={hoverColor}
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