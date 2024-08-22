import { Schema } from 'prosemirror-model';
import { schema as basicSchema } from 'prosemirror-schema-basic';
import { addListNodes } from 'prosemirror-schema-list';

const mySchema = new Schema({
  nodes: addListNodes(basicSchema.spec.nodes, 'paragraph block*', 'block').append({
    word_card: {
      group: 'block',
      content: 'inline*',
      attrs: {
        question_front: { default: '' },
        answer: { default: [''] },  // 배열
      },
      parseDOM: [{
        tag: 'div.word-card',
        getAttrs(dom) {
          return {
            question_front: dom.querySelector('.question').innerText,
            answer: [dom.querySelector('.answer').innerText],  // 배열로 저장
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
        answer: { default: [''] },  // 배열
      },
      parseDOM: [{
        tag: 'div.blank-card',
        getAttrs(dom) {
          return {
            question_front: dom.querySelector('.question_front').innerText,
            question_back: dom.querySelector('.question_back').innerText,
            answer: [dom.querySelector('.answer').innerText],  // 배열로 저장
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
        question_front: { default: '' },
        answer: { default: [''] },  // 기본 값으로 빈 배열 설정
      },
      parseDOM: [{
        tag: 'div.multi-card',
        getAttrs(dom) {
          const question_front = dom.querySelector('.question').innerText;
    
          // .answer 클래스를 가진 모든 요소를 가져와서 그 텍스트를 배열로 만듭니다.
          const answerNodes = dom.querySelectorAll('.answer');
          const answers = Array.from(answerNodes).map(node => node.innerText);
    
          return {
            question_front,
            answer: answers,  // 배열 형태로 저장
          };
        }
      }],
      toDOM() {
        return ['div', { class: 'multi-card' }, 0];
      }
    }, 
    image_card: {
      group: 'block',
      content: 'inline*',  // 이미지 카드에 텍스트가 포함될 수 있습니다.
      attrs: {
        src: { default: '' },
        alt: { default: '' },
        baseImageWidth: { default: 0 },
        baseImageHeight: { default: 0 },
        overlays: { default: [] },  // 사각형 영역을 나타내는 데이터
      },
      parseDOM: [{
        tag: 'div.image-card',
        getAttrs(dom) {
          const img = dom.querySelector('img');
          return {
            src: img.getAttribute('src'),
            alt: img.getAttribute('alt'),
            baseImageWidth: parseInt(dom.getAttribute('data-base-image-width'), 10),
            baseImageHeight: parseInt(dom.getAttribute('data-base-image-height'), 10),
            overlays: JSON.parse(dom.getAttribute('data-overlays') || '[]'), // 사각형 데이터 파싱
          };
        }
      }],
      toDOM(node) {
        return [
          'div', 
          { 
            class: 'image-card',
            'data-base-image-width': node.attrs.baseImageWidth,
            'data-base-image-height': node.attrs.baseImageHeight,
            'data-overlays': JSON.stringify(node.attrs.overlays),
          }, 
          ['img', { src: node.attrs.src, alt: node.attrs.alt }], 
          0
        ];
      }
    },
    heading: {
      attrs: { level: { default: 1 } },
      content: "inline*",
      group: "block",
      defining: true,
      parseDOM: [
        { tag: "h1", attrs: { level: 1 } },
        { tag: "h2", attrs: { level: 2 } },
        { tag: "h3", attrs: { level: 3 } },
      ],
      toDOM(node) { return ["h" + node.attrs.level, 0] }
    },
    //기본노드 정의
    paragraph: basicSchema.spec.nodes.get('paragraph'),
    text: basicSchema.spec.nodes.get('text'),
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