import styled from 'styled-components';

const CompletionModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 0.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  background: #F2F4F8;
  flex-direction: column;
`;

const CompletionModalHeader = styled.div`
width: 56.4375rem;
height: 3.6875rem;
flex-shrink: 0;
border-radius: 0.5rem 0.5rem 0rem 0rem;
background: #0F62FE;
`;

const CompletionModalContent = styled.div`
width: 56.4375rem;
height: 37.125rem;
flex-shrink: 0;
  border-radius: 0rem 0rem 0.5rem 0.5rem;
background: #FFF;
  text-align: center;
  display: flex;
    flex-direction: column;
    align-items: center;
`;

const CompletionTitle = styled.div`
color: var(--kakao-logo, #000);
text-align: center;
font-family: Pretendard;
font-size: 1.5625rem;
font-style: normal;
font-weight: 600;
line-height: normal;
margin-bottom: 0.88rem;
`;

const CompletionMessage = styled.div`
color: var(--kakao-logo, #000);
text-align: center;
font-family: Pretendard;
font-size: 1.125rem;
font-style: normal;
font-weight: 400;
line-height: normal;
margin-bottom: 3.94rem;
`;

const CompletionButtonDiv = styled.div`
display: flex;
justify-content: center;
gap: 0.88rem;
`;

const CompletionButton = styled.div`
width: 13.1875rem;
height: 3.0625rem;
flex-shrink: 0;
  background-color: ${({ primary }) => (primary ? '#1062FE' : '#ffffff')};
  color: ${({ primary }) => (primary ? '#ffffff' : '#000000')};
  border: ${({ primary }) => (primary ? 'none' : '1px solid #B1B1B1')};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: Pretendard;
font-size: 0.9375rem;
font-style: normal;
font-weight: 600;
line-height: normal;
`;

const CompleteIconDiv = styled.div`
width: 16.4375rem;
height: 11.875rem;
flex-shrink: 0;
background: #D9D9D9;
margin-bottom: 3.56rem;
margin-top: 5.7rem;
`;

const CompletionModal = ({ onClose, onConfirm }) => {

    
  return (
    <CompletionModalBackdrop>
        <CompletionModalHeader />
      <CompletionModalContent>
        <CompleteIconDiv />
        <CompletionTitle>축하합니다! 플래시카드 학습을 완료했습니다!</CompletionTitle>
        <CompletionMessage>
          학습 통계 페이지에서 나의 학습 결과를 확인하세요.
        </CompletionMessage>
        <CompletionButtonDiv>
        <CompletionButton primary onClick={onConfirm}>학습 통계 확인</CompletionButton>
        <CompletionButton onClick={onClose}>플래시카드 홈으로 이동</CompletionButton>
        </CompletionButtonDiv>
      </CompletionModalContent>
    </CompletionModalBackdrop>
  );
};

export default CompletionModal;
