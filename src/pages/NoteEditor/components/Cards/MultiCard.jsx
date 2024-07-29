import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import PreviewModal from './PreviewModal';

const MultiCardContainer = styled.div`
  position: relative;
  padding: 0.5rem;
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
  border-radius: 0.5rem;
  border: none;

  &:hover, &:active {
    border: 1px solid var(--Grays-Gray4, #CACACA);
  }
`;

const ContentContainer = styled.div`
  flex-direction: column;
`;

const BulletIcon = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  margin: 0 1rem 0 0.75rem;
  background-color: black;
  border-radius: 50%;
`;

const LineContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  margin-left: ${props => (props.$isBack ? '1.25rem' : '0')};
`;

const EditableDiv = styled.div`
  border: none;
  background: transparent;
  outline: none;
  color: var(--Grays-Black, #1A1A1A);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  min-height: 1rem;
  line-height: 1.5rem; 
  white-space: pre-wrap; 
`;

const PreviewIcon = styled.div`
  position: absolute; 
  top: 0.5rem; 
  right: 0.5rem; 
  display: flex;
  width: 1rem;
  height: 1rem;
  padding: 0.25rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  background: #ccc;
  cursor: pointer;
`;

const MultiCard = () => {
  const [multiCard, setMultiCard] = useState({
    front: '카드 앞면',
    backs: ['카드 뒷면', '카드 뒷면', '카드 뒷면']
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const frontRef = useRef(null);
  const backRefs = useRef([]);

  const handleTextChange = (key, index, value) => {
    if (key === 'front') {
      setMultiCard(prevState => ({
        ...prevState,
        front: value
      }));
    } else if (key === 'backs') {
      const newBacks = [...multiCard.backs];
      newBacks[index] = value;
      setMultiCard(prevState => ({
        ...prevState,
        backs: newBacks
      }));
    }
  };

  const handleInput = (key, index, e) => {
    const value = e.target.innerText;
    handleTextChange(key, index, value);
  };

  useEffect(() => {
    if (frontRef.current) {
      frontRef.current.innerText = multiCard.front;
    }
    backRefs.current.forEach((ref, index) => {
      if (ref) ref.innerText = multiCard.backs[index];
    });
  }, [multiCard.front, multiCard.backs]);

  const handlePreviewClick = () => { setIsModalOpen(true); };
  const handleCloseModal = () => { setIsModalOpen(false); };

  return (
    <MultiCardContainer>
      <ContentContainer>
        <LineContainer>
          <BulletIcon />
          <EditableDiv
            ref={frontRef}            
            contentEditable
            suppressContentEditableWarning={true}
            onInput={(e) => handleInput('front', null, e)}
            onBlur={(e) => handleTextChange('front', null, e.target.innerText)}
          />
        </LineContainer>
        {multiCard.backs.map((back, index) => (
          <LineContainer key={index} $isBack>
            <BulletIcon />
            <EditableDiv
              ref={el => (backRefs.current[index] = el)}            
              contentEditable
              suppressContentEditableWarning={true}
              onInput={(e) => handleInput('backs', index, e)}
              onBlur={(e) => handleTextChange('backs', index, e.target.innerText)}            
            />
          </LineContainer>
        ))}
      </ContentContainer>
      <PreviewIcon onClick={handlePreviewClick} />
      {isModalOpen && <PreviewModal onClose={handleCloseModal} cardContent={multiCard} />}
    </MultiCardContainer>
  );
};

export default MultiCard;