import { useState, useEffect } from 'react';
import styled from 'styled-components';
import FolderIcon from './FolderIcon';
import Circle from './Circle';
import PropTypes from 'prop-types';

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
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 270px;
  height: 39px;
  border: 1px solid #E7E7E7; 
  padding: 0 15px;
  box-sizing: border-box;
  margin-top: 7px;
  margin-bottom: 15px;
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

const Line = styled.div`
  width: 1px;
  height: 50px;
  background: #E9E9E9;
  margin: 0 24px 0 20px;
`;

const FolderModal = ({ isOpen, onClose, onSubmit, initialData, isEditMode }) => {
  const [folderName, setFolderName] = useState(initialData?.folderName || '');
  const [selectedColor, setSelectedColor] = useState(initialData?.selectedColor || '#6698F5');

  useEffect(() => {
    if (initialData) {
      setFolderName(initialData.folderName || '');
      setSelectedColor(initialData.selectedColor || '#6698F5');
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (!folderName) {
      alert('폴더 이름을 입력해주세요.');
      return;
    }
    if (!selectedColor) {
      alert('색상을 선택해주세요.');
      return;
    }
    onSubmit({ folderName, selectedColor });
    onClose();
  };

  const handleCircleClick = (color) => {
    setSelectedColor(color);
  };

  if (!isOpen) return null;

  const colors = [
    "#6698F5",
    "#5AA6C7",
    "#949AEC",
    "#A9A9A9",
    "#77CEC6",
    "#AECA99",
    "#FDB456",
    "#D49AE9",
    "#FD855F",
    "#ED83B1"
  ];

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
              {colors.map((color) => (
                <Circle
                  key={color}
                  bgColor={color}
                  isSelected={selectedColor === color}
                  onClick={() => handleCircleClick(color)}
                  isFilter={false}
                />
              ))}
            </Color>
            <Line />
            <FolderIcon fill={selectedColor} />
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

FolderModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    folderName: PropTypes.string,
    selectedColor: PropTypes.string,
  }),
  isEditMode: PropTypes.bool.isRequired,
};

export default FolderModal;
