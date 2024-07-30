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

const MenuBarWrapper = styled.div`
  width: 15rem;
  transition: transform 0.3s ease-in-out;
  transform: ${({ isCollapsed }) => (isCollapsed ? 'translateX(-15rem)' : 'translateX(0)')};
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
  transition: margin-left 0.3s ease-in-out;
  margin-left: ${({ isMenuCollapsed }) => (isMenuCollapsed ? '-15rem' : '4rem')};
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
      <MenuBarWrapper isCollapsed={isMenuCollapsed}>
        <MenuBar isCollapsed={isMenuCollapsed} toggleMenuBar={toggleMenuBar} />
      </MenuBarWrapper>
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
