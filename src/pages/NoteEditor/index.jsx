import styled from 'styled-components';
import Editor from './components/Editor';
import Header from './components/Header';
import MenuBar from './components/MenuBar';

const NoteEditorWrapper = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;  // 전체 페이지에 스크롤이 생기지 않도록 설정
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;  // Header와 Editor의 스크롤을 분리하기 위해 설정
`;

const EditorWrapper = styled.div`
  flex-grow: 1;
  overflow-y: auto;  // Editor 부분에만 스크롤이 적용되도록 설정
`;

const NoteEditor = () => {
  return (
    <NoteEditorWrapper>
      <MenuBar />
      <ContentWrapper>
        <Header />
        <EditorWrapper>
          <Editor />
        </EditorWrapper>
      </ContentWrapper>
    </NoteEditorWrapper>
  );
};

export default NoteEditor;
