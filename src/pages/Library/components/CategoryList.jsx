import React from 'react';
import styled from 'styled-components';

const CategoryItemContainer = styled.div`
  flex: 1;
  padding: 2rem;
  background: #f8f8f8;
  text-align: center;
  border-radius: 8px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const CategoryItem = ({ title, noteCount }) => {
  return (
    <CategoryItemContainer>
      <p>{title}</p>
      <p>노트 {noteCount}개</p>
    </CategoryItemContainer>
  );
};

const CategoryList = () => {
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
    },
    // 더 많은 더미 데이터를 여기에 추가할 수 있습니다.
  ];

  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      {dummyData.map((category, index) => (
        <CategoryItem
          key={index}
          title={category.title}
          noteCount={category.noteCount}
        />
      ))}
    </div>
  );
};

export default CategoryList;
