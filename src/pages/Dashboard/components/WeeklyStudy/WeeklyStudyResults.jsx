import styled from 'styled-components';
import DayBar from './DayBar';

const WeeklyDiv = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 0.75rem;
  margin-top: 2rem;
  margin-left:4rem;
    padding: 1.5rem 1.5rem 1rem 1.5rem;
background: var(--Grays-White, #FFF);
box-shadow: 0px 4px 26.7px 0px rgba(0, 0, 0, 0.02), 0px 10px 60px 0px rgba(0, 74, 162, 0.03);

width: 58.6875rem;
@media (max-width: 1440px) {
width: 41.575rem;
@media (max-width: 1024px) {
width: 39.5rem; 
height: 18.375rem;
}
box-sizing: border-box;
  `;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.69rem;
  background: #FFF;
`;

const Title = styled.div`
color: var(--Grays-Black, #1A1A1A);
font-family: Pretendard;
font-size: 1.125rem;
font-style: normal;
font-weight: 500;
line-height: normal;
  margin-bottom: 0.44rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const GraphTitle = styled.div`
color: var(--Grays-Gray1, #646464);
font-family: Pretendard;
font-size: 0.75rem;
font-style: normal;
font-weight: 400;
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
  border-radius: 0.125rem;
  background: ${props => props.color};
`;

const LegendLabel = styled.div`
color: var(--Grays-Gray1, #646464);
font-family: Pretendard;
font-size: 0.75rem;
font-style: normal;
font-weight: 400;
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
    <WeeklyDiv>
      <Title>주간 학습 결과</Title>
      <Container>
        <Header>
          <GraphTitle>이번 주에 XX개의 카드를 학습했습니다.</GraphTitle>
          <Legend>
            <LegendItem>
              <LegendBox color="#E3EAF6" />
              <LegendLabel>저번주</LegendLabel>
            </LegendItem>
            <LegendItem>
              <LegendBox color="#6A9CFC" />
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
    </WeeklyDiv>
  );
};

export default WeeklyStudyResults;
