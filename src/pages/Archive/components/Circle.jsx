import styled from 'styled-components';

const Circle = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: ${props => props.bgColor || 'gray'};
  position: relative;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 8px;
    height: 8px;
    background-color: ${props => props.isSelected ? 'white' : 'transparent'};
    border-radius: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }
`;

export default Circle;
