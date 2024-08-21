import { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { 
  Overlay, ModalContainer, ModalHeader, ModalContent, PreviewTitle, 
  CloseButton, PreviewIcon 
} from './style/CardPreviewModalStyles';
import cardPreviewIcon from '../../../../../assets/noteEditor/cardPreview.svg';
import PreviewCloseIcon from '../../../../../assets/noteEditor/cardPreviewClose.svg';
import bulletIcon from '../../../../../assets/noteEditor/bulletIcon.svg';

const CardFront = styled.div`
  margin-top: 0;
  margin-bottom: 1rem;
`;

const AnswerList = styled.div`
  list-style: none;
  padding-left: 0;
  flex-direction: column;
  display: flex;
  align-items: flex-start;
`;

const CardBack = styled.div`
  display: inline-flex;
  align-items: center;
  margin-bottom: 1rem;
  position: relative;
`;

const BulletIcon = styled.img`
  width: 0.375rem;
  height: 0.375rem;
  margin-right: 1rem;
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
  margin-left: 1.4rem;
`;

const MultiCardPreviewModal = ({ question, answer, onClose }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [clickedStates, setClickedStates] = useState(answer.map(() => false));

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleToggleClick = (index) => {
    setClickedStates((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  if (!isOpen) return null; 

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
          <CardFront>{question}</CardFront>
          <AnswerList>
            {answer.map((ans, index) => (
              <CardBack key={index}>
                <BulletIcon src={bulletIcon} alt="bulletIcon" />
                <span style={{border: '1px solid #CDDDFF'}}>
                  {ans}
                </span>
                <HighlightedAnswer
                  isClicked={clickedStates[index]}
                  onClick={() => handleToggleClick(index)}
                >
                </HighlightedAnswer>
              </CardBack>
            ))}
          </AnswerList>
        </ModalContent>
      </ModalContainer>
    </Overlay>     
  );
};

MultiCardPreviewModal.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MultiCardPreviewModal;
