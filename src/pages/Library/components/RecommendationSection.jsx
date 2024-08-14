import React from 'react';
import styled from 'styled-components';
import CategoryList from './CategoryList';

const RecommendationContainer = styled.div`
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

const RecommendationSection = () => {
  return (
    <RecommendationContainer>
      <RecommendationTitle>CARDIFY 추천</RecommendationTitle>
        <RecommendationSubTitle>지금 가장 인기 있는 카테고리 · 노트</RecommendationSubTitle>
      <CategoryList />
    </RecommendationContainer>
  );
};

export default RecommendationSection;
