import styled from 'styled-components';
import { useState, useEffect } from 'react';
import note from '../../../assets/note.svg';
import userIcon from '../../../assets/userIcon.svg';
import sortIcon from '../../../assets/sortIcon.svg';
import backButton from '../../../assets/backButton.svg';
import { getCategory } from '../../../api/library/getCategory';
import { getNoteToCategory } from '../../../api/library/getNoteToCategory'; // 특정 카테고리의 노트 데이터를 가져오는 API

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
  height: 32.4375rem;
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
  gap: 0.5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 3.81rem;
`;

const AllCategoryText = styled.div`
color: var(--Grays-Black, #1A1A1A);
font-family: Pretendard;
font-size: 1rem;
font-style: normal;
font-weight: 500;
line-height: normal;
cursor: pointer;
`;

const SortMenu = styled.div`
  position: relative;

  color: var(--Grays-Black, #1A1A1A);
font-family: Pretendard;
font-size: 0.875rem;
font-style: normal;
font-weight: 500;
line-height: normal;
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
  border-radius: 0.3125rem;
background: var(--grays-gray-5-divider, #E8E8E8);
`;

const SortIcon = styled.img`
`;

const SortDropdown = styled.ul`
  position: absolute;
  top: -1.5rem;
  right: 0;
  border-radius: 0.5rem;
  background: var(--Grays-White, #FFF);
  border: 1px solid var(--grays-gray-5-divider, #E8E8E8);
box-shadow: 0px 4px 26px 0px rgba(0, 0, 0, 0.02), 0px 10px 60px 0px rgba(0, 74, 162, 0.03);
  border-radius: 0.625rem;
  padding: 0;
  list-style: none;
`;

const SortDropdownItem = styled.li`
  padding: 0.5rem 1rem;
  cursor: pointer;
  &:hover {
    background-color: #F2F4F8;
  }
    display: flex;
padding: 1.0625rem 1rem;
align-items: center;
gap: 0.5rem;
align-self: stretch;

border-bottom: 1px solid var(--grays-gray-5-divider, #E8E8E8);
&:last-child {
  border-bottom: none;
}
`;

const BackButton = styled.div`
width: 2.25rem;
height: 2.25rem;
flex-shrink: 0;
  cursor: pointer;
`;

const CategoryItem = ({ title, onClick }) => {
  return (
    <CategoryItemContainer onClick={() => onClick(title)}>
      <p>{title}</p>
    </CategoryItemContainer>
  );
};

const NoteItem = ({ noteName, uploadAt, categoryName, cntCard, userName, isDownload }) => {
  const formattedDate = new Date(uploadAt).toISOString().split('T')[0];
  const formattedCategoryName = categoryName.join(', ');
  return (
    <NoteItemContainer>
      <div>
        <img src={note} alt="note" />
      </div>
      <Line />
      <div>
        <p>{noteName}</p>
        <p>노트</p>
      </div>
      {isDownload && <div>
        <p>저장 완료</p>
      </div>}
      <div>        
        <p>{formattedCategoryName}</p>
        <p>카테고리</p>
      </div>
      <div>
        <p>{cntCard ? `${cntCard}개` : '-'}</p>
        <p>카드 개수</p>
      </div>
      <div>
        <img src={userIcon} alt="userIcon" />
        <p>{userName}</p>
      </div>
      <div>
        <p>{formattedDate}</p>
        <p>업로드일</p>
      </div>
    </NoteItemContainer>
  );
};

const AllCategory = ({ selectedCategory, onBackClick }) => {
  const [categories, setCategories] = useState([]);
  const [notes, setNotes] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(selectedCategory || null);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [sortOption, setSortOption] = useState('asc');

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategory();
      const categoryNames = data.map(item => item.categoryName);
      setCategories(categoryNames);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (currentCategory) {
      const fetchNotes = async () => {
        const data = await getNoteToCategory(currentCategory, sortOption);
        setNotes(data);
        console.log(data);
      };
      fetchNotes();
    }
  }, [currentCategory, sortOption]);

  const handleCategoryClick = (category) => {
    setCurrentCategory(category);
  };

  const toggleSortMenu = () => {
    setShowSortMenu(!showSortMenu);
  };

  const handleSortSelection = (sortType) => {
    console.log(`Selected sort type: ${sortType}`);
    setShowSortMenu(false);
    if(sortType === '다운로드 수 ↑') {
      setSortOption('download');
    } else if(sortType === '노트 이름 ↑') {
      setSortOption('asc');
    } else if(sortType === '노트 이름 ↓') {
      setSortOption('desc');
    } else if(sortType === '업로드일 - 최신 순') {
      setSortOption('upload-newest');
    } else if(sortType === '업로드일 - 오래된 순') {
      setSortOption('upload-oldest');
    }
  };

  return (
    <CategoryItemsContainer>
      <AllCategoryTitleDiv>
        {currentCategory ? (
          <>
            <BackButton onClick={() => setCurrentCategory(null)}>
              <img src={backButton} alt="뒤로 가기" />
            </BackButton>
            <AllCategoryText onClick={() => setCurrentCategory(null)}>
              {currentCategory}
            </AllCategoryText>
          </>
        ) : (
          <>
                      <BackButton onClick={onBackClick}>
              <img src={backButton} alt="뒤로 가기" />
            </BackButton>
            <AllCategoryText onClick={onBackClick}>전체 카테고리 보기</AllCategoryText>
          </>
        )}
      </AllCategoryTitleDiv>

      {!currentCategory ? (
        /* 전체 카테고리 목록 */
        <CategoryItems>
          {categories.length > 0 && 
          categories.map((category, index) => (
            <CategoryItem
              key={index}
              title={category}
              onClick={handleCategoryClick}
            />
          ))}
        </CategoryItems>
      ) : (
        /* 특정 카테고리의 노트 목록 */
        <>
          <SortMenu>
            <SortHeader onClick={toggleSortMenu}>
              <SortIcon src={sortIcon} alt="정렬" />정렬
            </SortHeader>
            {showSortMenu && (
              <SortDropdown>
                <SortDropdownItem onClick={() => handleSortSelection('다운로드 수 ↑')}>인기순</SortDropdownItem>
                <SortDropdownItem onClick={() => handleSortSelection('노트 이름 ↑')}>노트 이름 ↑</SortDropdownItem>
                <SortDropdownItem onClick={() => handleSortSelection('노트 이름 ↓')}>노트 이름 ↓</SortDropdownItem>
                <SortDropdownItem onClick={() => handleSortSelection('업로드일 - 최신 순')}>업로드일 - 최신 순</SortDropdownItem>
                <SortDropdownItem onClick={() => handleSortSelection('업로드일 - 오래된 순')}>업로드일 - 오래된 순</SortDropdownItem>
              </SortDropdown>
            )}
          </SortMenu>

          <NoteContainer>
            {notes.length === 0 ? (
              <div>해당 카테고리에 노트가 없습니다.</div>
            ) : (
              notes.map((note, index) => (
                <NoteItem
                  key={index}
                  noteName={note.noteName}
                  uploadAt={note.uploadAt}
                  categoryName={note.categoryName}
                  cntCard={note.cntCard}
                  userName={note.userName}
                />
              ))
            )}
          </NoteContainer>
        </>
      )}
    </CategoryItemsContainer>
  );
};

export default AllCategory;
