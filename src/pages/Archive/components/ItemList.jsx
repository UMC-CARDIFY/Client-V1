import styled from 'styled-components';
import MarkStateIcon from '../../../assets/markStateIcon.svg';
import MarkStateActive from '../../../assets/MarkStateActive.svg';
import Note from '../../../assets/note.svg';
import FolderIcon from './FolderIcon';
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
  moveItem
}) => {
  console.log('Selected Tab:', selectedTab);
  console.log('Items:', items); // 데이터가 잘 전달되는지 확인

  return (
    <>
      {items.length > 0 ? (
        items.map((item, index) => (
          selectedTab === '폴더' ? (
            <Data key={item.id}> {/* Use unique ID if available */}
              <LeftData>
                <img
                  src={item.markState === 'ACTIVE' ? MarkStateActive : MarkStateIcon}
                  alt='즐겨찾기'
                  onClick={() => handleMarkStatus(item)}
                />
                <FolderIcon fill={colorMap[item.color]} />
                <Line />
                <div onClick={() => moveItem(item)}>{item.name}</div>
              </LeftData>
              <FlexSpacer />
              <RightData>
                <Line />
                <div>
                  <div>{item.getNoteCount}</div>
                  <div>포함된 노트 개수</div>
                </div>
                <Line />
                <div>
                  <div>{item.editDate.split('T')[0]}</div>
                  <div>최근 수정일</div>
                </div>
                <MoreDiv
                  type="folder"
                  onEditClick={() => handleEdit(item)}
                  onDeleteClick={() => handleDelete(item.id)} // Ensure you are passing item.id
                  isActive={activeMoreDiv === index}
                  onMoreClick={() => handleMoreClick(index)}
                  itemId={item.folderId} // Ensure itemId is passed correctly
                />
              </RightData>
            </Data>
          ) : (
            <Data key={item.id}> {/* Use unique ID if available */}
              <LeftData>
                <img
                  src={item.markState === 'ACTIVE' ? MarkStateActive : MarkStateIcon}
                  alt='즐겨찾기'
                  onClick={() => handleMarkNoteStatus(item)}
                />
                <img src={Note} alt='노트 아이콘' />
                <Line />
                <div onClick={() => moveItem(item)}>{item.name}</div>
              </LeftData>
              <FlexSpacer />
              <RightData>
                <Line />
                <div>
                  <div>{item.folderName}</div>
                  <div>폴더</div>
                </div>
                <Line />
                <div>
                  <div>{item.editDate.split('T')[0]}</div>
                  <div>최근 수정일</div>
                </div>
                <MoreDiv
                  type="note"
                  onDeleteClick={() => handleDelete(item)}
                  isActive={activeMoreDiv === index}
                  onMoreClick={() => handleMoreClick(index)}
                  itemId={item.NoteId} // Ensure itemId is passed correctly
                />
              </RightData>
            </Data>
          )
        ))
      ) : (
        <div>No items found</div>
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
};

export default ItemList;
