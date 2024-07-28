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
`;

const ModalContainer = styled.div`
display: flex;
width: 29.5rem;
padding: 2rem 2rem 1.5rem 2rem;
flex-direction: column;
align-items: flex-start;
gap: 1rem;
background: var(--Grays-White, #FFF);
box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.04), 0px 4px 20px 0px rgba(0, 0, 0, 0.06);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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
  margin-bottom: 1.5rem;
  color: var(--Grays-Black, #1A1A1A);
font-family: Pretendard;
font-size: 1rem;
font-style: normal;
font-weight: 400;
line-height: normal;
`;

const ModalButtonDiv = styled.div`
display: flex;
width: 25.5rem;
justify-content: flex-end;
align-items: center;
`;

const ModalButton = styled.button`
  display: flex;
padding: var(--UI-Component-None, 0.4375rem) var(--UI-Component-None, 0.875rem) var(--UI-Component-None, 0.375rem) var(--UI-Component-None, 0.875rem);
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
`;

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, type, itemName }) => {
  if (!isOpen) return null;

  return (
    <ModalBackground>
      <ModalContainer>
        {type === 'folder' && (
          <>
            <ModalTitle>폴더 삭제</ModalTitle>
            <ModalMessage>
              '{itemName}'을 삭제하시겠습니까?<br />
              이 폴더 안의 노트도 함께 삭제됩니다.
            </ModalMessage>
          </>
        )}
        {type === 'note' && (
          <>
            <ModalTitle>노트 삭제</ModalTitle>
            <ModalMessage>
              '{itemName}'을 삭제하시겠습니까?<br />
              이 노트 안의 플래시카드도 함께 삭제됩니다.
            </ModalMessage>
          </>
        )}
        <ModalButtonDiv>
          <ModalButton onClick={onClose}>취소</ModalButton>
          <ModalButton onClick={onConfirm}>확인</ModalButton>
        </ModalButtonDiv>
      </ModalContainer>
    </ModalBackground>
  );
};

export default DeleteConfirmModal;
