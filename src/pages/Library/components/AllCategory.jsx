import React, { useState } from 'react';
import styled from 'styled-components';

const CategoryItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

const CategoryItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2.13rem;
`;

const CategoryItemContainer = styled.div`
  min-width: 17.94313rem;
  height: 10.4375rem;
  flex-shrink: 0;
  flex: 1;
  padding: 2rem;
  border-radius: 0.625rem;
  background: var(--White, #FFF);
  cursor: pointer;
`;

const NoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

const NoteItemContainer = styled.div`
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  background: #fff;
`;

const AllCategoryTitleDiv = styled.div`
  position: relative;
  gap: 0.75rem;
  display: flex;
  justify-content: center;
  margin-bottom: 3.81rem;
`;

const AllCategoryText = styled.div`
  color: #1A1A1A;
  text-align: center;
  font-family: Inter;
  font-size: 2.1875rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const BackButton = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  color: #1A1A1A;
  cursor: pointer;
`;

const categories = ['언어', '취업 · 수험', '컴퓨터 · IT', '언어', '취업 · 수험', '컴퓨터 · IT', '언어', '취업 · 수험', '컴퓨터 · IT']; // 카테고리 리스트

const CategoryItem = ({ title, onClick }) => {
  return (
    <CategoryItemContainer onClick={() => onClick(title)}>
      <p>{title}</p>
    </CategoryItemContainer>
  );
};

const NoteItem = ({ title, date }) => {
  return (
    <NoteItemContainer>
      <p>{title}</p>
      <p>{date}</p>
    </NoteItemContainer>
  );
};

const AllCategory = ({ onBackClick }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <CategoryItemsContainer>
      <AllCategoryTitleDiv>
        {selectedCategory ? (
          <BackButton onClick={() => setSelectedCategory(null)}>
            ← 뒤로 가기
          </BackButton>
        ) : (
          <BackButton onClick={onBackClick}>← 뒤로 가기</BackButton>
        )}
        <AllCategoryText>
          {selectedCategory ? selectedCategory : '전체 카테고리'}
        </AllCategoryText>
      </AllCategoryTitleDiv>

      {!selectedCategory ? (
        <CategoryItems>
          {categories.map((category, index) => (
            <CategoryItem
              key={index}
              title={category}
              onClick={handleCategoryClick}
            />
          ))}
        </CategoryItems>
      ) : (
        <NoteContainer>
          <NoteItem title="JLPT N1 단어" date="2023-08-15" />
          <NoteItem title="TOPIK 고급 단어" date="2023-08-12" />
          {/* 다른 노트 아이템 추가 가능 */}
        </NoteContainer>
      )}
    </CategoryItemsContainer>
  );
};

export default AllCategory;
