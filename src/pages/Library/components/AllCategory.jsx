import styled from 'styled-components';

const CategoryItemsContainer = styled.div`
  display: flex;
  justify-content: center; /* 가운데 정렬 */
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
];

const CategoryItem = ({ title, noteCount }) => {
  return (
    <CategoryItemContainer>
      <p>{title}</p>
      <p>노트 {noteCount}개</p>
    </CategoryItemContainer>
  );
};

const AllCategory = () => {
  return (
    <CategoryItemsContainer>
      <CategoryItems>
        {dummyData.map((category, index) => (
          <CategoryItem key={index} title={category.title} noteCount={category.noteCount} />
        ))}
      </CategoryItems>
    </CategoryItemsContainer>
  );
};

export default AllCategory;
