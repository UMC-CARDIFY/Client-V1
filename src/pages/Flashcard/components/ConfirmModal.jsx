import styled from 'styled-components';

const ConfirmModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

const ConfirmModalContent = styled.div`
display: flex;
width: 29.5rem;
padding: 2rem 2rem 1.5rem 2rem;
flex-direction: column;
align-items: flex-start;
gap: 1.5rem;
background: #FFF;
box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.04), 0px 4px 20px 0px rgba(0, 0, 0, 0.06);

  color: var(--kakao-logo, #000);
font-family: Pretendard;
font-size: 1rem;
font-style: normal;
font-weight: 400;
line-height: normal;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  gap: 0.75rem;
`;

const IconWrapper = styled.div`
width: 1.5rem;
height: 1.5rem;
`;

const WarningText = styled.div`
  color: var(--alert, #EA1215);
font-family: Pretendard;
font-size: 1.25rem;
font-style: normal;
font-weight: 700;
line-height: normal;
`;

const ModalMessage = styled.div`
`;

const ConfirmModalButtonContainer = styled.div`
width: 100%;
display: flex;
justify-content: flex-end;
align-items: center;
  margin-top: 1.5rem;
`;

const ConfirmButton = styled.div`
display: flex;
padding: 0.4375rem 0.875rem 0.375rem 0.875rem;
justify-content: center;
align-items: center;
  border: 1px solid #DDD;
  background-color: ${({ variant }) => (variant === 'confirm' ? '#FF3B3B' : '#FFFFFF')};
  color: ${({ variant }) => (variant === 'confirm' ? '#FFFFFF' : '#000000')};
  cursor: pointer;

  &:hover {
    background-color: ${({ variant }) => (variant === 'confirm' ? '#D32F2F' : '#F5F5F5')};
  }
`;

const ConfirmModal = ({ onCancel, onConfirm }) => {
  return (
    <ConfirmModalBackdrop>
      <ConfirmModalContent>
        <ModalHeader>
          <IconWrapper>
            <img src="/path-to-your-icon.svg" alt="icon" />
          </IconWrapper>
          <WarningText>학습 중단</WarningText>
        </ModalHeader>
        <ModalMessage>
          분석 학습을 중단하시겠습니까? <br />
          학습 내용은 저장되지 않으며 다음 학습 시 처음부터 다시 시작해야 합니다.
        </ModalMessage>
        <ConfirmModalButtonContainer>
          <ConfirmButton onClick={onCancel}>취소</ConfirmButton>
          <ConfirmButton variant="confirm" onClick={onConfirm}>확인</ConfirmButton>
        </ConfirmModalButtonContainer>
      </ConfirmModalContent>
    </ConfirmModalBackdrop>
  );
};

export default ConfirmModal;
