import styled from 'styled-components';
import closeCard from '../../../assets/flashcard/closeCard.svg';
import studyCardSet from '../../../api/flashcard/studyCardSet';
import { useEffect, useState } from 'react';
import {difficultySelect} from '../../../api/flashcard/difficulty';
import { colorMap } from './colorMap';
import FolderIcon from './FolderIcon';
import ConfirmModal from './ConfirmModal';

// Styled components
const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: var(--Main-BackGround, #F2F4F8);
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 2.5rem;
  right: 2.5rem;
  background: none;
  border: none;
  cursor: pointer;
  width: 2.75rem;
  height: 2.75rem;
  flex-shrink: 0;
`;

const ModalTitle = styled.div`
  margin-top: 4rem;
  text-align: center;
  margin-bottom: 0.63rem;
  color: var(--Grays-Black, #1A1A1A);
  font-family: Pretendard;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const ModalSubTitle = styled.div`
  display: flex;
  align-self: center;
  color: var(--Grays-Gray2, #767676);
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  gap: 0.09rem;
`;

const ModalBody = styled.div`
  flex: 1;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const CardBox = styled.div`
  width: 55.625rem;
  height: 32.75rem;
  flex-shrink: 0;
  border-radius: 0.75rem;
  background: var(--Grays-White, #FFF);
  box-shadow: 0px 4px 26px 0px rgba(0, 0, 0, 0.02), 0px 10px 60px 0px rgba(0, 74, 162, 0.03);
  z-index: 2;
  
  padding: 5rem;
  box-sizing: border-box;
  position: relative;

  color: var(--kakao-logo, #000);
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const PageDiv = styled.div`
  display: inline-flex;
  align-items: center;
  gap: var(--UI-Component-xxxxxS, 0.25rem);
  justify-content: center;
  margin-bottom: 5rem;

  color: var(--Grays-Gray1, #646464);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Content = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  word-break: break-word;
  width: 100%;
`;

const Answer = styled.div`
  display: flex;
  border-radius: 0.125rem;
  padding: 0 1rem;
  background-color: ${({ revealed }) => (revealed ? 'transparent' : 'var(--Main-PrimaryLight2, #CDDDFF)')};
  color: ${({ revealed }) => (revealed ? 'var(--Grays-Black, #1A1A1A)' : 'transparent')};
  border: ${({ revealed }) => (revealed ? '1px solid var(--Main-PrimaryLight2, #CDDDFF)' : 'none')};
  cursor: pointer;

  &:hover {
    background-color: ${({ revealed }) => (revealed ? 'transparent' : '#C0D4FF')}; /* Change to hover color when not revealed */
  }
`;

const DifficultyButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
`;

const DifficultyButton = styled.button`
  display: flex;
  width: 7.65625rem;
  height: 3.875rem;
  padding: 0.6875rem 1.8125rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  border-radius: 0.5rem;
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  background-color: ${({ color }) => color};
  color: var(--Grays-Black, #1A1A1A);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const ConfirmModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

const ConfirmModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 0.75rem;
  text-align: center;
  max-width: 400px;
  width: 80%;
`;

const ConfirmModalButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
`;

const ConfirmButton = styled.button`
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  font-family: Pretendard;
  font-size: 1rem;
  background-color: ${({ variant }) => (variant === 'confirm' ? '#ff4d4f' : '#d9d9d9')};
  color: white;
  flex: 1;
  margin: 0 0.5rem;

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }
`;

const difficultyColors = {
  어려움: '#FFE1E1',
  알맞음: '#CEEFE3',
  쉬움: '#CDDEFF',
  패스: '#F2DEF9',
};

const AnalysisStudyModal = ({ onClose, studyCardSetId, noteName, folderName, color }) => {
  const [content, setContent] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [revealedAnswers, setRevealedAnswers] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [cardId, setCardId] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await studyCardSet(studyCardSetId, currentPage);
      setContent(response.content);
      setTotalPage(response.totalPages);
      setCardId(response.content[0].cardId);
    };
    fetchData();
  }, [currentPage]);

  useEffect(() => {
    setRevealedAnswers({});
  }, [currentPage]);

  const revealAnswer = (index) => {
    setRevealedAnswers((prevRevealed) => ({
      ...prevRevealed,
      [index]: true, // Ensure the answer is revealed on click
    }));
  };

  const handleDifficultySelection = async (difficulty) => {
    const allRevealed = content.every((_, index) => revealedAnswers[index]);

    if (allRevealed) {
      console.log(`Selected Difficulty: ${difficulty}`);
      if (currentPage < totalPage - 1) {
        setCurrentPage((prevPage) => prevPage + 1);
      }

      const difficultyIdMap = {
        어려움: 1,
        알맞음: 2,
        쉬움: 3,
        패스: 4,
      };
  
      console.log(`Card ID: ${cardId}`);
      const difficultyId = difficultyIdMap[difficulty];
      console.log(`Difficulty ID: ${difficultyId}`);
      const data = await difficultySelect(cardId, difficultyId);
      console.log(data);
    }
  };

  const handleClose = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmClose = () => {
    setShowConfirmModal(false);
    onClose();
  };

  const handleCancelClose = () => {
    setShowConfirmModal(false);
  };

  const allRevealed = content.every((_, index) => revealedAnswers[index]);

  return (
    <>
      <ModalBackdrop onClick={handleClose}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={handleClose}>
            <img src={closeCard} alt="close" />
          </CloseButton>
          <ModalTitle>{noteName}</ModalTitle>
          <ModalSubTitle>
            <FolderIcon color={colorMap[color]} />
            {folderName}
          </ModalSubTitle>
          <ModalBody>
            <CardBox>
              {content.map((card, index) => (
                <Content key={index}>
                  <div>{card.contentsFront}</div>
                  <Answer revealed={revealedAnswers[index]} onClick={() => revealAnswer(index)}>
                    {card.answer}
                  </Answer>
                  <div>{card.contentsBack}</div>
                </Content>
              ))}
              
              {allRevealed && (
                <DifficultyButtonContainer>
                  {Object.keys(difficultyColors).map((difficulty) => (
                    <DifficultyButton
                      key={difficulty}
                      color={difficultyColors[difficulty]}
                      onClick={() => handleDifficultySelection(difficulty)}
                      disabled={!allRevealed}
                    >
                      {difficulty}
                    </DifficultyButton>
                  ))}
                </DifficultyButtonContainer>
              )}
            </CardBox>
          </ModalBody>

          <PageDiv>
            <div>{currentPage + 1}</div>
            <div>/</div>
            <div>{totalPage}</div>
          </PageDiv>
        </ModalContent>
      </ModalBackdrop>

      {showConfirmModal && (
        <ConfirmModal
            onConfirm={handleConfirmClose}
            onCancel={handleCancelClose}
        />
      )}
    </>
  );
};

export default AnalysisStudyModal;
