
import styled from 'styled-components';
import StudyCalendar from './StudyCalendar';

const Container = styled.div`
  width: 22.5rem;
  height: 44.5625rem;
  padding: 2rem;
  box-sizing: border-box;
  flex-shrink: 0;
  overflow: hidden;
  @media (min-width: 1440px) and (max-width: 1680px) {
    width: 22.5rem;
    height: 46.5625rem;
  }
  @media (min-width: 1024px)and (max-width: 1440px) {
  width: 19.1875rem;
height: 40.0625rem;
}
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
