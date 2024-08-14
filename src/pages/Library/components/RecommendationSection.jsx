import styled from 'styled-components';
import viewAllIcon from '../../../assets/viewAllIcon.svg';

const RecommendationContainer = styled.div`
`;

const RecommendationTitleDiv = styled.div`
margin-bottom: 1.5rem;
position: relative;
`;

const RecommendationTitle = styled.div`
color: #343C6A;
font-family: Inter;
font-size: 1.125rem;
font-style: normal;
font-weight: 700;
line-height: normal;
margin-bottom: 0.44rem;
`;

const RecommendationSubTitle = styled.div`
    margin-bottom: 1rem;
    color: #000;
font-family: Inter;
font-size: 0.9375rem;
font-style: normal;
font-weight: 300;
line-height: normal;
`;

const ViewAllButton = styled.div`
position: absolute;
right: 0;
bottom: 0;
color: #000;
font-family: Inter;
font-size: 0.9375rem;
font-style: normal;
font-weight: 300;
line-height: normal;
display: flex;
cursor: pointer;
gap: 0.63rem;
`;

const RecommendItems = styled.div`
display: flex;
gap: 2.13rem;
`;

const RecommendItemContainer = styled.div`
min-width: 17.94313rem;
height: 10.4375rem;
flex-shrink: 0;
  flex: 1;
  padding: 2rem;
  border-radius: 0.625rem;
background: var(--White, #FFF);
cursor: pointer;
`;

const dummyData = [
    {
      title: '언어',
      noteCount: '120',
    },
    {
      title: '취업 · 수험',
      noteCount: '103',
    },
    {
      title: '컴퓨터 · IT',
      noteCount: '85',
    }
  ];

  const RecommendItem = ({ title, noteCount }) => {
    return (
      <RecommendItemContainer>
        <p>{title}</p>
        <p>노트 {noteCount}개</p>
      </RecommendItemContainer>
    );
  };

  const RecommendationSection = ({ onViewAllClick }) => {
    return (
      <RecommendationContainer>
        <RecommendationTitleDiv>
          <RecommendationTitle>CARDIFY 추천</RecommendationTitle>
          <RecommendationSubTitle>
            지금 가장 인기 있는 카테고리 · 노트
          </RecommendationSubTitle>
          <ViewAllButton onClick={onViewAllClick}>
            전체 보기
            <img src={viewAllIcon} alt="viewAllIcon" />
          </ViewAllButton>
        </RecommendationTitleDiv>
  
        <RecommendItems>
          {dummyData.map((category, index) => (
            <RecommendItem key={index} title={category.title} noteCount={category.noteCount} />
          ))}
        </RecommendItems>
      </RecommendationContainer>
    );
  };
  
  export default RecommendationSection;