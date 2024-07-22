
import styled from 'styled-components';
import StudyCalendar from './StudyCalendar';

const Container = styled.div`
  width: 28.3125rem;
  height: 46.75rem;
  flex-shrink: 0;
  overflow: hidden;
  @media (max-width: 1440px) {
    width: 22.3125rem;
    height: 46.75rem;
  }
  @media (max-width: 1024px) {
  width: 19rem;
height: 39.25rem;
}
margin-right: 4rem;
margin-top: 2.5rem;
border-radius: 0.75rem;
background: var(--Grays-White, #FFF);
box-shadow: 0px 4px 26.7px 0px rgba(0, 0, 0, 0.02), 0px 10px 60px 0px rgba(0, 74, 162, 0.03);
`;

const StudySuggestions = () => {
  return (
    <>
      <Container>
      <StudyCalendar />
      </Container>
    </>
  );
};

export default StudySuggestions;
