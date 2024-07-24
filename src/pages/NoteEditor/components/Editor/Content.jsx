import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { schema } from 'prosemirror-schema-basic';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap } from 'prosemirror-commands';
import { history } from 'prosemirror-history';
import { dropCursor } from 'prosemirror-dropcursor';
import { gapCursor } from 'prosemirror-gapcursor';
import { inputRules, wrappingInputRule, textblockTypeInputRule } from 'prosemirror-inputrules';
import 'prosemirror-view/style/prosemirror.css';
import 'prosemirror-menu/style/menu.css';


const ContentArea = styled.div`
  flex: 1;
  border: none;
  outline: none;
  width: 100%;
  box-sizing: border-box;
  resize: none;
  height: calc(100vh - 8.5rem);
  overflow-y: auto;

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

// Define a custom markInputRule function
function customMarkInputRule(regexp, markType) {
  return (state, match, start) => {
    const tr = state.tr;
    if (match && match[1]) {
      const mark = markType.create();
      const textStart = start + match[0].indexOf(match[1]);
      const textEnd = textStart + match[1].length;
      tr.addMark(textStart, textEnd, mark);
      tr.removeStoredMark(markType);
    }
    return tr;
  };
}

// Define input rules for markdown syntax
const headingRule = textblockTypeInputRule(
  /^#{1,6}\s$/,
  schema.nodes.heading,
  match => ({ level: match[0].length })
);

const bulletListRule = wrappingInputRule(
  /^\s*([-+*])\s$/,
  schema.nodes.bullet_list
);

const orderedListRule = wrappingInputRule(
  /^\s*(\d+)\.\s$/,
  schema.nodes.ordered_list
);

const blockquoteRule = wrappingInputRule(
  /^\s*>\s$/,
  schema.nodes.blockquote
);

const codeBlockRule = textblockTypeInputRule(
  /^```$/,
  schema.nodes.code_block
);

//이거 2개가 제대로 적용이 안되어서 일단 주석처리 해두었습니다..
//const boldRule = customMarkInputRule(/\*\*(.+)\*\*$/, schema.marks.strong);
//const italicRule = customMarkInputRule(/\*(.+)\*$/, schema.marks.em);

const Content = () => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      const state = EditorState.create({
        schema,
        doc: schema.nodeFromJSON({
          type: "doc",
          content: [
            { type: "heading", attrs: { level: 1 }, content: [{ type: "text", text: "Title 1" }] },
            { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Title 2" }] },
            { type: "heading", attrs: { level: 3 }, content: [{ type: "text", text: "Title 3" }] },
            { type: "paragraph", content: [{ type: "text", text: "Italic text", marks: [{ type: "em" }] }, { type: "text", text: " and " }, { type: "text", text: "bold text", marks: [{ type: "strong" }] }] }
          ]
        }),
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
              blockquoteRule,
              codeBlockRule,
              {
                match: /\*\*(.+)\*\*$/,
                handler: customMarkInputRule(/\*\*(.+)\*\*$/, schema.marks.strong)
              },
              {
                match: /\*(.+)\*$/,
                handler: customMarkInputRule(/\*(.+)\*$/, schema.marks.em)
              }
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

  return (
  <ContentArea>
      <div ref={contentRef}></div>
    </ContentArea>
  );
};

export default Content;
