import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledButton = styled.button`
  align-item: center;
  width: 8.83644rem;
  height: 2.8125rem;
  flex-shrink: 0;
  border: none;
  border-radius: 0.4375rem;
  background: #E0DEDE;
  color: #000;
  font-family: Pretendard;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5625rem;
  cursor: pointer;
  margin-top: 2rem;

  &:hover {
    background: #1C6BFF;
    color: white;
  }
`;

const AttendanceButton = ({ onClick }) => {
  return (
    <StyledButton onClick={onClick}>
      출석체크
    </StyledButton>
  );
};

AttendanceButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default AttendanceButton;