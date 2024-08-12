import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';  
import { EditorState, TextSelection } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap } from 'prosemirror-commands';
import { history } from 'prosemirror-history';
import { dropCursor } from 'prosemirror-dropcursor';
import { gapCursor } from 'prosemirror-gapcursor';
import { sinkListItem, liftListItem, splitListItem, wrapInList } from 'prosemirror-schema-list';
import 'prosemirror-view/style/prosemirror.css';
import { myInputRules } from './Markdown/inputRules';
import mySchema from './setup/schema';  // schema.jsx에서 가져오기
import WordCardView from './setup/wordcardView';

const ContentArea = styled.div`
  flex: 1;
  border: none;
  outline: none;
  width: 100%;
  height: auto;
  box-sizing: border-box;
  resize: none;
  height: auto;
  color: #1A1A1A;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  .ProseMirror {
    border: none;
    outline: none;
    border-radius: 4px;
    min-height: 20rem;
    max-height: 33rem;
    white-space: pre-wrap;
    
    ul {
      list-style-type: disc;
      padding-left: 20px;
      position: relative;
    }

    li {
      border: 1px solid green;
      padding: 8px;
      margin-bottom: 4px;
      border-radius: 4px;
      position: relative;
    }
  }

  @media (max-width: 48rem) {
    height: calc(100vh - 6rem);
  }
`;

const TitleDiv = styled.div`
  display: flex;
  align-items: center;
`;

const TitleInput = styled.div`
  font-size: 1.5rem;
  width: 100%;
  border: none;
  outline: none;
  font-family: Pretendard;
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  box-sizing: border-box;
  &:focus {
    border: none;
    outline: none;
  }
  &.empty::before {
    content: attr(data-placeholder);
    color: #aaa;
  }
`;

const TransformFlashcard = styled.div`
  display: flex;
  width: 4rem;
  padding: 1.25rem 1.0625rem 1.25rem 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  cursor: pointer;
`;

const Divider = styled.div`
  height: 1px;
  background: #B1B1B1;
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 100%;
  box-sizing: border-box;
`;

const CombinedEditor = ({ viewRef }) => {  
  const contentRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      const doc = mySchema.node('doc', null, 
        mySchema.node('bullet_list', null, 
          mySchema.node('list_item', null, 
            mySchema.node('paragraph', null)
          )
        )
      );

      const state = EditorState.create({
        schema: mySchema,
        doc,
        plugins: [
          keymap({
            'Tab': (state, dispatch) => {
              return sinkListItem(mySchema.nodes.list_item)(state, dispatch);
            },
            'Shift-Tab': (state, dispatch) => {
              const { $from } = state.selection;
              const depth = $from.depth;

              if (depth === 3) {
                return false;
              }
              return liftListItem(mySchema.nodes.list_item)(state, dispatch);
            },
            'Enter': (state, dispatch) => {
              const { $from } = state.selection;
              const parent = $from.node(-1);
              if (parent.type === mySchema.nodes.list_item) {
                return splitListItem(mySchema.nodes.list_item)(state, dispatch);
              } else if (parent.type === mySchema.nodes.paragraph) {
                handleEnterKey(viewRef);
                return true;
              } else {
                return wrapInList(mySchema.nodes.bullet_list)(state, dispatch);
              }
            },
          }),
          keymap(baseKeymap),
          history(),
          dropCursor(),
          gapCursor(),
          myInputRules(mySchema),
        ]
      });

      const view = new EditorView(contentRef.current, {
        state,
        nodeViews: {
          word_card: (node, view, getPos) => new WordCardView(node, view, getPos),
        },
        dispatchTransaction(transaction) {
          const newState = view.state.apply(transaction);
          view.updateState(newState);
          console.log('New state:', JSON.stringify(newState.doc.toJSON(), null, 2));
      }
    });
    
      viewRef.current = view;
      window.viewRef = viewRef; //데이터 값 들어오게 하려고 추가한 코드

      return () => {
        view.destroy();
      };
    }
  }, [contentRef]);

  useEffect(() => {
    const node = titleRef.current;

    const handleInput = () => {
      if (node.innerText === '') {
        node.classList.add('empty');
      } else {
        node.classList.remove('empty');
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
      }
    };

    node.addEventListener('input', handleInput);
    node.addEventListener('keydown', handleKeyDown);
    handleInput();

    return () => {
      node.removeEventListener('input', handleInput);
      node.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <TitleDiv>
        <TitleInput
          contentEditable="true"
          data-placeholder="제목 없음"
          ref={titleRef}
          className="empty"
        ></TitleInput>
        <TransformFlashcard>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="26" viewBox="0 0 32 26" fill="none">
            <path d="M7.81846 6.2672L7.99227 5.35878L8.6875 1.7251L30.3901 5.65605L27.6092 20.1908L24.8964 19.6994L24.2182 19.5766" stroke="#B1B1B1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="1.61035" y="7.2749" width="22" height="17" stroke="#B1B1B1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="6.71035" y1="14.1749" x2="18.5104" y2="14.1749" stroke="#B1B1B1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="6.71035" y1="18.1749" x2="14.5104" y2="18.1749" stroke="#B1B1B1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </TransformFlashcard>
      </TitleDiv>
      <Divider />
      <ContentArea>
        <div ref={contentRef}></div>
      </ContentArea>
    </>
  );
};

export const handleEnterKey = (viewRef) => {
  if (!viewRef.current) return;

  const { state, dispatch } = viewRef.current;
  const { tr, selection } = state;
  const { $from } = selection;

  // 현재 선택된 위치가 속한 리스트 아이템의 마지막 위치를 찾습니다.
  const endOfListItem = $from.end($from.depth);

  // 새로운 텍스트 노드를 만듭니다.
  const paragraphNode = mySchema.nodes.paragraph.create();

  // 새로운 텍스트 노드를 리스트 아이템의 끝 다음에 삽입합니다.
  tr.insert(endOfListItem + 1, paragraphNode);

  // 새로운 텍스트 블록 뒤에 커서를 이동합니다.
  tr.setSelection(TextSelection.near(tr.doc.resolve(endOfListItem + 2)));

  dispatch(tr.scrollIntoView());
  viewRef.current.focus();
};

export const addCard = (viewRef) => {
  if (!viewRef.current) return;

  const { state, dispatch } = viewRef.current;
  const { tr, selection } = state;
  const { $from } = selection;

  // 현재 리스트 아이템의 마지막 위치를 찾습니다.
  const endOfListItem = $from.end($from.depth);

  // 새 카드 노드를 만듭니다.
  const node = mySchema.nodes.word_card.create();

  // 새로운 카드를 리스트 아이템의 끝 다음에 삽입합니다.
  tr.insert(endOfListItem + 1, node);

  // 새로운 카드 뒤에 커서를 이동합니다.
  tr.setSelection(TextSelection.near(tr.doc.resolve(endOfListItem + 2)));

  dispatch(tr.scrollIntoView());
  viewRef.current.focus();
};

CombinedEditor.propTypes = {
  viewRef: PropTypes.shape({
    current: PropTypes.object,
  }).isRequired,
};

export default CombinedEditor;