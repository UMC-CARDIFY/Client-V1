import styled from 'styled-components';
import note from '../../../assets/note.svg';
import userIcon from '../../../assets/userIcon.svg';

const NoteItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  
`;

const NoteItem = ({ title, category, cardCount, author, date }) => {
  return (
    <NoteItemContainer>
      <div>
        <img src={note} alt="note" />
      </div>
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

const NoteList = ({ categories = [] }) => {
  const dummyData = [
    {
      title: 'JLPT N1 단어',
      category: '언어',
      cardCount: '45',
      author: '호두',
      date: 'YYYY-MM-DD',
    },
    {
      title: '형렬대수 중간고사 문제',
      category: '수학',
      cardCount: '',
      author: '도라',
      date: 'YYYY-MM-DD',
    },
    {
      title: '컴활 필기 1급!!',
      category: '컴퓨터 · IT',
      cardCount: '39',
      author: '체리',
      date: 'YYYY-MM-DD',
    },
    {
      title: 'JLPT N1 단어',
      category: '언어',
      cardCount: '45',
      author: '호두',
      date: 'YYYY-MM-DD',
    },
    {
      title: '형렬대수 중간고사 문제',
      category: '수학',
      cardCount: '',
      author: '도라',
      date: 'YYYY-MM-DD',
    },
    {
      title: '컴활 필기 1급!!',
      category: '컴퓨터 · IT',
      cardCount: '39',
      author: '체리',
      date: 'YYYY-MM-DD',
    },
    {
      title: 'JLPT N1 단어',
      category: '언어',
      cardCount: '45',
      author: '호두',
      date: 'YYYY-MM-DD',
    },
    {
      title: '형렬대수 중간고사 문제',
      category: '수학',
      cardCount: '',
      author: '도라',
      date: 'YYYY-MM-DD',
    },
    {
      title: '컴활 필기 1급!!',
      category: '컴퓨터 · IT',
      cardCount: '39',
      author: '체리',
      date: 'YYYY-MM-DD',
    },
    {
      title: 'JLPT N1 단어',
      category: '언어',
      cardCount: '45',
      author: '호두',
      date: 'YYYY-MM-DD',
    },
    {
      title: '형렬대수 중간고사 문제',
      category: '수학',
      cardCount: '',
      author: '도라',
      date: 'YYYY-MM-DD',
    },
    {
      title: '컴활 필기 1급!!',
      category: '컴퓨터 · IT',
      cardCount: '39',
      author: '체리',
      date: 'YYYY-MM-DD',
    },
    // 더 많은 더미 데이터를 여기에 추가할 수 있습니다.
  ];

  // 선택된 카테고리로 필터링 (카테고리가 없으면 모든 노트 표시)
  const filteredNotes = categories.length > 0
    ? dummyData.filter(note => categories.includes(note.category))
    : dummyData;

  return (
    <>
      {filteredNotes.length > 0 ? (
        filteredNotes.map((note, index) => (
          <NoteItem
            key={index}
            title={note.title}
            category={note.category}
            cardCount={note.cardCount}
            author={note.author}
            date={note.date}
          />
        ))
      ) : (
        <p>선택된 카테고리에 해당하는 노트가 없습니다.</p>
      )}
    </>
  );
};

export default NoteList;
