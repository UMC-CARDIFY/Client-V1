import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';  
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap } from 'prosemirror-commands';
import { history } from 'prosemirror-history';
import { dropCursor } from 'prosemirror-dropcursor';
import { gapCursor } from 'prosemirror-gapcursor';
import { Schema } from 'prosemirror-model';
import { addListNodes, splitListItem, wrapInList, liftListItem, sinkListItem } from 'prosemirror-schema-list';
import { schema as basicSchema } from 'prosemirror-schema-basic';
import 'prosemirror-view/style/prosemirror.css';
import WordCard from '../Cards/WordCard';
import BlankCard from '../Cards/BlankCard';
import MultiCard from '../Cards/MultiCard';
import ImageCard from '../Cards/ImageCard';
import { myInputRules } from './Markdown/inputRules';

const mySchema = new Schema({
  nodes: addListNodes(basicSchema.spec.nodes, 'paragraph block*', 'block'),
  marks: basicSchema.spec.marks,
});

const ContentArea = styled.div`
  flex: 1;
  border: none;
  outline: none;
  width: 100%;
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
      border: 1px solid #ddd;
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

const CombinedEditor = ({ cards, viewRef }) => {  
  const contentRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    console.log("CombinedEditor: useEffect started");

    if (contentRef.current) {
      console.log("contentRef is available:", contentRef.current);

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
              } else {
                return wrapInList(mySchema.nodes.bullet_list)(state, dispatch);
              }
            }
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
        dispatchTransaction(transaction) {
          const newState = view.state.apply(transaction);
          view.updateState(newState);
        }
      });

      if (view) {
        console.log("Editor view successfully created:", view);
        viewRef.current = view;
      } else {
        console.log("Failed to create editor view");
      }

      return () => {
        console.log("Cleaning up EditorView...");
        view.destroy();
      };
    } else {
      console.log("contentRef.current is null, cannot initialize EditorView.");
    }
  }, [contentRef]);

  useEffect(() => {
    console.log("viewRef after initialization:", viewRef.current);
  }, [viewRef.current]);

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
        {cards.map((card, index) => {
          switch (card.type) {
            case 'word':
              return <WordCard key={index} {...card.props} />;
            case 'blank':
              return <BlankCard key={index} {...card.props} />;
            case 'multi':
              return <MultiCard key={index} {...card.props} />;
            case 'image':
              return <ImageCard key={index} {...card.props} />;
            default:
              return null;
          }
        })}
      </ContentArea>
    </>
  );
};

CombinedEditor.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    props: PropTypes.object
  })).isRequired,
  viewRef: PropTypes.shape({
    current: PropTypes.object,
  }).isRequired, // viewRef에 대한 유효성 검사 추가
};

export default CombinedEditor;
