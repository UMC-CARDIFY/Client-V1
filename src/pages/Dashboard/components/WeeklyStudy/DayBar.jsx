import styled from 'styled-components';
import PropTypes from 'prop-types';

const DayBarContainer = styled.div`
  display: flex;
  width: 5rem;
  height: 13.125rem;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const SvgContainer = styled.div`
  width: 5rem;
  height: 11.25rem;
`;

const DayLabel = styled.div`xwx
  color: #565656;
  text-align: center;
  font-family: Pretendard;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const DayBar = ({ day, currentWeekHeight }) => (
  <DayBarContainer>
    <SvgContainer>
      <svg xmlns="http://www.w3.org/2000/svg" width="80" height="180" viewBox="0 0 80 180" fill="none">
        <rect width="34.2857" height="180" fill="#D0D0D0"/>
        <rect width="34.2857" height={currentWeekHeight} transform="matrix(1 0 0 -1 45.7144 180)" fill="#8E8E8E"/>
      </svg>
    </SvgContainer>
    <DayLabel>{day}</DayLabel>
  </DayBarContainer>
);

DayBar.propTypes = {
  day: PropTypes.string.isRequired,
  currentWeekHeight: PropTypes.string.isRequired,
};

export default DayBar;
