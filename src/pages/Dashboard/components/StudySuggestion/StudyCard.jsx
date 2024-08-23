import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

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
  background: ${({ isDue }) =>
    isDue
      ? 'var(--Etc-Blue-Gradiant, linear-gradient(90deg, #DCE8FF 0%, #C0D6FF 100%))'
      : 'linear-gradient(90deg, #F6F6F6 0%, #F0F0F0 100%)'};
  box-sizing: border-box;
  cursor: ${({ isDue }) => (isDue ? 'pointer' : 'default')};
`;

const CardDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.div`
  color: ${({ isDue }) => (isDue ? 'var(--Grays-Black, #1A1A1A)' : 'var(--Grays-Gray2, #767676)')};
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

const StyledIcon = styled.svg`
  opacity: ${({ isDue }) => (isDue ? 1 : 0.6)};
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

const formatRemainTime = (remainTime) => {
  // remainTime이 음수인 경우, 또는 0 시간이 포함된 경우 '학습하기'로 표시
  if (/^-|\b0 시간\b/.test(remainTime) || remainTime.includes("-")) {
    return '학습하기';
  }

  // "00 시간"을 제거하고, 앞에 있는 0을 제거
  let cleanedRemainTime = remainTime.replace(/^00 시간\s*/, '').replace(/\b0(\d+)/g, '$1');

  // 결과 반환
  return `${cleanedRemainTime} 후`;
};





const StudyCard = ({ card }) => {
  const navigate = useNavigate();
  const iconColor = colorMap[card.color] || '#A9A9A9';
  
  // remainTime이 '학습하기'로 설정된 경우 학습 가능
  const isDue = formatRemainTime(card.remainTime) === '학습하기';

  const handleClick = () => {
    if (isDue) {
      navigate('/flashcard');
    }
  };

  return (
    <CardContainer isDue={isDue} onClick={handleClick}>
      <StyledIcon
        xmlns="http://www.w3.org/2000/svg"
        width="29"
        height="24"
        viewBox="0 0 29 24"
        fill="none"
        isDue={isDue}
      >
        <path
          d="M6.87535 5.73529L7.03417 4.90523L7.66943 1.58496L27.5001 5.17686L24.9591 18.4579L22.4802 18.0089L21.8605 17.8967"
          stroke={iconColor}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="1.20215"
          y="6.65625"
          width="20.1024"
          height="15.5337"
          stroke={iconColor}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="1.20215" y="6.65625" width="20.1024" height="15.5337" fill={iconColor} />
      </StyledIcon>
      <CardDetails>
        <CardTitle isDue={isDue}>{formatRemainTime(card.remainTime)}</CardTitle> {/* remainTime을 포맷팅해서 표시 */}
        <CardSubtitle>{card.noteName}</CardSubtitle> {/* 제목을 noteName으로 표시 */}
      </CardDetails>
    </CardContainer>
  );
};

StudyCard.propTypes = {
  card: PropTypes.shape({
    remainTime: PropTypes.string.isRequired, 
    noteName: PropTypes.string.isRequired, // noteName으로 변경
    color: PropTypes.string.isRequired,
  }).isRequired
};

export default StudyCard;
