import styled from 'styled-components';
import MenuBar from '../../components/MenuBar';
import TopBar from '../../components/TopBar';
import NoteList from './components/NoteList';
import RecommendationSection from './components/RecommendationSection';
import AllCategory from './components/AllCategory';
import searchIcon from '../../assets/searchIcon.svg';
import dropdownArrow from '../../assets/dropdownArrow.svg';
import removeButtonsvg from '../../assets/removeButtonsvg.svg';
import checkIconsvg from '../../assets/checkIconsvg.svg';
import { useState, useEffect } from 'react';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

const Vcontainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3.56rem 4.8rem 3.5rem 4.1rem;
  background: var(--Main-BackGround, #F2F4F8);
`;

const SearchSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #1A1A1A;
  font-family: Inter;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  position: relative;
  gap: 0.81rem;
`;

const SearchInput = styled.input`
  width: 35.875rem;
  height: 4.3125rem;
  flex-shrink: 0;
  flex: 1;
  padding-left: 3.5rem;
  border: none;
  &:focus {
    outline: none;
  }
  color: #1A1A1A;
  font-family: Inter;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  border-radius: 0.75rem;
  background: #FFF;

  &::placeholder {
    color: #1A1A1A;
    font-family: Inter;
    font-size: 0.9375rem;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1.44rem;
`;

const DropdownWrapper = styled.div`
  position: relative;
  width: 15.3125rem;
  height: 4.3125rem;
  flex-shrink: 0;
`;

const DropdownHeader = styled.div`
  width: 100%;
  height: 100%;
  padding: 0rem 1.5rem;
  border-radius: 0.625rem;
  background: #FFF;
  border: none;
  color: #1A1A1A;
  font-family: Inter;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  box-sizing: border-box;
`;

const DropdownArrow = styled.img`
  pointer-events: none;
`;

const DropdownList = styled.ul`
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  width: 15.3125rem;
  padding: 0.75rem 0rem 0.75rem 1.5rem;
  box-sizing: border-box;
  align-items: center;
  gap: 0.625rem;
  align-self: stretch;
  border-radius: 0.5rem 0.5rem 0rem 0rem;
  background: #FFF;
  overflow-y: auto;
  z-index: 10;
`;

const DropdownItem = styled.li`
  display: flex;
  align-items: center;
  padding: 0.5rem 0rem;
  font-family: Inter;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  color: #1A1A1A;
  cursor: pointer;
  gap: 0.625rem;
`;

const CustomCheckbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--line-height-3xs, 1.125rem);
  height: var(--line-height-3xs, 1.125rem);
  border-radius: 0.25rem;
  background: #F2F4F8;
  cursor: pointer;
  position: relative;

  ${(props) =>
    props.checked &&
    `
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 1rem;
      height: 1rem;
      background-image: url(${checkIconsvg});
      background-size: contain;
      background-repeat: no-repeat;
    }
  `}
`;

const SearchButton = styled.button`
  width: 5.5625rem;
  height: 4.3125rem;
  flex-shrink: 0;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.75rem;
  background: #1062FE;
  color: #fff;
  cursor: pointer;
`;

const NoteListSection = styled.div`
  background: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: auto;
`;

const SelectNoteListSection = styled.div`
  background: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: auto;
  height: 32.4375rem; /* 29.4375rem */
`;

const SelectedCategoriesWrapper = styled.div`
  display: flex;
  gap: 0.56rem;
  flex-wrap: wrap;
  margin-top: 0.81rem;
  margin-bottom: 1.56rem;
  height: 1.5rem; /* 고정된 높이 설정 */
`;

const SelectedCategoryTag = styled.div`
  display: inline-flex;
  padding: 0.1875rem 0.3125rem;
  justify-content: center;
  gap: 0.25rem;
  flex-shrink: 0;
  border-radius: 0.25rem;
  background: #FFF;
  color: var(--Grays-Black, #1A1A1A);
  text-align: center;
  font-family: Pretendard;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const RemoveButton = styled.div`
  cursor: pointer;
`;

export const Library = () => {
  const [isViewAllCategory, setIsViewAllCategory] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedCategories, setAppliedCategories] = useState([]);
  const [appliedSearchQuery, setAppliedSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const categories = ['모든 카테고리', '과학', '기술 · 공학', '경제 · 경영', '컴퓨터 · IT', '수학', '언어'];

  const handleViewAllCategory = () => {
    setIsViewAllCategory(true);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCategorySelect = (category) => {
    if (category === '모든 카테고리') {
      setSelectedCategories(['모든 카테고리']);
      setIsDropdownOpen(false);
    } else {
      const isAlreadySelected = selectedCategories.includes(category);
      if (isAlreadySelected) {
        setSelectedCategories(selectedCategories.filter(item => item !== category));
      } else {
        setSelectedCategories([...selectedCategories.filter(cat => cat !== '모든 카테고리'), category]);
      }
    }
  };

  useEffect(() => {
    const allSelectableCategories = categories.filter(cat => cat !== '모든 카테고리');
    if (selectedCategories.length === allSelectableCategories.length) {
      setSelectedCategories(['모든 카테고리']);
    }
  }, [selectedCategories]);

  const removeCategory = (category) => {
    setSelectedCategories(selectedCategories.filter(item => item !== category));
  };

  const handleSearch = () => {
    setAppliedCategories([...selectedCategories]);
    setAppliedSearchQuery(searchQuery);
    setIsDropdownOpen(false);
    setShowResults(true);
  };

  const isAllCategoriesSelected = appliedCategories.includes('모든 카테고리') || appliedCategories.length === 0;

  return (
    <Container>
      <MenuBar />
      <Vcontainer>
        <TopBar title="자료실" subtitle="지식 공유 커뮤니티" />
        <ContentArea>
          {!isViewAllCategory ? (
            <>
              <SearchSection>
                <SearchInput
                  placeholder="다른 유저가 공유한 노트와 플래시카드 검색"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <SearchIcon>
                  <img src={searchIcon} alt="search" />
                </SearchIcon>
                <DropdownWrapper>
                  <DropdownHeader onClick={toggleDropdown}>
                    {selectedCategories.length === 0 || selectedCategories.includes('모든 카테고리')
                      ? '모든 카테고리'
                      : `카테고리 ${selectedCategories.length}개 선택됨`}
                    <DropdownArrow src={dropdownArrow} alt="dropdown arrow" />
                  </DropdownHeader>
                  {isDropdownOpen && (
                    <DropdownList>
                      {categories.map((category, index) => (
                        <DropdownItem key={index} onClick={() => handleCategorySelect(category)}>
                          <CustomCheckbox
                            checked={selectedCategories.includes(category)}
                            onClick={() => handleCategorySelect(category)}
                          />
                          {category}
                        </DropdownItem>
                      ))}
                    </DropdownList>
                  )}
                </DropdownWrapper>
                <SearchButton onClick={handleSearch}>검색</SearchButton>
              </SearchSection>

              <SelectedCategoriesWrapper>
                {selectedCategories.map((category, index) =>
                  category !== '모든 카테고리' ? (
                    <SelectedCategoryTag key={index}>
                      <RemoveButton onClick={() => removeCategory(category)}>
                        <img src={removeButtonsvg} alt="remove" />
                      </RemoveButton>
                      {category}
                    </SelectedCategoryTag>
                  ) : null
                )}
              </SelectedCategoriesWrapper>

              {showResults ? (
                <SelectNoteListSection>
                  <NoteList 
                    searchQuery={appliedSearchQuery} 
                    categories={appliedCategories} 
                    showAllNotes={isAllCategoriesSelected}
                  />
                </SelectNoteListSection>
              ) : (
                <>
                  <RecommendationSection onViewAllClick={handleViewAllCategory} />

                  <NoteListSection>
                    <NoteList showAllNotes={false} />
                  </NoteListSection>
                </>
              )}
            </>
          ) : (
            <>
              <AllCategory onBackClick={() => setIsViewAllCategory(false)} />
            </>
          )}
        </ContentArea>
      </Vcontainer>
    </Container>
  );
};

export default Library;
