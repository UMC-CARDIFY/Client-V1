import PropTypes from 'prop-types';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  display: flex;
  width: 29.5rem;
  height: 8.1875rem;
  padding: 2rem;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  flex-shrink: 0;
  border-radius: 0.5rem;
  background: var(--Grays-White, #FFF);
  box-shadow: 0px 4px 26px 0px rgba(0, 0, 0, 0.02), 0px 10px 60px 0px rgba(0, 74, 162, 0.03);
`;

const CloseButton = styled.div`
  curson: pointer;
  width: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0;
  align-self: flex-end;
  cursor: pointer;
  svg {
    width: 100%;
    height: 100%;
  }
`;
 
const ModalText = styled.span`
  color: #000;
  font-family: Pretendard;
  font-size: 1.5625rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

const AttendanceModal = ({ onClose }) => {

return (
  <ModalOverlay>
    <ModalContent>
        <CloseButton onClick={onClose}>
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M13.621 28.5801C13.3007 28.9233 12.7628 28.9418 12.4196 28.6215C12.0764 28.3012 12.0579 27.7633 12.3782 27.4201L18.8369 20.5001L12.3782 13.5801C12.0579 13.2369 12.0764 12.699 12.4196 12.3787C12.7628 12.0584 13.3007 12.0769 13.621 12.4201L19.9996 19.2543L26.3782 12.4201C26.6985 12.0769 27.2364 12.0584 27.5796 12.3787C27.9228 12.699 27.9413 13.2369 27.621 13.5801L21.1623 20.5001L27.621 27.4201C27.9413 27.7633 27.9228 28.3012 27.5796 28.6215C27.2364 28.9418 26.6985 28.9233 26.3782 28.5801L19.9996 21.7458L13.621 28.5801Z" fill="#B1B1B1"/>
        </svg>
        </CloseButton>
      <ModalText>출석 완료!</ModalText>
    </ModalContent>
  </ModalOverlay>
  );
};

AttendanceModal.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default AttendanceModal;