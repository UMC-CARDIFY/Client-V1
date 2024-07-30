import { Schema } from 'prosemirror-model';
import { schema as basicSchema } from 'prosemirror-schema-basic';
import { addListNodes } from 'prosemirror-schema-list';

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


export default mySchema;
