import PropTypes from 'prop-types';
import styled from 'styled-components';

const PaletteContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.5rem;
  border: 1px solid green;
`;

const ColorBox = styled.div`
  width: 24px;
  height: 24px;
  background-color: ${(props) => props.color};
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
  &:hover {
    border: 1px solid #000;
  }
`;

const colors = [
  '#FFFF00', // Yellow
  '#FFD700', // Gold
  '#FFA500', // Orange
  '#FF4500', // OrangeRed
  '#32CD32', // LimeGreen
  '#00FF00', // Lime
  '#00CED1', // DarkTurquoise
  '#1E90FF', // DodgerBlue
];

const HighlightColorPalette = ({ onSelectColor }) => (
  <PaletteContainer>
    {colors.map((color) => (
      <ColorBox key={color} color={color} onClick={() => onSelectColor(color)} />
    ))}
  </PaletteContainer>
);

HighlightColorPalette.propTypes = {
  onSelectColor: PropTypes.func.isRequired,
};

export default HighlightColorPalette;
