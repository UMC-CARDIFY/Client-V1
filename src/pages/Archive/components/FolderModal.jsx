import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const FormField = styled.div`
  margin-bottom: 15px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const FolderModal = ({ isOpen, onClose, onSubmit, initialData, isEditMode }) => {
  const [folderName, setFolderName] = useState(initialData?.folderName || '');
  const [folderDescription, setFolderDescription] = useState(initialData?.folderDescription || '');

  useEffect(() => {
    if (initialData) {
      setFolderName(initialData.folderName || '');
      setFolderDescription(initialData.folderDescription || '');
    }
  }, [initialData]);

  const handleSubmit = () => {
    onSubmit({ folderName, folderDescription });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>{isEditMode ? '폴더 수정' : '폴더 추가'}</h2>
        <FormField>
          <label>폴더 이름</label>
          <Input
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />
        </FormField>
        <FormField>
          <label>폴더 설명</label>
          <Input
            type="text"
            value={folderDescription}
            onChange={(e) => setFolderDescription(e.target.value)}
          />
        </FormField>
        <Button onClick={handleSubmit}>{isEditMode ? '수정' : '추가'}</Button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default FolderModal;
