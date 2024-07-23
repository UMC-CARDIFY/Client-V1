import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Schema } from 'prosemirror-model';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap } from 'prosemirror-commands';
import { history } from 'prosemirror-history';
import { defaultMarkdownParser, defaultMarkdownSerializer } from 'prosemirror-markdown';
import { inputRules, smartQuotes, emDash, ellipsis, InputRule } from 'prosemirror-inputrules';

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

const nodes = {
  doc: {
    content: 'block+'
  },
  paragraph: {
    group: 'block',
    content: 'inline*',
    toDOM: () => ['p', 0],
    parseDOM: [{ tag: 'p' }]
  },
  text: {
    group: 'inline'
  },
  list_item: {
    group: 'block',
    content: 'paragraph block*',
    toDOM: () => ['li', 0],
    parseDOM: [{ tag: 'li' }]
  },
  bullet_list: {
    group: 'block',
    content: 'list_item+',
    toDOM: () => ['ul', 0],
    parseDOM: [{ tag: 'ul' }]
  }
};

const marks = {
  strong: {
    parseDOM: [{ tag: 'strong' }],
    toDOM: () => ['strong', 0]
  },
  em: {
    parseDOM: [{ tag: 'em' }],
    toDOM: () => ['em', 0]
  }
};

const mySchema = new Schema({ nodes, marks });

function markInputRule(regexp, markType) {
  return new InputRule(regexp, (state, match, start, end) => {
    const tr = state.tr;
    if (match[1]) {
      const textStart = start + match[0].indexOf(match[1]);
      const textEnd = textStart + match[1].length;
      tr.addMark(textStart, textEnd, markType.create());
      tr.replaceWith(start, end, state.schema.text(match[1]));
    }
    return tr;
  });
}

const markRules = [
  markInputRule(/(?:\*\*|__)([^*_]+)(?:\*\*|__)/, mySchema.marks.strong),
  markInputRule(/(?:\*|_)([^*_]+)(?:\*|_)/, mySchema.marks.em)
];

const Content = () => {
  const contentRef = useRef(null);
  const viewRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      const state = EditorState.create({
        schema: mySchema,
        doc: defaultMarkdownParser.parse(''),
        plugins: [
          keymap(baseKeymap),
          history(),
          inputRules({ rules: markRules.concat(smartQuotes, emDash, ellipsis) })
        ]
      });

      const view = new EditorView(contentRef.current, {
        state,
        dispatchTransaction(transaction) {
          const newState = view.state.apply(transaction);
          view.updateState(newState);
          const markdown = defaultMarkdownSerializer.serialize(newState.doc);
          console.log(markdown);
        }
      });

      viewRef.current = view;

      return () => {
        view.destroy();
      };
    }
  }, []);

  return <ContentArea ref={contentRef}></ContentArea>;
};

export default Content;
