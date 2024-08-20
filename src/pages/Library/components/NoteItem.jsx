import { useState } from 'react';
import styled from 'styled-components';
import note from '../../../assets/note.svg';
import userIcon from '../../../assets/userIcon.svg';
import { getNote } from '../../../api/library/getNote';
import  {checkDownload} from '../../../api/library/checkDownload';
import NoteModal from './NoteModal';

const NoteItemContainer = styled.div`
  display: grid;
  grid-template-columns: 3.5rem 0.0625rem 6fr 0.0625rem 3fr 0.0625rem 2fr 0.0625rem 2fr 0.0625rem 2fr;
  align-items: center;
  padding: 1.25rem 0 1rem 1.75rem;
  cursor: pointer;

  & > div {
    display: flex;
    align-items: center;
}

  & > div:nth-child(3),
  & > div:nth-child(5),
  & > div:nth-child(7),
  & > div:nth-child(11) {
    flex-direction: column;
    align-items: flex-start;
    margin : 0 1.5rem;
  }
`;

const Title = styled.div`
overflow: hidden;
color: var(--Grays-Black, #1A1A1A);
text-overflow: ellipsis;
font-family: Pretendard;
font-size: 0.875rem;
font-style: normal;
font-weight: 600;
line-height: normal;
margin-bottom: 0.06rem;
`;

const Sub = styled.div`
color: var(--Grays-Gray1, #646464);
font-family: Pretendard;
font-size: 0.75rem;
font-style: normal;
font-weight: 500;
line-height: normal;
`;

const NoteIcon = styled.div`
    width: 2.5rem;
    height: 2.5rem;
    flex-shrink: 0;
`;

const Line = styled.div`
    width: 0.0625rem;
    height: 2.4375rem;
    background: #E8E8E8;
`;

const Name = styled.div`
    flex-direction: column;
    align-items: flex-start;
    margin : 0 1.5rem;
`;

const Category = styled.div`
`;

const Cnt = styled.div`
`;

const User = styled.div`
display: flex;
flex-direction: row;
gap: 0.5rem;
    margin : 0 1.5rem;
    `;

const DateDiv = styled.div`
`;

const NoteItem = ({ noteName, categoryName, cntCard, userName, uploadAt, noteId, libraryId }) => {
  const [showModal, setShowModal] = useState(false);
  const [noteContent, setNoteContent] = useState('');
  const [isContainCard, setIsContainCard] = useState('');

  const formattedDate = new Date(uploadAt).toISOString().split('T')[0];
  const formattedCategoryName = Array.isArray(categoryName) ? categoryName.join(', ') : categoryName;

  const handleClick = async () => {
    const data = await getNote(noteId);
    console.log(data);
    setNoteContent(data.noteContent);
    setShowModal(true);

    const download = await checkDownload(libraryId);
    console.log(download);
    setIsContainCard(download.isDownload);
  };

  return (
    <>
      <NoteItemContainer onClick={handleClick}>
        <NoteIcon>
          <img src={note} alt="note" />
        </NoteIcon>
        <Line />
        <Name>
            <Title>{noteName}</Title>
            <Sub>노트</Sub> 
        </Name>
        <Line />
        <Category>
            <Title>{formattedCategoryName}</Title>
            <Sub>카테고리</Sub>
        </Category>
        <Line />
        <Cnt>
            <Title>{cntCard ? `${cntCard}개` : '-'}</Title>
            <Sub>카드 개수</Sub>
        </Cnt>
        <Line />
        <User>
          <img src={userIcon} alt="userIcon" />
          <Sub>{userName}</Sub>
        </User>
        <Line />
        <DateDiv>
            <Title>{formattedDate}</Title>
            <Sub>업로드 날짜</Sub>
        </DateDiv>
      </NoteItemContainer>

      {/* 노트 미리보기 모달창 */}
      <NoteModal
        show={showModal}
        onClose={() => setShowModal(false)}
        title={noteName}
        content={noteContent}
        isContainCard={isContainCard}
        libraryId={libraryId}
        folderId={noteId}
      />
    </>
  );
};

export default NoteItem;
