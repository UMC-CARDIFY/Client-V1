import styled from 'styled-components';
import PropTypes from 'prop-types';

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-bottom: 0.75rem;
  width: 100%;
  gap: 1.5rem;
  border-radius: 0.5rem;
  background: linear-gradient(90deg, #F6F6F6 0%, #F0F0F0 100%);
  box-sizing: border-box;
`;

const CardIcon = styled.div`
  width: 2.25rem;
  height: 2.25rem;
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

const StudyCard = ({ card }) => (
  <CardContainer>
    <CardIcon>
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
  <g opacity="0.6">
    <path d="M9.38541 32.4C8.64834 32.4 8.0334 32.1536 7.5406 31.6608C7.0478 31.168 6.80087 30.553 6.7998 29.816V6.18397C6.7998 5.44798 7.04674 4.83358 7.5406 4.34078C8.03447 3.84798 8.64941 3.60104 9.38541 3.59998H21.5856C21.8508 3.59998 22.1052 3.70533 22.2927 3.89287L28.9069 10.5071C29.0944 10.6946 29.1998 10.949 29.1998 11.2142V29.816C29.1998 30.552 28.9534 31.1669 28.4606 31.6608C27.9678 32.1546 27.3523 32.401 26.6142 32.4H9.38541ZM21.1998 11.6H27.3584C27.4475 11.6 27.4921 11.4923 27.4291 11.4293L21.3705 5.37069C21.3075 5.30769 21.1998 5.35231 21.1998 5.4414V11.6Z" fill="#949AEC"/>
  </g>
</svg>
    </CardIcon>
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
