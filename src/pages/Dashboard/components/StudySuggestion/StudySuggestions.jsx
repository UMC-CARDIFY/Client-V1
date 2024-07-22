
import styled from 'styled-components';
import StudyCalendar from './StudyCalendar';

const Container = styled.div`
  width: 28.3125rem;
  height: 46.75rem;
  flex-shrink: 0;
  background: #fff;
  overflow: hidden;
`;

const Title = styled.div`
  color: var(--Black, #1F1F1F);
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: 5rem;  
  margin-bottom: 1rem;
`;


const StudySuggestions = () => {
  return (
    <>
      <Title>학습 제안</Title>
      <Container>
      <StudyCalendar />
      </Container>
    </>
  );
};

export default StudySuggestions;
