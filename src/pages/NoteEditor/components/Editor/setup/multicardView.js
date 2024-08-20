class MultiCardView {
  constructor(node, view, getPos, openModal) {
      this.node = node;
      this.view = view;
      this.getPos = getPos;
      this.openModal = openModal;

      // 컨테이너 div
      this.dom = document.createElement('div');
      this.dom.className = 'multi-card';
      this.dom.style.border = '1px solid #ddd';
      this.dom.style.padding = '1.25rem';
      this.dom.style.paddingRight = '3rem';
      this.dom.style.borderRadius = '4px';
      this.dom.style.display = 'flex';
      this.dom.style.flexDirection = 'column';
      this.dom.style.gap = '1rem';
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

      // 미리보기 버튼
      this.previewButton = document.createElement('button');
      this.previewButton.style.position = 'absolute';
      this.previewButton.style.top = '-0.75rem';
      this.previewButton.style.right = '2.5rem';
      this.previewButton.style.width = '1.6875rem';
      this.previewButton.style.height = '1.6875rem';
      this.previewButton.style.padding = '0';  
      this.previewButton.style.background ='none';
      this.previewButton.style.border = 'none';
      this.previewButton.style.cursor = 'pointer';
      this.previewButton.style.display = 'none';
      this.previewButton.innerHTML = `
          <svg width="23" height="17" viewBox="0 0 23 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.2841 3.6369L10.842 3.1948L9.07361 1.42639L2 8.5L9.07361 15.5736L10.842 13.8052L11.2841 13.3631" stroke="#6A9CFC" stroke-width="1.5"/>
              <rect x="6.85352" y="8.5" width="10.0036" height="10.0036" transform="rotate(-45 6.85352 8.5)" stroke="#0F62FE" stroke-width="1.5"/>
          </svg>
      `;

      this.previewButton.addEventListener('click', () => {
          if (this.openModal) {
              this.openModal('multi_card', this.node.attrs.question_front, this.node.attrs.answer);
          }
      });
      this.dom.appendChild(this.previewButton);

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
          this.updateAttrs(); // Blur 이벤트 발생 시 속성 업데이트
      });

   // 카드 앞면 Enter key 이벤트 핸들러
   this.questionDiv.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // 기본 엔터 동작 방지
        if (this.answerDivs.length > 0) {
            const range = document.createRange();
            const selection = window.getSelection();
            range.setStart(this.answerDivs[0].childNodes[0], 0);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
            this.answerDivs[0].focus();
            }
        }
    });
      // 카드 answer(뒷면) div들
      this.answerDivs = [];
      this.node.attrs.answer.forEach((answer, index) => {
          this.addAnswerDiv(answer);
      });
  }

  addAnswerDiv(answer = '') {
    //불렛
    const bulletDiv = document.createElement('div');
    bulletDiv.className = 'bullet';
    bulletDiv.style.display = 'inline-block';
    bulletDiv.style.width = '0.375rem'; 
    bulletDiv.style.height = '0.375rem';  
    bulletDiv.style.backgroundColor = '#000';  
    bulletDiv.style.borderRadius = '50%';  
    bulletDiv.style.marginRight = '1rem';  

    const containerDiv = document.createElement('div');
    containerDiv.style.display = 'flex';
    containerDiv.style.alignItems = 'center';

    const answerDiv = document.createElement('div');
    answerDiv.className = 'answer';
    answerDiv.contentEditable = true;
    answerDiv.style.color = answer ? '#000' : '#aaa';
    answerDiv.style.outline = 'none';
    answerDiv.innerText = answer || '카드 뒷면';

    containerDiv.appendChild(bulletDiv);
    containerDiv.appendChild(answerDiv); 
    this.dom.appendChild(containerDiv);  // 전체 컨테이너 추가

    this.answerDivs.push(answerDiv);

      // 각 answerDiv에 이벤트 핸들러 등록
      answerDiv.addEventListener('focus', () => {
          if (answerDiv.innerText === '카드 뒷면') {
              answerDiv.innerText = '';
              answerDiv.style.color = '#000';
          }
      });

      answerDiv.addEventListener('blur', () => {
          if (answerDiv.innerText === '') {
              answerDiv.innerText = '카드 뒷면';
              answerDiv.style.color = '#aaa';
          }
          this.updateAttrs(); // Blur 이벤트 발생 시 속성 업데이트
      });

    // 엔터 키 이벤트 핸들러
    answerDiv.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // 기본 엔터 동작 방지
            const newAnswerDiv = this.addAnswerDiv(); // 새로운 answerDiv 추가

            // 새로 추가된 answerDiv로 포커스 이동
            const range = document.createRange();
            const selection = window.getSelection();

            // 새로 생성된 answerDiv의 첫 번째 자식 노드로 커서를 이동
            range.setStart(newAnswerDiv.childNodes[0], 0);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);

            newAnswerDiv.focus(); // 새로 추가된 answerDiv로 포커스 이동
        } else if (event.key === 'Backspace' && answerDiv.innerText.trim() === '') {
            event.preventDefault(); // 기본 백스페이스 동작 방지
            if (this.answerDivs.length > 1) { // answerDiv가 최소 하나 남아있어야 함
                this.removeAnswerDiv(answerDiv, containerDiv); // `answerDiv` 삭제
            }
        }
    });

    return answerDiv; // 추가된 answerDiv를 반환
  }

  deleteCard() {
    const transaction = this.view.state.tr.delete(this.getPos(), this.getPos() + this.node.nodeSize);
    this.view.dispatch(transaction);
  }
  removeAnswerDiv(answerDiv, containerDiv) {
    const index = this.answerDivs.indexOf(answerDiv);
    if (index > -1) {
        this.answerDivs.splice(index, 1);
        containerDiv.remove(); // DOM에서 해당 컨테이너 삭제
        this.updateAttrs(); // 속성 업데이트
    }
  }
  
  updateAttrs() {
      const question = this.questionDiv.innerText.trim();
      const answer = this.answerDivs.map(div => div.innerText.trim());

      if (question !== this.node.attrs.question_front || JSON.stringify(answer) !== JSON.stringify(this.node.attrs.answer)) {
          this.view.dispatch(
              this.view.state.tr.setNodeMarkup(this.getPos(), null, {
                  question,
                  answer,
              })
          );
      }
  }

  update(node) {
      if (node.attrs.question_front !== this.node.attrs.question_front) {
          this.questionDiv.innerText = node.attrs.question_front;
      }
      if (JSON.stringify(node.attrs.answer) !== JSON.stringify(this.node.attrs.answer)) {
          node.attrs.answer.forEach((answer, index) => {
              if (this.answerDivs[index]) {
                  this.answerDivs[index].innerText = answer;
              }
          });
      }
      this.node = node;
      return true;
  }

  stopEvent(event) {
      return event.type === 'blur';
  }
}

export default MultiCardView;