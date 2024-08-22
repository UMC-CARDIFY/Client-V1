import { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Overlay, ModalContainer, ModalHeader, ModalContent, PreviewTitle, CloseButton, PreviewIcon } from './style/CardPreviewModalStyles';
import cardPreviewIcon from '../../../../../assets/noteEditor/cardPreview.svg';
import PreviewCloseIcon from '../../../../../assets/noteEditor/cardPreviewClose.svg';

const CombinedText = styled.span`
  display: flex;
  align-items: center;
`;

const CardFront = styled.div`
  margin-top: 0;
`;

const CardBack = styled.div`
  position: relative;
  margin: 0 0.75rem;
  padding: 0 1rem;
  border: 1px solid var(--Main-PrimaryLight2, #CDDDFF);
`;
 
const HighlightedAnswer = styled.span`
  background-color: #CDDDFF;
  color: #CDDDFF;
  border-radius: 0.125rem;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: ${(props) => (props.isClicked || props.isHovered ? 0 : 1)};
  cursor: pointer;
  transition: opacity 0.3s ease;
`;

const BlankCardPreviewModal = ({ question_front, answer, question_back, onClose }) => {
  const [isOpen, setIsOpen] = useState(true); 
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const handleToggleClick = () => {
    setIsClicked(!isClicked);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null; // 모달이 닫혔을 때는 아무것도 렌더링하지 않음

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalContainer>
        <ModalHeader>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <PreviewIcon>
              <img src={cardPreviewIcon} alt="cardPreviewIcon" />
            </PreviewIcon>
            <PreviewTitle>미리보기</PreviewTitle>
          </div>
          <CloseButton onClick={handleClose}>
            <img src={PreviewCloseIcon} alt="PreviewCloseIcon" />
          </CloseButton> 
        </ModalHeader>
        <ModalContent>
            <CombinedText>
              <CardFront> {question_front} </CardFront>
              <CardBack> 
                {answer[0]}
                <HighlightedAnswer
                  isClicked={isClicked}
                  isHovered={isHovered}
                  onMouseEnter={() => setIsHovered(true)} 
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={handleToggleClick}              
                />
              </CardBack>
              <CardFront> {question_back} </CardFront>
            </CombinedText>
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