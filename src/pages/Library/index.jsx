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
import { getCategory } from '../../api/library/getCategory';
import backButton from '../../assets/backButton.svg';

const BackButton = styled.div`
width: 2.25rem;
height: 2.25rem;
flex-shrink: 0;
  cursor: pointer;
  margin-bottom: 1rem;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const Vcontainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%; 
  padding: 4rem 6.5rem;
  background: var(--Main-BackGround, #F2F4F8);
  overflow: auto;


  @media (min-width: 1440px) and (max-wi
  
  
  dth: 1680px) {
    padding: 3rem 5rem;
  }

  @media (max-width: 1440px) {
    padding: 2.5rem 3.5rem;
  }


`;

// const ContentArea = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100%; 
//   background: var(--Main-BackGround, #F2F4F8);
// `;

const SearchSection = styled.div`
  display: flex;
  align-items: center;
  color: #1A1A1A;
  font-family: Inter;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  position: relative;
  width: 100%;
  border-radius: 0.5rem;
  background: var(--Grays-White, #FFF);
  box-shadow: 0px 4px 26px 0px rgba(0, 0, 0, 0.02), 0px 10px 60px 0px rgba(0, 74, 162, 0.03);
`;

const SearchInput = styled.input`
  width: 35.875rem;
  height: 4.3125rem;
  flex-shrink: 0;
  flex: 1;
  padding-left: 2rem;
  border-radius: 0.5rem 0rem 0rem 0.5rem;
  border: none;
  &:focus {
    outline: none;
  }
  color: var(--Grays-Gray1, #646464);
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  &::placeholder {
    color: var(--Grays-Gray3, #B1B1B1);
    font-family: Pretendard;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;

const SearchIcon = styled.div`
  width: 2.75rem;
  height: 2.75rem;
  flex-shrink: 0;
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
  color: ${props => props.isSelected ? 'var(--Semantic-Acitve, #699BF7)' : 'var(--Grays-Gray2, #767676)'};
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  box-sizing: border-box;
  gap: 0.5rem;
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
  width: var(--line-height-3xs, 1.125rem);
  height: var(--line-height-3xs, 1.125rem);
      border-radius: 0.25rem;
      background-color: #E3EAF6;
      background-image: url(${checkIconsvg});
      background-size: contain;
      background-repeat: no-repeat;
    }
  `}
`;

const SearchButton = styled.div`
  display: flex;
  width: 6.75rem;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: none;
  cursor: pointer;
`;

const Line = styled.div`
  width: 0.125rem;
  height: 2.5rem;
  background: #E8E8E8;
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
  height: 32.4375rem;
`;

const SelectedCategoriesWrapper = styled.div`
  display: flex;
  gap: 0.56rem;
  flex-wrap: wrap;
  margin-top: 0.81rem;
  margin-bottom: 1.56rem;
  height: 1.5rem;
`;

const SelectedCategoryTag = styled.div`
display: flex;
padding: 0.5rem 0.7rem 0.5rem var(--font-size-md, 1rem);
justify-content: center;
gap: 0.5rem;
border-radius: 0.25rem;
background: var(--Grays-White, #FFF);
box-shadow: 0px 4px 26px 0px rgba(0, 0, 0, 0.02), 0px 10px 60px 0px rgba(0, 74, 162, 0.03);
  flex-shrink: 0;

  color: var(--Grays-Black, #1A1A1A);
font-family: Pretendard;
font-size: 0.9375rem;
font-style: normal;
font-weight: 500;
line-height: normal;
`;

const RemoveButton = styled.div`
width: var(--font-size-md, 1rem);
height: var(--font-size-md, 1rem);
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
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setIsViewAllCategory(true);
    console.log(`Selected Category: ${category}`);
  };

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategory();
      const categoryNames = data.map(item => item.categoryName);
      setCategories(['전체 카테고리', ...categoryNames]);
    };
    fetchCategories();
  }, []);

  const handleViewAllCategory = () => {
    setIsViewAllCategory(true);
    setSelectedCategory(null);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCategorySelect = (category) => {
    if (category === '전체 카테고리') {
      setSelectedCategories(['전체 카테고리']);
      setIsDropdownOpen(false);
    } else {
      const isAlreadySelected = selectedCategories.includes(category);
      if (isAlreadySelected) {
        setSelectedCategories(selectedCategories.filter(item => item !== category));
      } else {
        setSelectedCategories([...selectedCategories.filter(cat => cat !== '전체 카테고리'), category]);
      }
    }
  };

  useEffect(() => {
    const allSelectableCategories = categories.filter(cat => cat !== '전체 카테고리');
    if (selectedCategories.length === allSelectableCategories.length) {
      setSelectedCategories(['전체 카테고리']);
    }
  }, [selectedCategories]);

  const removeCategory = (category) => {
    setSelectedCategories(selectedCategories.filter(item => item !== category));
  };

  const handleSearch = () => {
    if (selectedCategories === '전체 카테고리') {
      setSelectedCategories([]);
    } else {
      setAppliedCategories([...selectedCategories]);
    }
    setAppliedSearchQuery(searchQuery);
    setIsDropdownOpen(false);
    setShowResults(true);

    console.log(`Search Query: ${searchQuery}, Selected Categories: ${selectedCategories}`);
  };

  const isAllCategoriesSelected = appliedCategories.includes('전체 카테고리') || appliedCategories.length === 0;

  return (
    <Container>
      <MenuBar />
      <Vcontainer>
        <TopBar title="자료실" subtitle="지식 공유 커뮤니티" />
        <ContentArea>
        {showResults && (
                <>
                <BackButton onClick={() => setShowResults(false)}>
              <img src={backButton} alt="뒤로 가기" />
            </BackButton>
                </>
              )}
          {!isViewAllCategory ? (
            <>
              <SearchSection>
                <SearchInput
                  placeholder="다른 유저가 공유한 노트와 플래시카드 검색"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Line />
                <DropdownWrapper>
                  <DropdownHeader 
                    onClick={toggleDropdown} 
                    isSelected={selectedCategories.length > 0 }
                  >
                    {selectedCategories.length === 0 
                      ? '카테고리 선택' 
                      : selectedCategories.includes('전체 카테고리') 
                      ? '전체 카테고리' 
                      : '카테고리 선택됨'}
                    <DropdownArrow src={dropdownArrow} alt="dropdown arrow" />
                  </DropdownHeader>
                  {isDropdownOpen && (
                    <DropdownList>
                      {categories.length > 0 ? (
                        categories.map((category, index) => (
                          <DropdownItem key={index} onClick={() => handleCategorySelect(category)}>
                            <CustomCheckbox
                              checked={selectedCategories.includes(category)}
                              onClick={() => handleCategorySelect(category)}
                            />
                            {category}
                          </DropdownItem>
                        ))
                      ) : (
                        <p>Loading categories...</p>
                      )}
                    </DropdownList>
                  )}
                </DropdownWrapper>
                <Line />
                <SearchButton onClick={handleSearch}>
                  <SearchIcon>
                    <img src={searchIcon} alt="search" />
                  </SearchIcon>
                </SearchButton>
              </SearchSection>

              <SelectedCategoriesWrapper>
                {selectedCategories.map((category, index) =>
                  category !== '전체 카테고리' ? (
                    <SelectedCategoryTag key={index}>
                      {category}
                      <RemoveButton onClick={() => removeCategory(category)}>
                        <img src={removeButtonsvg} alt="remove" />
                      </RemoveButton>
                      
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
                  <RecommendationSection
                    onViewAllClick={handleViewAllCategory}
                    onCategoryClick={handleCategoryClick}
                  />

                  <NoteListSection>
                    <NoteList 
                    searchQuery={''}
                    categories={[]}
                    />
                  </NoteListSection>
                </>
              )}
            </>
          ) : (
            <>
              <AllCategory
                selectedCategory={selectedCategory}
                onBackClick={() => setIsViewAllCategory(false)}
                onCategoryClick={handleCategoryClick}
              />
            </>
          )}
        </ContentArea>
      </Vcontainer>
    </Container>
  );
};

export default Library;
