import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ToolBar from './Toolbar/ToolBar';
import CombinedEditor from './CombinedEditor';
import { TextSelection } from 'prosemirror-state';
import { toggleMark } from 'prosemirror-commands';
import mySchema from './setup/schema';

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
  const viewRef = useRef(null);
  const [isEditorInitialized, setIsEditorInitialized] = useState(false);

  const addCard = (type) => {
    setCards([...cards, { type }]);
  };

  const addHeading1 = () => {
    if (!viewRef.current) return;

    const { state, dispatch } = viewRef.current;
    const { tr } = state;

    const headingNode = mySchema.nodes.heading.create({ level: 1 }, mySchema.text("헤딩1"));
    tr.replaceSelectionWith(headingNode);

    const resolvedPos = tr.doc.resolve(tr.selection.from + 1); 
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
    console.log("onSelectColor called with color:", color);
    
    if (!viewRef.current) return;
    const { state, dispatch } = viewRef.current;
    const { tr, selection } = state;
    const markType = mySchema.marks.text_color;

    if (selection.empty) return;

    let { from, to } = selection;
    console.log("Applying color to selection:", { from, to, color });

    if (selection instanceof TextSelection) {
      tr.addMark(from, to, markType.create({ color }));
    }

    dispatch(tr.scrollIntoView());
    viewRef.current.focus();
  };

  const onSelectHighlightColor = (color) => {
    console.log("onSelectHighlightColor called with color:", color);
    // 이곳에서 하이라이트 색상을 적용하는 로직을 추가할 수 있습니다.
  };

  useEffect(() => {
    // Editor가 초기화된 후에 isEditorInitialized 상태를 true로 설정
    if (viewRef.current) {
      setIsEditorInitialized(true);
    }
  }, [viewRef.current]);

  return (
    <EditorContainer>
      <CombinedEditor
        cards={cards}
        viewRef={viewRef} // viewRef 전달
      />
      {isEditorInitialized && (
        <ToolBarWrapper>
          <ToolBar 
            viewRef={viewRef} 
            addCard={addCard} 
            addHeading1={addHeading1} 
            toggleBold={toggleBold} 
            onSelectColor={onSelectColor} 
            onSelectHighlightColor={onSelectHighlightColor} // 추가된 부분
          />
        </ToolBarWrapper>
      )}
    </EditorContainer>
  );
};

export default Editor;
