import styled from 'styled-components';
import BackButton from './components/BackButton';

const OuterContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 10rem 0;
  
  @media screen and (max-width: 1440px) {
    padding: 9.37rem 0;
  }

  @media screen and (max-width: 1024px) {
    padding: 7.37rem 0;
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
  margin-left: -4.5rem;
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
  gap: 1rem;
  width: 100%; 
`;

const PointOption = styled.button`
  display: flex;
  width: 100%;
  padding: 2rem; 
  justify-content: space-between;
  align-items: center;
  border-radius: 0.5rem;
  border: 1px solid var(--B1B1B1, #B1B1B1);
  background: #FFF;
  cursor: pointer;

  @media screen and (max-width: 1440px) {
    padding: 1.75rem 2rem; 
  }

  @media screen and (max-width: 1024px) {
    padding: 1.25rem 2rem; 
  }
`;

const Username = styled.span`
  color: #000;
  font-family: Pretendard;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;

  @media screen and (max-width: 1024px) {
    font-size: 1rem;
  }
`;

const UserPoint = styled.span`
  color: var(--main-blue, #0F62FE);
  font-family: Pretendard;
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  align-self: flex-start;

  @media screen and (max-width: 1024px) {
    font-size: 2rem;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #B1B1B1;
  margin: 1rem 0;
`;

const Text = styled.span`
  color: #000;
  font-family: Pretendard;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;

  @media screen and (max-width: 1024px) {
    font-size: 1rem;
  }
`;

const Text2 = styled.span`
  color: #000;
  font-family: Pretendard;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  @media screen and (max-width: 1024px) {
    font-size: 1rem;
  }
`;

const ChargeText = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  align-self: flex-start;
  margin: 1rem 0 2rem 0;

  @media screen and (max-width: 1024px) {
    margin: 1rem 0;
  }

`;

const PointPage = () => {

  return (
    <OuterContainer>
      <InnerContainer>
        <Header>
          <BackButton />
          <Username>이름</Username>
          <Text>님의 포인트</Text>
        </Header>
        <ContentContainer>
          <Section>
            <UserPoint>30P</UserPoint>
            <Divider />
            <ChargeText>포인트 충전</ChargeText>
          </Section>
          <OptionContainer>
            <PointOption>
              <Text>1000P</Text>
              <Text2>1,000원</Text2>
            </PointOption>
            <PointOption>
              <Text>2000P</Text>
              <Text2>2,000원</Text2>
            </PointOption>
            <PointOption>
              <Text>3000P</Text>
              <Text2>3,000원</Text2>
            </PointOption>
            <PointOption>
              <Text>5000P</Text>
              <Text2>5,000원</Text2>
            </PointOption>
            <PointOption>
              <Text>10000P</Text>
              <Text2>10,000원</Text2>
            </PointOption>
          </OptionContainer>
        </ContentContainer>
      </InnerContainer>
    </OuterContainer>
  );
};

export default PointPage;
