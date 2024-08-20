import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PaletteContainer = styled.div`
  position: absolute;
  display: flex;
  left: -7.7rem;
  justify-content: center;
  align-items: center;
  gap: var(--UI-Component-None, 0.5rem);
  border-radius: 0.25rem;
  background: var(--Grays-White, #FFF);
  box-shadow: 0px 4px 26px 0px rgba(0, 0, 0, 0.02), 0px 10px 60px 0px rgba(0, 74, 162, 0.03);
  padding: 0.5rem;
`;

const ColorBox = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'hoverBorderColor' && prop !== 'isSelected',
})`
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--line-height-3xs, 1.125rem);
  height: var(--line-height-3xs, 1.125rem);
  background-color: ${(props) => props.color};
  cursor: pointer;
  border-radius: 4px;
  flex-shrink: 0;
  border: 1px solid ${(props) => (props.isSelected ? props.hoverBorderColor : 'transparent')};

  &:hover {
    border: 1px solid ${(props) => props.hoverBorderColor}; /* hover 시 보더 색상 변경 */
  }
`;

const SvgIcon = styled.svg`
  width: 0.5rem;
  height: 0.57919rem;
  flex-shrink: 0;
  fill: var(--Grays-Black, #1A1A1A);
`;

const colors = [
  { color: '#E6F1FB', hoverBorderColor: '#CDE3F7' }, // Light Blue
  { color: '#FEEEEE', hoverBorderColor: '#FDDDDD' }, // Light Red
  { color: '#FFF4E5', hoverBorderColor: '#FFEDBD' }, // Light Yellow
  { color: '#F4E9FB', hoverBorderColor: '#E9D3F7' }, // Light Purple
  { color: '#E7F8EB', hoverBorderColor: '#CFF1D7' }, // Light Green
];

const HighlightColorPalette = ({ onSelectColor }) => {
  const [selectedColor, setSelectedColor] = useState(null);

  const handleClick = (color) => {
    setSelectedColor(color);
    onSelectColor(color);
  };

  return (
    <PaletteContainer>
      {colors.map(({ color, hoverBorderColor }) => (
        <ColorBox 
          key={color} 
          color={color} 
          hoverBorderColor={hoverBorderColor} 
          isSelected={selectedColor === color}
          onClick={() => handleClick(color)}
        >
          <SvgIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 10">
            <path d="M1.2032 9.63341H0L3.392 0.366211H4.608L8 9.63341H6.784L5.8624 7.02221H2.1376L1.2032 9.63341ZM2.4832 6.01101H5.504L4.032 1.86381H3.9552L2.4832 6.01101Z" />
          </SvgIcon>
        </ColorBox>
      ))}
    </PaletteContainer>
  );
};

HighlightColorPalette.propTypes = {
  onSelectColor: PropTypes.func.isRequired,
};

export default HighlightColorPalette;