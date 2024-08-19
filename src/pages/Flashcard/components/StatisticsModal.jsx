import styled from 'styled-components';
import FolderIcon from './FolderIcon';
import closeCard from '../../../assets/flashcard/closeCard.svg';
import down from '../../../assets/flashcard/down.svg';
import right from '../../../assets/flashcard/right.svg';
import graphStudy from '../../../api/flashcard/graphStudy';
import { colorMap } from './colorMap';
import { useEffect } from 'react';

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
height: 22.5rem;
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

const StatisticsModal = ({ onClose, studyCardSetId, color }) => {

    // 통계 api 연결
    useEffect(() => {
        const fetchGraphStudy = async () => {
            try {
                const response = await graphStudy(studyCardSetId);
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        }
        fetchGraphStudy();
    }, [studyCardSetId]);

  return (
    <ModalBackdrop>
        <CloseButton onClick={onClose}>
            <img src={closeCard} alt="close" />
        </CloseButton>
        <ModalTitle>1차시 단어</ModalTitle>
        <FolderIconContainer>
          <FolderIcon color={colorMap[color]} />
          <FolderText>폴더 name</FolderText>
        </FolderIconContainer>
      <ModalContent>
        <StatisticsItem>
          <DifficultyLabel>어려움</DifficultyLabel>
          <BarContainer color="#FFE1E1"></BarContainer>
          <Count>0개 100%</Count>
        </StatisticsItem>
        <StatisticsItem>
          <DifficultyLabel>알맞음</DifficultyLabel>
          <BarContainer color="#CEEFE3"></BarContainer>
          <Count>10개 1%</Count>
        </StatisticsItem>
        <StatisticsItem>
          <DifficultyLabel>쉬움</DifficultyLabel>
          <BarContainer color="#CDDEFF"></BarContainer>
          <Count>1개 20%</Count>
        </StatisticsItem>
        <StatisticsItem>
          <DifficultyLabel>패스</DifficultyLabel>
          <BarContainer color="#F2DEF9"></BarContainer>
          <Count>10개 44%</Count>
        </StatisticsItem>
      </ModalContent>

      <ButtonContainer>
          <ActionButton variant="primary" onClick={onClose}>학습 기록 보기
                <IconDiv>
                    <img src={down} alt
                    ="down" />
                </IconDiv>
          </ActionButton>
          <ActionButton onClick={onClose}>학습하러 가기
                <IconDiv>
                    <img src={right} alt
                    ="right" />
                </IconDiv>
          </ActionButton>
        </ButtonContainer>
    </ModalBackdrop>
  );
};

export default StatisticsModal;
