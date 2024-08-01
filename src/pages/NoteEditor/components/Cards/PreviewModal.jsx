import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';

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

const CloseButton = styled(AiOutlineClose)`
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const PreviewIcon = styled.div`
  display: flex;
  width: 1.6875rem;
  height: 1.6875rem;
  justify-content: center;
  align-items: center;
  margin-right: 0.5rem; /* Add some space between the icon and the text */
`;

const PreviewModal = ({ onClose, cardContent }) => {
  const handleClose = () => {
    onClose();
  };
  
  return (
    <Overlay>
      <ModalContainer>
        <ModalHeader>
          <div style={{ display: 'flex', alignItems: 'center' }}>
          <PreviewIcon><svg xmlns="http://www.w3.org/2000/svg" width="23" height="17" viewBox="0 0 23 17" fill="none">
  <path d="M11.2841 3.6369L10.842 3.1948L9.07361 1.42639L2 8.5L9.07361 15.5736L10.842 13.8052L11.2841 13.3631" stroke="#6A9CFC" strokeWidth="1.5"/>
  <rect x="6.85352" y="8.5" width="10.0036" height="10.0036" transform="rotate(-45 6.85352 8.5)" stroke="#0F62FE" strokeWidth="1.5"/>
</svg>
</PreviewIcon>
            <PreviewTitle>미리보기</PreviewTitle>
          </div>
          <CloseButton onClick={handleClose} />
        </ModalHeader>
        <ModalContent>
          <p><strong>앞면:</strong> {cardContent.front}</p>
          <p><strong>뒷면:</strong> {cardContent.back}</p>
        </ModalContent>
      </ModalContainer>
    </Overlay>     
  );
};
  
export default PreviewModal;