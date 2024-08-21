import styled from 'styled-components';
import { getTopNote } from '../../../api/library/getTopNote';
import { searchLib } from '../../../api/library/searchLib';
import { useState, useEffect } from 'react';
import NoteItem from './NoteItem';
import noResult from '../../../assets/noResult.svg';

const NoResult = styled.div`
  color: var(--grays-gray-25, #939393);
text-align: center;
font-family: Pretendard;
font-size: 1.5rem;
font-style: normal;
font-weight: 400;
line-height: normal;
display: flex;
justify-content: center;
align-items: center;
margin-top: 12rem;
  `;

const NoResultIcon = styled.div`
width: 3rem;
height: 3rem;
flex-shrink: 0;
`;

const NoteList = ({ searchQuery, categories = [], showAllNotes = false }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTopNote();
      setNotes(data);
      console.log(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
      const fetchSearchData = async () => {
        const data = await searchLib(searchQuery, categories); // 카테고리를 배열로 전달
        setNotes(data);
        console.log(data);
        console.log('notes',notes)
        console.log('notes',notes.isDownload)
      };
      fetchSearchData();
  }, [searchQuery, categories]);

  return (
    <>
      {notes.length > 0 ? (
        notes.map((note, index) => (
          <NoteItem
            key={index}
            noteName={note.noteName}
            categoryName={note.categoryName}
            isDownload={note.isDownload}
            cntCard={note.cntCard}
            userName={note.userName}
            uploadAt={note.uploadAt}
            noteId={note.noteId} 
            libraryId={note.libraryId}
          />
        ))
      ) : (
        <NoResult>
          <NoResultIcon>
            <img src={noResult} alt="noResultIcon" />
          </NoResultIcon>
        검색 결과가 없습니다.
        </NoResult>
      )}
    </>
  );
};

export default NoteList;
