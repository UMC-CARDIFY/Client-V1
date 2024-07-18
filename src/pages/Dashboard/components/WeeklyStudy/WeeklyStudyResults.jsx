import styled from 'styled-components';
import DayBar from './DayBar';

const Container = styled.div`
  display: flex;
  width: 55em;
  height: auto;
  padding: var(--font-size-md, 1rem) 2rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 3.5625rem;
  background: #FFF;
  margin-left: 8rem;  
`;

const Title = styled.div`
  color: var(--Black, #1F1F1F);
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: 4rem;  
  margin-left: 8rem; 
  margin-bottom: 0.44rem;
`;

const Description = styled.div`
  color: #565656;
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 8rem; 
  margin-bottom: 1rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const GraphTitle = styled.div`
  color: #565656;
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const Legend = styled.div`
  display: flex;
  gap: 2rem;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LegendBox = styled.div`
  width: var(--font-size-md, 1rem);
  height: var(--font-size-md, 1rem);
  flex-shrink: 0;
  background: ${props => props.color};
`;

const LegendLabel = styled.div`
  color: #565656;
  font-family: Pretendard;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const BarGraphContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const WeeklyStudyResults = () => {
  const data = [
    { day: '일', currentWeekHeight: '134.328' },
    { day: '월', currentWeekHeight: '120' },
    { day: '화', currentWeekHeight: '140' },
    { day: '수', currentWeekHeight: '160' },
    { day: '목', currentWeekHeight: '100' },
    { day: '금', currentWeekHeight: '110' },
    { day: '토', currentWeekHeight: '130' },
  ];

  return (
    <>
      <Title>주간 학습 결과</Title>
      <Description>몇 개의 플래시 카드를 학습하셨나요?</Description>
      <Container>
        <Header>
          <GraphTitle>이번 주에 XX개의 카드를 학습했습니다.</GraphTitle>
          <Legend>
            <LegendItem>
              <LegendBox color="#D0D0D0" />
              <LegendLabel>저번주</LegendLabel>
            </LegendItem>
            <LegendItem>
              <LegendBox color="#8E8E8E" />
              <LegendLabel>이번주</LegendLabel>
            </LegendItem>
          </Legend>
        </Header>
        <BarGraphContainer>
          {data.map((item, index) => (
            <DayBar
              key={index}
              day={item.day}
              currentWeekHeight={item.currentWeekHeight}
            />
          ))}
        </BarGraphContainer>
      </Container>
    </>
  );
};

export default WeeklyStudyResults;
