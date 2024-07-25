import { useState, useEffect } from 'react';
import styled from 'styled-components';
import FolderIcon from './FolderIcon';

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
  padding: 32px 24px;
  width: 318px;
  height: 296px;
  position: relative;
  box-sizing: border-box;
`;


const FormField = styled.div`
`;

const Input = styled.input`
  width: 270px;
  height: 39px;
  border: 1px solid #E7E7E7; 
  padding: 0 15px;
  box-sizing: border-box;
  margin-bottom: 15px;
  margin-top: 7px;

`;

const Button = styled.button`
  cursor: pointer;
  padding: 6px var(--font-size-sm, 14px);
  border: 1px solid #DDD;
  justify-content: center;
  align-items: center;
  background:white;
  font-size: 12px;
  font-weight: 500; 
`;

const Title = styled.div`
  color: var(--Grays-Black, #1A1A1A);
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 16px;
`;

const Label = styled.label`
  color: var(--Grays-Black, #1A1A1A);
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 7px;
`;


const ColorContainer = styled.div`
  display:flex;
  flex-direction: row;
`;

const Color = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); 
  grid-template-rows: repeat(2, 1fr); 
  gap: 20px;
  width: 100%;
  height: 100%;
`;

const Circle = styled.div`
  width:18px;
  height:18px;
  border-radius: 50%;
  background-color: ${props => props.bgColor || 'gray'};
`;

const Line= styled.div`
  width: 1px;
  height: 50px;
  background: #E9E9E9;
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
        <Title>{isEditMode ? '폴더 수정' : '폴더 추가'}</Title>
        <FormField>
          <Label>폴더 이름</Label>
          <Input
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />
        </FormField>
        <FormField>
          <Label>색상</Label>
          <ColorContainer>
            <Color>
              <Circle bgColor="#6698F5" />
              <Circle bgColor="#5AA6C7" />
              <Circle bgColor="#949AEC" />
              <Circle bgColor="#A9A9A9" />
              <Circle bgColor="#77CEC6" />
              <Circle bgColor="#AECA99" />
              <Circle bgColor="#FDB456" />
              <Circle bgColor="#D49AE9" />
              <Circle bgColor="#FD855F" />
              <Circle bgColor="#ED83B1" />
            </Color>
            <Line />
            <FolderIcon />
          </ColorContainer>

        </FormField>
        <ButtonContainer>
          <Button onClick={onClose}>취소</Button>
          <Button onClick={handleSubmit}>확인</Button>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default FolderModal;
