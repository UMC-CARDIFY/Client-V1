import { useEffect, useState } from 'react';
import styled from 'styled-components';
import RecentNoteItem from './RecentNoteItem';
import { useMediaQuery } from 'react-responsive';
import { getRecentNotes } from '../../../../api/dashboard/recentNotes';

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
  const [notes, setNotes] = useState([]);
  const isLaptop = useMediaQuery({ minWidth: 1440, maxWidth: 1680 });

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const noteSize = isLaptop ? 4 : 3;
        const recentNotes = await getRecentNotes(noteSize);

        console.log('받아온 노트 데이터:', recentNotes); // 받아온 데이터 확인
        setNotes(recentNotes);
      } catch (error) {
        console.error('노트 데이터를 불러오는 중 오류 발생:', error);
      }
    };

    fetchNotes();
  }, [isLaptop]);

  return (
    <RecentNotesDiv>
      <Title>최근 열람한 노트</Title>
      <RecentNotesContainer>
        {notes.map(note => (
          <RecentNoteItem
            key={note.noteId}
            folderName={note.folderName.length > 8 ? `${note.folderName.substring(0, 8)}...` : note.folderName}
            noteName={note.name.length > 8 ? `${note.name.substring(0, 8)}...` : note.name}
            lastModified={note.editDate}
            folderColor={note.folderColor} 
            noteId={note.noteId} // 전달
            folderId={note.folderId} // 전달
          />
        ))}
      </RecentNotesContainer>
    </RecentNotesDiv>
  );
};

export default RecentNotes