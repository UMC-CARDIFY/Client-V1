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

// Extend basic schema with list support and custom marks
const mySchema = new Schema({
  nodes: addListNodes(basicSchema.spec.nodes, 'paragraph block*', 'block'),
  marks: {
    ...basicSchema.spec.marks,
    strong: {
      parseDOM: [{ tag: 'strong' }, { tag: 'b', getAttrs: () => ({}) }, { style: 'font-weight=bold' }],
      toDOM: () => ['strong', 0],
    },
    em: {
      parseDOM: [{ tag: 'i' }, { tag: 'em' }, { style: 'font-style=italic' }],
      toDOM: () => ['em', 0],
    },
    strikethrough: {
      parseDOM: [{ tag: 's' }, { tag: 'del' }, { tag: 'strike' }, { style: 'text-decoration=line-through' }],
      toDOM: () => ['s', 0],
    },
    underline: {
      parseDOM: [{ tag: 'u' }, { style: 'text-decoration=underline' }],
      toDOM: () => ['u', 0],
    },
    code: {
      parseDOM: [{ tag: 'code' }],
      toDOM: () => ['code', 0],
    },


  },
});

// Custom mark input rule function
function markInputRule(regexp, markType, leadingLength, trailingLength) {
  return new InputRule(regexp, (state, match, start, end) => {
    const { tr } = state;
    if (match && match[1] && markType) {
      const textStart = start + match[0].indexOf(match[1]);
      const textEnd = textStart + match[1].length;
      const text = match[1];

      // Ensure the original __, *, ~~, or ~ are removed
      tr.delete(end - trailingLength+2, end); // Remove trailing syntax
      tr.delete(start, start + leadingLength); // Remove leading syntax

      // Adjust the start and end positions after deletion
      const adjustedTextStart = textStart - leadingLength;
      const adjustedTextEnd = textEnd - leadingLength;

      // Add the mark to the inner text
      tr.addMark(adjustedTextStart, adjustedTextEnd, markType.create());

      return tr;
    }
    return null;
  });
}

// Define input rules for markdown syntax
const headingRule = textblockTypeInputRule(
  /^#{1,6}\s$/,
  mySchema.nodes.heading,
  match => ({ level: match[0].length })
);

const bulletListRule = wrappingInputRule(
  /^\s*([-+*])\s$/,
  mySchema.nodes.bullet_list
);

const orderedListRule = wrappingInputRule(
  /^\s*(\d+)\.\s$/,
  mySchema.nodes.ordered_list
);

const codeBlockRule = textblockTypeInputRule(
  /^```$/,
  mySchema.nodes.code_block
);

const horizontalRuleInputRule = new InputRule(/^---$/, (state, match, start, end) => {
  const { tr } = state;
  if (match) {
    tr.replaceWith(start, end, mySchema.nodes.horizontal_rule.create());
  }
  return tr;
});

// Updated regex for bold, italic, strikethrough, and underline rules
const boldRule = markInputRule(/__(.+)__/g, mySchema.marks.strong, 2, 2);
const italicRule = markInputRule(/\*(.+)\*/g, mySchema.marks.em, 1, 1);
const strikethroughRule = markInputRule(/~~(.+)~~/g, mySchema.marks.strikethrough, 2, 2);
const underlineRule = markInputRule(/~(.+)~/g, mySchema.marks.underline, 1, 1);
const codeRule = markInputRule(/`(.+)`/g, mySchema.marks.code, 1, 1);

const CombinedEditor = ({ coverPanels }) => {
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
          inputRules({
            rules: [
              headingRule,
              bulletListRule,
              orderedListRule,
              codeRule,
              codeBlockRule,
              boldRule,
              italicRule,
              strikethroughRule,
              underlineRule,
              horizontalRuleInputRule
            ]
          })
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
        <div ref={contentRef}></div>
        {coverPanels.map(panel => (
        <CoverPanel key={panel.id} />
      ))}
      </ContentArea>
    </>
  );
};

export default CombinedEditor;
