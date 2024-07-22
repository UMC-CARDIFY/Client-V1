import styled from 'styled-components';
import RecentNoteItem from './RecentNoteItem';
import { useMediaQuery } from 'react-responsive';

const RecentNotesDiv = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 0.75rem;
background: var(--Grays-White, #FFF);
  margin-top: 2.5rem;  
  margin-left: 4rem; 
  padding: 1.5rem 0rem 1rem 1rem;
  min-width: 32.8125rem;
/* default */
box-shadow: 0px 4px 26px 0px rgba(0, 0, 0, 0.02), 0px 10px 60px 0px rgba(0, 74, 162, 0.03);
width: 58.6875rem;
@media (max-width: 1440px) {
width: 41.575rem;
@media (max-width: 1024px) {
width: 39.5rem; 
height: 18.875rem;
}
box-sizing: border-box;
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
  width: 56.2rem; /* 피그마대로 하면 안 맞음 이유를 모르겠어요 */
  min-width: 32.8125rem;
  height: auto;
  padding: 0.5rem 0 0.5rem 0.5rem;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 1440px) {
    width: 38.825rem; /* 피그마랑 동일하게 하기 위해서 피그마 사이즈보다 - 0.2475 rem 함 */
    min-width: 32.8125rem;
  }

  @media (max-width: 1024px) {
    width: 36.5rem; /* 피그마랑 동일하게 하기 위해서 피그마 사이즈보다 - 0.2475 rem 함 */
    min-width: 32.8125rem;
  }
`;

const RecentNotes = () => {
  const isTablet = useMediaQuery({ maxWidth: 1024 });

  return (
    <RecentNotesDiv>
      <Title>최근 열람한 노트</Title>
      <RecentNotesContainer>
        <RecentNoteItem folderName="폴더 이름 1" noteName="노트 이름 1" lastModified="YYYY-MM-DD" />
        <RecentNoteItem folderName="폴더 이름 2" noteName="노트 이름 2" lastModified="YYYY-MM-DD" />
        <RecentNoteItem folderName="폴더 이름 3" noteName="노트 이름 3" lastModified="YYYY-MM-DD" />
        {!isTablet && (
          <RecentNoteItem folderName="폴더 이름 4" noteName="노트 이름 4" lastModified="YYYY-MM-DD" />
        )}
      </RecentNotesContainer>
    </RecentNotesDiv>
  );
};

export default RecentNotes;
