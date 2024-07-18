import PropTypes from 'prop-types';
import styled from 'styled-components';

const NoteContainer = styled.div`
  display: flex;
  min-width: 30rem;
  padding: 1rem 0.5rem;
  align-items: center;
  gap: 1.5rem;
`;

const Thumbnail = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background-color: #e0e0e0;  
`;

const Divider = styled.div`
  width: var(--line-height-xl, 0.0625rem);
  height: 2.5rem;
  background: #e9e9e9;
`;

const NoteInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 15.90625rem;
`;

const DateInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 6.375rem;;
`;

const NoteInfo = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const SubText = styled.div`
  color: #696969;
  font-family: Pretendard;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const LastModified = styled.div`
  display: flex;
  flex-direction: column;
  color: #000;
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const PlaceholderBox = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: #e0e0e0;
`;

const RecentNoteItem = ({ folderName, noteName, lastModified }) => {
  return (
    <NoteContainer>
      <Thumbnail />
      <Divider />
      <NoteInfoContainer>
        <NoteInfo>{folderName}</NoteInfo>
        <SubText>폴더</SubText>
      </NoteInfoContainer>
      <Divider />
      <NoteInfoContainer>
        <NoteInfo>{noteName}</NoteInfo>
        <SubText>노트</SubText>
      </NoteInfoContainer>
      <Divider />
      <DateInfoContainer>
        <LastModified>{lastModified}</LastModified>
        <SubText>최근 수정일</SubText>
      </DateInfoContainer>
      <Divider />
      <PlaceholderBox />
    </NoteContainer>
  );
};

RecentNoteItem.propTypes = {
  folderName: PropTypes.string.isRequired,
  noteName: PropTypes.string.isRequired,
  lastModified: PropTypes.string.isRequired,
};

export default RecentNoteItem;
