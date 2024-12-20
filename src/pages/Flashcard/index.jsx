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
  const colorMap = {
    blue: '#6698F5',
    ocean: '#5AA6C7',
    lavender: '#949AEC',
    gray: '#A9A9A9',
    mint: '#77CEC6',
    sage: '#AECA99',
    orange: '#FDB456',
    plum: '#D49AE9',
    coral: '#FD855F',
    rose: '#ED83B1',
  };
`;

const ContentArea = styled.div`
  display: flex;
  height: auto;
  background: var(--Main-BackGround, #F2F4F8);
  padding-top: 5rem;
  padding-bottom: 2.13rem;
  overflow-y: scroll;
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

const NoData = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10rem;
  `;

export const Flashcard = () => {
  const [cards, setCards] = useState([]);
  const [sortOption, setSortOption] = useState('');
const [filterColors, setFilterColors] = useState([]);
const [status, setStatus] = useState([]);

  const fetchCards = async () => {
    const colorQuery = filterColors.length > 0 ? filterColors.join(',') : '';
    const order = sortOption || '';
    const data = await cardSortFilter(colorQuery, order, status);
    setCards(data);
    console.log(data);
  };

  useEffect(() => {
    fetchCards();
  }, [sortOption, filterColors]);

  console.log(cards);

  const handleReload = () => {
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
                  onReload={handleReload}
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
