import { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--Main-Overlay, rgba(0, 0, 0, 0.30));
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalContainer = styled.div`
  width: 55.625rem;
  height: 34.25rem;
  flex-shrink: 0;
  border-radius: 0.75rem;
  background: var(--Grays-White, #FFF);
  box-shadow: 0px 4px 26px 0px rgba(0, 0, 0, 0.02), 0px 10px 60px 0px rgba(0, 74, 162, 0.03);
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  padding: 2.5rem 5rem;
`;

const ModalHeader = styled.div`
  flex: 0 0 auto;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalContent = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;

  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

const PreviewTitle = styled.p`
  color: var(--Main-Primary, #0F62FE);
  font-family: Pretendard;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const CloseButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;

  svg {
    width: 100%;
    height: 100%;
  }
`

const PreviewIcon = styled.div`
  display: flex;
  width: 1.6875rem;
  height: 1.6875rem;
  justify-content: center;
  align-items: center;
  margin-right: 0.5rem; /* Add some space between the icon and the text */
`;

const CombinedText = styled.span`
  white-space: pre-wrap;
`;
 
const HighlightedAnswer = styled.span`
  background-color: #CDDDFF;
  color: #CDDDFF; /* 배경색과 동일하게 설정하여 텍스트를 숨김 */
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  position: relative;
`;
const BlankCardPreviewModal = ({ question_front, answer, question_back, onClose }) => {
  const [isOpen, setIsOpen] = useState(true); 

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) {
      onClose();
    }
  };

  if (!isOpen) return null; // 모달이 닫혔을 때는 아무것도 렌더링하지 않음

  return (
    <Overlay>
      <ModalContainer>
        <ModalHeader>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <PreviewIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="17" viewBox="0 0 23 17" fill="none">
                <path d="M11.2841 3.6369L10.842 3.1948L9.07361 1.42639L2 8.5L9.07361 15.5736L10.842 13.8052L11.2841 13.3631" stroke="#6A9CFC" strokeWidth="1.5"/>
                <rect x="6.85352" y="8.5" width="10.0036" height="10.0036" transform="rotate(-45 6.85352 8.5)" stroke="#0F62FE" strokeWidth="1.5"/>
              </svg>
            </PreviewIcon>
            <PreviewTitle>미리보기</PreviewTitle>
          </div>
          <CloseButton onClick={handleClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M13.621 28.5801C13.3007 28.9233 12.7628 28.9418 12.4196 28.6215C12.0764 28.3012 12.0579 27.7633 12.3782 27.4201L18.8369 20.5001L12.3782 13.5801C12.0579 13.2369 12.0764 12.699 12.4196 12.3787C12.7628 12.0584 13.3007 12.0769 13.621 12.4201L19.9996 19.2543L26.3782 12.4201C26.6985 12.0769 27.2364 12.0584 27.5796 12.3787C27.9228 12.699 27.9413 13.2369 27.621 13.5801L21.1623 20.5001L27.621 27.4201C27.9413 27.7633 27.9228 28.3012 27.5796 28.6215C27.2364 28.9418 26.6985 28.9233 26.3782 28.5801L19.9996 21.7458L13.621 28.5801Z" fill="#B1B1B1"/>
            </svg>
          </CloseButton> 
        </ModalHeader>
        <ModalContent>
        <p>
            <CombinedText>
              {question_front}
              <HighlightedAnswer>{answer}</HighlightedAnswer>
              {question_back}
            </CombinedText>
          </p>
        </ModalContent>
      </ModalContainer>
    </Overlay>     
  );
};
  
BlankCardPreviewModal.propTypes = {
  question_front: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  question_back: PropTypes.string.isRequired, 
  onClose: PropTypes.func.isRequired,
};

export default BlankCardPreviewModal;