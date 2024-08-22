import { createContext, useState } from 'react';

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [noteData, setNoteData] = useState({
    noteId: null,
    noteName: '',
    noteContent: '',
    markState: false,
    isEdit: false,
    isUpload: false,
  });

  return (
    <NoteContext.Provider value={{ noteData, setNoteData }}>
      {children}
    </NoteContext.Provider>
  );
};