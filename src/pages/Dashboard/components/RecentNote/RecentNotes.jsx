import styled from 'styled-components';
import RecentNoteItem from './RecentNoteItem';
import { useMediaQuery } from 'react-responsive';

const RecentNotesDiv = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 0.75rem;
  background: var(--Grays-White, #FFF);
  padding: 2rem 2rem 1.5rem 2rem;
  width: 52rem;
  height: 19.8125;
  box-sizing: border-box;
  /* default */
  box-shadow: 0px 4px 26px 0px rgba(0, 0, 0, 0.02), 0px 10px 60px 0px rgba(0, 74, 162, 0.03);
  width: 100%;
  @media (min-width: 1440px) and (max-width: 1680px) {
  width: 41.5em;
  height: 24.3125rem;
}
  @media (max-width: 1440px) and (min-width: 1200px){
  width: 38.8125rem;
  height: 18.5625rem;
  padding: 1.5rem;
  }
`;

const Title = styled.h2`
color: var(--Grays-Black, #1A1A1A);
font-family: Pretendard;
font-size: 1.125rem;
font-style: normal;
font-weight: 500;
line-height: normal;
margin-top: 0;
  margin-left: 0.5rem;
`;

const RecentNotesContainer = styled.div`
  display: flex;
  min-width: 32.8125rem;
  height: auto;
  flex-direction: column;
  align-items: flex-start;
`;

const RecentNotes = () => {
  const isLaptop = useMediaQuery({ minWidth: 1440, maxWidth: 1680 });

  return (
    <RecentNotesDiv>
      <Title>최근 열람한 노트</Title>
      <RecentNotesContainer>
        <RecentNoteItem folderName="폴더 이름 1" noteName="노트 이름 1" lastModified="YYYY-MM-DD" />
        <RecentNoteItem folderName="폴더 이름 2" noteName="노트 이름 2" lastModified="YYYY-MM-DD" />
        <RecentNoteItem folderName="폴더 이름 3" noteName="노트 이름 3" lastModified="YYYY-MM-DD" />
        {isLaptop && (
          <RecentNoteItem folderName="폴더 이름 4" noteName="노트 이름 4" lastModified="YYYY-MM-DD" />
        )}
      </RecentNotesContainer>
    </RecentNotesDiv>
  );
};

export default RecentNotes;
