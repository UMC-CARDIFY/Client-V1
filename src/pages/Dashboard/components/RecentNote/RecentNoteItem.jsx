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
`;

const Divider = styled.div`
  width: var(--line-height-xl, 0.0625rem);
  height: 2.5rem;
  background: #e9e9e9;
`;

const NoteInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 15rem;

  @media (min-width: 1440px) and (max-width: 1680px) {
    width: 7.21875rem;
  }
  @media (max-width: 1440px) and (min-width: 1200px){
    width: 6.3125rem;
  }
  box-sizing: border-box;
`;

const DateInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 6.375rem;;
`;

const NoteInfo = styled.div`
overflow: hidden;
color: var(--Grays-Black, #1A1A1A);
text-overflow: ellipsis;
font-family: Pretendard;
font-size: 0.875rem;
font-style: normal;
font-weight: 500;
line-height: normal;
`;

const SubText = styled.div`
  color: var(--Grays-Gray1, #646464);
  font-family: Pretendard;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const LastModified = styled.div`
  display: flex;
  flex-direction: column;
  color: #000;
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const PlaceholderBox = styled.div`
  width: 2rem;
  height: 2rem;
`;

const RecentNoteItem = ({ folderName, noteName, lastModified }) => {
  return (
    <NoteContainer>
      <Thumbnail><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
  <path d="M10.4286 36C9.60959 36 8.92633 35.7262 8.37877 35.1787C7.83122 34.6311 7.55685 33.9479 7.55566 33.1289V6.87111C7.55566 6.05333 7.83003 5.37067 8.37877 4.82311C8.92752 4.27556 9.61078 4.00119 10.4286 4H24.0303C24.2956 4 24.5499 4.10536 24.7374 4.29289L32.1517 11.7071C32.3392 11.8946 32.4446 12.149 32.4446 12.4142V33.1289C32.4446 33.9467 32.1708 34.6299 31.6232 35.1787C31.0757 35.7274 30.3918 36.0012 29.5717 36H10.4286ZM23.5557 12.8889H30.4254C30.5144 12.8889 30.5591 12.7812 30.4961 12.7182L23.7264 5.94849C23.6634 5.88549 23.5557 5.93011 23.5557 6.0192V12.8889Z" fill="#AECA99"/>
</svg>
      </Thumbnail>
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
      <PlaceholderBox>
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
  <rect width="32" height="32" rx="12" fill="#F0F0F0"/>
  <path d="M15 12L19 16.5L15 21" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="square"/>
</svg>
      </PlaceholderBox>
    </NoteContainer>
  );
};

RecentNoteItem.propTypes = {
  folderName: PropTypes.string.isRequired,
  noteName: PropTypes.string.isRequired,
  lastModified: PropTypes.string.isRequired,
};

export default RecentNoteItem;
