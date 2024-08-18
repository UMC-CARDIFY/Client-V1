import { useState } from 'react';
import styled from 'styled-components';
import Editor from './components/Editor';
import Header from './components/Header/Header';
import MenuBar from './components/MenuBar';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

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
  const { noteId, folderId } = location.state || {}; // folderId를 가져옴

  useEffect(() => {
    if (noteId) {
      console.log('Editing note with ID:', noteId, 'from folder ID:', folderId);
      // noteId를 사용해 노트 데이터를 가져오거나 다른 로직을 수행
    }
  }, [noteId]);

  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
  const [editorView, setEditorView] = useState(null);

  const toggleMenuBar = () => {
    setIsMenuCollapsed(!isMenuCollapsed);
  };

  return (
    <NoteEditorWrapper>
      <MenuBarWrapper isCollapsed={isMenuCollapsed}>
        {/* MenuBar에 folderId를 전달 */}
        <MenuBar
          isCollapsed={isMenuCollapsed}
          toggleMenuBar={toggleMenuBar}
          selectedFolderId={folderId} // folderId를 MenuBar에 전달
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
