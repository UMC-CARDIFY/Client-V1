import PropTypes from 'prop-types';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0px 4px 26px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  color: white;
  font-weight: bold;
`;

const ConfirmButton = styled(Button)`
  background: #FF6B6B;
`;

const CancelButton = styled(Button)`
  background: #E0E0E0;
  color: #333;
`;

const DeleteModal = ({ onClose, onConfirm }) => (
  <ModalOverlay>
    <ModalContent>
      <h2>정말 삭제하시겠습니까?</h2>
      <ModalButtons>
        <ConfirmButton onClick={onConfirm}>삭제</ConfirmButton>
        <CancelButton onClick={onClose}>취소</CancelButton>
      </ModalButtons>
    </ModalContent>
  </ModalOverlay>
);

DeleteModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default DeleteModal;
