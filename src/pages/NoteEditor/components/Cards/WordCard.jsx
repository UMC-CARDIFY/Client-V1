import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { AiOutlineArrowRight } from 'react-icons/ai';
import PreviewModal from './PreviewModal';

const WordCardContainer = styled.div`
  position: relative;  
  padding: 0.5rem;
  padding-left: 3rem;
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.5rem;
  border: none;

  &:hover, &:active {
    border: 1px solid var(--Grays-Gray4, #CACACA);
  }
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const TextArea = styled.textarea`
  border: none;
  background: transparent;
  outline: none;
  color: var(--Grays-Black, #1A1A1A);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  
  resize: none;
  overflow: hidden;
  min-height: 1rem; 
  height: auto; 
  line-height: 1.5rem;
  rows: 1;
`;

const BulletIcon = styled.div`
  position: absolute;
  top: 1rem; 
  left: 1rem; 
  width: 0.5rem;
  height: 0.5rem;
  margin: 0 1rem 0 0.75rem;
  background-color: black;
  border-radius: 50%;
`;

const ArrowIcon = styled(AiOutlineArrowRight)`
  width: 1rem;
  height: 1rem;
  margin: 0 0.5rem;
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

const WordCard = () => {
  const [wordCard, setWordCard] = useState({ front: '카드 앞면', back: '카드 뒷면' });
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const handleTextChange = (key, value) => {
    setWordCard(prevState => ({
      ...prevState,
      [key]: value
    }));
  };

  const adjustHeight = (element) => {
    element.style.height = 'auto'; // height를 auto로 설정하여 높이를 초기화
    element.style.height = element.scrollHeight + 'px'; // scrollHeight를 사용하여 높이 조정
  };

  const frontTextRef = useRef(null);
  const backTextRef = useRef(null);

  useEffect(() => {
    adjustHeight(frontTextRef.current);
    adjustHeight(backTextRef.current);
  }, [wordCard.front, wordCard.back]);

  const handlePreviewClick = () => { setIsModalOpen(true); };
  const handleCloseModal = () => { setIsModalOpen(false); };

  return (
    <WordCardContainer>
      <ContentContainer>
        <BulletIcon />
        <TextArea
          ref={frontTextRef}
          value={wordCard.front}
          onChange={(e) => handleTextChange('front', e.target.value)}
        />        
        <ArrowIcon />
        <TextArea
          ref={backTextRef}
          value={wordCard.back}
          onChange={(e) => handleTextChange('back', e.target.value)}
        />      
      </ContentContainer>
      <PreviewIcon onClick={handlePreviewClick} />
      {isModalOpen && <PreviewModal onClose={handleCloseModal} cardContent={wordCard} />}
    </WordCardContainer>
  );
};

export default WordCard;