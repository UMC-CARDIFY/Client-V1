import React, { useRef, useEffect } from 'react';
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
      tr.delete(end - trailingLength+1, end); // Remove trailing syntax
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

const blockquoteRule = wrappingInputRule(
  /^\s*>\s$/,
  mySchema.nodes.blockquote
);

const codeBlockRule = textblockTypeInputRule(
  /^```$/,
  mySchema.nodes.code_block
);

// Updated regex for bold, italic, strikethrough, and underline rules
const boldRule = markInputRule(/__(.+)__/g, mySchema.marks.strong, 2, 2);
const italicRule = markInputRule(/\*(.+)\*/g, mySchema.marks.em, 1, 1);
const strikethroughRule = markInputRule(/~~(.+)~~/g, mySchema.marks.strikethrough, 2, 2);
const underlineRule = markInputRule(/~(.+)~/g, mySchema.marks.underline, 1, 1);

const Content = () => {
  const contentRef = useRef(null);

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
              blockquoteRule,
              codeBlockRule,
              boldRule,
              italicRule,
              strikethroughRule,
              underlineRule
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
