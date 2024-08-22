import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import styled from 'styled-components';
import MarkStateIcon from '../../../assets/markStateIcon.svg';
import MarkStateActive from '../../../assets/MarkStateActive.svg';
import FolderIcon from './FolderIcon';
import NoteIcon from './NoteIcon';
import MoreDiv from './MoreDiv';
import PropTypes from 'prop-types';

const Data = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 37.75rem;
  padding: 1.25rem 0.5rem;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
`;

const LeftData = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  align-items: center;
`;

const Line = styled.div`
  width: 0.0625rem;
  height: 2.4375rem;
  background: #E9E9E9;
`;

const RightData = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 1.5rem;
`;

const FlexSpacer = styled.div`
  flex-grow: 1;
`;

const NonData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 1.5rem;
font-style: normal;
font-weight: 400;
line-height: normal;
`;

const TextContainer = styled.div`
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 17.5625rem;
`;

const Text = styled.div`
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 5.875rem;
`;


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
  rose: '#ED83B1'
};

const ItemList = ({
  items,
  selectedTab,
  handleMarkStatus,
  handleMarkNoteStatus,
  handleEdit,
  handleDelete,
  handleMoreClick,
  activeMoreDiv,
  moveItem,
  onFolderClick,
  currentFolderId
}) => {
  const navigate = useNavigate();

  return (
    <>
      {currentFolderId ? (
        // 폴더 내 노트 UI
        items.length > 0 ? (
          items.map((note, index) => (
            <Data key={`note-${note.noteId || index}`}>
              <LeftData>
                <img
                  src={note.markState === 'ACTIVE' ? MarkStateActive : MarkStateIcon}
                  alt='즐겨찾기'
                  onClick={() => handleMarkNoteStatus(note)}
                />
                <NoteIcon color={colorMap[note.folderColor]} />
                <Line />
                <TextContainer
                  onClick={() => navigate(`/note-editor?folderId=${currentFolderId}&noteId=${note.noteId}`)}
                >
                  {note.name}
                </TextContainer>
              </LeftData>
              <FlexSpacer />
              <RightData>
                <Line />
                <div>
                  <div>{note.createdAt}</div>
                  <div>노트 생성일</div>
                </div>
                <Line />
                <div>
                  <div>{note.editDate.split('T')[0]}</div>
                  <div>최근 수정일</div>
                </div>
                <MoreDiv
                  type="note"
                  itemName={note.name}
                  onEditClick={() => handleEdit(note)}
                  onDeleteClick={() => handleDelete(note.noteId)}
                  isActive={activeMoreDiv === index}
                  onMoreClick={() => handleMoreClick(index)}
                  itemId={note.noteId}
                />
              </RightData>
            </Data>
          ))
        ) : (
          <NonData>노트 데이터가 없습니다.</NonData>
        )
      ) : (
        // 폴더 목록 UI
        items.length > 0 ? (
          items.map((item, index) => (
            <Data key={`${selectedTab}-${item.id || index}`}>
              <LeftData>
                {selectedTab === '폴더' ? (
                  <img
                    src={item.markState === 'ACTIVE' ? MarkStateActive : MarkStateIcon}
                    alt='즐겨찾기'
                    onClick={() => handleMarkStatus(item)}
                  />
                ) : (
                  <img
                    src={item.markState === 'ACTIVE' ? MarkStateActive : MarkStateIcon}
                    alt='즐겨찾기'
                    onClick={() => handleMarkNoteStatus(item)}
                  />
                )}
                {selectedTab === '폴더' ? (
                  <>
                    <FolderIcon fill={colorMap[item.color]} />
                    <Line />
                    <TextContainer
                      style={{ cursor: 'pointer' }} 
                      onClick={() => {
                        moveItem(item);
                        if (selectedTab === '폴더' && onFolderClick) {
                          onFolderClick(item.folderId);
                        }
                      }}
                    >
                      {item.name}
                    </TextContainer>
                  </>
                ) : (
                  <>
                    <NoteIcon color={colorMap[item.folderColor]} />
                    <Line />
                    <div
                    style={{ cursor: 'pointer' }} 
                    onClick={() => navigate(`/note-editor?folderId=${item.folderId}&noteId=${item.noteId}`)} 
                  >
                  {item.name}</div>
                  </>
                )}
              </LeftData>
              <FlexSpacer />
              <RightData>
                <Line />
                <div>
                  <Text>{selectedTab === '폴더' ? item.getNoteCount : item.folderName}개</Text>
                  <div>{selectedTab === '폴더' ? '포함된 노트 개수' : '폴더'}</div>
                </div>
                <Line />
                <div>
                  <div>{item.editDate.split('T')[0]}</div>
                  <div>최근 수정일</div>
                </div>
                <MoreDiv
                  type={selectedTab==='폴더'? 'folder': 'note'}
                  itemName={item.name}
                  onEditClick={() => handleEdit(item)}
                  onDeleteClick={() => handleDelete(item.id)}
                  isActive={activeMoreDiv === index}
                  onMoreClick={() => handleMoreClick(index)}
                  itemId={selectedTab === '폴더' ? item.folderId : item.noteId}
                />
              </RightData>
            </Data>
          ))
        ) : (
          <NonData>데이터가 없습니다.</NonData>
        )
      )}
    </>
  );
};

ItemList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedTab: PropTypes.string.isRequired,
  handleMarkStatus: PropTypes.func.isRequired,
  handleMarkNoteStatus: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleMoreClick: PropTypes.func.isRequired,
  activeMoreDiv: PropTypes.number,
  moveItem: PropTypes.func.isRequired,
  onFolderClick: PropTypes.func,
  currentFolderId: PropTypes.string 
};

export default ItemList;
