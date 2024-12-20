import styled, { css } from 'styled-components';
import closeCard from '../../../assets/flashcard/closeCard.svg';
import studyCardSet from '../../../api/flashcard/studyCardSet';
import { useEffect, useState } from 'react';
import FolderIcon from './FolderIcon';
import { colorMap } from './colorMap';
import { useNavigate } from 'react-router-dom';
import toNoteEditor from '../../../assets/flashcard/toNoteEditor.svg';
import toNoteEditorHover from '../../../assets/flashcard/toNoteEditorHover.svg';
import { ArrowIcon } from './style/CardPreviewModalStyles';
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
  
  padding: ${(props) => (props.isImage ? '0' : '5rem')};
  box-sizing: border-box;
  position: relative;

  color: var(--kakao-logo, #000);
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const SideBox = styled.div`
  width: 50rem;
  height: 32.75rem; /* CardBox와 동일한 높이 */
  flex-shrink: 0;
  border-radius: 0.75rem;
  background: var(--Grays-White, #FFF);
  box-shadow: 0px 4px 26px 0px rgba(0, 0, 0, 0.02), 0px 10px 60px 0px rgba(0, 74, 162, 0.03);
  position: absolute;
  z-index: 1;
  top: 8.7rem;
`;

const LeftBox = styled(SideBox)`
  left: calc(-23vw); /* 화면 크기에 따라 위치 조정 */
  transform: rotate(-6deg);
  cursor: ${({ isClickable }) => (isClickable ? 'pointer' : 'default')};
`;

const RightBox = styled(SideBox)`
  right: calc(-23vw); /* 화면 크기에 따라 위치 조정 */
  transform: rotate(6deg);
  cursor: ${({ isClickable }) => (isClickable ? 'pointer' : 'default')};
`;

const ToEditor = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1.5rem;
  display: flex;
  width: 4rem;
  height: 4rem;
  padding: 1.21875rem 0.5rem 1.11456rem 1.25rem;
  justify-content: flex-end;
  align-items: center;
  flex-shrink: 0;
  cursor: pointer;
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

const Img = styled.img`
  max-width: 75%;  /* 이미지가 CardBox 너비의 최대 80%까지만 차지하도록 설정 */
  max-height: 75%;  /* 이미지가 CardBox 높이의 최대 80%까지만 차지하도록 설정 */
  width: auto;
  height: auto;
  object-fit: contain;  /* 이미지를 상자 안에 맞게 조정 */
  display: block;
  margin: 0 auto;  /* 이미지를 가로로 가운데 정렬 */
  border-radius: 0.75rem;  /* CardBox와 동일한 border-radius 적용 */
`;
const AnswerOverlay = styled.div`
  position: absolute;
  left: ${({ positionOfX }) => `${positionOfX-100}px`};
  top: ${({ positionOfY }) => `${positionOfY-380}px`};
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  background-color: ${({ revealed }) => (revealed ? 'transparent' : 'var(--Main-PrimaryLight2, #CDDDFF)')};
  color: ${({ revealed }) => (revealed ? 'var(--Grays-Black, #1A1A1A)' : 'transparent')};
  border: ${({ revealed }) => (revealed ? '1px solid var(--Main-PrimaryLight2, #CDDDFF)' : 'none')};
  cursor: pointer;
  z-index: 10;

  &:hover {
    background-color: ${({ revealed }) => (revealed ? 'transparent' : '#C0D4FF')}; /* Change to hover color when not revealed */
  }
`;

const CommonStudyModal = ({ onClose, studyCardSetId, noteName, folderName, color }) => {
  const [content, setContent] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [noteId, setNoteId] = useState(0);
  const [folderId, setFolderId] = useState(0);
  
  const [revealedAnswers, setRevealedAnswers] = useState([]);

  const [isHover, setIsHover] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await studyCardSet(studyCardSetId, currentPage);
      setContent(response.content);
      setTotalPage(response.totalPages);
      setNoteId(response.content[0].noteId);
      setFolderId(response.content[0].folderId);
    };
    fetchData();
  }, [currentPage]);

  useEffect(() => {
    // 페이지가 변경될 때마다 revealedAnswers 초기화
    setRevealedAnswers({});
  }, [currentPage]);

  const goToNextPage = () => {
    if (currentPage < totalPage - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

 
  const goToNoteEditor = () => {
    navigate(`/note-editor?folderId=${folderId}&noteId=${noteId}`);
    onClose();
  };
  const revealAnswer = (index, overlayIndex = null) => {
    if (overlayIndex === null) {
      // 단일 카드에 대한 상태 변경
      setRevealedAnswers((prevRevealed) => ({
        ...prevRevealed,
        [index]: true,
      }));
    } else {
      // 이미지 카드의 특정 오버레이에 대한 상태 변경
      setRevealedAnswers((prevRevealed) => ({
        ...prevRevealed,
        [index]: { ...prevRevealed[index], [overlayIndex]: true },
      }));
    }
  };

  const revealAnswers = (cardIndex, answerIndex) => {
    setRevealedAnswers((prevRevealed) => {
      const updatedRevealed = { ...prevRevealed };
  
      // 해당 카드의 상태가 없으면 빈 배열을 생성
      if (!updatedRevealed[cardIndex]) {
        updatedRevealed[cardIndex] = [];
      }
  
      // 답변 인덱스에 해당하는 상태를 true로 설정
      updatedRevealed[cardIndex][answerIndex] = true;
  
      return updatedRevealed;
    });
  };

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <img src={closeCard} alt="close" />
        </CloseButton>
        <ModalTitle>{noteName}</ModalTitle>
        <ModalSubTitle>
            <FolderIcon color={colorMap[color]} />
          {folderName}
        </ModalSubTitle>
        <ModalBody>
          <LeftBox onClick={goToPreviousPage} isClickable={currentPage > 0} />
          <CardBox >
            {content.map((card, index) => (
              <Content key={index} isMulti={card.cardType === 'multi'}>
                {card.cardType === 'image' ? (
                  <>
                    <Img src={card.imgUrl} alt="content front" />
                    {card.overlays.map((overlay, i) => (
                      <AnswerOverlay
                        key={i}
                        positionOfX={overlay.positionOfX}
                        positionOfY={overlay.positionOfY}
                        width={overlay.width}
                        height={overlay.height}
                        revealed={revealedAnswers[index]?.[i] || false}
                        onClick={() => revealAnswer(index, i)}  // 오버레이 클릭 시 상태 변경
                      />
                    ))}
                  </>
                ) : card.cardType === 'word' ? (
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
                ) : card.cardType === 'multi' ? (
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
                ) : null}
              </Content>
            ))}
            <ToEditor
              onClick={goToNoteEditor}
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            >
              <img alt="toNoteEditor" src={isHover ? toNoteEditorHover : toNoteEditor} />
            </ToEditor>
          </CardBox>

          <RightBox onClick={goToNextPage} isClickable={currentPage < totalPage - 1} />
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

export default CommonStudyModal;