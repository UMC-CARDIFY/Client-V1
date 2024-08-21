import styled from 'styled-components';
import { useState, useEffect } from 'react';
import sortIcon from '../../../assets/sortIcon.svg';
import backButton from '../../../assets/backButton.svg';
import science from '../../../assets/category/science.svg';
import { getCategory } from '../../../api/library/getCategory';
import { getNoteToCategory } from '../../../api/library/getNoteToCategory'; // 특정 카테고리의 노트 데이터를 가져오는 API

import NoteItem from './NoteItem';

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
width: 16rem; /* 19rem */
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

const NoteContainer = styled.div`
  background: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: auto;
  height: 32.4375rem;
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

const CategoryItem = ({ title, cntNote, onClick }) => {
  return (
    <CategoryItemContainer onClick={() => onClick(title)}>
            <CategoryIcon>
        <img src={science} alt="science" />
      </CategoryIcon>
      <CategoryName>{title}</CategoryName>
      <CategoryCnt>{cntNote}개의 노트</CategoryCnt>
    </CategoryItemContainer>
  );
};

const AllCategory = ({ selectedCategory, onBackClick }) => {
  const [categories, setCategories] = useState([]);
  const [notes, setNotes] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(selectedCategory || null);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [sortOption, setSortOption] = useState('asc');
  const [cntNote, setCntNote] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategory();
      const categoryNames = data.map(item => item.categoryName);
      const categoryCntNote = data.map(item => item.cntNote);
      setCntNote(categoryCntNote);
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
              cntNote={cntNote[index]}
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
                categoryName={note.categoryName}
                cntCard={note.cntCard}
                userName={note.userName}
                uploadAt={note.uploadAt}
                noteId={note.noteId} // Note ID 전달
                isDownload={note.isDownload}
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
