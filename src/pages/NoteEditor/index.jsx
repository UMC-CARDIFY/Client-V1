import { useState } from 'react';
import styled from 'styled-components';
import Editor from './components/Editor';
import Header from './components/Header';
import MenuBar from './components/MenuBar';

const NoteEditorWrapper = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
  width: ${({ isMenuCollapsed }) => (isMenuCollapsed ? '100%' : 'calc(100% - 15rem)')};
  transition: width 0.3s ease-in-out;
`;

const EditorWrapper = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

const NoteEditor = () => {
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);

  const toggleMenuBar = () => {
    setIsMenuCollapsed(!isMenuCollapsed);
  };

  return (
    <NoteEditorWrapper>
      <MenuBar isCollapsed={isMenuCollapsed} toggleMenuBar={toggleMenuBar} />
      <ContentWrapper isMenuCollapsed={isMenuCollapsed}>
        <Header isMenuCollapsed={isMenuCollapsed} toggleMenuBar={toggleMenuBar} />
        <EditorWrapper>
          <Editor />
        </EditorWrapper>
      </ContentWrapper>
    </NoteEditorWrapper>
  );
};

export default NoteEditor;