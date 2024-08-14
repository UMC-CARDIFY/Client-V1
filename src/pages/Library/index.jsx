import styled from 'styled-components';
import MenuBar from '../../components/MenuBar';
import TopBar from '../../components/TopBar';
import NoteList from './components/NoteList';
import RecommendationSection from './components/RecommendationSection';
import AllCategory from './components/AllCategory';
import searchIcon from '../../assets/searchIcon.svg';
import { useState } from 'react';


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
  gap: 2rem;
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
`;

const SearchInput = styled.input`
width: 35.875rem;
height: 4.3125rem;
flex-shrink: 0;
  flex: 1;
  padding-left: 3.5rem;
  margin-right: 1rem;
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

const CategorySelect = styled.select`
  padding: 1.5rem 1.8rem 1.5rem 1.5rem;
  margin-right: 1rem;
  width: 15.3125rem;
height: 4.3125rem;
flex-shrink: 0;
border-radius: 0.75rem;
background: #FFF;
border: none;

color: #1A1A1A;
font-family: Inter;
font-size: 0.9375rem;
font-style: normal;
font-weight: 300;
line-height: normal;

&:focus {
  outline: none;
}
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
`;

export const Library = () => {
  const [isViewAllCategory, setIsViewAllCategory] = useState(false);

  const handleViewAllCategory = () => {
    setIsViewAllCategory(true)
  };

  return (
    <Container>
      <MenuBar />
      <Vcontainer>
        <TopBar title="자료실" subtitle="지식 공유 커뮤니티" />
        <ContentArea>
        {!isViewAllCategory ? (
            <>
          <SearchSection>
            <SearchInput placeholder="다른 유저가 공유한 노트와 플래시카드 검색" />
            <SearchIcon>
              <img src={searchIcon} alt="search" />
            </SearchIcon>
            <CategorySelect>
              <option>모든 카테고리</option>
              <option>언어</option>
              <option>취업 · 수험</option>
              <option>컴퓨터 · IT</option>
              {/* 다른 옵션 추가 */}
            </CategorySelect>
            <SearchButton>검색</SearchButton>
          </SearchSection>

          <RecommendationSection onViewAllClick={handleViewAllCategory} />

          <NoteListSection>
            <NoteList />
          </NoteListSection>
          </>

          ) : (
            // 여기에 전체보기 모드에서 보여줄 콘텐츠를 작성합니다.
            <>
            <AllCategory
              onBackClick={() => setIsViewAllCategory(false)} // 뒤로가기 버튼 클릭 시 전체 카테고리 보기 해제
            />
            </>
          )}

        </ContentArea>
      </Vcontainer>
    </Container>
  );
};

export default Library;
