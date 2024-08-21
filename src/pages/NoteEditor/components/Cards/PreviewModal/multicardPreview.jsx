import { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Overlay, ModalContainer, ModalHeader, ModalContent, PreviewTitle, CloseButton, PreviewIcon } from './style/CardPreviewModalStyles';

const AnswerList = styled.ul`
  list-style-type: disc;
  margin-right: 3rem;
`;

const MultiCardPreviewModal = ({ question, answer, onClose }) => {
    const [isOpen, setIsOpen] = useState(true); 

    const handleClose = () => {
        setIsOpen(false);
        if (onClose) {
        onClose();
        }
    };

    if (!isOpen) return null;

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
            <p><strong>문제:</strong> {question} </p>
            <p><strong>정답:</strong></p>
            <AnswerList>
                {answer.map((ans, index) => (
                <li key={index}>{ans}</li>
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
