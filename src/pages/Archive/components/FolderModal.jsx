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
  margin-top: 7px;
`;

const Button = styled.button`
  cursor: pointer;
  padding: 6px 14px;
  border: 1px solid #DDD;
  background: white;
  font-size: 12px;
  font-weight: 500; 
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  color: #1A1A1A;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 16px;
`;

const Label = styled.label`
  color: #1A1A1A;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 400;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end; 
  gap: 7px;
`;

const ColorContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;     
  margin-top: 11px;
  margin-bottom: 25px;
`;

const Color = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); 
  grid-template-rows: repeat(2, 1fr); 
  gap: 12px 20px;
  flex: 1;
`;

const Circle = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: ${props => props.bgColor || 'gray'};
  position: relative;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 8px;
    height: 8px;
    background-color: ${props => props.isSelected ? 'white' : 'transparent'};
    border-radius: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }
`;

const Line = styled.div`
  width: 1px;
  height: 50px;
  background: #E9E9E9;
  margin: 0 24px 0 20px;
`;

const FolderModal = ({ isOpen, onClose, onSubmit, initialData, isEditMode }) => {
  const [folderName, setFolderName] = useState(initialData?.folderName || '');
  const [folderDescription, setFolderDescription] = useState(initialData?.folderDescription || '');
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFolderName(initialData.folderName || '');
      setFolderDescription(initialData.folderDescription || '');
    }
  }, [initialData]);

  const handleSubmit = () => {
    onSubmit({ folderName, folderDescription, selectedColor });
    onClose();
  };

  const handleCircleClick = (color) => {
    setSelectedColor(color);
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
              <Circle bgColor="#6698F5" isSelected={selectedColor === "#6698F5"} onClick={() => handleCircleClick("#6698F5")} />
              <Circle bgColor="#5AA6C7" isSelected={selectedColor === "#5AA6C7"} onClick={() => handleCircleClick("#5AA6C7")} />
              <Circle bgColor="#949AEC" isSelected={selectedColor === "#949AEC"} onClick={() => handleCircleClick("#949AEC")} />
              <Circle bgColor="#A9A9A9" isSelected={selectedColor === "#A9A9A9"} onClick={() => handleCircleClick("#A9A9A9")} />
              <Circle bgColor="#77CEC6" isSelected={selectedColor === "#77CEC6"} onClick={() => handleCircleClick("#77CEC6")} />
              <Circle bgColor="#AECA99" isSelected={selectedColor === "#AECA99"} onClick={() => handleCircleClick("#AECA99")} />
              <Circle bgColor="#FDB456" isSelected={selectedColor === "#FDB456"} onClick={() => handleCircleClick("#FDB456")} />
              <Circle bgColor="#D49AE9" isSelected={selectedColor === "#D49AE9"} onClick={() => handleCircleClick("#D49AE9")} />
              <Circle bgColor="#FD855F" isSelected={selectedColor === "#FD855F"} onClick={() => handleCircleClick("#FD855F")} />
              <Circle bgColor="#ED83B1" isSelected={selectedColor === "#ED83B1"} onClick={() => handleCircleClick("#ED83B1")} />
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
