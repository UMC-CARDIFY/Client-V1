import styled from 'styled-components';
import PropTypes from 'prop-types';

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background: #fff;
  margin-top: 1rem;
  border: 1px solid #EBEBEB;

`;

const CardIcon = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  background: #E0E0E0;
  margin-right: 1rem;
`;

const CardDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.div`
  color: var(--Grays-Black, #1A1A1A);
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const CardSubtitle = styled.div`
  color: #696969;
  font-family: Pretendard;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const StudyCard = ({ card }) => (
  <CardContainer>
    <CardIcon />
    <CardDetails>
      <CardTitle>{card.timeLeft}</CardTitle>
      <CardSubtitle>{card.name}</CardSubtitle>
    </CardDetails>
  </CardContainer>
);

StudyCard.propTypes = {
  card: PropTypes.shape({
    timeLeft: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
};

export default StudyCard;
