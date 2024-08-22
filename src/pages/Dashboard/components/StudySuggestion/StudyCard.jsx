import styled from 'styled-components';
import PropTypes from 'prop-types';
import { intervalToDuration } from 'date-fns';

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-right: 1rem;
  padding-left: 1.33rem;
  margin-bottom: 0.75rem;
  width: 100%;
  gap: 1.5rem;
  border-radius: 0.5rem;
  background: linear-gradient(90deg, #F6F6F6 0%, #F0F0F0 100%);
  box-sizing: border-box;
`;


const CardDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.div`
  color: var(--Grays-Gray2, #767676);
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const CardSubtitle = styled.div`
  color: var(--Grays-Gray2, #767676);
  font-family: Pretendard;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const colorMap = {
  blue: '#6698F5',
  ocean: '#5AA6C7',
  lavender: '#949AEC',
  gray: '#A9A9A9',
  mint: '#77CEC6',
  sage: '#AECA99',
  orange: '#FDB456',
  plum: '#D49AE9',
  coral: '#FD855F',
  rose: '#ED83B1',
};


const calculateTimeLeft = (remainTime) => {
  const now = new Date();
  const targetDate = new Date(remainTime);
  const duration = intervalToDuration({ start: now, end: targetDate });

  if (duration.years > 0) {
    return `${String(duration.years).padStart(2, '0')}년 ${String(duration.months).padStart(2, '0')}달 후`;
  } else if (duration.months > 0) {
    return `${String(duration.months).padStart(2, '0')}달 ${String(duration.days).padStart(2, '0')}일 후`;
  } else if (duration.days > 0) {
    return `${String(duration.days).padStart(2, '0')}일 ${String(duration.hours).padStart(2, '0')}시간 후`;
  } else if (duration.hours > 0) {
    return `${String(duration.hours).padStart(2, '0')}시간 ${String(duration.minutes).padStart(2, '0')}분 후`;
  } else {
    return `${String(duration.minutes).padStart(2, '0')}분 후`;
  }
};

const StudyCard = ({ card }) => {
  const iconColor = colorMap[card.color] || '#A9A9A9'; 

  return (
    <CardContainer>
      {/* SVG 직접 사용 */}
      <svg xmlns="http://www.w3.org/2000/svg" width="29" height="24" viewBox="0 0 29 24" fill="none">
        <path d="M6.87535 5.73529L7.03417 4.90523L7.66943 1.58496L27.5001 5.17686L24.9591 18.4579L22.4802 18.0089L21.8605 17.8967" 
          stroke={iconColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="1.20215" y="6.65625" width="20.1024" height="15.5337" 
          stroke={iconColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="1.20215" y="6.65625" width="20.1024" height="15.5337" fill={iconColor}/>
      </svg>
      <CardDetails>
        <CardTitle>{calculateTimeLeft(card.remainTime)}</CardTitle>
        <CardSubtitle>{card.name}</CardSubtitle>
      </CardDetails>
    </CardContainer>
  );
};

StudyCard.propTypes = {
  card: PropTypes.shape({
    remainTime: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired
};

export default StudyCard;
