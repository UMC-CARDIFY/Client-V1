import { useState, useRef } from 'react';
import styled from 'styled-components';
import ToolBar from './ToolBar';
import CombinedEditor from './CombinedEditor';
import { TextSelection } from 'prosemirror-state';
import { toggleMark } from 'prosemirror-commands'; // 변경된 부분
import mySchema from './Markdown/schema';

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  border-radius: 0.5rem;
  padding: 2rem 6rem 6rem 4rem;
  width: 100%;
  box-sizing: border-box;
  @media (max-width: 48rem) {
    padding: 0.625rem;
  }
  position: relative;
`;

const ToolBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Editor = () => {
  const [cards, setCards] = useState([]);
  const viewRef = useRef(null); // EditorView를 참조하기 위한 useRef 추가

  const addCard = (type) => {
    setCards([...cards, { type }]);
  };

  const addHeading1 = () => {
    if (!viewRef.current) return;

    const { state, dispatch } = viewRef.current;
    const { tr } = state;

    // 헤딩1 노드 생성 및 삽입
    const headingNode = mySchema.nodes.heading.create({ level: 1 }, mySchema.text("제목1"));
    tr.replaceSelectionWith(headingNode);

    // 커서를 헤딩1 내부로 이동시키고 placeholder 설정
    const resolvedPos = tr.doc.resolve(tr.selection.from + 1); // 내부로 커서 이동
    const newSelection = TextSelection.create(tr.doc, resolvedPos.pos);
    tr.setSelection(newSelection).scrollIntoView();

    dispatch(tr);
    viewRef.current.focus();
  };

  const toggleBold = () => {
    if (!viewRef.current) return;
    const { state, dispatch } = viewRef.current;
    toggleMark(mySchema.marks.strong)(state, dispatch);
    viewRef.current.focus();
  };

  const onSelectColor = (color) => {
    if (!viewRef.current) return;
    const { state, dispatch } = viewRef.current;
    const { tr, selection } = state;
    const markType = mySchema.marks.textColor;

    if (selection.empty) return;

    let { from, to } = selection;
    if (selection instanceof TextSelection) {
      tr.addMark(from, to, markType.create({ color }));
    }

    dispatch(tr.scrollIntoView());
    viewRef.current.focus();
  };

  return (
    <EditorContainer>
      <CombinedEditor
        cards={cards}
        addCard={addCard}
        viewRef={viewRef} // viewRef 전달
      />
      <ToolBarWrapper>
        <ToolBar viewRef={viewRef} addCard={addCard} addHeading1={addHeading1} toggleBold={toggleBold} onSelectColor={onSelectColor} />
      </ToolBarWrapper>
    </EditorContainer>
  );
};

export default Editor;
