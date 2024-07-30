import styled from 'styled-components';
import PropTypes from 'prop-types';

const PaletteContainer = styled.div`
  width: 18.375rem;
  height: 1.875rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 0.625rem;
  border: 1px solid #D9D9D9;
  background: #FFF;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.05);
  position: absolute;
  bottom: 4.5rem; /* 툴바 위에 나타나도록 설정 */
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  padding-left: 0.7rem;
  padding-right: 0.7rem;
`;

const ColorCircle = styled.div`
  width: var(--font-size-md, 1rem);
  height: var(--font-size-md, 1rem);
  border-radius: 50%;
  background-color: ${props => props.color};
  cursor: pointer;
  border: 1px solid #E2E5EB;
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.1);
`;

const colors = [
  '#6FA8DC', '#8E7CC3', '#C27BA0', '#E06666', '#F6B26B',
  '#FFD966', '#93C47D', '#76A5AF', '#A4C2F4', '#D9A6E9'
];

const ColorPalette = ({ onSelectColor }) => {
  return (
    <PaletteContainer>
      {colors.map(color => (
        <ColorCircle key={color} color={color} onClick={() => onSelectColor(color)} />
      ))}
    </PaletteContainer>
  );
};

ColorPalette.propTypes = {
  onSelectColor: PropTypes.func.isRequired,
};

export default ColorPalette;
