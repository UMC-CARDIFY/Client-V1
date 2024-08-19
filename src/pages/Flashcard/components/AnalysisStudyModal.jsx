import styled from 'styled-components';
import closeCard from '../../../assets/flashcard/closeCard.svg';
import folder from '../../../assets/flashcard/folder.svg';
import toNoteEditor from '../../../assets/flashcard/toNoteEditor.svg';
import studyCardSet from '../../../api/flashcard/studyCardSet';
import { useEffect, useState } from 'react';

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
    flex-wrap: wrap; /* This will make content wrap to the next line if it overflows */
    word-break: break-word; /* This will break long words onto the next line */
    width: 100%; /* Ensures that the content spans the full width of the container */
`;

const Answer = styled.div`
    display: flex;
    border-radius: 0.125rem;
    padding: 0 1rem;
    background-color: ${({ revealed }) => (revealed ? 'transparent' : 'var(--Main-PrimaryLight2, #CDDDFF)')};
    color: ${({ revealed }) => (revealed ? 'var(--Grays-Black, #1A1A1A)' : 'transparent')};
    border: ${({ revealed }) => (revealed ? '1px solid var(--Main-PrimaryLight2, #CDDDFF)' : '1px solid var(--Main-PrimaryLight2, #CDDDFF)')};
    cursor: pointer;
`;

const DifficultyButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%); /* Center the container horizontally */
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
  cursor: pointer;
  background-color: ${({ color }) => color};
  color: var(--Grays-Black, #1A1A1A);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
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

  useEffect(() => {
    const fetchData = async () => {
      const response = await studyCardSet(studyCardSetId, currentPage);
      setContent(response.content);
      setTotalPage(response.totalPages);
    };
    fetchData();
  }, [currentPage]);

  useEffect(() => {
    // 페이지가 변경될 때마다 revealedAnswers 초기화
    setRevealedAnswers({});
  }, [currentPage]);

  const revealAnswer = (index) => {
    setRevealedAnswers((prevRevealed) => ({
      ...prevRevealed,
      [index]: !prevRevealed[index], // 클릭 시 토글
    }));
  };

  const handleDifficultySelection = (difficulty) => {
    console.log(`Selected Difficulty: ${difficulty}`);
    // Perform any additional logic with the selected difficulty here

    // Move to the next page
    if (currentPage < totalPage - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <img src={closeCard} alt="close" />
        </CloseButton>
        <ModalTitle>{noteName}</ModalTitle>
        <ModalSubTitle>
          <img src={folder} alt="folder" />
          {folderName}
        </ModalSubTitle>
        <ModalBody>
          <CardBox>
            {content.map((card, index) => (
              <Content key={index}>
                <div>
                  {card.contentsFront}
                </div>
                <Answer
                  revealed={revealedAnswers[index]}
                  onClick={() => revealAnswer(index)}
                >
                  {card.answer}
                </Answer>
                <div>
                  {card.contentsBack}
                </div>
              </Content>
            ))}

            <DifficultyButtonContainer>
              {Object.keys(difficultyColors).map((difficulty) => (
                <DifficultyButton
                  key={difficulty}
                  color={difficultyColors[difficulty]}
                  onClick={() => handleDifficultySelection(difficulty)}
                >
                  {difficulty}
                </DifficultyButton>
              ))}
            </DifficultyButtonContainer>
          </CardBox>
        </ModalBody>

        <PageDiv>
          <div>{currentPage + 1}</div>
          <div>/</div>
          <div>{totalPage}</div>
        </PageDiv>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default AnalysisStudyModal;
