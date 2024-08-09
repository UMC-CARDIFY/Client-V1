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
  width: 100%;
`;

const ContentArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; 
  background: var(--Main-BackGround, #F2F4F8);
  gap: 2rem;

`;

const NotesAndResults = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StudySuggestionsArea = styled.div`
  display: flex;
`;

export const Dashboard = () => {
  return (
    <Container>
      <MenuBar />
      <MainContent>
        <TopBar 
          title="대시보드" 
          subtitle="카디파이 한눈에 보기"
        />
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
