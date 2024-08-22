import styled from 'styled-components';
import DeleteIcon from '../../../assets/deleteicon.svg';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  display: flex;
  width: 29.5rem;
  padding: 2rem 2rem 1.5rem 2rem;
  flex-direction: column;
  align-items: flex-start;
  background: var(--Grays-White, #FFF);
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.04), 0px 4px 20px 0px rgba(0, 0, 0, 0.06);
  border-radius: 8px;
`;

const ModalTitleDiv = styled.div`
  display: flex;
  align-items: center; 
  justify-content: center;
  gap: 0.75rem;
`;

const ModalTitle = styled.p`
  color: #EA1215;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  margin: 0;
  display: flex;
  align-items: center; /* 텍스트와 아이콘의 세로 정렬을 맞추기 위해 추가 */
`;

const ModalMessage = styled.p`
  width: 25.5rem;
  color: var(--Grays-Black, #1A1A1A);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ModalButtonDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1.5rem;
  gap: 0.5rem; 
`;

const ModalButton = styled.button`
  display: flex;
  padding: 0.4375rem 0.875rem;
  justify-content: center;
  align-items: center;
  background: #fff;
  border: none;
  color: var(--Grays-Black, #1A1A1A);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background: var(--Grays-Gray7, #F0F0F0);
  }
`;

const ConfirmModal = ({ onCancel, onConfirm }) => {
  return (
    <ModalBackground aria-modal="true">
  <ModalContainer>
    <ModalTitleDiv>
      <img src={DeleteIcon} alt="Delete Icon" /> 
      <ModalTitle>학습 중단</ModalTitle>
    </ModalTitleDiv>
        <ModalMessage>
          분석 학습을 중단하시겠습니까? <br />
          학습 내용은 저장되지 않으며 다음 학습 시 처음부터 다시 시작해야 합니다.
        </ModalMessage>
        <ModalButtonDiv>
          <ModalButton onClick={onCancel}>취소</ModalButton>
          <ModalButton onClick={onConfirm}>확인</ModalButton>
      </ModalButtonDiv>
      </ModalContainer>
    </ModalBackground>
  );
};

export default ConfirmModal;
