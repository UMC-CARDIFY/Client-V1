import { useState } from 'react';
import PropTypes from 'prop-types';
import CardIcon from './CardIcon';
import DeleteModal from './DeleteModal';
import styled from 'styled-components';

const CardContainer = styled.div`
  position: relative;
  width: 29rem;
  height: 17.25rem;
  flex-shrink: 0;
  border-radius: 0.5rem;
  box-shadow: 0px 4px 26px 0px rgba(0, 0, 0, 0.02), 0px 10px 60px 0px rgba(0, 74, 162, 0.03);
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 1.5rem 2.5rem 2.5rem;
  box-sizing: border-box;
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.25rem;
`;

const CardIconDiv = styled.div`
  align-self: center;
  margin-bottom: 0.5rem;
`;

const CardTitle = styled.div`
  color: var(--Grays-Black, #1A1A1A);
  text-align: center;
  font-family: Pretendard;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const CardSubtitle = styled.div`
  color: var(--Grays-Black, #1A1A1A);
  text-align: center;
  font-family: Pretendard;
  font-size: 0.75rem;
  font-weight: 400;
`;

const DayDiv = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 3rem;
  margin: 0 0 1.25rem;
`;

const Day = styled.div`
  display: flex;
  width: 5rem;
  flex-direction: column;
  align-items: center;
  gap: 0.125rem;
`;

const Date = styled.div`
  color: var(--Grays-Black, #1A1A1A);
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

const Button = styled.button`
  display: flex;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  background: var(--Main-BackGround, #F2F4F8);
  color: var(--Grays-Black, #1A1A1A);
  font-family: Pretendard;
  font-size: 0.75rem;
  font-weight: 500;
`;

const Line = styled.div`
  width: 23rem;
  height: 0.0625rem;
  background: #E8E8E8;
  align-self: center;
`;

const MoreOptions = styled.div`
  width: 1.75rem;
  height: 1.75rem;
  cursor: pointer;
  position: absolute;
  top: 2.25rem;
  right: 1.5rem;
`;

const StatusBadge = styled.div`
  position: absolute;
  top: 2rem;
  left: 2.5rem;
  display: inline-flex;
  padding: 0.375rem 1rem;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.375rem;
  background: ${({ status }) => (status === '학습 중' ? '#E7EFFF' : status === '학습 전' ? '#EDEDED' : 'var(--Grays-Gray6, #EDEDED)')};
  color: ${({ status }) => (status === '학습 중' ? '#0F62FE' : '#1A1A1A')};
  font-family: Pretendard;
  font-size: 0.75rem;
  font-weight: 500;
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

const FlashcardItem = ({ note, folder, recentDate, nextDate, status, color }) => {
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleDeleteButton = () => {
    setShowDeleteButton((prev) => !prev);
  };

  const handleDelete = () => {
    setShowModal(true);
  };

  const confirmDelete = () => {
    console.log('카드가 삭제되었습니다.');
    setShowModal(false);
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  return (
    <CardContainer>
      <CardHeader>
        <CardIconDiv>
          <CardIcon color={color} />
        </CardIconDiv>
        <CardTitle>{note}</CardTitle>
        <CardSubtitle>{folder}</CardSubtitle>
      </CardHeader>
      <Line />
      <DayDiv>
        <Day>
          <Date>{recentDate}</Date>
          <DateText>최근 학습일</DateText>
        </Day>
        <Day>
          <Date>{nextDate}</Date>
          <DateText>다음 학습일</DateText>
        </Day>
      </DayDiv>
      <CardFooter>
        <Button>일반학습</Button>
        <Button>분석학습</Button>
        <Button>학습통계</Button>
      </CardFooter>

      <StatusBadge status={status}>{status}</StatusBadge>

      <MoreOptions onClick={toggleDeleteButton}>
        {/* More Options SVG */}
      </MoreOptions>

      <DeleteButton show={showDeleteButton} onClick={handleDelete}>
        카드 삭제
      </DeleteButton>

      {showModal && <DeleteModal onClose={cancelDelete} onConfirm={confirmDelete} />}
    </CardContainer>
  );
};

// PropTypes for Type Checking
FlashcardItem.propTypes = {
  note: PropTypes.string.isRequired,
  folder: PropTypes.string.isRequired,
  recentDate: PropTypes.string.isRequired,
  nextDate: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['학습 중', '학습 전', '영구 보관']).isRequired,
  color: PropTypes.string.isRequired,
};

export default FlashcardItem;
