class BlankCardView {
    constructor(node, view, getPos, openModal) {
      this.node = node;
      this.view = view;
      this.getPos = getPos;
      this.openModal = openModal;
  
      //컨테이너 div
      this.dom = document.createElement('div');
      this.dom.className = 'blank-card';
      this.dom.style.border = '1px solid #ddd';
      this.dom.style.padding = '1.25rem';
      this.dom.style.paddingRight = '3rem';
      this.dom.style.borderRadius = '4px';
      this.dom.style.display = 'flex';
      this.dom.style.flexDirection = 'row'; // 좌우로 나란히 배치
      this.dom.style.gap = '0.5rem'; // 각 div 사이의 간격 설정
     // this.dom.style.gap = '1.19rem';
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
          this.openModal('blank_card', this.node.attrs.question_front, this.node.attrs.answer, this.node.attrs.question_back);
        }
      });
      this.dom.appendChild(this.previewButton); // 미리보기 버튼을 dom에 추가

      // 카드 question_front(왼쪽에 위치) div
      this.questionFrontDiv = document.createElement('div');
      this.questionFrontDiv.className = 'question-front';
      this.questionFrontDiv.contentEditable = true;
      //this.questionFrontDiv.style.flex = '1'; 
      //this.questionFrontDiv.style.minWidth = '10px';
      this.questionFrontDiv.style.color = this.node.attrs.question_front ? '#000' : '#aaa';
      this.questionFrontDiv.style.outline = 'none';
      this.questionFrontDiv.style.whiteSpace = 'nowrap'; // 내용이 길어져도 줄바꿈 없이 한 줄로 유지

      this.questionFrontDiv.innerText = node.attrs.question_front || '내용';
      this.dom.appendChild(this.questionFrontDiv);
  
      // question_front 이벤트 핸들러
      this.questionFrontDiv.addEventListener('focus', () => {
        if (this.questionFrontDiv.innerText === '내용') {
          this.questionFrontDiv.innerText = '';
          this.questionFrontDiv.style.color = '#000';
        }
      });
      this.questionFrontDiv.addEventListener('blur', () => {
        if (this.questionFrontDiv.innerText === '') {
          this.questionFrontDiv.innerText = '내용';
          this.questionFrontDiv.style.color = '#aaa';
        }
      });
  
      // 카드 빈칸 div
      this.answerDiv = document.createElement('div');
      this.answerDiv.className = 'answer';
      this.answerDiv.contentEditable = true;
      //this.answerDiv.style.flex = '0 1 auto'; // 중앙 div가 가변 크기를 가지도록 설정
     // this.answerDiv.style.minWidth = '10px'; // 최소 넓이 설정

      this.answerDiv.style.color = '#000';
      this.answerDiv.style.background = '#CDDDFF';
      this.answerDiv.style.borderBottom= '1px solid #0F62FE';
      this.answerDiv.style.outline = 'none';  // 포커스 시 테두리 제거
      this.answerDiv.style.whiteSpace = 'nowrap'; // 내용이 길어져도 줄바꿈 없이 한 줄로 유지
      this.answerDiv.innerText = node.attrs.answer || '빈칸';
      this.dom.appendChild(this.answerDiv);
  
      // answer 이벤트 핸들러
      this.answerDiv.addEventListener('focus', () => {
        if (this.answerDiv.innerText === '빈칸') {
          this.answerDiv.innerText = '';
        }
      });
  
      this.answerDiv.addEventListener('blur', () => {
        if (this.answerDiv.innerText === '') {
          this.answerDiv.innerText = '빈칸';
        }
      });

      // 카드 question_back(오른쪽에 위치) div
      this.questionBackDiv = document.createElement('div');
      this.questionBackDiv.className = 'question-back';
      this.questionBackDiv.contentEditable = true;
      //this.questionBackDiv.style.flex = '1';
      //this.questionBackDiv.style.minWidth = '10px'; // 최소 넓이를 설정하여 너무 작아지지 않도록 방지
      this.questionBackDiv.style.color = this.node.attrs.question_back ? '#000' : '#aaa';
      this.questionBackDiv.style.outline = 'none';
      this.questionBackDiv.style.whiteSpace = 'nowrap'; // 내용이 길어져도 줄바꿈 없이 한 줄로 유지

      this.questionBackDiv.innerText = node.attrs.question_back || '내용';
      this.dom.appendChild(this.questionBackDiv);

      // question_back 이벤트 핸들러
      this.questionBackDiv.addEventListener('focus', () => {
        if (this.questionBackDiv.innerText === '내용') {
          this.questionBackDiv.innerText = '';
          this.questionBackDiv.style.color = '#000';
        }
      });
      this.questionBackDiv.addEventListener('blur', () => {
        if (this.questionBackDiv.innerText === '') {
          this.questionBackDiv.innerText = '내용';
          this.questionBackDiv.style.color = '#aaa';
        }
      });
      
      // attrs 값 설정
      this.questionFrontDiv.addEventListener('blur', this.updateAttrs.bind(this));
      this.answerDiv.addEventListener('blur', this.updateAttrs.bind(this));
      this.questionBackDiv.addEventListener('blur', this.updateAttrs.bind(this));
    }

  updateAttrs() {
    const question_front = this.questionFrontDiv.innerText.trim();
    const answer = this.answerDiv.innerText.trim();
    const question_back = this.questionBackDiv.innerText.trim();

    if (
      question_front !== this.node.attrs.question_front ||
      answer !== this.node.attrs.answer ||
      question_back !== this.node.attrs.question_back
    ) {
      this.view.dispatch(
        this.view.state.tr.setNodeMarkup(this.getPos(), null, {
          question_front,
          question_back,
          answer,
        })
      );
    }
  }

  update(node) {
    if (node.attrs.question_front !== this.node.attrs.question_front) {
      this.questionFrontDiv.innerText = node.attrs.question_front;
    }
    if (node.attrs.answer !== this.node.attrs.answer) {
      this.answerDiv.innerText = node.attrs.answer;
    }
    if (node.attrs.question_back !== this.node.attrs.question_back) {
      this.questionBackDiv.innerText = node.attrs.question_back;
    }
    this.node = node;
    return true;
  }

  stopEvent(event) {
    return event.type === 'blur';
  }
}

export default BlankCardView;