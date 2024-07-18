import styled from 'styled-components';
import RecentNoteItem from './RecentNoteItem';

const Title = styled.h2`
  color: var(--Black, #1F1F1F);
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: 5rem;  
  margin-left: 8rem; 
`;

const RecentNotesContainer = styled.div`
  display: flex;
  width: 56.2rem; /* 피그마대로 하면 안 맞음 이유를 모르겠어요*/
  min-width: 32.8125rem;
  height: auto;
  padding: 0.5rem 1.5rem;
  flex-direction: column;
  align-items: flex-start;
  background-color: #ffffff;
  margin-left: 8rem;  
`;

const RecentNotes = () => {
  return (
    <>
      <Title>최근 열람한 노트</Title>
      <RecentNotesContainer>
        <RecentNoteItem folderName="폴더 이름 1" noteName="노트 이름 1" lastModified="YYYY-MM-DD" />
        <RecentNoteItem folderName="폴더 이름 2" noteName="노트 이름 2" lastModified="YYYY-MM-DD" />
        <RecentNoteItem folderName="폴더 이름 3" noteName="노트 이름 3" lastModified="YYYY-MM-DD" />
        <RecentNoteItem folderName="폴더 이름 4" noteName="노트 이름 4" lastModified="YYYY-MM-DD" />
      </RecentNotesContainer>
    </>
  );
};

export default RecentNotes;
