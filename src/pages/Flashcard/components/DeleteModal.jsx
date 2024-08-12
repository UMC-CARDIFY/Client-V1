import React from 'react';
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

const ConfirmButton = styled.button`
  background: #FF6B6B;
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

const CancelButton = styled.button`
  background: #E0E0E0;
  color: #333;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
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

export default DeleteModal;
