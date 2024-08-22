import styled from 'styled-components';
import PropTypes from 'prop-types';
import cardIcon from '../../../../assets/dashboard/cardIcon.svg';
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

const CardIcon = styled.img`
  width: 1.64363rem;
  height: 1.28781rem;
  flex-shrink: 0;
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

const StudyCard = ({ card }) => (
  <CardContainer>
    <CardIcon src={cardIcon} alt="Card Icon" />
    <CardDetails>
      <CardTitle>{calculateTimeLeft(card.remainTime)}</CardTitle>
      <CardSubtitle>{card.name}</CardSubtitle>
    </CardDetails>
  </CardContainer>
);

StudyCard.propTypes = {
  card: PropTypes.shape({
    remainTime: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
};

export default StudyCard;
