import { createContext, useState, useEffect } from 'react';

export const NoteStatusContext = createContext();

export const NoteStatusProvider = ({ children, noteId }) => {
  const [currentNoteId, setCurrentNoteId] = useState(noteId);
  const [isNameChanged, setIsNameChanged] = useState(false);
  const [isContentChanged, setIsContentChanged] = useState(false);
  const [isMarkStateChanged, setIsMarkStateChanged] = useState(false);

  useEffect(() => {
    // noteId가 변경되면 상태값 초기화
    if (currentNoteId !== noteId) {
      setCurrentNoteId(noteId);
      setIsNameChanged(false);
      setIsContentChanged(false);
      setIsMarkStateChanged(false);
    }
  }, [noteId, currentNoteId]);

  return (
    <NoteStatusContext.Provider
      value={{
        isNameChanged,
        setIsNameChanged,
        isContentChanged,
        setIsContentChanged,
        isMarkStateChanged,
        setIsMarkStateChanged,
      }}
    >
      {children}
    </NoteStatusContext.Provider>
  );
};
