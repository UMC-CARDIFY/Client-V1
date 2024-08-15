import styled from 'styled-components';
import { useState } from 'react';
import note from '../../../assets/note.svg';
import userIcon from '../../../assets/userIcon.svg';
import sortIcon from '../../../assets/sortIcon.svg';  // 정렬 아이콘 가져오기

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
  max-width: 17.94313rem;
  height: 10.4375rem;
  flex-shrink: 0;
  flex: 1;
  padding: 2rem;
  border-radius: 0.625rem;
  background: var(--White, #FFF);
  cursor: pointer;
`;

const NoteContainer = styled.div`
  background: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: auto;
  height: 32.4375rem; /* 29.4375rem */
`;

const NoteItemContainer = styled.div`
  display: grid;
  grid-template-columns: 2rem 0.5rem 5fr 3fr 2fr 3fr 2fr;
  align-items: center;
  padding: 1.25rem 0 1rem 1.75rem;
  cursor: pointer;

  & > div {
    display: flex;
    align-items: center;
  }

  & > div:nth-child(1) {
    width: 2rem;
    height: 2rem;
  }

  & > div:nth-child(2) {
    margin-left: 0.94rem;
  }

  & > div:nth-child(3) {
    margin-left: 1.12rem;
  }

  & > div:nth-child(3),
  & > div:nth-child(4),
  & > div:nth-child(5),
  & > div:nth-child(7) {
    flex-direction: column;
    align-items: flex-start;
  }

  & > div:nth-child(3) p:first-child,
  & > div:nth-child(4) p:first-child,
  & > div:nth-child(5) p:first-child,
  & > div:nth-child(7) p:first-child {
    color: #1A1A1A;
    font-family: Inter;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-bottom: 0.5rem;
  }

  & > div:nth-child(3) p:last-child,
  & > div:nth-child(4) p:last-child,
  & > div:nth-child(5) p:last-child,
  & > div:nth-child(7) p:last-child {
    color: #696969;
    font-family: Inter;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin: 0;
  }

  & > div:nth-child(6) {
    align-items: center;
    gap: 0.5rem;
  }

  & > div:nth-child(6) img {
  }

  & > div:nth-child(6) p {
    color: #696969;
    font-family: Pretendard;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

const Line = styled.div`
  width: 0.0625rem;
  height: 2.4375rem;
  background: #E9E9E9;
`;

const AllCategoryTitleDiv = styled.div`
  position: relative;
  gap: 0.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3.81rem;
`;

const AllCategoryText = styled.div`
  color: #1A1A1A;
  text-align: center;
  font-family: Inter;
  font-size: 2.1875rem;
  font-weight: 700;
`;

const SortMenu = styled.div`
  position: relative;
`;

const SortHeader = styled.div`
  position: absolute;
  align-items: center;
  gap: 0.5rem;
  top: -3rem;
  right: 0;
  color: #1A1A1A;
  cursor: pointer;
  display: inline-flex;
  padding: 0.1875rem 0.5rem 0.1875rem 0.4375rem;
  align-items: center;
  gap: 0.375rem;
  border-radius: 0.125rem;
  background: #FFF;
`;

const SortIcon = styled.img`
  cursor: pointer;
  margin-left: auto;
`;

const SortDropdown = styled.ul`
  position: absolute;
  top: 100%;
  right: 0;
  background: #FFF;
  border: 1px solid #E9E9E9;
  box-shadow: 0px 4px 26.7px rgba(0, 0, 0, 0.02), 0px 10px 60px rgba(0, 74, 162, 0.03);
  border-radius: 0.625rem;
  padding: 0.5rem 0;
  list-style: none;
  width: 12rem;
`;

const SortDropdownItem = styled.li`
  padding: 0.5rem 1rem;
  cursor: pointer;
  &:hover {
    background-color: #F2F4F8;
  }
`;

const BackButton = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  color: #1A1A1A;
  cursor: pointer;
`;

const categories = ['언어', '취업 · 수험', '컴퓨터 · IT', '과학', '경제 · 경영'];

const notesData = {
  '언어': [
    { title: 'JLPT N1 단어', date: '2023-08-15', category: '언어', cardCount: '45', author: '호두' },
    { title: 'TOPIK 고급 단어', date: '2023-08-12', category: '언어', cardCount: '39', author: '체리' },
  ],
  '취업 · 수험': [
    { title: 'NCS 모의고사', date: '2023-07-21', category: '취업 · 수험', cardCount: '50', author: '사과' },
    { title: '공무원 한국사', date: '2023-07-18', category: '취업 · 수험', cardCount: '100', author: '바나나' },
  ],
  '컴퓨터 · IT': [
    { title: '컴활 필기 1급', date: '2023-07-14', category: '컴퓨터 · IT', cardCount: '30', author: '체리' },
    { title: '정보처리기사', date: '2023-07-10', category: '컴퓨터 · IT', cardCount: '25', author: '복숭아' },
  ],
  '과학': [
    { title: '물리학 기초', date: '2023-07-07', category: '과학', cardCount: '20', author: '호두' },
    { title: '화학 기초', date: '2023-07-05', category: '과학', cardCount: '15', author: '사과' },
  ],
  '경제 · 경영': [],
};

const CategoryItem = ({ title, onClick }) => {
  return (
    <CategoryItemContainer onClick={() => onClick(title)}>
      <p>{title}</p>
    </CategoryItemContainer>
  );
};

const NoteItem = ({ title, date, category, cardCount, author }) => {
  return (
    <NoteItemContainer>
      <div>
        <img src={note} alt="note" />
      </div>
      <Line />
      <div>
        <p>{title}</p>
        <p>노트</p>
      </div>
      <div>
        <p>{category}</p>
        <p>카테고리</p>
      </div>
      <div>
        <p>{cardCount ? `${cardCount}개` : '-'}</p>
        <p>카드 개수</p>
      </div>
      <div>
        <img src={userIcon} alt="userIcon" />
        <p>{author}</p>
      </div>
      <div>
        <p>{date}</p>
        <p>업로드일</p>
      </div>
    </NoteItemContainer>
  );
};

const AllCategory = ({ selectedCategory, onBackClick }) => {
  const [currentCategory, setCurrentCategory] = useState(selectedCategory || null);
  const [showSortMenu, setShowSortMenu] = useState(false);

  const handleCategoryClick = (category) => {
    setCurrentCategory(category);
  };

  const toggleSortMenu = () => {
    setShowSortMenu(!showSortMenu);
  };

  const handleSortSelection = (sortType) => {
    console.log(`Selected sort type: ${sortType}`);
    setShowSortMenu(false);
  };

  return (
    <CategoryItemsContainer>
      <AllCategoryTitleDiv>
        {currentCategory ? (
          <>
            <BackButton onClick={() => setCurrentCategory(null)}>
              ← 뒤로 가기
            </BackButton>
            <AllCategoryText>
              {currentCategory}
            </AllCategoryText>
          </>
        ) : (
          <>
            <BackButton onClick={onBackClick}>← 뒤로 가기</BackButton>
            <AllCategoryText>전체 카테고리</AllCategoryText>
          </>
        )}
      </AllCategoryTitleDiv>

      {!currentCategory ? (
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
        <>
          <SortMenu>
            <SortHeader onClick={toggleSortMenu}>
              <SortIcon src={sortIcon} alt="정렬" />정렬
            </SortHeader>
            {showSortMenu && (
              <SortDropdown>
                <SortDropdownItem onClick={() => handleSortSelection('노트 이름 ↑')}>노트 이름 ↑</SortDropdownItem>
                <SortDropdownItem onClick={() => handleSortSelection('노트 이름 ↓')}>노트 이름 ↓</SortDropdownItem>
                <SortDropdownItem onClick={() => handleSortSelection('업로드일 - 최신 순')}>업로드일 - 최신 순</SortDropdownItem>
                <SortDropdownItem onClick={() => handleSortSelection('업로드일 - 오래된 순')}>업로드일 - 오래된 순</SortDropdownItem>
                <SortDropdownItem onClick={() => handleSortSelection('다운로드 수 ↑')}>다운로드 수 ↑</SortDropdownItem>
              </SortDropdown>
            )}
          </SortMenu>

          <NoteContainer>
            {notesData[currentCategory].map((note, index) => (
              <NoteItem
                key={index}
                title={note.title}
                date={note.date}
                category={note.category}
                cardCount={note.cardCount}
                author={note.author}
              />
            ))}
          </NoteContainer>
        </>
      )}
    </CategoryItemsContainer>
  );
};

export default AllCategory;
