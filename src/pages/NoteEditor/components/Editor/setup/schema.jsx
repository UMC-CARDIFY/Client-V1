import { Schema } from 'prosemirror-model';
import { schema as basicSchema } from 'prosemirror-schema-basic';
import { addListNodes } from 'prosemirror-schema-list';

const mySchema = new Schema({
  nodes: addListNodes(basicSchema.spec.nodes, 'paragraph block*', 'block').append({
    word_card: {
      group: 'block',
      content: 'inline*',
      attrs: {
        question: { default: '' },
        answer: { default: '' },
      },
      parseDOM: [{
        tag: 'div.word-card',
        getAttrs(dom) {
          return {
            question: dom.querySelector('.question').innerText,
            answer: dom.querySelector('.answer').innerText,
          };
        }
      }],
      toDOM() {
        return ['div', { class: 'word-card' }, 0]; // NodeView가 이 div를 기반으로 사용
      }
    },
    blank_card: {
      group: 'block',
      content: 'inline*',
      attrs: {
        question_front: { default: '' },  // 빈칸 앞 text
        question_back: { default: '' },   // 빈칸 뒤 text
        answer: { default: '' },
      },
      parseDOM: [{
        tag: 'div.blank-card',
        getAttrs(dom) {
          return {
            question_front: dom.querySelector('.question_front').innerText,
            question_back: dom.querySelector('.question_back').innerText,
            answer: dom.querySelector('.answer').innerText,
          };
        }
      }],
      toDOM() {
        return ['div', { class: 'blank-card' }, 0];
      }
    },
    multi_card: {
      group: 'block',
      content: 'inline*',
      attrs: {
        question: { default: '' },
        answer: { default: ['', ''] },  // 기본 값으로 빈 배열 설정
      },
      parseDOM: [{
        tag: 'div.multi-card',
        getAttrs(dom) {
          const question = dom.querySelector('.question').innerText;
    
          // .answer 클래스를 가진 모든 요소를 가져와서 그 텍스트를 배열로 만듭니다.
          const answerNodes = dom.querySelectorAll('.answer');
          const answers = Array.from(answerNodes).map(node => node.innerText);
    
          return {
            question,
            answer: answers,  // 배열 형태로 저장
          };
        }
      }],
      toDOM() {
        return ['div', { class: 'multi-card' }, 0];
      }
    },
    bullet_list: {
      content: 'list_item+',
      group: 'block',
      parseDOM: [{ tag: 'ul' }],
      toDOM() { return ['ul', 0]; }
    },
    list_item: {
      content: 'block+',
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
    text_color: {
      attrs: { color: {} },
      parseDOM: [
        {
          style: 'color',
          getAttrs: (value) => ({ color: value }),
        },
      ],
      toDOM: (mark) => [
        'span',
        { style: `color: ${mark.attrs.color}` },
        0,
      ],
    },
    highlight: {
      attrs: { backgroundColor: {} },
      parseDOM: [
        {
          style: 'background-color',
          getAttrs: (value) => ({ backgroundColor: value }),
        },
      ],
      toDOM: (mark) => [
        'span',
        { style: `background-color: ${mark.attrs.backgroundColor}` },
        0,
      ],
    },
  },
});

export default mySchema;