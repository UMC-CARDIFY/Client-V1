import React from 'react';
import styled from 'styled-components';
import note from '../../../assets/note.svg';
import userIcon from '../../../assets/userIcon.svg';

const NoteItemContainer = styled.div`
  display: grid;
  grid-template-columns: 2rem 0.5rem 5fr 3fr 2fr 3fr 2fr;
  align-items: center;
  padding: 1.25rem 0 1rem 1.75rem;

  & > div {
    display: flex;
    align-items: center;
  }

  & > div:nth-child(1) {
    width: 2rem;
    height: 2rem;
    margin-right: 1rem;
  }

  & > div:nth-child(1) img {
    margin-right: 1rem;
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

const NoteItem = ({ title, category, cardCount, author, date }) => {
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

const NoteList = ({ categories = [], showAllNotes = false }) => {
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
    // Add more dummy data as needed
  ];

  const filteredNotes = showAllNotes
    ? dummyData
    : categories.length > 0
    ? dummyData.filter(note => categories.includes(note.category))
    : dummyData.slice(0, 3); // Show only 3 notes on the first screen

    console.log(showAllNotes);

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
