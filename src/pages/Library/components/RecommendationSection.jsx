import styled from 'styled-components';
import viewAllIcon from '../../../assets/viewAllIcon.svg';
import { getTopCategory } from '../../../api/library/getTopCategory';
import { useEffect, useState } from 'react';
import science from '../../../assets/category/science.svg';
import Art from '../../../assets/category/Art.svg';
import Computer from '../../../assets/category/Computer.svg';
import Economics from '../../../assets/category/Economics.svg';
import Employment from '../../../assets/category/Employment.svg';
import Engineering from '../../../assets/category/Engineering.svg';
import HistoryCulture from '../../../assets/category/HistoryCulture.svg';
import Humanities from '../../../assets/category/Humanities.svg';
import Knowledge from '../../../assets/category/Knowledge.svg';
import Language from '../../../assets/category/Language.svg';
import Math from '../../../assets/category/Math.svg';
import Miscellaneous from '../../../assets/category/Miscellaneous.svg';
import Politics from '../../../assets/category/Politics.svg';

const RecommendationContainer = styled.div`
  margin-bottom: 2.19rem;
`;

const RecommendationTitleDiv = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
`;

const RecommendationTitle = styled.div`
  color: #343C6A;
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 0.44rem;
`;

const RecommendationSubTitle = styled.div`
  margin-bottom: 1rem;
  color: #646464;
  font-family: Pretendard;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const ViewAllButton = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  color: #000;
  font-family: Pretendard;
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
  width: 100%;
  gap: 1.5rem;
`;

const RecommendItemContainer = styled.div`
width: 19rem;
height: 12.25rem;
flex-shrink: 0;
  border-radius: 0.75rem;
background: var(--Grays-White, #FFF);
padding: 2.3rem 4rem 1rem 4rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CategoryIcon = styled.div`
width: 5.0625rem;
height: 5.0625rem;
flex-shrink: 0;
margin-bottom: 1.5rem;
`;

const CategoryName = styled.div`
color: var(--Grays-Gray1, #646464);
text-align: center;
font-family: Pretendard;
font-size: 1.125rem;
font-style: normal;
font-weight: 600;
line-height: normal;
margin-bottom: 0.5rem;
`;

const CategoryCnt = styled.div`
color: var(--Grays-Gray1, #646464);
text-align: center;
font-family: Pretendard;
font-size: 0.75rem;
font-style: normal;
font-weight: 500;
line-height: normal;
`;

const categoryIcons = {
  "과학": science,
  "예술": Art,
  "컴퓨터 · IT": Computer,
  "경제 · 경영": Economics,
  "취업 · 수험": Employment,
  "기술 · 공학": Engineering,
  "역사 · 문화": HistoryCulture,
  "인문": Humanities,
  "일반 상식": Knowledge,
  "언어": Language,
  "수학": Math,
  "기타": Miscellaneous,
  "정치 · 사회": Politics,
};

const RecommendItem = ({ categoryName, cntNote, onClick }) => {
  return (
    <RecommendItemContainer onClick={() => onClick(categoryName)}>
      <CategoryIcon>
      <img src={categoryIcons[categoryName]} alt={categoryName} />
      </CategoryIcon>
      <CategoryName>{categoryName}</CategoryName>
      <CategoryCnt>{cntNote}개의 노트</CategoryCnt>
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
