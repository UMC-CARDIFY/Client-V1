import MenuBar from '../../components/MenuBar';
import TopBar from '../../components/TopBar';
import RecentNotes from './components/RecentNote/RecentNotes';
import WeeklyStudyResults from './components/WeeklyStudy/WeeklyStudyResults';
import StudySuggestions from './components/StudySuggestion/StudySuggestions';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 1080px;
  flex: 1;
`;

const ContentArea = styled.div`
  display: flex;
  flex-direction: row; 
  height: 100%; 
  background: var(--Main-BackGround, #F2F4F8);
`;

const NotesAndResults = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 2rem;
  @media (max-width: 1440px) {
    margin-right: 3.25rem;
  }
  @media (max-width: 1024px) {
    margin-right: 1.5rem;
  }
`;

const StudySuggestionsArea = styled.div`
  flex: 1;
`;

export const Dashboard = () => {
  return (
    <Container>
      <MenuBar />
      <MainContent>
        <TopBar />
        <ContentArea>
          <NotesAndResults>
            <RecentNotes />
            <WeeklyStudyResults />
          </NotesAndResults>
          <StudySuggestionsArea>
            <StudySuggestions />
          </StudySuggestionsArea>
        </ContentArea>
      </MainContent>
    </Container>
  );
};

export default Dashboard;
