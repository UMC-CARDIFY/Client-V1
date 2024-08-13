class WordCardView {
  constructor(node, view, getPos) {
    this.node = node;
    this.view = view;
    this.getPos = getPos;

    //컨테이너 div
    this.dom = document.createElement('div');
    this.dom.className = 'word-card';
    this.dom.style.border = '1px solid #ddd';
    this.dom.style.padding = '1.25rem';
    this.dom.style.borderRadius = '4px';
    this.dom.style.display = 'flex';
    this.dom.style.flexDirection = 'column';
    this.dom.style.gap = '1.19rem';
    this.dom.style.marginTop = '1.19rem';

    // 카드 question(앞면) div
    this.questionDiv = document.createElement('div');
    this.questionDiv.className = 'question';
    this.questionDiv.contentEditable = true;
    this.questionDiv.style.color = this.node.attrs.question ? '#000' : '#aaa';
    this.questionDiv.style.outline = 'none';
    this.questionDiv.innerText = node.attrs.question || '문제를 입력하세요';
    this.dom.appendChild(this.questionDiv);

    // question 이벤트 핸들러
    this.questionDiv.addEventListener('focus', () => {
        if (this.questionDiv.innerText === '문제를 입력하세요') {
          this.questionDiv.innerText = '';
          this.questionDiv.style.color = '#000';
        }
      });
    this.questionDiv.addEventListener('blur', () => {
        if (this.questionDiv.innerText === '') {
          this.questionDiv.innerText = '문제를 입력하세요';
          this.questionDiv.style.color = '#aaa';
        }
      });

    // 카드 answer(뒷면) div
    this.answerDiv = document.createElement('div');
    this.answerDiv.className = 'answer';
    this.answerDiv.contentEditable = true;
    this.answerDiv.style.color = this.node.attrs.answer ? '#000' : '#aaa';
    this.answerDiv.style.outline = 'none';  // 포커스 시 테두리 제거
    this.answerDiv.innerHTML = `<span contenteditable="false" style="color: #000;">→ </span>${node.attrs.answer || '정답을 입력하세요'}`;
    this.dom.appendChild(this.answerDiv);

    // answer 이벤트 핸들러
    this.answerDiv.addEventListener('focus', () => {
        if (this.answerDiv.innerText.trim() === '→ 정답을 입력하세요') {
          this.answerDiv.innerHTML = `<span contenteditable="false" style="color: #000;">→ </span>`;
          this.answerDiv.style.color = '#000';
        }
      });

      this.answerDiv.addEventListener('blur', () => {
        if (this.answerDiv.innerText.trim() === '→') {
          this.answerDiv.innerHTML = `<span contenteditable="false" style="color: #000;">→ </span>정답을 입력하세요`;
          this.answerDiv.style.color = '#aaa';
        }
      });

    // 백스페이스로 화살표 삭제 방지
    this.answerDiv.addEventListener('keydown', (event) => {
        if (event.key === 'Backspace') {
          const content = this.answerDiv.innerText.trim();
          if (content === '→' || content === '→ 정답을 입력하세요') {
            event.preventDefault();
          }
        }
      });
    
    //attrs 값 설정
    this.questionDiv.addEventListener('blur', this.updateAttrs.bind(this));
    this.answerDiv.addEventListener('blur', this.updateAttrs.bind(this));
  }

  updateAttrs() {
    const question = this.questionDiv.innerText.trim();
    const answer = this.answerDiv.innerText.trim().replace(/^→\s*/, '');

    if (question !== this.node.attrs.question || answer !== this.node.attrs.answer) {
      this.view.dispatch(
        this.view.state.tr.setNodeMarkup(this.getPos(), null, {
          question,
          answer,
        })
      );
    }
  }

  update(node) {
    if (node.attrs.question !== this.node.attrs.question) {
      this.questionDiv.innerText = node.attrs.question;
    }
    if (node.attrs.answer !== this.node.attrs.answer) {
      this.answerDiv.innerHTML = `<span contenteditable="false" style="color: #000;">→ </span>${node.attrs.answer}`;
    }
    this.node = node;
    return true;
  }
  
  stopEvent(event) {
    return event.type === 'blur';
  }
}

export default WordCardView;
