import { useState } from 'react';
import styled from 'styled-components';
import note from '../../../assets/note.svg';
import userIcon from '../../../assets/userIcon.svg';
import { getNote } from '../../../api/library/getNote';
import NoteModal from './NoteModal';  // Import the modal component

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

const NoteItem = ({ noteName, categoryName, cntCard, userName, uploadAt, noteId }) => {
  const [showModal, setShowModal] = useState(false);
  const [noteContent, setNoteContent] = useState('');

  const formattedDate = new Date(uploadAt).toISOString().split('T')[0];
  const formattedCategoryName = Array.isArray(categoryName) ? categoryName.join(', ') : categoryName;

  const handleClick = async () => {
    const data = await getNote(noteId);
    setNoteContent(data.noteContent);
    setShowModal(true);
  };

  return (
    <>
      <NoteItemContainer onClick={handleClick}>
        <div>
          <img src={note} alt="note" />
        </div>
        <Line />
        <div>
          <p>{noteName}</p>
          <p>노트</p>
        </div>
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

      {/* 노트 미리보기 모달창 */}
      <NoteModal
        show={showModal}
        onClose={() => setShowModal(false)}
        title={noteName}
        content={noteContent}
      />
    </>
  );
};

export default NoteItem;
