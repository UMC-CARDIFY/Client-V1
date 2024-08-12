import { Schema } from 'prosemirror-model';
import { schema as basicSchema } from 'prosemirror-schema-basic';
import { addListNodes } from 'prosemirror-schema-list';

const mySchema = new Schema({
  nodes: addListNodes(basicSchema.spec.nodes, 'paragraph block*', 'block').append({
    word_card: {
      group: 'block',
      content: 'inline*',
      parseDOM: [{
        tag: 'div.word-card',
        getAttrs(dom) {
          return {
            question: dom.querySelector('.question').innerText,
            answer: dom.querySelector('.answer').innerText,
          };
        }
      }],
      toDOM(node) {
        const question = node.attrs.question || '';
        const answer = node.attrs.answer || '';

        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.contentEditable = true;
        questionDiv.style.color = question ? '#000' : '#aaa';
        questionDiv.style.outline = 'none';  // 포커스 시 테두리 제거
        questionDiv.innerText = question || '문제를 입력하세요';
        

        questionDiv.addEventListener('focus', () => {
          if (questionDiv.innerText === '문제를 입력하세요') {
            questionDiv.innerText = '';
            questionDiv.style.color = '#000';
          }
        });

        questionDiv.addEventListener('blur', () => {
          if (questionDiv.innerText === '') {
            questionDiv.innerText = '문제를 입력하세요';
            questionDiv.style.color = '#aaa';
          }
        });

        const answerDiv = document.createElement('div');
        answerDiv.className = 'answer';
        answerDiv.contentEditable = true;
        answerDiv.style.color = answer ? '#000' : '#aaa';
        answerDiv.style.outline = 'none';  // 포커스 시 테두리 제거
        answerDiv.innerHTML = `<span contenteditable="false" style="color: #000;">→ </span>` + (answer || '정답을 입력하세요');

        answerDiv.addEventListener('focus', () => {
          if (answerDiv.innerText.trim() === '→ 정답을 입력하세요') {
            answerDiv.innerHTML = `<span contenteditable="false" style="color: #000;">→ </span>`;
            answerDiv.style.color = '#000';
          }
        });

        answerDiv.addEventListener('blur', () => {
          if (answerDiv.innerText.trim() === '→') {
            answerDiv.innerHTML = `<span contenteditable="false" style="color: #000;">→ </span>정답을 입력하세요`;
            answerDiv.style.color = '#aaa';
          }
        });

        // 백스페이스로 화살표 삭제 방지
        answerDiv.addEventListener('keydown', (event) => {
          if (event.key === 'Backspace') {
            const content = answerDiv.innerText.trim();
            if (content === '→' || content === '→ 정답을 입력하세요') {
              event.preventDefault();
            }
          }
        });


        const containerDiv = document.createElement('div');
        containerDiv.className = 'word-card';
        containerDiv.style.border = '1px solid #ddd';
        containerDiv.style.padding = '1.25rem';
        containerDiv.style.borderRadius = '4px';
        containerDiv.style.display = 'flex';
        containerDiv.style.flexDirection = 'column';
        containerDiv.style.gap = '1.19rem'; 
        containerDiv.style.marginTop = '1.19rem'; 

        containerDiv.appendChild(questionDiv);
        containerDiv.appendChild(answerDiv);

        return containerDiv;
      },
      attrs: {
        question: { default: '' },
        answer: { default: '' },
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
          getAttrs: (color) => ({ color }),
        },
      ],
      toDOM: (mark) => [
        'span',
        { style: `color: ${mark.attrs.color}` },
        0,
      ],
    },
  },
});

export default mySchema;
