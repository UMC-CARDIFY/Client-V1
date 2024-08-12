import MenuBar from '../../components/MenuBar';
import TopBar from '../../components/TopBar';
import FlashcardItem from './components/FlashcardItem';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ContentArea = styled.div`
  display: flex;
  align-items: center;
  height: 100%; 
  background: var(--Main-BackGround, #F2F4F8);
  padding: 2.12rem 4rem 2.65rem 4rem;
  flex-wrap: wrap;  // 카드가 여러 줄로 배치되도록 설정
`;

const Flashcards = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  width: 100%;
`;

const OptionDiv = styled.div`
  display: flex;
  justify-content: start;
  gap: 0.75rem;
  width: 100%;
  margin-bottom: 1.06rem;
`;

const OptionButton = styled.button`
display: flex;
width: 5.1rem;
height: 1.875rem;
padding: 0.1875rem 0.3125rem;
justify-content: center;
align-items: center;
gap: 0.3125rem;
border-radius: 0.3125rem;
background: #FFF;
border: none;
cursor: pointer;
color: var(--Grays-Black, #1A1A1A);
font-family: Inter;
font-size: 0.875rem;
font-style: normal;
font-weight: 500;
line-height: normal;
`;

const SortButton = styled(OptionButton)`
width: 4.5rem;
height: 1.875rem;
padding: 0.1875rem 0.375rem 0.1875rem 0.4375rem;
gap: 0.375rem;
`;

export const Flashcard = () => {
  return (
    <Container>
      <MenuBar />
      <MainContent>
        <TopBar
          title="플래시 카드"
          subtitle="전략적인 지식 암기"
        />
        <ContentArea>
          <OptionDiv>
          <SortButton><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <line x1="3" y1="7.4" x2="21" y2="7.4" stroke="#1A1A1A" strokeWidth="1.2"/>
  <line x1="3" y1="12.4" x2="15" y2="12.4" stroke="#1A1A1A" strokeWidth="1.2"/>
  <line x1="3" y1="17.4" x2="9" y2="17.4" stroke="#1A1A1A" strokeWidth="1.2"/>
</svg>정렬</SortButton>
          <OptionButton><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M18.8798 5.77783H5.10202C5.04386 5.78232 4.98954 5.80864 4.94997 5.8515C4.91041 5.89437 4.88851 5.95061 4.88869 6.00894V6.77339C4.88815 6.85174 4.9032 6.92942 4.93296 7.0019C4.96271 7.07439 5.00659 7.14023 5.06202 7.19561L10.3954 12.5289V16.9734L13.6176 18.5778V12.5201L18.9509 7.18672C19.0529 7.07666 19.11 6.93236 19.1109 6.78228V6.00894C19.1109 5.94765 19.0866 5.88886 19.0432 5.84552C18.9999 5.80218 18.9411 5.77783 18.8798 5.77783Z" stroke="#1A1A1A" strokeWidth="1.2"/>
</svg>필터링</OptionButton>
          </OptionDiv>
          <Flashcards>
          <FlashcardItem note="1차시" folder="토익" recentDate="2024-07-09" nextDate="-" status="학습 중" color="#77CEC6" />
          <FlashcardItem note="1장 음성학 기초" folder="국어 음운론" recentDate="-" nextDate="-" status="학습 전" color="#FD855F"/>
          <FlashcardItem note="프로세서" folder="운영체제" recentDate="2024-07-09" nextDate="-" status="영구 보관" color="#ED83B1" />
          <FlashcardItem note="스크럼 기법" folder="정보처리기사" recentDate="2024-07-09" nextDate="2024-07-09" status="학습 중" color="#FD855F"/>
          </Flashcards>
        </ContentArea>
      </MainContent>
    </Container>
  );
};

export default Flashcard;
