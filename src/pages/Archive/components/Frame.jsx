import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components'
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';

import FolderModal from './FolderModal';
import MoreDiv from './MoreDiv';
import DeleteConfirmModal from './DeleteConfirmModal';
  import { getFolders } from '../../../api/archive/getFolders';
import { getNotes } from '../../../api/archive/getNotes';
import { getFolderSort } from '../../../api/archive/getFolderSort';
import { addFolder } from '../../../api/archive/addFolder';
import { deleteFolder } from '../../../api/archive/deleteFolder';
import { editFolder } from '../../../api/archive/editFolder';
import { deleteNote } from '../../../api/archive/deleteNote';
import { markFolder } from '../../../api/archive/markFolder';
import SortDropdown from './SortDropdown';
import FilteringDropdown from './FilteringDropdown';
import addFolder from '../../../assets/addFolder.svg'
import MarkStateIcon from '../../../assets/markStateIcon.svg';
import MarkStateActive from '../../../assets/MarkStateActive.svg';
import Folder from '../../../assets/folder.svg';
import Note from '../../../assets/note.svg';
import AddFolder from '../../../assets/addFolder.svg';
import FolderIcon from './FolderIcon';


const FrameContainer = styled.div`
  width: 89rem;
  height: 50.75rem;
  padding: 0 5.5rem;
  display: flex;
  flex-direction: column; 
  background: #FFF;
  box-shadow: 0px 4px 26.7px 0px rgba(0, 0, 0, 0.02), 0px 10px 60px 0px rgba(0, 74, 162, 0.03);
  border-radius: 0.75rem;

@media (min-width: 1440px) and (max-width: 1680px){
  width: 67.625rem;
}

@media (max-width: 1440px) {
  width: 60rem;
  height: 39.8125rem;
}

`

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  margin-top: auto; 
  align-items: center;
  gap: 0.5rem;

  .pagination {
    display: flex;
    list-style: none;
    padding: 0;
  }

  .page-item {
    margin: 0 5px;

    .page-link {
      display: flex;
      width: 1.5rem;
      height: 1.5rem;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;

      cursor: pointer;
      padding: 10px;
      text-decoration: none;

      color: var(--Grays-Gray3, #B1B1B1);
      font-family: Pretendard;
      font-size: 0.9375rem;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }

    &.active .page-link {
    background: #EAEAEA;
    color: var(--Grays-Black, #1A1A1A);
    }
  }

`;

const PreviousBtn = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  `;

const FolderData = styled.div`
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
  align-items:center;
`;

const Line= styled.div`
  width: 0.0625rem;
  height: 2.4375rem;
  background: #E9E9E9;
`;

const RightData = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 1.5rem;
`;

const FlexSpacer = styled.div`
  flex-grow: 1;
`;

const NoteData = styled.div`
display: flex;
flex-direction: row;
min-width: 37.75rem;
padding: 1.25rem 0.5rem;
align-items: center;
gap: 1.5rem;
width: 100%;
`;

const TitleAll = styled.div`
color: var(--Grays-Black, #1A1A1A);
font-family: Pretendard;
font-size: 1.25rem;
font-style: normal;
font-weight: 600;
line-height: normal;
margin-bottom: 1.5rem;
`;

const SelectFilterDiv = styled.div`
display: flex;
gap: 0.5rem;
margin-bottom: 1rem;
`;

const AddFolderDiv = styled.div`  
display: flex;
padding: 0.1875rem 0.5rem 0.1875rem 0.375rem;
align-items: center;
gap: 0.3125rem;
border-radius: 0.3125rem;
background: var(--Main-Button, #ECEFF4);
cursor: pointer;
position: relative;
color: var(--Grays-Black, #1A1A1A);
font-family: Pretendard;
font-size: 0.875rem;
font-style: normal;
font-weight: 500;
line-height: normal;
`;

const Icon = styled.img`
`;

const MarkIcon = styled.img`
cursor: pointer;
`;

const Contour = styled.div`
width: 100%;
height: 0.0625rem;
background: #E9E9E9;
margin-bottom: 1rem;
`;


const Frame = ({ selectedTab }) => {
const [folders, setFolders] = useState([]);
const [notes, setNotes] = useState([]);

const [currentPage, setCurrentPage] = useState(0);
const itemsPerPage = 6;
const [isModalOpen, setModalOpen] = useState(false);
const [isEditMode, setIsEditMode] = useState(false);
const [initialData, setInitialData] = useState(null);
const [activeMoreDiv, setActiveMoreDiv] = useState(null);
const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
const [deleteItem, setDeleteItem] = useState(null);
const [editItem, setEditItem] = useState(null);

const moreDivRefs = useRef([]);


const [sortOption, setSortOption] = useState('');

useEffect(() => {
  const handleClickOutside = (event) => {
    if (moreDivRefs.current.every(ref => ref && !ref.contains(event.target))) {
      setActiveMoreDiv(null);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);


useEffect(() => {
  const fetchFolders = async () => {
    try {
      let data;

      if (sortOption) {
        data = await getFolderSort(sortOption);
        console.log(sortOption)
        setFolders(data.foldersList); 
      } else {
        data = await getFolders();
        setFolders(data.foldersList);
      }
    } catch (error) {
      console.error('Failed to fetch folders:', error);
    }
  };

  fetchFolders();
}, [sortOption]); 

useEffect(() => {
  const fetchNotes = async () => {
    try {
      const data = await getNotes();
      setNotes(data.noteList);
    } catch (error) {
      console.error('Failed to fetch notes:', error);
    }
  };

  fetchNotes();
}, []);

const currentData = selectedTab === '폴더'
  ? (folders?.length > 0 ? folders.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage) : [])
  : (notes?.length > 0 ? notes.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage) : []);


const handlePageChange = ({ selected }) => {
  setCurrentPage(selected);
};

const openAddModal = () => {
  setIsEditMode(false);
  setInitialData({ folderName: '', selectedColor: '#6698F5' });
  setModalOpen(true);
};

const openEditModal = (data) => {
  setIsEditMode(true);
  setEditItem(data);
  console.log('폴더 수정:', data.folderId);
  setInitialData(data); // 폴더 수정 시 폴더 정보를 Modal에 전달
  setModalOpen(true);
  setActiveMoreDiv(null);  // MoreDiv를 비활성화
};

const closeModal = () => {
  setModalOpen(false);
};

const handleFormSubmit = async(formData) => {
  if (isEditMode) {
    console.log('폴더 수정:', formData);
    console.log('폴더 수정:', editItem.folderId);
    try {
      const updatedFolder = await editFolder(editItem.folderId, formData);
      console.log(updatedFolder);
      
    }
    catch (error) {
      console.error('Failed to update folder:', error);
    }
  } else {
    console.log('폴더 추가:', formData);
    try{
      const newFolder = await addFolder(formData);
      console.log(newFolder);
    }
    catch (error) {
      console.error('Failed to add folder:', error);
    }
  }

  try{
    const data = await getFolders();
    setFolders(data.foldersList);
  }
  catch (error) {
    console.error('Failed to fetch folders:', error);
  }
  
};

const openDeleteModal = (item) => {
  console.log('삭제:', item);
  setDeleteItem(item);
  setDeleteModalOpen(true);
  setActiveMoreDiv(null);  // MoreDiv를 비활성화
};

const closeDeleteModal = () => {
  setDeleteModalOpen(false);
  setDeleteItem(null);
};

const handleDeleteConfirm = async() => {
  console.log('삭제:', deleteItem);
  if (deleteItem.type === 'note') {
    try {
      const delNote = await deleteNote(deleteItem.noteId);
      console.log(delNote);
    } catch (error) {
      console.error('Failed to delete note:', error);
    }

    try{
      const data = await getNotes();
      setNotes(data.noteList);
    }
    catch (error) {
      console.error('Failed to fetch notes:', error);
    }
  }
  else if (deleteItem.type === 'folder') {
  try {
  const delFolder = await deleteFolder(deleteItem.folderId);
  console.log(delFolder);
  } catch (error) {
    console.error('Failed to delete folder:', error);
  }

  try{
    const data = await getFolders();
    setFolders(data.foldersList);
  }
  catch (error) {
    console.error('Failed to fetch folders:', error);
  }
}
  closeDeleteModal();
};

const handleMarkStatus = async(item) => {
  try {
    const markFolderData = await markFolder(item.folderId, { markState: item.markState === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' });
    console.log(markFolderData);
  }
  catch (error) {
    console.error('Failed to mark folder:', error);
  }

  try{
    const data = await getFolders();
    setFolders(data.foldersList);
  }
  catch (error) {
    console.error('Failed to fetch folders:', error);
  }
};

const handleSortOptionClick = (option) => {
  console.log(`Selected sort option in ParentComponent: ${option}`);
  setSortOption(option);
};

return (
    <FrameContainer>
      <TitleAll style={{ paddingTop: '3rem' }}>{selectedTab === '폴더' ? '모든 폴더' : '모든 노트'}</TitleAll>
        <SelectFilterDiv>
        <SortDropdown onSortOptionClick={handleSortOptionClick} />
        {selectedTab === '폴더' && (
          <>
            <FilteringDropdown />

            <AddFolderDiv onClick={openAddModal}>
              <Icon src={addFolder}/>
              폴더 추가
            </AddFolderDiv>
          </>
        )}
      </SelectFilterDiv>
      <Contour />

      <div>
        {currentData.map((item, index) => (
          selectedTab === '폴더' ? (
            <FolderData key={index}>
              <LeftData>
              <MarkIcon
                src={item.markState === 'ACTIVE' ? MarkStateActive : MarkStateIcon}
                alt='즐겨찾기'
                onClick={() => handleMarkStatus(item)}
              />
                <FolderIcon fill={item.color} />
                <Line />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div>{item.name}</div>
                  <div>폴더 이름</div>
                </div>
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
                  ref={el => moreDivRefs.current[index] = el}
                  type="folder"
                  onEditClick={() => openEditModal(item)}
                  onDeleteClick={() => openDeleteModal({ ...item, type: 'folder' })}
                  isActive={activeMoreDiv === index}
                  onMoreClick={() => setActiveMoreDiv(activeMoreDiv === index ? null : index)}
                />
              </RightData>
            </FolderData>
          ) : (
            <NoteData key={index}>
              <LeftData>
              <MarkIcon
                src={item.markState === 'ACTIVE' ? MarkStateActive : MarkStateIcon}
                alt='즐겨찾기'
                onClick={() => handleMarkStatus(item)}
              />
                <Icon src={Note} alt='노트 아이콘'/>
                <Line />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div>{item.name}</div>
                  <div>노트</div>
                </div>
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
                  ref={el => moreDivRefs.current[index] = el}
                  type="note"
                  onDeleteClick={() => openDeleteModal({ ...item, type: 'note' })}
                  isActive={activeMoreDiv === index}
                  onMoreClick={() => setActiveMoreDiv(activeMoreDiv === index ? null : index)}
                />
              </RightData>
            </NoteData>
          )
        ))}
      </div>
      <PaginationContainer>
        <ReactPaginate
          previousLabel={
            <PreviousBtn>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M14 8L10 12.5L14 17" stroke="#B1B1B1" strokeWidth="1.5" strokeLinecap="square" />
              </svg>
            </PreviousBtn>
          }
          nextLabel={
            <PreviousBtn>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M10 8L14 12.5L10 17" stroke="#B1B1B1" strokeWidth="1.5" strokeLinecap="square" />
              </svg>
            </PreviousBtn>
          }
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={Math.ceil(folders.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
          renderOnZeroPageCount={null}
          pageLinkClassName={'page-link'}
          previousLinkClassName={'page-link'}
          nextLinkClassName={'page-link'}
          breakLinkClassName={'page-link'}
          activeLinkClassName={'active-link'}
          previousClassName={'page-item'}
          nextClassName={'page-item'}
          pageClassName={'page-item'}
        />
      </PaginationContainer>
      <FolderModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleFormSubmit}
        initialData={initialData}
        isEditMode={isEditMode}
      />
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteConfirm}
        type={deleteItem ? deleteItem.type : ''}
        itemName={deleteItem ? deleteItem.name : ''}
      />
    </FrameContainer>
);
};


export default Frame;