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
  gap: 2.5rem;
  color: var(--Grays-Gray1, #646464);
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const StatisticsItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DifficultyLabel = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.125rem;
  font-weight: 500;
`;

const BarContainer = styled.div`
  flex-grow: 1;
  height: 1rem;
  background: ${({ color }) => color};
  margin: 0 1rem;
`;

const Count = styled.div`
  font-size: 1.125rem;
  font-weight: 500;
`;

const ButtonContainer = styled.div`
  width: 47.5rem;
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const ActionButton = styled.div`
  display: flex;
  width: 23.25rem;
  padding: 1rem 6.8125rem 1rem 8.625rem;
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

const IconDiv = styled.div`
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
`;

const LogContainer = styled.div`
  width: 47.5rem;
  background: var(--Grays-White, #FFF);
  padding: 1rem;
  border-radius: 0.75rem;
  margin-top: 1rem;
  max-height: 20rem;
  overflow-y: auto;
`;

const LogItem = styled.div`
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--Grays-Gray1, #646464);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--Grays-Black, #1A1A1A);

  &:last-child {
    border-bottom: none;
  }
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
              <BarContainer color="#FFE1E1"></BarContainer>
              <Count>{data.hardCardsNumber}개 {data.hardCardsPercent}%</Count>
            </StatisticsItem>
            <StatisticsItem>
              <DifficultyLabel>알맞음</DifficultyLabel>
              <BarContainer color="#CEEFE3"></BarContainer>
              <Count>{data.normalCardsNumber}개 {data.normalCardsPercent}%</Count>
            </StatisticsItem>
            <StatisticsItem>
              <DifficultyLabel>쉬움</DifficultyLabel>
              <BarContainer color="#CDDEFF"></BarContainer>
              <Count>{data.easyCardsNumber}개 {data.easyCardsPercent}%</Count>
            </StatisticsItem>
            <StatisticsItem>
              <DifficultyLabel>패스</DifficultyLabel>
              <BarContainer color="#F2DEF9"></BarContainer>
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
                <div>
                    {item.studyDate}
                </div>
                <div>
                    학습일
                </div>
                
                <div>
                    {item.cardNumber}
                </div>
                <div>
                학습한 카드 개수
                </div>
            </LogItem>
          ))}
        </LogContainer>
      )}
    </ModalBackdrop>
  );
};

export default StatisticsModal;
