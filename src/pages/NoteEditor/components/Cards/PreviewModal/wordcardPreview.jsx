import { useState } from 'react';
import PropTypes from 'prop-types';
import { 
  Overlay, ModalContainer, ModalHeader, ModalContent, PreviewTitle, CloseButton, PreviewIcon,
  CardContent, CardFront, CardBack, HighlightedAnswer, ArrowIcon
 } from './style/CardPreviewModalStyles';
import rightArrow from '../../../../../assets/noteEditor/rightArrow.svg';
import cardPreviewIcon from '../../../../../assets/noteEditor/cardPreview.svg';
import PreviewCloseIcon from '../../../../../assets/noteEditor/cardPreviewClose.svg';

const WordCardPreviewModal = ({ question, answer, onClose }) => {
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
          <CardContent>
            <CardFront>{question} </CardFront>
            <ArrowIcon> 
              <img src={rightArrow} alt="rightArrow" />
            </ArrowIcon>
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
          </CardContent>
        </ModalContent>
      </ModalContainer>
    </Overlay>     
  );
};
  
WordCardPreviewModal.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default WordCardPreviewModal;