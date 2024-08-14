class WordCardView {
  constructor(node, view, getPos, openModal) {
    this.node = node;
    this.view = view;
    this.getPos = getPos;
    this.openModal = openModal;

    // answer 배열이 항상 1개의 요소를 가지도록 설정
    if (this.node.attrs.answer.length === 0) {
      this.node.attrs.answer = [''];
    } else if (this.node.attrs.answer.length > 1) {
      this.node.attrs.answer = [this.node.attrs.answer[0]];
    }

    //컨테이너 div
    this.dom = document.createElement('div');
    this.dom.className = 'word-card';
    this.dom.style.border = '1px solid #ddd';
    this.dom.style.padding = '1.25rem';
    this.dom.style.paddingRight = '3rem';
    this.dom.style.borderRadius = '4px';
    this.dom.style.display = 'flex';
    this.dom.style.flexDirection = 'column';
    this.dom.style.gap = '1.19rem';
    this.dom.style.marginTop = '1.19rem';
    this.dom.style.position = 'relative'; // 우측 상단에 미리보기 버튼을 위치시키기 위해 position 속성 추가

    // 컨테이너 호버 시 이벤트 처리
    this.dom.addEventListener('mouseover', () => {
      this.previewButton.style.display = 'inline-block';
    });
    this.dom.addEventListener('mouseout', () => {
      this.previewButton.style.display = 'none';
    });

    // 미리보기 버튼 추가
    this.previewButton = document.createElement('button');
    this.previewButton.style.position = 'absolute';
    this.previewButton.style.top = '0%';
    this.previewButton.style.right = '0.25rem';
    this.previewButton.style.background = 'none';
    this.previewButton.style.border = 'none';
    this.previewButton.style.cursor = 'pointer';
    this.previewButton.style.display = 'none'; // 초기 상태에서 숨기기
    this.previewButton.innerHTML = `
      <svg width="23" height="17" viewBox="0 0 23 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.2841 3.6369L10.842 3.1948L9.07361 1.42639L2 8.5L9.07361 15.5736L10.842 13.8052L11.2841 13.3631" stroke="#6A9CFC" stroke-width="1.5"/>
        <rect x="6.85352" y="8.5" width="10.0036" height="10.0036" transform="rotate(-45 6.85352 8.5)" stroke="#0F62FE" stroke-width="1.5"/>
      </svg>
    `;

    // 미리보기 버튼 클릭 이벤트 처리
    this.previewButton.addEventListener('click', () => {
      if(this.openModal) {
        this.openModal('word_card', this.node.attrs.question, this.node.attrs.answer);
      }
    });
    this.dom.appendChild(this.previewButton); // 미리보기 버튼을 dom에 추가

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

      // QuestionDiv에 대한 백스페이스 처리
      this.questionDiv.addEventListener('keydown', (event) => {
        const content = this.questionDiv.innerText.trim();
        if (event.key === 'Backspace') {
            if (content === '문제를 입력하세요') {
                event.preventDefault(); 
                event.stopPropagation(); // 이벤트 전파 중단
            } else {
                // 기본 백스페이스 동작 허용
            }
        }
    });

    // 카드 answer(뒷면) div
    this.answerDiv = document.createElement('div');
    this.answerDiv.className = 'answer';
    this.answerDiv.contentEditable = true;
    this.answerDiv.style.color = this.node.attrs.answer[0] ? '#000' : '#aaa';
    this.answerDiv.style.outline = 'none';  // 포커스 시 테두리 제거
    this.answerDiv.innerHTML = `<span contenteditable="false" style="color: #000;">→ </span>${this.node.attrs.answer[0] || '정답을 입력하세요'}`;
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
        this.updateAttrs(); // Blur 이벤트 발생 시 속성 업데이트
      });

      this.answerDiv.addEventListener('keydown', (event) => {
        const content = this.answerDiv.innerText.trim();
        //console.log('Keydown event:', event.key);
        //console.log('Current content in answerDiv:', content);
        if (event.key === 'Backspace') {
            if (content === '→' || content === '→ 정답을 입력하세요') {
                //console.log('Preventing backspace from deleting arrow or placeholder text.');
                event.preventDefault(); // 화살표와 기본 텍스트가 지워지는 것을 막음
            } else if (content.length === 2) { // '→ '만 남아있을 때
                //console.log('Resetting answerDiv to default content.');
                this.answerDiv.innerHTML = `<span contenteditable="false" style="color: #000;">→ </span>`;
                event.preventDefault();
            } else {
                console.log('Allowing backspace to delete text.');
                return; // 기본 백스페이스 동작을 허용하여 텍스트를 지우도록 함
            }
        }
    });
    
    //attrs 값 설정
    this.questionDiv.addEventListener('blur', this.updateAttrs.bind(this));
    this.answerDiv.addEventListener('blur', this.updateAttrs.bind(this));
  }

  updateAttrs() {
    const question = this.questionDiv.innerText.trim();
    const answer = [this.answerDiv.innerText.trim().replace(/^→\s*/, '')];

    if (question !== this.node.attrs.question || answer[0] !== this.node.attrs.answer[0]) {
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
    if (node.attrs.answer[0] !== this.node.attrs.answer[0]) {
      this.answerDiv.innerHTML = `<span contenteditable="false" style="color: #000;">→ </span>${node.attrs.answer}`;
    }
    this.node = node;
    return true;
  }
  
  stopEvent(event) {
    if (event.type === 'blur') {
        return true;
    }
    return false; // 다른 모든 이벤트는 허용
  }
}

export default WordCardView;