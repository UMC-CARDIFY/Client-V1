import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const SubPageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 9rem 0;

  @media screen and (max-width: 1440px) {
    padding: 7.5rem 0;
  }

  @media screen and (max-width: 1024px) {
    padding: 4.5rem 0;
  }

`;

const InnerContainer = styled.div`
  width: 100%;
  max-width: 62.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 1440px) {
    max-width: 57.5rem;
  }

  @media screen and (max-width: 1024px) {
    max-width: 52.5rem;
  }
`;

const Header = styled.header`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-left: -13rem;
  margin-bottom: 2rem;

  @media screen and (max-width: 1440px) {
    margin-left: -10rem;
  }

  @media screen and (max-width: 1024px) {
    margin-left: 0rem;
    margin-bottom: 1rem;
  }
`;

const BackButton = styled.button`
  width: 3rem;
  height: 3rem;
  background: #ccc;
  cursor: pointer;
  border: none;
  margin-right: 1rem;

  @media screen and (max-width: 1024px) {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

const Title = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

const PlansWrapper = styled.div` 
  max-width: 58rem;  
  display: flex;
  gap: 4rem;
  justify-content: center;

  @media screen and (max-width: 1440px) {
    max-width: 53rem; 
    gap: 3rem;
  }

  @media screen and (max-width: 1024px) {
    max-width: 46rem; 
    gap: 2.5rem;
  }
`;

const PlanContainer = styled.div`
  width: 27rem;
  height: 37.6875rem;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0.5rem;
  border: 1px solid #B1B1B1;
  background: #FFF;
  padding: 2rem;
  position: relative;

  @media screen and (max-width: 1440px) {
    width: 25rem;
  }

  @media screen and (max-width: 1024px) {
    width: 18rem;
    height: 28rem;
    padding: 1.25rem;
  }

`;

const PlanTitle = styled.p`
  color: #1F1F1F;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 1.5rem;

  @media screen and (max-width: 1024px) {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
  }

`;

const PlanPriceDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4rem;

  @media screen and (max-width: 1024px) {
    margin-bottom: 1.75rem;
  }
`;

const PlanPriceValue = styled.span`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  @media screen and (max-width: 1024px) {
    font-size: 2rem;
  }
`;

const PlanPricePerMonth = styled.span`
  color: #000;
  font-family: Pretendard;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;

  @media screen and (max-width: 1024px) {
    font-size: 1.25rem;
  }
`;

const PlanList = styled.div`
  list-style-type: none;
  text-align: left;
  font-family: Pretendard;
  font-size: 1rem;
  line-height: 1.5;
  color: #000;
`;

const CheckIcon = styled.div`
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
  background: #ccc;
  margin-right: 0.5rem;

  @media screen and (max-width: 1024px) {
    width: 1.5rem;
    height: 1.5rem;
  }

`;

const Text = styled.p`
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  color: #000;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const PlanItem = styled.div`
  margin-bottom: 1.2rem;
  display: flex;
  align-items: center;
  color: #000;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  @media screen and (max-width: 1024px) {
    font-size: 0.75rem;
  }

`;

const StartButton = styled.button`
  width: 9.5rem;
  height: 2.5rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #B1B1B1;
  background-color: #FFF;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  padding: 0.5rem 1rem;
  cursor: pointer;
  margin-top: auto;
  margin-bottom: 0;
  &:hover {
    background-color: #2D8EFF;
  }
`;

const SubscriptionPage = () => {
    const navigate = useNavigate();
    const handleBackClick = () => {
      navigate(-1);
    };

 return (
  <SubPageContainer>
    <InnerContainer>
      <Header>
        <BackButton onClick={handleBackClick} />
        <Title>요금제</Title>
      </Header>
      <PlansWrapper>
        <PlanContainer>
          <PlanTitle>베이직</PlanTitle>
          <PlanPriceDiv>
            <Text>₩</Text>
            <PlanPriceValue>0</PlanPriceValue>
            <PlanPricePerMonth>/달</PlanPricePerMonth>
          </PlanPriceDiv>
          <PlanList>
            <PlanItem><CheckIcon />노트 1개 당 플래시 카드 최대 30개</PlanItem>
            <PlanItem><CheckIcon />노트 1개 당 이미지 카드 최대 3개</PlanItem>
            <PlanItem><CheckIcon />파일 최대 10개</PlanItem>
            <PlanItem><CheckIcon />노트 최대 50개</PlanItem>
            <PlanItem><CheckIcon />자료실 무료 다운로드 3회</PlanItem>
          </PlanList>
          <StartButton>시작하기</StartButton>
        </PlanContainer>
        <PlanContainer>
          <PlanTitle>프리미엄</PlanTitle>
          <PlanPriceDiv>
            <Text>₩</Text>
            <PlanPriceValue>6,000</PlanPriceValue>
            <PlanPricePerMonth>/달</PlanPricePerMonth>
          </PlanPriceDiv>
          <PlanList>
            <PlanItem><CheckIcon />노트 1개 당 플래시 카드 개수 제한 없음</PlanItem>
            <PlanItem><CheckIcon />노트 1개 당 이미지 카드 개수 제한 없음</PlanItem>
            <PlanItem><CheckIcon />파일 개수 제한 없음</PlanItem>
            <PlanItem><CheckIcon />노트 개수 제한 없음</PlanItem>
            <PlanItem><CheckIcon />자료실 무료 다운로드 5회</PlanItem>
            <PlanItem><CheckIcon />CSV, PDF 파일로 내보내기</PlanItem>
          </PlanList>
          <StartButton>시작하기</StartButton>
        </PlanContainer>
      </PlansWrapper>
    </InnerContainer>
  </SubPageContainer>
  );
};

export default SubscriptionPage;