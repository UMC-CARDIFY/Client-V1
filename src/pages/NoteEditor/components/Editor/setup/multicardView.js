class MultiCardView {
  constructor(node, view, getPos, openModal) {
      this.node = node;
      this.view = view;
      this.getPos = getPos;
      this.openModal = openModal;

      // 기본값으로 answer 배열에 두 개의 빈 항목 추가
      if (this.node.attrs.answer.length < 2) {
          this.node.attrs.answer = ['', ''];
      }

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
      this.previewButton.style.display = 'none';
      this.previewButton.innerHTML = `
          <svg width="23" height="17" viewBox="0 0 23 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.2841 3.6369L10.842 3.1948L9.07361 1.42639L2 8.5L9.07361 15.5736L10.842 13.8052L11.2841 13.3631" stroke="#6A9CFC" stroke-width="1.5"/>
              <rect x="6.85352" y="8.5" width="10.0036" height="10.0036" transform="rotate(-45 6.85352 8.5)" stroke="#0F62FE" stroke-width="1.5"/>
          </svg>
      `;

      this.previewButton.addEventListener('click', () => {
          if (this.openModal) {
              this.openModal('multi_card', this.node.attrs.question, this.node.attrs.answer);
          }
      });
      this.dom.appendChild(this.previewButton);

      // 카드 question(앞면) div
      this.questionDiv = document.createElement('div');
      this.questionDiv.className = 'question';
      this.questionDiv.contentEditable = true;
      this.questionDiv.style.color = this.node.attrs.question ? '#000' : '#aaa';
      this.questionDiv.style.outline = 'none';
      this.questionDiv.innerText = node.attrs.question || '카드 앞면';
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

      // 카드 answer(뒷면) div들
      this.answerDivs = [];
      this.node.attrs.answer.forEach((answer, index) => {
          this.addAnswerDiv(answer);
      });
  }

  addAnswerDiv(answer = '') {
      const answerDiv = document.createElement('div');
      answerDiv.className = 'answer';
      answerDiv.contentEditable = true;
      answerDiv.style.color = answer ? '#000' : '#aaa';
      answerDiv.style.outline = 'none';
      answerDiv.innerText = answer || '• 카드 뒷면';
      this.dom.appendChild(answerDiv);
      this.answerDivs.push(answerDiv);

      // 각 answerDiv에 이벤트 핸들러 등록
      answerDiv.addEventListener('focus', () => {
          if (answerDiv.innerText === '• 카드 뒷면') {
              answerDiv.innerText = '';
              answerDiv.style.color = '#000';
          }
      });

      answerDiv.addEventListener('blur', () => {
          if (answerDiv.innerText === '') {
              answerDiv.innerText = '• 카드 뒷면';
              answerDiv.style.color = '#aaa';
          }
          this.updateAttrs(); // Blur 이벤트 발생 시 속성 업데이트
      });

      // 엔터 키 이벤트 핸들러
      answerDiv.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
              event.preventDefault(); // 기본 엔터 동작 방지
              const newAnswerDiv = this.addAnswerDiv(); // 새로운 answerDiv 추가
              newAnswerDiv.focus(); // 새로 추가된 answerDiv로 포커스 이동

          }
      });
  }

  updateAttrs() {
      const question = this.questionDiv.innerText.trim();
      const answer = this.answerDivs.map(div => div.innerText.trim());

      if (question !== this.node.attrs.question || JSON.stringify(answer) !== JSON.stringify(this.node.attrs.answer)) {
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