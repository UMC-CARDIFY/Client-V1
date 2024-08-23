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



const CompletionModalContent = styled.div`
  padding: 5.5rem 10rem 3rem 10rem;
  flex-shrink: 0;
  border-radius: 0rem 0rem 0.5rem 0.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  border-radius: 0.75rem;
  background: var(--Grays-White, #FFF);
  box-shadow: 0px 4px 26px 0px rgba(0, 0, 0, 0.02), 0px 10px 60px 0px rgba(0, 74, 162, 0.03);
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
  background-color: ${({ primary }) => (primary ? '#E9F1FF' : '#F4F4F4')};
  color: ${({ primary }) => (primary ? '#0F62FE' : '#646464')};
  border: none;
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
  border-radius: 0.625rem;

`;


const CompletionModal = ({ onClose, onConfirm }) => {

    
  return (
    <CompletionModalBackdrop>

      <CompletionModalContent>
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
