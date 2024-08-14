import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';  
import { EditorState, TextSelection } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap, deleteSelection } from 'prosemirror-commands';
import { history } from 'prosemirror-history';
import { dropCursor } from 'prosemirror-dropcursor';
import { gapCursor } from 'prosemirror-gapcursor';
import { sinkListItem, liftListItem, splitListItem, wrapInList } from 'prosemirror-schema-list';
import 'prosemirror-view/style/prosemirror.css';
import { myInputRules } from './Markdown/inputRules';
import mySchema from './setup/schema';
import WordCardView from './setup/wordcardView';
import WordCardPreviewModal from '../Cards/PreviewModal/wordcardPreview';
import BlankCardView from './setup/blankcardView';
import BlankCardPreviewModal from '../Cards/PreviewModal/blankcardPreview';
import MultiCardView from './setup/multicardView';
import MultiCardPreviewModal from '../Cards/PreviewModal/multicardPreview';
import FlashcardButton from './FlashcardButton';

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
      border: none;
      padding: none;
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

  // 모달 열림/닫힘 상태와 question/answer 데이터를 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modalQuestion, setModalQuestion] = useState('');
  const [modalAnswer, setModalAnswer] = useState('');
  const [modalQuestionBack, setModalQuestionBack] = useState('');
  
  const openModal = (type, question_front = '', answer = '', question_back = '') => {
    setModalType(type);
    if (type === 'word_card') {
      setModalQuestion(question_front);  // word_card의 경우, question_front가 실제로 question이 됩니다.
      setModalAnswer(answer);
    } else if (type === 'blank_card') {
      setModalQuestion(question_front);  // blank_card의 경우 각각의 텍스트를 별도로 저장
      setModalAnswer(answer);
      setModalQuestionBack(question_back);
    } else if (type === 'multi_card') {
      setModalQuestion(question_front);  // multi_card의 경우 배열의 형태로 저장된 answer를 그대로 사용
      setModalAnswer(answer);
    } 
  
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleBackspaceInCard = (state, dispatch) => {
    const { selection } = state;
    const { $from, empty } = selection;
    if (empty && $from.parent.type === mySchema.nodes.paragraph) {
        const currentText = $from.parent.textContent;
        if (currentText.length > 0) {
            //console.log('Allowing default backspace behavior');
            return deleteSelection(state, dispatch); // 텍스트가 있을 경우 삭제
        }
        //console.log('Preventing block deletion');
        return false; // 텍스트가 없을 경우 기본 동작(블록 삭제)을 막음
    }
    return true; // 기본 백스페이스 동작 허용
};

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
            'Backspace': (state, dispatch) => handleBackspaceInCard(state, dispatch),  // 백스페이스 키 처리 추가
          }),
          keymap(baseKeymap),
          history(),
          dropCursor(),
          gapCursor(),
          myInputRules(mySchema),
        ]
      });
      

      viewRef.current = new EditorView(contentRef.current, {
        state,
        nodeViews: {
          word_card(node, view, getPos) {
            return new WordCardView(node, view, getPos, openModal);
          },
          blank_card(node, view, getPos) {
            return new BlankCardView(node, view, getPos, openModal);
          },
          multi_card(node, view, getPos) {
            return new MultiCardView(node, view, getPos, openModal);
          }
        },
        dispatchTransaction(transaction) {
          //console.log('Transaction dispatched');
          const newState = viewRef.current.state.apply(transaction);
          viewRef.current.updateState(newState);
          console.log('New state:', JSON.stringify(newState.doc.toJSON(), null, 2));
        }
      });

      window.viewRef = viewRef; // 데이터 값 들어오게 하려고 추가한 코드

      return () => {
        viewRef.current.destroy();
      };
    } 
  }, [viewRef]);

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
        >
        </TitleInput>
        <FlashcardButton />
      </TitleDiv>
      <Divider />
      <ContentArea>
        <div ref={contentRef}></div>
      </ContentArea>
      {isModalOpen && modalType === 'word_card' && (
        <WordCardPreviewModal 
          question={modalQuestion} 
          answer={[modalAnswer]} 
          onClose={closeModal}
        />
      )}
      {isModalOpen && modalType === 'blank_card' && (
        <BlankCardPreviewModal 
          question_front={modalQuestion}  // 앞부분 텍스트 전달
          answer={modalAnswer} 
          question_back={modalQuestionBack}  // 뒷부분 텍스트 전달
          onClose={closeModal}
        />
      )}
      {isModalOpen && modalType === 'multi_card' && (
        <MultiCardPreviewModal 
          question={modalQuestion} 
          answer={modalAnswer} 
          onClose={closeModal}
        />
      )}
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

export const addCard = (viewRef, type) => {
  if (!viewRef.current) return;

  const { state, dispatch } = viewRef.current;
  const { tr, selection } = state;
  const { $from } = selection;

  // 현재 리스트 아이템의 마지막 위치를 찾습니다.
  const endOfListItem = $from.end($from.depth);

  let node;

  // 카드 타입에 따라 카드 노드 생성
  switch (type) {
    case 'word_card':
      node = mySchema.nodes.word_card.create();
      break;
    case 'blank_card':
      node = mySchema.nodes.blank_card.create();
      break;
    case 'multi_card':
      node = mySchema.nodes.multi_card.create();
      break;
    /*
    case 'image_card':
      node = mySchema.nodes.image_card.create();
      break;
    */
    default:
      console.error('Unknown card type: ${type}');
      return;
  }

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
