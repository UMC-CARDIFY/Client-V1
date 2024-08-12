import { Schema } from 'prosemirror-model';
import { schema as basicSchema } from 'prosemirror-schema-basic';
import { addListNodes } from 'prosemirror-schema-list';

// Combine both schemas
const mySchema = new Schema({
  nodes: addListNodes(basicSchema.spec.nodes, 'paragraph block*', 'block').append({
    code_block: {
      content: 'text*',
      marks: '',
      group: 'block',
      code: true,
      defining: true,
      parseDOM: [{ tag: 'pre', preserveWhitespace: 'full' }],
      toDOM() { return ['pre', ['code', 0]]; }
    },
    word_card: {
      group: 'block',
      content: 'inline*',
      parseDOM: [{ tag: 'wordCard' }],
      toDOM: () => ['wordCard', 0]
    },
    blank_card: {
      group: 'block',
      content: 'inline*',
      parseDOM: [{ tag: 'blankCard' }],
      toDOM: () => ['blankCard', 0]
    },
    multi_card: {
      group: 'block',
      content: 'inline*',
      parseDOM: [{ tag: 'multiCard' }],
      toDOM: () => ['multiCard', 0]
    },
    bullet_list: {
      content: 'list_item+',
      group: 'block',
      parseDOM: [{ tag: 'ul' }],
      toDOM() { return ['ul', 0]; }
    },
    list_item: {
      content: 'block+',  // 블록을 포함할 수 있도록 수정
      group: 'block',
      parseDOM: [{ tag: 'li' }],
      toDOM() { return ['li', 0]; }
    },
  }),
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

export default mySchema;
