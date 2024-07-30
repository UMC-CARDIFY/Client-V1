import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Schema, DOMParser as ProseMirrorDOMParser } from 'prosemirror-model';
import { schema as basicSchema } from 'prosemirror-schema-basic';
import { addListNodes } from 'prosemirror-schema-list';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap } from 'prosemirror-commands';
import { history } from 'prosemirror-history';
import { dropCursor } from 'prosemirror-dropcursor';
import { gapCursor } from 'prosemirror-gapcursor';
import { inputRules, wrappingInputRule, textblockTypeInputRule, InputRule } from 'prosemirror-inputrules';
import 'prosemirror-view/style/prosemirror.css';
import 'prosemirror-menu/style/menu.css';
import WordCard from '../Cards/WordCard';
import BlankCard from '../Cards/BlankCard';
import MultiCard from '../Cards/MultiCard';
import mySchema from './Markdown/schema';
import myInputRules from './Markdown/inputRules';

// styled-components for the editor area
const ContentArea = styled.div`
  flex: 1;
  border: none;
  outline: none;
  width: 100%;
  box-sizing: border-box;
  resize: none;
  height: auto;
  color: var(--Grays-Black, #1A1A1A);
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
  }

  @media (max-width: 48rem) {
    height: calc(100vh - 6rem);
  }
`;

const TitleInput = styled.div`
  font-size: 1.5rem;
  border: none;
  outline: none;
  width: 100%;
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
  height: 0.0625rem;
  background: #B1B1B1;
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 100%;
  box-sizing: border-box;
`;

const CoverPanel = styled.div`
  width: 100px;
  height: 100px;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  pointer-events: none;
`;

const CombinedEditor = ({ coverPanels, cards }) => {
  const contentRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      const state = EditorState.create({
        schema: mySchema,
        doc: ProseMirrorDOMParser.fromSchema(mySchema).parse(contentRef.current),
        plugins: [
          keymap(baseKeymap),
          history(),
          dropCursor(),
          gapCursor(),
          myInputRules
        ]
      });

      const view = new EditorView(contentRef.current, {
        state,
      });

      return () => {
        view.destroy();
      };
    }
  }, []);

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
        contentRef.current.querySelector('.ProseMirror').focus();
      }
    };

    node.addEventListener('input', handleInput);
    node.addEventListener('keydown', handleKeyDown);
    handleInput(); // 초기 상태 설정

    return () => {
      node.removeEventListener('input', handleInput);
      node.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <TitleInput
        contentEditable="true"
        data-placeholder="제목"
        ref={titleRef}
        className="empty"
      ></TitleInput>
      <Divider />
      <ContentArea>
        {cards.map((card, index) => {
          switch (card.type) {
            case 'word':
              return <WordCard key={index} />;
            case 'blank':
              return <BlankCard key={index} />;
            case 'multi':
              return <MultiCard key={index} />;
            default:
              return null;
          }
        })}
        <div ref={contentRef}></div>
        {coverPanels.map(panel => (
        <CoverPanel key={panel.id} />
      ))}
      </ContentArea>
    </>
  );
};

export default CombinedEditor;
