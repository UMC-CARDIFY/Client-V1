import styled from 'styled-components';
import { getTopNote } from '../../../api/library/getTopNote';
import { searchLib } from '../../../api/library/searchLib';
import { useState, useEffect } from 'react';
import NoteItem from './NoteItem';

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
            cntCard={note.cntCard}
            userName={note.userName}
            uploadAt={note.uploadAt}
            noteId={note.noteId} // Note ID 전달
          />
        ))
      ) : (
        <p>선택된 카테고리에 해당하는 노트가 없습니다.</p>
      )}
    </>
  );
};

export default NoteList;
