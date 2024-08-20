import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ToolBar from './Toolbar/ToolBar';
import CombinedEditor, { addCard } from './CombinedEditor'; // addCard 가져오기
import { TextSelection } from 'prosemirror-state';
import { toggleMark } from 'prosemirror-commands';  // toggleMark 추가
import mySchema from './setup/schema';
import PropTypes from 'prop-types';

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

const Editor = ({ setEditorView }) => {
  const viewRef = useRef(null);
  const [isEditorInitialized, setIsEditorInitialized] = useState(false);
  const [isCardSelected, setIsCardSelected] = useState(false);

  const handleAddCard = (type) => {
    addCard(viewRef, type);  // viewRef와 type을 전달하여 addCard 호출
  };

  const addHeading = (level) => {
    if (!viewRef.current) return;

    const { state, dispatch } = viewRef.current;
    const { tr } = state;

    // 헤딩 노드를 생성합니다.
    const headingNode = mySchema.nodes.heading.create({ level }, mySchema.text(`헤딩${level}`));

    // 헤딩을 포함한 list_item 노드를 생성합니다.
    const listItemNode = mySchema.nodes.list_item.create(null, headingNode);

    // 현재 선택된 위치에 list_item 노드를 삽입합니다.
    tr.replaceSelectionWith(listItemNode);

    // 새로운 블록 뒤에 커서를 이동합니다.
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
    if (!viewRef.current) return;
    const { state, dispatch } = viewRef.current;
    const { tr, selection } = state;
    const markType = mySchema.marks.text_color;

    if (selection.empty) return;

    let { from, to } = selection;
    //console.log("Applying color to selection:", { from, to, color });

    if (selection instanceof TextSelection) {
      tr.addMark(from, to, markType.create({ color }));
    }

    dispatch(tr.scrollIntoView());
    viewRef.current.focus();
  };

  const onSelectHighlightColor = (color) => {
    if (!viewRef.current) return;
    const { state, dispatch } = viewRef.current;
    const { tr, selection } = state;
    const markType = mySchema.marks.highlight;

    if (selection.empty) return;

    let { from, to } = selection;
    if (selection instanceof TextSelection) {
      tr.addMark(from, to, markType.create({ backgroundColor: color }));
    }

    dispatch(tr.scrollIntoView());
    viewRef.current.focus();
  };

  const handleAddTextBlock = () => {
    if (!viewRef.current) return;
  
    const { state, dispatch } = viewRef.current;
    const { tr } = state;
  
    // 텍스트 블록을 생성하는 프로세스
    const paragraphNode = mySchema.nodes.paragraph.create();
    const listItemNode = mySchema.nodes.list_item.create(null, paragraphNode);
    const bulletListNode = mySchema.nodes.bullet_list.create(null, listItemNode);
  
    // 문서의 마지막 위치에 새로운 블록 삽입
    const endPos = tr.doc.content.size;
    tr.insert(endPos, bulletListNode);
  
    // 새로운 텍스트 블록 뒤에 커서를 이동합니다.
    tr.setSelection(TextSelection.near(tr.doc.resolve(endPos + 1)));
  
    dispatch(tr.scrollIntoView());
    viewRef.current.focus();
  };
  
  
  const handleEditorStateChange = (editorView) => {
    const { $from } = editorView.state.selection;

    // 현재 선택된 노드에서 하위 노드를 탐색
    for (let depth = $from.depth; depth > 0; depth--) {
      const currentNode = $from.node(depth);
      console.log(`Node at depth ${depth}:`, currentNode.type.name);
      if (currentNode.type === mySchema.nodes.word_card) {
        console.log("Card selected");
        setIsCardSelected(true);
        return;
      }
    }
    
    console.log("Card not selected");
    setIsCardSelected(false);
  };

  useEffect(() => {
    if (viewRef.current) {
      setIsEditorInitialized(true);
      setEditorView(viewRef.current);    // viewRef.current 값이 설정되면 setEditorView로 전달
      const updateSelection = () => {
        handleEditorStateChange(viewRef.current);
      };

      viewRef.current.dom.addEventListener('mouseup', updateSelection);
      viewRef.current.dom.addEventListener('keyup', updateSelection);

      return () => {
        if (viewRef.current) {
          viewRef.current.dom.removeEventListener('mouseup', updateSelection);
          viewRef.current.dom.removeEventListener('keyup', updateSelection);
        }
      };
    }
  }, [viewRef.current, setEditorView]);
    
  return (
    <EditorContainer>
      <CombinedEditor
        viewRef={viewRef} // viewRef 전달
      />
      {isEditorInitialized && (
        <ToolBarWrapper>
          <ToolBar 
            viewRef={viewRef} 
            addCard={handleAddCard} // 수정된 addCard 함수 전달
            addHeading={addHeading} 
            toggleBold={toggleBold} 
            onSelectColor={onSelectColor} 
            onSelectHighlightColor={onSelectHighlightColor} 
            onAddTextBlock={handleAddTextBlock} // 텍스트 블록 추가 함수 전달
            isCardSelected={isCardSelected} // 카드 선택 여부 전달
          />
        </ToolBarWrapper>
      )}
    </EditorContainer>
  );
};

Editor.propTypes = {
  setEditorView: PropTypes.func.isRequired, // setEditorView는 필수 prop으로 정의
};


export default Editor;
