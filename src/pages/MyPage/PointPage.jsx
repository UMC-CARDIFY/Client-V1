import styled from 'styled-components';
import BackButton from './components/BackButton';

const OuterContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 8rem 0;
  
  @media screen and (max-width: 1440px) {
    padding: 7em 0;
  }

  @media screen and (max-width: 1200px) {
    padding: 6.8rem 0;
  }
`;

const InnerContainer = styled.div`
  width: 100%;
  max-width: 60rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 1440px) {
    max-width: 55rem;
  }

  @media screen and (max-width: 1024px) {
    max-width: 36rem;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  align-self: flex-start;
  margin-left: -3.5rem;
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  padding: 0 4.5rem;
`;

const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  width: 100%; 
`;

const PointHistory = styled.div`
  display: flex;
  width: 100%; 
  justify-content: space-between;
  align-items: center;
  border-radius: 0.5rem;
  border: 1px solid var(--B1B1B1, #B1B1B1);
  background: #FFF;
`;

const Text = styled.span`
  color: #000;
  font-family: Pretendard;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;

  @media screen and (max-width: 1200px) {
    font-size: 1.5em;
  }
`;

const PointText = styled(Text)`
  margin-right: 2rem;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #B1B1B1;
  margin: 1rem 0 1.5rem 0;
`;

const HistoryTitle = styled.span`
  color: #000;
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`

const DateText = styled.span`
  color: #C7C7C7;
  font-family: Pretendard;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  align-self: flex-start;
`;

const FlexDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.38rem;
  margin: 1.25rem 0 1.25rem 2rem;
`

const PointPage = () => {
  return (
    <OuterContainer>
      <InnerContainer>
        <Header>
          <BackButton />
          <Text>이름 님의 포인트 사용 내역 </Text>
        </Header>
        <ContentContainer>
          <Section>
            <Divider />
          </Section>
          <OptionContainer>
            <PointHistory>
              <FlexDiv>
              <HistoryTitle>기출 정리와 해설</HistoryTitle>
              <DateText>2024-08-10</DateText>
              </FlexDiv>
              <PointText>200P</PointText>
            </PointHistory>
            <PointHistory>
              <FlexDiv>
              <HistoryTitle>기출 정리와 해설</HistoryTitle>
              <DateText>2024-08-10</DateText>
              </FlexDiv>
              <PointText>200P</PointText>
            </PointHistory>
            <PointHistory>
              <FlexDiv>
              <HistoryTitle>기출 정리와 해설</HistoryTitle>
              <DateText>2024-08-10</DateText>
              </FlexDiv>
              <PointText>200P</PointText>
            </PointHistory>
            <PointHistory>
              <FlexDiv>
              <HistoryTitle>기출 정리와 해설</HistoryTitle>
              <DateText>2024-08-10</DateText>
              </FlexDiv>
              <PointText>200P</PointText>
            </PointHistory>
            <PointHistory>
              <FlexDiv>
              <HistoryTitle>기출 정리와 해설</HistoryTitle>
              <DateText>2024-08-10</DateText>
              </FlexDiv>
              <PointText>200P</PointText>
            </PointHistory>
          </OptionContainer>
        </ContentContainer>
      </InnerContainer>
    </OuterContainer>
  );
};

export default PointPage;
