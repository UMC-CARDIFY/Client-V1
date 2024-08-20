import { useState, useContext } from 'react';
import styled from 'styled-components';
import Editor from './components/Editor';
import Header from './components/Header/Header';
import MenuBar from './components/MenuBar';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { getNote } from '../../api/noteeditor/getNote';
import { NoteContext } from '../../api/NoteContext';

const NoteEditorWrapper = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

const MenuBarWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isCollapsed',
})`
  width: 15rem;
  transition: transform 0.3s ease-in-out;
  transform: ${({ isCollapsed }) => (isCollapsed ? 'translateX(-15rem)' : 'translateX(0)')};
`;

const ContentWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isMenuCollapsed',
})`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
  transition: margin-left 0.3s ease-in-out;
  margin-left: ${({ isMenuCollapsed }) => (isMenuCollapsed ? '-15rem' : '3rem')};
`;

const EditorWrapper = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

const NoteEditor = () => {
  const location = useLocation();
  const { noteId: initialNoteId, folderId } = location.state || {}; // folderId를 가져옴
  const [noteId, setNoteId] = useState(initialNoteId);
  const { noteData, setNoteData } = useContext(NoteContext);
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
  const [editorView, setEditorView] = useState(null);

  const toggleMenuBar = () => {
    setIsMenuCollapsed(!isMenuCollapsed);
  };

  useEffect(() => {
    if (noteId) {
      const fetchNoteData = async () => {
        try {
          const data = await getNote(noteId);
          setNoteData(data); // 가져온 노트 데이터를 상태에 저장
          console.log('Fetched Note Data:', data);
        } catch (error) {
          console.error('노트 데이터를 가져오는 중 오류가 발생했습니다:', error);
        }
      };

      fetchNoteData();
    }
  }, [noteId, setNoteData]);

  const handleNoteSelect = (newNoteId) => {
    setNoteId(newNoteId); // 새로운 노트 ID 설정
  };

  return (
    <NoteEditorWrapper>
      <MenuBarWrapper isCollapsed={isMenuCollapsed}>
        {/* MenuBar에 folderId를 전달 */}
        <MenuBar
          isCollapsed={isMenuCollapsed}
          toggleMenuBar={toggleMenuBar}
          selectedFolderId={folderId} // folderId를 MenuBar에 전달
          onSelectNote={handleNoteSelect} // MenuBar에서 노트를 선택할 때 호출될 함수
        />
      </MenuBarWrapper>
      <ContentWrapper isMenuCollapsed={isMenuCollapsed}>
        <Header isMenuCollapsed={isMenuCollapsed} toggleMenuBar={toggleMenuBar} editorView={editorView} />
        <EditorWrapper>
          <Editor setEditorView={setEditorView} />
        </EditorWrapper>
      </ContentWrapper>
    </NoteEditorWrapper>
  );
};

export default NoteEditor;
