import styled from 'styled-components';

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
  gap: 0.75rem;
  align-items: center;
`;

const DeleteIcon = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
  stroke-width: 2px;
  stroke: var(--Semantic-Alert, #EA1215);
`;

const ModalTitle = styled.h2`
  color: var(--Semantic-Alert, #EA1215);
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
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
  gap: 0.5rem; /* 버튼 간의 간격 추가 */
`;

const ModalButton = styled.button`
  display: flex;
  padding: 0.4375rem 0.875rem;
  justify-content: center;
  align-items: center;
  background: #fff;
  border: 1px solid #DDD;
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

const ConfirmButton = styled(ModalButton)`
  background: var(--Semantic-Alert, #EA1215);
  color: white;
  border: none;

  &:hover {
    background: #c10e12;
  }
`;

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, type, itemName }) => {
  if (!isOpen) return null;

  return (
    <ModalBackground aria-modal="true">
      <ModalContainer>
        <ModalTitleDiv>
          <DeleteIcon>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M11 13V5M11 17V15M11 1C5.477 1 1 5.477 1 11C1 16.523 5.477 21 11 21C16.523 21 21 16.523 21 11C21 5.477 16.523 1 11 1Z" stroke="#EA1215" strokeWidth="2"/>
            </svg>
          </DeleteIcon>
          <ModalTitle>
            {type === 'folder' ? '폴더 삭제' : '노트 삭제'}
          </ModalTitle>
        </ModalTitleDiv>
        <ModalMessage>
          '{itemName}'을 삭제하시겠습니까?<br />
          {type === 'folder' ? '이 폴더 안의 노트도 함께 삭제됩니다.' : '이 노트 안의 플래시카드도 함께 삭제됩니다.'}
        </ModalMessage>
        <ModalButtonDiv>
          <ModalButton onClick={onClose}>취소</ModalButton>
          <ConfirmButton onClick={onConfirm}>확인</ConfirmButton>
        </ModalButtonDiv>
      </ModalContainer>
    </ModalBackground>
  );
};

export default DeleteConfirmModal;
