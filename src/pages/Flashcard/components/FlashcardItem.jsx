import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CardIcon from './CardIcon';
import DeleteModal from './DeleteModal';
import styled from 'styled-components';
import studycommon from '../../../assets/flashcard/studycommon.svg';
import studymore from '../../../assets/flashcard/studymore.svg';
import studymoreDis from '../../../assets/flashcard/studymoreDis.svg';
import statistics from '../../../assets/flashcard/statistics.svg';
import moreoptions from '../../../assets/flashcard/moreoptions.svg';
import star from '../../../assets/flashcard/star.svg';
import CommonStudyModal from './CommonStudyModal';
import AnalysisStudyModal from './AnalysisStudyModal';
import StatisticsModal from './StatisticsModal';
import { colorMap } from './colorMap';
import deleteCardSet from '../../../api/flashcard/deleteCardSet';
import getCards from '../../../api/flashcard/getCards';

// 겹쳐진 카드들을 감싸는 컨테이너
const CardStackContainer = styled.div`
  position: relative;
  width: 29rem;
  height: 17.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 각각의 카드 레이어
const CardLayer = styled.div`
  position: absolute;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: 0.75rem;
  background: var(--Grays-White, #FFF);
  box-shadow: 0 4px 26px rgba(0, 0, 0, 0.02), 0 10px 60px rgba(0, 74, 162, 0.03);
  opacity: ${({ opacity }) => opacity};
  transform: ${({ translate }) => translate};
`;

// 메인 콘텐츠를 담고 있는 카드
const ForegroundCard = styled.div`
  position: relative;
  width: 29rem;
  height: 16rem;
  border-radius: 0.75rem;
  background: var(--Grays-White, #FFF);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem 1.5rem 2.5rem 2.5rem;
  box-sizing: border-box;
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardIconDiv = styled.div`
  margin-bottom: 0.5rem;
`;

const CardTitle = styled.div`
  color: var(--Grays-Black, #1A1A1A);
  font-family: Pretendard;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  text-align: center;
`;


const CardSubtitle = styled.div`
  color: var(--Grays-Black, #1A1A1A);
  text-align: center;
  font-family: Pretendard;
  font-size: 0.75rem;
  font-weight: 400;
  margin-bottom: 1.19rem;
`;

const Line = styled.div`
  width: 23rem;
  height: 0.0625rem;
  background: #E8E8E8;
  align-self: center;
  margin-bottom: 1rem;
  z-index: 1;
`;

const DayDiv = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 2rem;
  color: var(--Grays-Gray1, #646464);
  text-align: center;
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const Day = styled.div`
  display: flex;
  width: 8rem;
  flex-direction: column;
  align-items: center;
  gap: 0.125rem;
`;

const DateDay = styled.div`
  text-align: center;
  font-family: Pretendard;
  font-size: 0.875rem;
  font-weight: 500;
`;

const DateText = styled.div`
  color: var(--Grays-Gray2, #767676);
  text-align: center;
  font-family: Pretendard;
  font-size: 0.6875rem;
  font-weight: 500;
`;

const CardFooter = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1.25rem;
`;

const Button = styled.button`
  display: flex;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.375rem;
  border: none;
  cursor: ${({ disabled }) => (disabled ? '' : 'pointer')};
  background: ${({ disabled }) => (disabled ? '#F4F4F4' : '#F2F4F8')};
  color: ${({ disabled }) => (disabled ? '#B1B1B1' : '#1A1A1A')};
  font-family: Pretendard;
  font-size: 0.75rem;
  font-weight: 500;
`;

const StatusDiv = styled.div`
  position: absolute;
  top: 2rem;
  left: 2.5rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  `;

const StatusBadge = styled.div`
  display: inline-flex;
  padding: 0.375rem 1rem;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.375rem;
  background: ${({ status }) => (status === 1 ? '#E7EFFF' : status === 0 ? '#EDEDED' : 'var(--Grays-Gray6, #EDEDED)')};
  color: ${({ status }) => (status ===  1 ? '#0F62FE' : '#767676')};
  font-family: Pretendard;
  font-size: 0.75rem;
  font-weight: 500;
`;

const StarIconWrapper = styled.div`
width: 2rem;
`;

const MoreOptions = styled.div`
  width: 1.75rem;
  height: 1.75rem;
  cursor: pointer;
  position: absolute;
  top: 1.5rem;
  right: 1.25rem;
`;

const DeleteButton = styled.div`
  position: absolute;
  top: 2.38rem;
  right: 2.81rem;
  display: ${({ show }) => (show ? 'block' : 'none')};
  width: 9.1rem;
  height: 3.125rem;
  box-sizing: border-box;
  padding: 1.03125rem 4rem 1.03125rem 1.125rem;
  border: 1px solid #dedede;
  background: #fff;
  cursor: pointer;
  z-index: 10;
  color: #000;
  font-family: Inter;
  font-size: 0.875rem;
  font-weight: 500;
`;

const RelearnButton = styled.button`
  display: ${({ show }) => (show ? 'block' : 'none')};
  position: absolute;
  right: 2.81rem;
  width: 9.1rem;
  height: 3.125rem;
    box-sizing: border-box;
  padding: 1.03125rem 4rem 1.03125rem 1.125rem;
  border: 1px solid #dedede;
  background: #fff;
  cursor: pointer;
  z-index: 10;
  color: #000;
  font-family: Inter;
  font-size: 0.875rem;
  font-weight: 500;
`;

const FlashcardItem = ({ noteName, folderName, recentStudyDate, nextStudyDate, studyStatus, color, studyCardSetId, markStatus }) => {

  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showCommonStudyModal, setShowCommonStudyModal] = useState(false); 
  const [showAnalysisStudyModal, setShowAnalysisStudyModal] = useState(false);
  const [showStatisticsModal, setShowStatisticsModal] = useState(false);

  const [isAnalysisDisabled, setIsAnalysisDisabled] = useState(true);
  const isAnalysisDisabSrc = studymoreDis;
  const isAnalysisAbleSrc = studymore;

  useEffect(() => {
    const checkDate = () => {
      const now = new Date();
      const studyDate = new Date(new Date(nextStudyDate).getTime() + 9 * 60 * 60 * 1000);      
      if (now >= studyDate) {
        setIsAnalysisDisabled(false);
      } else {
        setIsAnalysisDisabled(true);
      }
    };

    checkDate(); // 컴포넌트 마운트 시 즉시 체크
    const interval = setInterval(checkDate, 10000); // 1초마다 시간 체크

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 클리어
  }, [nextStudyDate]);

  const toggleDeleteButton = () => {
    setShowDeleteButton((prev) => !prev);
  };

  const handleDelete = () => {
    setShowModal(true);
  };

  const confirmDelete = () => {
    // Delete the card
    const deleteCard = async () => {
      try {
        await deleteCardSet(studyCardSetId);
      } catch (error) {
        console.error(error);
      }
    };
    deleteCard();

    // 다시 list api 호출


    console.log('카드가 삭제되었습니다.');
    setShowModal(false);
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  const handleCommonStudyClick = () => {
    setShowCommonStudyModal(true);  // Show the general study modal
  };

  const closeCommonStudyModal = () => {
    setShowCommonStudyModal(false);  // Close the general study modal
  };

  const handleAnalysisStudyClick = () => {
    if (isAnalysisDisabled) {
      console.log('분석학습은 다음 학습시간 이후에만 가능합니다.');
      return;
    }
    else
    setShowAnalysisStudyModal(true);  // Show the analysis study modal
  };

  const closeAnalysisStudyModal = () => {
    setShowAnalysisStudyModal(false);  // Close the analysis study modal
  };

  const formatDate = (date) => {
    const dateObj = new Date(date);
    dateObj.setHours(dateObj.getHours() + 9);
  
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const handleStatisticsOpen = () => {
    setShowStatisticsModal(true); 
  };

  const handleStatisticsClose = () => {
    setShowStatisticsModal(false); 
  };

  const handleRelearn = () => {
    // 재학습 요청 api 호출
  };

  // studyStatus 0:학습전, 1:학습중, 2:영구보관

  return (
    <CardStackContainer>
      {/* 겹쳐진 카드 레이어들 */}
      <CardLayer width="27.875rem" height="15.375rem" opacity="0.3" translate="translateY(1.5rem)" />
      <CardLayer width="28.5rem" height="15.75rem" opacity="0.7" translate="translateY(0.75rem)" />
      
      {/* 실제 콘텐츠를 담고 있는 카드 */}
      <ForegroundCard>
      <StatusDiv>
        <StatusBadge status={studyStatus}>
          { studyStatus === 1 ? '학습 중' : studyStatus === 0 ? '학습 전' : '영구 보관' }
          </StatusBadge>
        {markStatus === "ACTIVE" && (
    <StarIconWrapper>
      <img src={star} alt="star" />
    </StarIconWrapper>
  )}
  </StatusDiv>
        <MoreOptions onClick={toggleDeleteButton}>
          <img src={moreoptions} alt="더보기" />
        </MoreOptions>
        {studyStatus === '영구 보관' ? (
        <>
          <RelearnButton show={showDeleteButton} onClick={handleRelearn}>
            재학습
          </RelearnButton>
          <DeleteButton show={showDeleteButton} onClick={handleDelete}>
            카드 삭제
          </DeleteButton>
        </>
      ) : (
        <DeleteButton show={showDeleteButton} onClick={handleDelete}>
          카드 삭제
        </DeleteButton>
      )}

        <CardHeader>
          <CardIconDiv>
            <CardIcon color={colorMap[color]} />
          </CardIconDiv>
    <CardTitle>{noteName}</CardTitle>
          <CardSubtitle>{folderName}</CardSubtitle>
          <Line />
        </CardHeader>
        <DayDiv>
          <Day>
            {recentStudyDate ? <DateDay>{formatDate(recentStudyDate)}</DateDay> : <DateDay>-</DateDay>}
            <DateText>최근 학습일</DateText>
          </Day>
          <Day>
            {nextStudyDate ? <DateDay>{formatDate(nextStudyDate)}</DateDay> : <DateDay>-</DateDay>}
            <DateText>다음 학습일</DateText>
          </Day>
        </DayDiv>
        <CardFooter>
          <ButtonContainer>
          <Button onClick={handleCommonStudyClick}>
            <img src={studycommon} alt="일반학습" />
          일반학습</Button>
            <Button onClick={handleAnalysisStudyClick} disabled={isAnalysisDisabled}>
              <img src={isAnalysisDisabled ? isAnalysisDisabSrc : isAnalysisAbleSrc} alt="분석학습" />
              분석학습</Button>
          <Button onClick={handleStatisticsOpen}>
            <img src={statistics} alt="학습통계" />
              학습통계
          </Button>
          </ButtonContainer>
        </CardFooter>
      </ForegroundCard>

      {/* 삭제 모달 */}
      {showModal && <DeleteModal onClose={cancelDelete} onConfirm={confirmDelete} noteName={noteName} />}

      {/* 일반학습 모달 */}
          {showCommonStudyModal && (
        <CommonStudyModal onClose={closeCommonStudyModal}
        studyCardSetId= {studyCardSetId}
        noteName={noteName}
        color={color}
        folderName={folderName}
         />
      )}

      {/* 분석학습 모달 */}
      {showAnalysisStudyModal && (
        <AnalysisStudyModal onClose={closeAnalysisStudyModal}
        studyCardSetId= {studyCardSetId}
        noteName={noteName}
        color={color}
        folderName={folderName}
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

    </CardStackContainer>
  );
};

FlashcardItem.propTypes = {
  noteName: PropTypes.string.isRequired,
  folderName: PropTypes.string.isRequired,
  recentStudyDate: PropTypes.string.isRequired,
  nextStudyDate: PropTypes.string.isRequired,
  studyStatus: PropTypes.oneOf(['학습 중', '학습 전', '영구 보관']).isRequired,
  color: PropTypes.string.isRequired,
};

export default FlashcardItem;
