import styled from 'styled-components';
import viewAllIcon from '../../../assets/viewAllIcon.svg';
import { getTopCategory } from '../../../api/library/getTopCategory';
import { useEffect, useState } from 'react';

const RecommendationContainer = styled.div`
  margin-bottom: 2.19rem;
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
  align-items: center;
`;

const ViewAllSVG = styled.div`
width: 2.25rem;
height: 2.25rem;
flex-shrink: 0;
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

const RecommendItem = ({ categoryName, cntNote, onClick }) => {
  return (
    <RecommendItemContainer onClick={() => onClick(categoryName)}>
      <p>{categoryName}</p>
      <p>노트 {cntNote}개</p>
    </RecommendItemContainer>
  );
};

const RecommendationSection = ({ onViewAllClick, onCategoryClick }) => {
  const [topCategory, setTopCategory] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getTopCategory();
      setTopCategory(data);
    };
    fetchData();
  }, []);
  
  console.log(topCategory);

  return (
    <RecommendationContainer>
      <RecommendationTitleDiv>
        <RecommendationTitle>CARDIFY 추천</RecommendationTitle>
        <RecommendationSubTitle>
          지금 가장 인기 있는 카테고리 · 노트
        </RecommendationSubTitle>
        <ViewAllButton onClick={onViewAllClick}>
          전체 보기
        <ViewAllSVG>
          <img src={viewAllIcon} alt="viewAllIcon" />
          </ViewAllSVG>
        </ViewAllButton>
      </RecommendationTitleDiv>

      <RecommendItems>
      { topCategory.length > 0 && topCategory.map((data, index) => (
        <RecommendItem
          key={index}
          categoryName={data.categoryName} 
          cntNote={data.cntNote} 
          onClick={onCategoryClick}
        />
      ))}
      </RecommendItems>
    </RecommendationContainer>
  );
};

export default RecommendationSection;
