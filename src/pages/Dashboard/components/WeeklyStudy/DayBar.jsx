import styled from 'styled-components';
import PropTypes from 'prop-types';

const DayBarContainer = styled.div`
  display: flex;
  height: 13.125rem;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
    @media (max-width: 1024px) {
  width: 3.5rem;
  height: 11.25rem;
  }
`;

const SvgContainer = styled.div`
  height: 11.25rem;
      @media (max-width: 1024px) {
    width: 3.5rem;
    height: 9.375rem; /*임의로 조정함*/
  }
`;

const DayLabel = styled.div`
color: var(--Grays-Gray1, #646464);
text-align: center;
font-family: Pretendard;
font-size: 0.75rem;
font-style: normal;
font-weight: 400;
line-height: normal;
`;

const DayBar = ({ day, currentWeekHeight }) => (
  <DayBarContainer>
    <SvgContainer>
      <svg xmlns="http://www.w3.org/2000/svg" width="3.5rem" height="180" viewBox="0 0 80 180" fill="none">
        <rect width="2rem" height="100" fill="#E3EAF6" rx="0.375rem " ry="0.375rem"/>
        <rect width="2rem" height={currentWeekHeight} transform="matrix(1 0 0 -1 45.7144 180)" fill="#6A9CFC" rx="0.375rem" ry="0.375rem"/>
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
