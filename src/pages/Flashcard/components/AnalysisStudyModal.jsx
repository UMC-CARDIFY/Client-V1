import styled, {css} from 'styled-components';
import closeCard from '../../../assets/flashcard/closeCard.svg';
import studyCardSet from '../../../api/flashcard/studyCardSet';
import { useEffect, useState } from 'react';
import {difficultySelect} from '../../../api/flashcard/difficulty';
import {completedStudy} from '../../../api/flashcard/completedStudy';
import { colorMap } from './colorMap';
import FolderIcon from './FolderIcon';
import ConfirmModal from './ConfirmModal';
import CompletionModal from './CompletionModal';
import StatisticsModal from './StatisticsModal';
import { 
  Overlay, ModalContainer, ModalHeader, PreviewTitle, PreviewIcon,
  CardContent, HighlightedAnswer, ArrowIcon
 } from './style/CardPreviewModalStyles';
 import rightArrow from '../../../assets/noteEditor/rightArrow.svg';
 import bulletIcon from '../../../assets/noteEditor/bulletIcon.svg';

 const CardFront = styled.div`
 margin-top: 0;
`;

const CardFrontMulti = styled(CardFront)`
margin-bottom: 1rem;
`;

 const AnswerList = styled.div`
  list-style: none;
  padding-left: 0;
  flex-direction: column;
  display: flex;
  align-items: flex-start;
`;

const CardBack = styled.div`
  display: inline-flex;
  align-items: center;
  margin-bottom: 1rem;
  position: relative;
`;

const BulletIcon = styled.img`
  width: 0.375rem;
  height: 0.375rem;
  margin-right: 1rem;
`;

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
    ${(props) =>
      props.isMulti &&
      css`
        flex-direction: column; /* 멀티카드일 때 세로 정렬 */
      `}
`;

const Answer = styled.div`
  display: flex;
  height: 100%;
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

  &:hover {
    background-color: ${({ color, hoverColor }) => hoverColor || color};
  }
`;

const difficultyColors = {
  어려움: {normal: '#FFE1E1', hover: '#FFD9D9'},
  알맞음: {normal: '#CEEFE3', hover: '#C2EBDC'},
  쉬움: {normal: '#CDDEFF', hover: '#C0D6FF'},
  패스: {normal: '#F2DEF9', hover: '#EFD6F7'},
};
const Img = styled.img`
  width: 100%;
  height: auto;
`;

const AnswerOverlay = styled.div`
  position: absolute;
  left: ${({ positionOfX }) => `${positionOfX}px`};
  top: ${({ positionOfY }) => `${positionOfY}px`};
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  background-color: ${({ revealed }) => (revealed ? 'transparent' : 'rgba(0, 0, 0, 0.5)')};
  border: ${({ revealed }) => (revealed ? '2px solid #6A9CFC' : 'none')};
  cursor: pointer;
  z-index: 10;

  &:hover {
    background-color: ${({ revealed }) => (revealed ? 'transparent' : 'rgba(0, 0, 0, 0.3)')};
  }
`;

const AnalysisStudyModal = ({ onClose, studyCardSetId, noteName, folderName, color }) => {
    const [content, setContent] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showCompletionModal, setShowCompletionModal] = useState(false);
    const [showStatisticsModal, setShowStatisticsModal] = useState(false); 

    const [revealedAnswers, setRevealedAnswers] = useState([]);

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

    const revealAnswers = (cardIndex, answerIndex) => {
      setRevealedAnswers((prevRevealed) => {
        // 해당 카드에 대한 상태를 가져오거나 기본값으로 빈 배열 사용
        const updatedRevealed = prevRevealed[cardIndex] ? [...prevRevealed[cardIndex]] : [];
    
        // 해당 인덱스의 상태가 이미 true라면 아무 것도 하지 않음
        if (updatedRevealed[answerIndex]) {
          return prevRevealed; // 상태를 변경하지 않고 그대로 반환
        }
    
        // 해당 인덱스의 상태를 true로 설정 (한번 클릭 후 변경 불가)
        updatedRevealed[answerIndex] = true;
    
        // 새로운 상태 배열을 반환
        return {
          ...prevRevealed,
          [cardIndex]: updatedRevealed,
        };
      });
    };

    const checkAllRevealed = () => {
      return content.every((card, index) => {
        if (card.cardType === 'multi') {
          return card.multiAnswer.every((_, answerIndex) => revealedAnswers[index]?.[answerIndex]);
        }
        return revealedAnswers[index];
      });
    };
  
    const handleDifficultySelection = async (difficulty) => {
      const allRevealed = checkAllRevealed();
  
      if (allRevealed) {
        console.log(`Selected Difficulty: ${difficulty}`);
        
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
  
        // Check if it's the last page
        if (currentPage < totalPage - 1) {
          setCurrentPage((prevPage) => prevPage + 1);
        } else {
          const response = await completedStudy(studyCardSetId);
            console.log(response);
          setShowCompletionModal(true);
        }
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
  
    const handleCompletionConfirm = () => {
        console.log("Show Statistics Modal");
        setShowCompletionModal(false);
        setShowStatisticsModal(true); // Show statistics modal when completion is confirmed
      };
  
    const handleCompletionClose = () => {
      setShowCompletionModal(false);
      onClose();
    };

    // 학습하러 가기 버튼 눌렀을때
    const handleStatisticsClose = () => {
        setShowStatisticsModal(false);
        onClose();
        // 학습하기 버튼 눌렀을때 노트에디터로 이동
      };
  
      const allRevealed = checkAllRevealed();
  
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
        <Content key={index}  isMulti={card.cardType === 'multi'}>
      {card.cardType === 'word' ? (
        <>
          <CardFront>{card.contentsFront}</CardFront>
          <ArrowIcon> 
              <img src={rightArrow} alt="rightArrow" />
            </ArrowIcon>
          <Answer
           revealed={revealedAnswers[index]}
           onClick={() => revealAnswer(index)}
          >
            {card.answer}
          </Answer>
        </>
      ) : card.cardType === 'blank' ? (
        <>
        <CardFront>{card.contentsFront}</CardFront>
        <Answer
          revealed={revealedAnswers[index]}
          onClick={() => revealAnswer(index)}
        >
          {card.answer}
        </Answer>
        <CardFront>{card.contentsBack}</CardFront>
      </>
    ) :card.cardType === 'multi' ? (
      <>
      <CardFrontMulti>{card.contentsFront}</CardFrontMulti>
      <AnswerList>
      {card.multiAnswer.map((answer, answerIndex) => (
        <CardBack key={answerIndex}>
        <BulletIcon src={bulletIcon} alt="bulletIcon" />
        <Answer
          key={answerIndex}
          revealed={revealedAnswers[index]?.[answerIndex] || false}
      onClick={() => revealAnswers(index, answerIndex)}
        >
          {answer}
        </Answer>
      </CardBack>
      ))}
    </AnswerList>
    </>
  ) : card.cardType === 'image' ? (
    <>
    <Img src={card.imgUrl} alt="content front" />
                {card.overlays.map((overlay, i) => (
                  <AnswerOverlay
                    key={i}
                    positionOfX={overlay.positionOfX}
                    positionOfY={overlay.positionOfY}
                    width={overlay.width}
                    height={overlay.height}
                    revealed={revealedAnswers[index]?.[0]}
                    onClick={() => revealAnswer(index, 0)}
                  />
                ))}
    </>
  ) : null}
</Content>
))}
                {allRevealed && (
                  <DifficultyButtonContainer>
                    {Object.keys(difficultyColors).map((difficulty) => (
                      <DifficultyButton
                        key={difficulty}
                        color={difficultyColors[difficulty].normal}
                        hoverColor={difficultyColors[difficulty].hover}
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
  
        {showCompletionModal && (
          <CompletionModal
            onConfirm={handleCompletionConfirm}
            onClose={handleCompletionClose}
          />
        )}

{showStatisticsModal && (
        <StatisticsModal
          onClose={handleStatisticsClose}
          studyCardSetId={studyCardSetId}
          color={color}
            noteName={noteName}
            folderName={folderName}
        />
      )}
      </>
    );
  };
  
  export default AnalysisStudyModal;