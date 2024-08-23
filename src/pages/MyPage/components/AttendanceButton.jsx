import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledButton = styled.button.attrs((props) => ({
  disabled: props.isCompleted, 
}))`  align-item: center;
padding: 0.75rem var(--line-height-xl, 2.5rem);


  flex-shrink: 0;
  border: none;
  border-radius: 0.4375rem;
  background: ${(props) => (props.isCompleted ? '#F0F0F0' : '#E3EAF6')};
  color: ${(props) => (props.isCompleted ? '#B1B1B1' : '#0F62FE')};
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.5625rem;
  cursor: ${(props) => (props.isCompleted ? 'default' : 'pointer')}; 


  &:hover {
    background: ${(props) => (props.isCompleted ? '#E0DEDE' : '#D9E5FB')};
  }

  &:disabled {
    pointer-events: none; 
  }
`;

const AttendanceButton = ({ onClick, children }) => {
  const isCompleted = children === '출석완료';

  return (
    <StyledButton onClick={onClick} isCompleted={isCompleted}>
      {children}
    </StyledButton>      
  );
};

AttendanceButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default AttendanceButton;