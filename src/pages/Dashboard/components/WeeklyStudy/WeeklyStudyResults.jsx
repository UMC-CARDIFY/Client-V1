import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { getWeeklyStudyResults } from '../../../../api/dashboard/weeklyStudyResults';

const WeeklyDiv = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 0.75rem;
  padding: 2rem;
  background: var(--Grays-White, #FFF);
  box-shadow: 0px 4px 26.7px 0px rgba(0, 0, 0, 0.02), 0px 10px 60px 0px rgba(0, 74, 162, 0.03);
  width: 58.6875rem;
  height: 22.75rem;
  box-sizing: border-box;

  @media (max-width: 1680px) and (min-width: 1440px) {
    width: 41.5rem;
    height: 20.25rem;
  }

  @media (max-width: 1440px) and (min-width: 1200px) {
    width: 38.8125rem;
    height: 19.5rem;
    padding: 1.5rem;
  }
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
  justify-content: flex-start;
  width: 100%;
`;

const GraphTitle = styled.div`
  color: var(--Grays-Gray1, #646464);
  font-family: Pretendard;
  font-size: 0.9rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const LegendContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-left: 31rem;
`;

const ChartWrapper = styled.div`
  margin-top: 1rem;
  width: 100%;
  height: 80%;
`;

const CustomLegend = () => {
  return (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{ width: '1.0625rem', height: '1.0625rem', backgroundColor: '#E3EAF6', borderRadius: '0.25rem' }} />
        <span style={{ 
          color: '#646464', 
          fontSize: '0.75rem', 
          fontWeight: 500, 
          fontFamily: 'Pretendard', 
          lineHeight: 'normal', 
          fontStyle: 'normal' 
        }}>
          저번주
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{ width: '1.0625rem', height: '1.0625rem', backgroundColor: '#6A9CFC', borderRadius: '0.25rem' }} />
        <span style={{ 
          color: '#646464', 
          fontSize: '0.75rem', 
          fontWeight: 500, 
          fontFamily: 'Pretendard', 
          lineHeight: 'normal', 
          fontStyle: 'normal' 
        }}>
          이번주
        </span>
      </div>
    </div>
  );
};

const WeeklyStudyResults = () => {
  const [thisWeekCardCount, setThisWeekCardCount] = useState(0);
  const [graphData, setGraphData] = useState([]);
  const [animationKey, setAnimationKey] = useState(0); // 애니메이션 트리거를 위한 키

  useEffect(() => {
    const fetchWeeklyResults = async () => {
      try {
        const data = await getWeeklyStudyResults();

        const formattedData = [
          { day: '일', lastWeek: data.dayOfLastWeekCard[7] || 0, thisWeek: data.dayOfThisWeekCard[7] || 0 },
          { day: '월', lastWeek: data.dayOfLastWeekCard[1] || 0, thisWeek: data.dayOfThisWeekCard[1] || 0 },
          { day: '화', lastWeek: data.dayOfLastWeekCard[2] || 0, thisWeek: data.dayOfThisWeekCard[2] || 0 },
          { day: '수', lastWeek: data.dayOfLastWeekCard[3] || 0, thisWeek: data.dayOfThisWeekCard[3] || 0 },
          { day: '목', lastWeek: data.dayOfLastWeekCard[4] || 0, thisWeek: data.dayOfThisWeekCard[4] || 0 },
          { day: '금', lastWeek: data.dayOfLastWeekCard[5] || 0, thisWeek: data.dayOfThisWeekCard[5] || 0 },
          { day: '토', lastWeek: data.dayOfLastWeekCard[6] || 0, thisWeek: data.dayOfThisWeekCard[6] || 0 },
        ];

        setThisWeekCardCount(data.thisWeekCardCount);
        setGraphData(formattedData);
        setAnimationKey((prevKey) => prevKey + 1); // 데이터를 가져온 후 애니메이션 트리거
      } catch (error) {
        console.error('Error fetching weekly study results:', error);
      }
    };

    fetchWeeklyResults();
  }, []);

  return (
    <WeeklyDiv>
      <Title>주간 학습 결과</Title>
      <Header>
        <GraphTitle>이번 주에 {thisWeekCardCount}개의 카드를 학습했습니다.</GraphTitle>
        <LegendContainer>
          <CustomLegend />
        </LegendContainer>
      </Header>
      <ChartWrapper>
        <ResponsiveContainer>
          <BarChart key={animationKey} data={graphData} barGap={16} barCategoryGap="15%">
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: '#646464',
                fontSize: '0.875rem',
                fontFamily: 'Pretendard',
                fontWeight: 500,
              }}
              tickMargin={16}
            />
            <Tooltip />
            <Bar
              dataKey="lastWeek"
              fill="#E3EAF6"
              barSize={30}
              radius={[8, 8, 2, 2]}
              minPointSize={5}
              isAnimationActive={true}
              animationDuration={1000}
              animationBegin={0} // 애니메이션 시작 시간
            />
            <Bar
              dataKey="thisWeek"
              fill="#6A9CFC"
              barSize={30}
              radius={[8, 8, 2, 2]}
              minPointSize={5}
              isAnimationActive={true}
              animationDuration={1000}
              animationBegin={0} // 애니메이션 시작 시간
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartWrapper>
    </WeeklyDiv>
  );
};

export default WeeklyStudyResults;
