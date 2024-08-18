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
  moveItem,
  onFolderClick // 추가된 prop
}) => {
  return (
    <>
      {items.length > 0 ? (
        items.map((item, index) => (
          <Data key={`${selectedTab}-${item.id || index}`}>
            <LeftData>
              <img
                src={item.markState === 'ACTIVE' ? MarkStateActive : MarkStateIcon}
                alt='즐겨찾기'
                onClick={() => selectedTab === '폴더' ? handleMarkStatus(item) : handleMarkNoteStatus(item)}
              />
              {selectedTab === '폴더' ? (
                <>
                  <FolderIcon fill={colorMap[item.color]} />
                  <Line />
                  <div
                    onClick={() => {
                      moveItem(item);
                      if (selectedTab === '폴더' && onFolderClick) {
                        // folderId가 undefined일 때 로깅
                        console.log('아이템 컴포넌트 폴더 ID:', item.folderId);
                        if (item.folderId !== undefined) {
                          onFolderClick(item.folderId);
                        } else {
                          console.error('폴더 ID가 정의되어 있지 않습니다.');
                        }
                      }
                    }}
                  >
                    {item.name}
                  </div>

                </>
              ) : (
                <>
                  <img src={Note} alt='노트 아이콘' />
                  <Line />
                  <div onClick={() => moveItem(item)}>{item.name}</div>
                </>
              )}
            </LeftData>
            <FlexSpacer />
            <RightData>
              <Line />
              <div>
                <div>{selectedTab === '폴더' ? item.getNoteCount : item.folderName}</div>
                <div>{selectedTab === '폴더' ? '포함된 노트 개수' : '폴더'}</div>
              </div>
              <Line />
              <div>
                <div>{item.editDate.split('T')[0]}</div>
                <div>최근 수정일</div>
              </div>
              <MoreDiv
                type={selectedTab.toLowerCase()}
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
  onFolderClick: PropTypes.func // 추가된 prop 타입 정의
};

export default ItemList;
