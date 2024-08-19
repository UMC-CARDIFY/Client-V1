class WordCardView {
  constructor(node, view, getPos, openModal) {
    this.node = node;
    this.view = view;
    this.getPos = getPos;
    this.openModal = openModal;

    // answer 배열이 항상 1개의 요소를 가지도록 설정
    if (!Array.isArray(this.node.attrs.answer)) {
      this.node.attrs.answer = [''];
    }
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
    this.dom.style.position = 'relative';

    // 컨테이너 호버 시 이벤트 처리
    this.dom.addEventListener('mouseover', () => {
      this.previewButton.style.display = 'inline-block';
      this.deleteButton.style.display = 'inline-block';
    });
    this.dom.addEventListener('mouseout', () => {
      this.previewButton.style.display = 'none';
      this.deleteButton.style.display = 'none';
    });

    // 미리보기 버튼 추가
    this.previewButton = document.createElement('button');
    this.previewButton.style.position = 'absolute';
    this.previewButton.style.top = '-0.75rem';
    this.previewButton.style.right = '2.5rem';
    this.previewButton.style.width = '1.6875rem';
    this.previewButton.style.height = '1.6875rem';
    this.previewButton.style.padding = '0';
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
        this.openModal('word_card', this.node.attrs.question_front, this.node.attrs.answer);
      }
    });
    this.dom.appendChild(this.previewButton); // 미리보기 버튼을 dom에 추가

    // 삭제 버튼
    this.deleteButton = document.createElement('button');
    this.deleteButton.style.position = 'absolute';
    this.deleteButton.style.top = '-1.125rem';
    this.deleteButton.style.right = '0.75rem';
    this.deleteButton.style.width = '1.6875rem';
    this.deleteButton.style.height = '1.6875rem';
    this.deleteButton.style.marginTop = '0'
    this.deleteButton.style.padding = '0'; 
    this.deleteButton.style.background = 'none';
    this.deleteButton.style.border = 'none';
    this.deleteButton.style.cursor = 'pointer';
    this.deleteButton.style.display = 'none';
    this.deleteButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 30 30" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.621 28.5801C13.3007 28.9233 12.7628 28.9418 12.4196 28.6215C12.0764 28.3012 12.0579 27.7633 12.3782 27.4201L18.8369 20.5001L12.3782 13.5801C12.0579 13.2369 12.0764 12.699 12.4196 12.3787C12.7628 12.0584 13.3007 12.0769 13.621 12.4201L19.9996 19.2543L26.3782 12.4201C26.6985 12.0769 27.2364 12.0584 27.5796 12.3787C27.9228 12.699 27.9413 13.2369 27.621 13.5801L21.1623 20.5001L27.621 27.4201C27.9413 27.7633 27.9228 28.3012 27.5796 28.6215C27.2364 28.9418 26.6985 28.9233 26.3782 28.5801L19.9996 21.7458L13.621 28.5801Z" fill="#B1B1B1"/>
    </svg>
  `;
  
    this.deleteButton.addEventListener('click', () => {
        this.deleteCard();
    });
    this.dom.appendChild(this.deleteButton);

    // 카드 question(앞면) div
    this.questionDiv = document.createElement('div');
    this.questionDiv.className = 'question';
    this.questionDiv.contentEditable = true;
    this.questionDiv.style.color = this.node.attrs.question_front ? '#000' : '#aaa';
    this.questionDiv.style.outline = 'none';
    this.questionDiv.innerText = node.attrs.question_front || '카드 앞면';
    this.dom.appendChild(this.questionDiv);

    // question 이벤트 핸들러
    this.questionDiv.addEventListener('focus', () => {
        if (this.questionDiv.innerText === '카드 앞면') {
          this.questionDiv.innerText = '';
          this.questionDiv.style.color = '#000';
        }
      });
    this.questionDiv.addEventListener('blur', () => {
        if (this.questionDiv.innerText === '') {
          this.questionDiv.innerText = '카드 앞면';
          this.questionDiv.style.color = '#aaa';
        }
      });

      // QuestionDiv에 대한 백스페이스 처리
      this.questionDiv.addEventListener('keydown', (event) => {
        const content = this.questionDiv.innerText.trim();
        if (event.key === 'Backspace') {
            if (content === '카드 앞면') {
                event.preventDefault(); 
                event.stopPropagation(); // 이벤트 전파 중단
            } else {
                // 기본 백스페이스 동작 허용
            }
        }
        else if ( event.key === 'Enter') {  // 엔터키 막기
          event.preventDefault();
          event.stopPropagation();
        }
        
    });

    // 카드 answer(뒷면) div
    const containerDiv = document.createElement('div');
    containerDiv.style.display = 'flex';
    containerDiv.style.alignItems = 'center';

    this.arrowDiv = document.createElement('div');
    this.arrowDiv.className = 'arrow';
    this.arrowDiv.style.color = '#000';
    this.arrowDiv.style.marginRight = '0.5rem';
    this.arrowDiv.innerText = '→';

    this.answerDiv = document.createElement('div');
    this.answerDiv.className = 'answer';
    this.answerDiv.contentEditable = true;
    this.answerDiv.style.color = this.node.attrs.answer[0] ? '#000' : '#aaa';
    this.answerDiv.style.outline = 'none'; 
    this.answerDiv.innerText = this.node.attrs.answer[0] || '카드 뒷면';

    containerDiv.appendChild(this.arrowDiv);
    containerDiv.appendChild(this.answerDiv); 
    this.dom.appendChild(containerDiv);

    // answer 이벤트 핸들러
    this.answerDiv.addEventListener('focus', () => {
        if (this.answerDiv.innerText.trim() === '카드 뒷면') {
          this.answerDiv.innerText = '';
          this.answerDiv.style.color = '#000';
        }
      });

      this.answerDiv.addEventListener('blur', () => {
        if (this.answerDiv.innerText.trim() === '') {
          this.answerDiv.innerText = '카드 뒷면';
          this.answerDiv.style.color = '#aaa';
        }
        this.updateAttrs(); // Blur 이벤트 발생 시 속성 업데이트
      });

      this.answerDiv.addEventListener('keydown', (event) => {
        const content = this.answerDiv.innerText.trim();
        if (event.key === 'Backspace') {
            if (content === '' || content === '카드 뒷면') {
                event.preventDefault(); // 기본 백스페이스 동작 방지
                this.answerDiv.innerText = ''; // 화살표와 기본 텍스트가 지워지는 것을 막음
                this.answerDiv.style.color = '#aaa';
                this.answerDiv.innerText = '카드 뒷면';
            }
        }
        else if ( event.key === 'Enter') {  // 엔터키 막기
          event.preventDefault();
          event.stopPropagation();
        }
    });
    
    //attrs 값 설정
    this.questionDiv.addEventListener('blur', this.updateAttrs.bind(this));
    this.answerDiv.addEventListener('blur', this.updateAttrs.bind(this));
  }
  
  deleteCard() {
    const transaction = this.view.state.tr.delete(this.getPos(), this.getPos() + this.node.nodeSize);
    this.view.dispatch(transaction);
  }

  updateAttrs() {
    const question_front = this.questionDiv.innerText.trim();
    const answer = [this.answerDiv.innerText.trim()];

    if (question_front !== this.node.attrs.question_front || answer[0] !== this.node.attrs.answer[0]) {
      this.view.dispatch(
        this.view.state.tr.setNodeMarkup(this.getPos(), null, {
          question_front,
          answer,
        })
      );
    }
  }

  update(node) {
    if (node.attrs.question_front !== this.node.attrs.question_front) {
      this.questionDiv.innerText = node.attrs.question_front;
    }
    if (node.attrs.answer[0] !== this.node.attrs.answer[0]) {
      this.answerDiv.innerText = node.attrs.answer[0];
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