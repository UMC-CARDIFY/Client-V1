import { createContext, useState } from 'react';

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [noteData, setNoteData] = useState(null);

  return (
    <NoteContext.Provider value={{ noteData, setNoteData }}>
      {children}
    </NoteContext.Provider>
  );
};