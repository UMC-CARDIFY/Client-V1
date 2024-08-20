import styled from 'styled-components';
import FolderIcon from './FolderIcon';
import closeCard from '../../../assets/flashcard/closeCard.svg';
import down from '../../../assets/flashcard/down.svg';
import right from '../../../assets/flashcard/right.svg';
import graphStudy from '../../../api/flashcard/graphStudy';
import { colorMap } from './colorMap';
import { useEffect, useState } from 'react';
import logStudy from '../../../api/flashcard/logStudy';

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #F2F4F8;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;
  overflow-y: scroll;
`;

const ModalTitle = styled.div`
  margin-top: 4.03rem;
  margin-bottom: 0.44rem;
  color: var(--Grays-Black, #1A1A1A);
  font-family: Pretendard;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const FolderIconContainer = styled.div`
  margin-bottom: 1rem;
  display: flex;
  gap: 0.5rem;
`;

const FolderText = styled.div`
  color: var(--Grays-Gray2, #767676);
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const ModalContent = styled.div`
  width: 47.5rem;
  height: auto;
  flex-shrink: 0;
  border-radius: 0.75rem;
  background: var(--Grays-White, #FFF);
  padding: 3rem;
  text-align: center;
  margin-top: 3.09rem;
  display: flex;
  flex-direction: column;
  gap: 2.6rem;
  color: var(--Grays-Gray1, #646464);
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  box-sizing: border-box;
`;

const StatisticsItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 2.5rem;
`;

const DifficultyLabel = styled.div`
  display: flex;
  align-items: center;
  width: 4.5rem;
  color: var(--Grays-Gray2, #767676);
font-family: Pretendard;
font-size: 0.875rem;
font-style: normal;
font-weight: 500;
line-height: normal;
`;

const BarContainerWrapper = styled.div`
  width: 31rem;  /* The width of the bar container wrapper */
`;

const BarContainer = styled.div`
  height: 2rem;
  border-radius: 0.125rem 0.5rem 0.5rem 0.125rem;
  background: ${({ color }) => color};
  width: ${({ widthPercent }) => widthPercent || '0%'};
  transition: width 0.3s ease;  /* Optional: Smooth transition */
`;

const Count = styled.div`
  margin-left: auto; /* Push the count to the right */
  color: var(--Grays-Gray2, #767676);
font-family: Pretendard;
font-size: 0.875rem;
font-style: normal;
font-weight: 500;
line-height: normal;
`;

const ButtonContainer = styled.div`
  width: 47.5rem;
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const ActionButton = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.75rem;
  background: var(--Grays-White, #FFF);
  color: var(--Grays-Black, #1A1A1A);
  font-family: Pretendard;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
  justify-content: center;
`;

const CloseButton = styled.div`
  position: fixed;
  top: 3rem;
  right: 3rem;
  background: none;
  border: none;
  cursor: pointer;
  width: 2.75rem;
  height: 2.75rem;
  flex-shrink: 0;
`;

const IconDiv = styled.div`
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
`;

const LogContainer = styled.div`
display: flex;
width: 23.25rem;
padding: 1.5rem 3rem;
flex-direction: column;
justify-content: center;
align-items: flex-start;
gap: 1.5rem;
flex-shrink: 0;
border-radius: 0.75rem;
background: #FFF;
box-sizing: border-box;
margin-top: 1rem;
margin-left: -24rem;
`;

const LogItem = styled.div`
  color: var(--Grays-Black, #1A1A1A);
font-family: Pretendard;
font-size: 0.75rem;
font-style: normal;
font-weight: 500;
line-height: normal;
display: flex;
`;

const DateDiv = styled.div`
width: 10.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    `;

const Line = styled.div`
width: 0.0625rem;
height: 2rem;
background: #E8E8E8;
margin-right: 1.5rem;
`;

const CntDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    `;

const SmallText = styled.div`
color: #696969;
font-family: Pretendard;
font-size: 0.625rem;
font-style: normal;
font-weight: 500;
line-height: normal;
`;

const StatisticsModal = ({ onClose, studyCardSetId, color, folderName, noteName }) => {
  const [data, setData] = useState();
  const [log, setLog] = useState();
  const [logVisible, setLogVisible] = useState(false);

  useEffect(() => {
    const fetchGraphStudy = async () => {
      try {
        const response = await graphStudy(studyCardSetId);
        console.log(response);
        setData(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGraphStudy();
  }, [studyCardSetId]);

  const viewLog = async () => {
    const data = await logStudy(studyCardSetId, 0);
    console.log(data.content);
    setLog(data.content);
    setLogVisible((prev) => !prev);
  };

  const formattedDate = (date) => {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Adds a leading zero if necessary
    const day = String(dateObj.getDate()).padStart(2, '0'); // Adds a leading zero if necessary
    return `${year}-${month}-${day}`;
  };

  return (
    <ModalBackdrop>
      <CloseButton onClick={onClose}>
        <img src={closeCard} alt="close" />
      </CloseButton>
      <ModalTitle>{noteName}</ModalTitle>
      <FolderIconContainer>
        <FolderIcon color={colorMap[color]} />
        <FolderText>{folderName}</FolderText>
      </FolderIconContainer>
      <ModalContent>
        {data && (
          <>
            <StatisticsItem>
              <DifficultyLabel>어려움</DifficultyLabel>
              <BarContainerWrapper>
              <BarContainer color="#FFE1E1" widthPercent={`${data.hardCardsPercent}%`} />
                </BarContainerWrapper>
              <Count>{data.hardCardsNumber}개 {data.hardCardsPercent}%</Count>
            </StatisticsItem>
            <StatisticsItem>
              <DifficultyLabel>알맞음</DifficultyLabel>
              <BarContainerWrapper>
              <BarContainer color="#CEEFE3" widthPercent={`${data.normalCardsPercent}%`} />
                </BarContainerWrapper>
              <Count>{data.normalCardsNumber}개 {data.normalCardsPercent}%</Count>
            </StatisticsItem>
            <StatisticsItem>
              <DifficultyLabel>쉬움</DifficultyLabel>
              <BarContainerWrapper>
              <BarContainer color="#CDDEFF" widthPercent={`${data.easyCardsPercent}%`} />
                </BarContainerWrapper>
              <Count>{data.easyCardsNumber}개 {data.easyCardsPercent}%</Count>
            </StatisticsItem>
            <StatisticsItem>
              <DifficultyLabel>패스</DifficultyLabel>
              <BarContainerWrapper>
              <BarContainer color="#F2DEF9" widthPercent={`${data.passCardsPercent}%`} />
                </BarContainerWrapper>
              <Count>{data.passCardsNumber}개 {data.passCardsPercent}%</Count>
            </StatisticsItem>
          </>
        )}
      </ModalContent>

      <ButtonContainer>
        <ActionButton variant="primary" onClick={viewLog}>
          학습 기록 보기
          <IconDiv>
            <img src={down} alt="down" />
          </IconDiv>
        </ActionButton>
        <ActionButton onClick={onClose}>
          학습하러 가기
          <IconDiv>
            <img src={right} alt="right" />
          </IconDiv>
        </ActionButton>
      </ButtonContainer>

      {logVisible && log && (
        <LogContainer>
          {log.map((item, index) => (
            <LogItem key={index}>
              <DateDiv>
                <div>
                  {formattedDate(item.studyDate)}
                </div>
                <SmallText>
                  학습일
                </SmallText>
              </DateDiv>
              <Line />
              <CntDiv>
                <div>
                  {item.cardNumber}
                </div>
                <SmallText>
                  학습한 카드 개수
                </SmallText>
              </CntDiv>
            </LogItem>
          ))}
        </LogContainer>
      )}
    </ModalBackdrop>
    
  );
};

export default StatisticsModal;
