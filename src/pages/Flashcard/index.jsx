import MenuBar from '../../components/MenuBar';
import TopBar from '../../components/TopBar';
import FlashcardItem from './components/FlashcardItem';
import styled from 'styled-components';
import {cardSortFilter} from '../../api/flashcard/cardSortFilter';
import {useEffect, useState} from 'react';
import SortDropdown from './components/SortDropdown';
import FilteringDropdown from './components/FilteringDropdown';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: var(--Main-BackGround, #F2F4F8);
`;

const ContentArea = styled.div`
  display: flex;
  height: auto;
  background: var(--Main-BackGround, #F2F4F8);
  padding-top: 5rem;
  padding-bottom: 2.13rem;
`;

const FlashcardContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    padding-left: 10rem;
  }

  @media (min-width: 1024px) {
    padding-left: 2rem;
  }
`;

const Flashcards = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  width: 100%;
  justify-content: flex-start; /* 왼쪽부터 차례로 배치 */

  @media (min-width: 768px) {
    width: 100%;
  }

  @media (min-width: 1024px) {
    width: 100%;
    gap: 1.5rem; /* 카드 간격 조정 */
  }
`;

const OptionDiv = styled.div`
  display: flex;
  justify-content: start;
  gap: 0.75rem;
  width: 100%;
  margin-bottom: 1.06rem;
`;

const OptionButton = styled.button`
  display: flex;
  width: 5.1rem;
  height: 1.875rem;
  padding: 0.1875rem 0.3125rem;
  justify-content: center;
  align-items: center;
  gap: 0.3125rem;
  border-radius: 0.3125rem;
  background: #FFF;
  border: none;
  cursor: pointer;
  color: var(--Grays-Black, #1A1A1A);
  font-family: Inter;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const SortButton = styled(OptionButton)`
  width: 4.5rem;
  height: 1.875rem;
  padding: 0.1875rem 0.375rem 0.1875rem 0.4375rem;
  gap: 0.375rem;
`;

const NoData = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10rem;
  `;

export const Flashcard = () => {
  const [cards, setCards] = useState([]);
  const [sortOption, setSortOption] = useState('최신순');
const [filterColors, setFilterColors] = useState([]);

  const fetchCards = async () => {
    const colorQuery = filterColors.length > 0 ? filterColors.join(',') : '';
    const order = sortOption || '';
    const data = await cardSortFilter(colorQuery, order);
    setCards(data);
    console.log(data);
  };

  useEffect(() => {
    fetchCards();
  }, [sortOption, filterColors]);

  console.log(cards);

  const handleCardDeleted = () => {
    fetchCards();
  };

  const handleSortOptionClick = (option) => {
    if (option) {
      setSortOption(option);
    } else {
      console.error('잘못된 정렬 옵션:', option);
    }
  };

  const handleFilterApply = (colors) => {
    setFilterColors(colors);
  };

  return (
    <Container>
      <MenuBar />
      <MainContent>
        <TopBar
          title="플래시 카드"
          subtitle="전략적인 지식 암기"
        />
        <ContentArea>
          <FlashcardContainer>
            <OptionDiv>
          <SortDropdown 
            onSortOptionClick={handleSortOptionClick} 
          />
          <FilteringDropdown 
            onFilterApply={handleFilterApply} 
          />
            </OptionDiv>

            <Flashcards>
              { cards.length > 0 ?  (
              cards.map((card, index) => (
                <FlashcardItem key={index}
                  color={card.color}
                  folderName={card.folderName}
                  nextStudyDate={card.nextStudyDate}
                  noteName={card.noteName}
                  studyStatus={card.studyStatus}
                  recentStudyDate={card.recentStudyDate}
                  studyCardSetId={card.studyCardSetId}
                  markStatus={card.markStatus}
                  onDelete={handleCardDeleted}
                 />
              )
              )) : (
                <NoData>학습할 카드가 없습니다.</NoData>
              )}
              
            </Flashcards>
          </FlashcardContainer>
        </ContentArea>
      </MainContent>
    </Container>
  );
};

export default Flashcard;
