import { useRef, useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { EditorState, TextSelection } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap, deleteSelection } from 'prosemirror-commands';
import { history } from 'prosemirror-history';
import { dropCursor } from 'prosemirror-dropcursor';
import { gapCursor } from 'prosemirror-gapcursor';
import { sinkListItem, liftListItem, splitListItem } from 'prosemirror-schema-list';
import 'prosemirror-view/style/prosemirror.css';
import { myInputRules } from './Markdown/inputRules';
import mySchema from './setup/schema';
import WordCardView from './setup/wordcardView';
import WordCardPreviewModal from '../Cards/PreviewModal/wordcardPreview';
import BlankCardView from './setup/blankcardView';
import BlankCardPreviewModal from '../Cards/PreviewModal/blankcardPreview';
import MultiCardView from './setup/multicardView';
import MultiCardPreviewModal from '../Cards/PreviewModal/multicardPreview';
import ImageCardView from './setup/imagecardView';
import FlashcardButton from './FlashcardButton';
import { NoteContext } from '../../../../api/NoteContext';
import { NoteStatusContext } from '../../../../api/NoteStatus';

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
  const { noteData, setNoteData } = useContext(NoteContext); // NoteContext 사용
  const { setIsNameChanged, setIsContentChanged } = useContext(NoteStatusContext);

  // 모달 열림/닫힘 상태와 question/answer 데이터를 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modalQuestion, setModalQuestion] = useState('');
  const [modalAnswer, setModalAnswer] = useState('');
  const [modalQuestionBack, setModalQuestionBack] = useState('');

  const openModal = (type, question_front = '', answer = '', question_back = '') => {
    setModalType(type);
    setModalQuestion(question_front);
    setModalAnswer(answer);
    setModalQuestionBack(question_back);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (!contentRef.current || viewRef.current) {
      return;
    }

    let doc;
    try {
      if (noteData && noteData.noteContent) {
        let jsonString = noteData.noteContent;

        // jsonString이 문자열인지 확인
        if (typeof jsonString === 'string') {
          jsonString = jsonString.replace(/\\/g, '');
          let jsonObject = JSON.parse(jsonString);

          // 문서 구조를 검사하고 불완전한 구조가 있으면 기본 구조로 대체
          if (!jsonObject || !jsonObject.content || !Array.isArray(jsonObject.content)) {
            throw new Error('Invalid document structure');
          }
          doc = mySchema.nodeFromJSON(jsonObject);
        } else if (typeof jsonString === 'object') {
          // jsonString이 이미 객체일 경우 그대로 사용
          doc = mySchema.nodeFromJSON(jsonString);
        } else {
          throw new Error('Unsupported noteContent format');
        }
      } else {
        // noteData가 없거나 빈 경우 기본 문서 구조 생성
        doc = mySchema.node('doc', null,
          mySchema.node('paragraph', null)
        );
      }
    } catch (error) {
      console.error('Error while creating document structure:', error);

      // 기본 구조로 대체
      doc = mySchema.node('doc', null,
        mySchema.node('paragraph', null)
      );
    }

    const handleBackspaceInCard = (state, dispatch) => {
      const { selection } = state;
      const { $from, empty } = selection;

      // 현재 선택된 노드가 card 타입인지 확인
      for (let depth = $from.depth; depth > 0; depth--) {
        const currentNode = $from.node(depth);
        if (currentNode.type === mySchema.nodes.word_card) {
          return false;
        }
      }

      // 노드가 비어 있을 때만 삭제를 수행하도록 처리
      if (empty && $from.parent.type === mySchema.nodes.paragraph) {
        const currentText = $from.parent.textContent;

        if (currentText.length === 0) {
          if (dispatch) {
            dispatch(state.tr.deleteRange($from.before(), $from.after()));
          }
          return true; // 동작을 처리했으므로 기본 동작을 막음
        }
      }

      return deleteSelection(state, dispatch); // 기본 동작 (텍스트 삭제) 유지
    };

    const state = EditorState.create({
      doc,
      schema: mySchema,
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
            //const currentNode = $from.node(-1);
            const currentNode = $from.node($from.depth); // 현재 노드 확인

            console.log("Current node type:", currentNode.type.name);

            // 현재 노드가 code_block일 때 paragraph로 변환
            if (currentNode.type === mySchema.nodes.code_block) {
              const tr = state.tr;

              // code_block을 paragraph로 변환
              const newParagraph = mySchema.nodes.paragraph.create();
              tr.replaceWith($from.before($from.depth), $from.after($from.depth), newParagraph);

              // 새로운 paragraph로 커서 이동
              const resolvedPos = tr.doc.resolve($from.before($from.depth) + 1);
              tr.setSelection(TextSelection.near(resolvedPos));

              dispatch(tr.scrollIntoView());
              return true;  // 기본 엔터키 동작을 막음
            }

            // code_block이 아닌 경우 기본 Enter 동작 유지
            return false;
          },


          'Backspace': (state, dispatch) => handleBackspaceInCard(state, dispatch),  // 백스페이스
        }),
        keymap(baseKeymap),
        history(),
        //dropCursor(),
        //gapCursor(),
        myInputRules(mySchema),
      ]
    });

    try {
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
          },
          image_card(node, view, getPos) {
            return new ImageCardView(node, view, getPos, openModal);
          }
        },
        dispatchTransaction(transaction) {
          let newState = viewRef.current.state.apply(transaction);

          // 새로운 문서 상태에서 code_block을 탐색하여 paragraph로 대체
          let tr = newState.tr; // 새 트랜잭션 생성

          let codeBlockFound = false;

          newState.doc.descendants((node, pos) => {
            if (node.type === mySchema.nodes.code_block) {
              // code_block을 paragraph로 변환
              const newParagraph = mySchema.nodes.paragraph.create();
              tr.replaceWith(pos, pos + node.nodeSize, newParagraph);
              codeBlockFound = true;
            }
          });

          // 만약 트랜잭션이 변경되었으면 적용
          if (codeBlockFound && tr.docChanged) {
            newState = newState.apply(tr); // 트랜잭션이 실제로 변경되었을 경우에만 적용
          }

          viewRef.current.updateState(newState);
          console.log('New state:', JSON.stringify(newState.doc.toJSON(), null, 2));

          // 노트 내용 업데이트
          //noteData.noteContent = newState.doc.toJSON();
          const newContent = newState.doc.toJSON();
          if (JSON.stringify(newContent) !== JSON.stringify(noteData.noteContent)) {
            setIsContentChanged(true);
          }
          noteData.noteContent = newContent;
        }
      });
    } catch (error) {
      console.error('Error during editor initialization:', error);
    }

    console.log('Editor view initialized.');

    return () => {
      if (viewRef.current) {
        viewRef.current.destroy();
        viewRef.current = null; // 에디터를 해제하고 참조를 null로 설정
      }
    };
  }, [contentRef, noteData, viewRef, setNoteData]);

  useEffect(() => {
    const node = titleRef.current;

    // noteData가 변경될 때마다 title을 업데이트
    if (noteData && noteData.noteName) {
      node.innerText = noteData.noteName;
      node.classList.remove('empty'); // noteName이 있을 때 empty 클래스를 제거
    } else {
      node.innerText = '';
      node.classList.add('empty'); // noteName이 없을 때 empty 클래스를 추가
    }

    const handleInput = () => {
      if (node.innerText === '') {
        node.classList.add('empty');
      } else {
        node.classList.remove('empty');
      }
      if (node.innerText !== noteData.noteName) {
        setIsNameChanged(true);
      } else {
        setIsNameChanged(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        if (viewRef.current) {
          viewRef.current.focus();
        }
      }
    };

    node.addEventListener('input', handleInput);
    node.addEventListener('keydown', handleKeyDown);
    handleInput();

    return () => {
      node.removeEventListener('input', handleInput);
      node.removeEventListener('keydown', handleKeyDown);
    };
  }, [noteData, viewRef]);

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
/*
export const handleEnterKey = (viewRef) => {
  if (!viewRef.current) return;

  const { state, dispatch } = viewRef.current;
  const { tr, selection } = state;
  const { $from } = selection;

  // 현재 위치에서 부모 list_item을 찾아봅니다.
  const parentListItem = $from.node($from.depth - 1);

  if (parentListItem.type === mySchema.nodes.list_item) {
    if ($from.pos === $from.end()) {
      // 커서가 리스트 아이템 끝에 있는 경우, 새로운 아이템을 동일한 리스트 레벨에 추가합니다.
      const newListItem = mySchema.nodes.list_item.create(
        {}, // 필요한 속성을 지정할 수 있습니다.
        mySchema.nodes.paragraph.create()
      );

      tr.insert($from.after($from.depth - 1), newListItem);

      // 새로운 list_item 뒤에 커서를 이동합니다.
      const resolvedPos = tr.doc.resolve($from.after($from.depth - 1) + 1);
      tr.setSelection(TextSelection.near(resolvedPos));
    } else {
      // 커서가 리스트 아이템 중간에 있는 경우, 기존 아이템을 쪼개서 새로운 리스트 아이템을 만듭니다.
      splitListItem(mySchema.nodes.list_item)(state, dispatch);
    }
  } else {
    // 그 외의 경우, 새로운 paragraph를 생성합니다.
    const newNode = mySchema.nodes.paragraph.create();
    tr.insert($from.end(), newNode);

    // 새로운 paragraph 뒤로 커서를 이동합니다.
    tr.setSelection(TextSelection.near(tr.doc.resolve($from.end() + 2)));
  }

  dispatch(tr.scrollIntoView());
  viewRef.current.focus();
};
*/
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
    case 'image_card':
      node = mySchema.nodes.image_card.create();
      break;
    default:
      console.error('Unknown card type:', type);
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