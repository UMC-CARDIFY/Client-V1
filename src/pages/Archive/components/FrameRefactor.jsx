import { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  getFolderFilterSort,
  deleteFolder,
  deleteNote,
  markFolder,
  markNote,
  addFolder,
  editFolder,
  getNoteToFolder,
  getNoteFilterSort
} from '../../../api/archive';

import FolderModal from './FolderModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import SortDropdown from './SortDropdown';
import FilteringDropdown from './FilteringDropdown';
import Pagination from './Pagination';
import ItemList from './ItemList';
import AddButton from './AddButton';

const FrameContainer = styled.div`
  width: 89rem;
  height: 45.75rem;
  padding: 0 5.5rem;
  display: flex;
  flex-direction: column;
  background: #FFF;
  box-shadow: 0px 4px 26.7px 0px rgba(0, 0, 0, 0.02), 0px 10px 60px 0px rgba(0, 74, 162, 0.03);
  border-radius: 0.75rem;
  box-sizing: border-box;
  position: relative;

  @media (min-width: 1440px) and (max-width: 1680px) {
    max-width: 67.625rem;
  }

  @media (max-width: 1440px) {
    max-width: 60rem;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 3rem 0 0 0;

  h3 {
    color: var(--Grays-Black, #1A1A1A);
    font-family: Pretendard;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin: 0 0 1.5rem 0;
  }
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: #E8E8E8;
  margin: 1rem 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Content = styled.div`
  flex-grow: 1;
  overflow-y: hidden;
  overflow-x: hidden;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  position: absolute; 
  bottom: 0;
  width: calc(100% - 10rem);
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

const getColorNameByCode = (colorCode) => {
  const colorEntry = Object.entries(colorMap).find(([key, code]) => code === colorCode);
  return colorEntry ? colorEntry[0] : 'defaultColorName';
};

const Frame = ({ selectedTab, setSelectedTab }) => {
  const [folders, setFolders] = useState([]);
  const [notes, setNotes] = useState([]);
  const [currentPageFolder, setCurrentPageFolder] = useState(0);
  const [currentPageNote, setCurrentPageNote] = useState(0);
  const [pageCountFolder, setPageCountFolder] = useState(0);
  const [pageCountNote, setPageCountNote] = useState(0);
  const [sortOption, setSortOption] = useState('');
  const [folderNoteSort , setFolderNoteSort] =useState('');
  const [folderSort , setFolderSort] =useState('');
  const [noteSort , setNoteSort] =useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeMoreDiv, setActiveMoreDiv] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [folderNotes, setFolderNotes] = useState([]);
  const [currentFolderId, setCurrentFolderId] = useState(null);
  const [folderNotesPage, setFolderNotesPage] = useState(0);
  const [folderNotesPageCount, setFolderNotesPageCount] = useState(0);

  const [folderFilterColors, setFolderFilterColors] = useState([]);
  const [noteFilterColors, setNoteFilterColors] = useState([]);

  const getPageSize = () => window.innerWidth < 1440 ? 5 : 6;

  const fetchData = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const pageSize = getPageSize();
      let data;
      const colorQuery = selectedTab === '폴더' ? (folderFilterColors.length > 0 ? folderFilterColors.join(',') : '') : (noteFilterColors.length > 0 ? noteFilterColors.join(',') : '');
  
      if (selectedTab === '폴더') {
        // 폴더 관련 데이터 가져오기
        data = await getFolderFilterSort(colorQuery, folderSort, currentPageFolder, pageSize);
        setFolders(data.foldersList || []);
        setPageCountFolder(data.totalPages || 0);
  
        if (currentFolderId) {
          // order 값이 없으면 기본값으로 "create-newest" 설정
          const finalOrder = folderNoteSort || "create-newest";
          const folderNotesData = await getNoteToFolder(currentFolderId, folderNotesPage, pageSize, finalOrder);
          
          console.log('currentFolderId, folderNotesPage, pageSize, finalOrder:', currentFolderId, folderNotesPage, pageSize, finalOrder);
          
          setFolderNotes(folderNotesData.noteList || []);
          setFolderNotesPageCount(folderNotesData.totalPage || 0);
        } else {
          console.log('currentFolderId is null or undefined:', currentFolderId);
        }
        
      } else if (selectedTab === '노트') {
        // 노트 관련 데이터 가져오기
        data = await getNoteFilterSort(colorQuery, noteSort, currentPageNote, pageSize);
        setNotes(data.noteList || []);
        setPageCountNote(data.totalPage || 0);
      }
    } catch (error) {
      console.error('데이터를 가져오는 데 실패했습니다:', error);
      setError('데이터를 가져오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchData();
  }, [selectedTab, currentPageFolder, currentPageNote, sortOption, currentFolderId, folderNotesPage, folderFilterColors, noteFilterColors, folderSort, folderNoteSort, noteSort]);

  useEffect(() => {
    if (selectedTab === '폴더') {
      setNoteFilterColors([]);
      setCurrentFolderId(null);
      setFolderNotes([]);
      setFolderNotesPage(0);
    } else if (selectedTab === '노트') {
      setFolderFilterColors([]);
    }
  }, [selectedTab]);
  
  

  const getCurrentFolderName = (folderId) => {
    const folder = folderNotes.find(note => note.folderId === folderId);
    return folder ? folder.folderName : '폴더';
  };

  const title = selectedTab === '폴더'
  ? currentFolderId
    ? getCurrentFolderName(currentFolderId)
    : '모든 폴더'
  : selectedTab === '노트'
  ? '모든 노트'
  : ' ';



  const handlePageChange = (selectedItem) => {
    if (selectedTab === '폴더') {
      if (currentFolderId) {
        setFolderNotesPage(selectedItem.selected);
      } else {
        setCurrentPageFolder(selectedItem.selected);
      }
    } else if (selectedTab === '노트') {
      setCurrentPageNote(selectedItem.selected);
    }
  };

  const handleSortOptionClick = (option) => {
    if (option) {
      const [tab, sortOption] = option.split(';');
    if (tab ==='폴더'){
      if(currentFolderId){
        setFolderNoteSort(sortOption);
      }else{
        setFolderSort(sortOption);
      }
    }else if (tab ==='노트'){
        setNoteSort(sortOption);
      }
  }
};

  const handleEdit = (item) => {
    setSelectedItem(item);
    setModalType(selectedTab === '폴더' ? 'editFolder' : 'editNote');
    setShowAddModal(true);
  };

  const handleDelete = (item) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  const handleMoreClick = (index) => {
    setActiveMoreDiv(activeMoreDiv === index ? null : index);
  };

  const handleMarkStatus = async (folder) => {
    try {
      await markFolder(folder.folderId, folder.markState === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE');
      fetchData();
    } catch (error) {
      console.error('폴더 즐겨찾기 상태 변경에 실패했습니다:', error);
    }
  };

  const handleMarkNoteStatus = async (note) => {
    try {
      await markNote(note.noteId, note.markState === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE');
      fetchData();
    } catch (error) {
      console.error('노트 즐겨찾기 상태 변경에 실패했습니다:', error);
    }
  };

  const closeModal = () => {
    setShowAddModal(false);
    setShowDeleteModal(false);
  };

  const handleFolderSubmit = async (data) => {
    try {
      const colorName = getColorNameByCode(data.selectedColor) || 'defaultColorName';
      
      if (modalType === 'addFolder') {
        await addFolder({
          folderName: data.folderName,
          selectedColor: colorName,
        });
      } else if (modalType === 'editFolder' && selectedItem) {
        await editFolder(selectedItem.folderId, {
          folderName: data.folderName,
          selectedColor: colorName,
        });
      }

      fetchData();
      closeModal();
    } catch (error) {
      console.error('폴더 추가/수정에 실패했습니다:', error);
    }
  };

  const getItemsToShow = () => {
    if (selectedTab === '폴더') {
      return currentFolderId ? folderNotes : folders;
    } else if (selectedTab === '노트') {
      return notes;
    }
    return [];
  };

  const handleFilterApply = (colors) => {
    if (selectedTab === '폴더') {
      setFolderFilterColors(colors);
    } else if (selectedTab === '노트') {
      setNoteFilterColors(colors);
    }
  };

  const handleFolderClick = async (folderId) => {
    try {
      if (folderId === undefined) {
        throw new Error('폴더 ID가 undefined입니다.');
      }
      setCurrentFolderId(folderId);
      const data = await getNoteToFolder(folderId, folderNotesPage, getPageSize());
      setFolderNotes(data.noteList || []);
      setFolderNotesPageCount(data.totalPage || 0);
    } catch (error) {
      console.error('폴더의 노트를 가져오는 데 실패했습니다:', error);
    }
  };

  const initialData = selectedItem
    ? {
        folderName: selectedItem.folderName || '',
        selectedColor: selectedItem.selectedColor || '',
      }
    : {};

  return (
    <FrameContainer>
      <Header>
        <h3>{title}</h3>
        <ButtonContainer>
          <SortDropdown 
            onSortOptionClick={handleSortOptionClick} 
            selectedTab={selectedTab} 
            currentFolderId={currentFolderId}
          />
          <FilteringDropdown 
            onFilterApply={handleFilterApply} 
            selectedTab={selectedTab}
          />
          {selectedTab !== '노트' && (
            <AddButton
              selectedTab={selectedTab}
              setSelectedItem={setSelectedItem}
              setShowAddModal={setShowAddModal}
              setModalType={setModalType}
              currentFolderId={currentFolderId}
            />
          )}
        </ButtonContainer>
        <Line />
      </Header>
      <Content>
        <ItemList
          items={getItemsToShow()}
          selectedTab={selectedTab}
          handleMarkStatus={handleMarkStatus}
          handleMarkNoteStatus={handleMarkNoteStatus}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleMoreClick={handleMoreClick}
          activeMoreDiv={activeMoreDiv}
          moveItem={handleFolderClick}
          onFolderClick={selectedTab === '폴더' ? handleFolderClick : undefined}
          currentFolderId={currentFolderId}
        />

        <PaginationContainer>
          {selectedTab === '폴더' ? (
            <>
              {!currentFolderId && (
                <Pagination
                  pageCount={pageCountFolder}
                  handlePageChange={handlePageChange}
                />
              )}
              {currentFolderId && (
                <Pagination
                  pageCount={folderNotesPageCount}
                  handlePageChange={handlePageChange}
                />
              )}
            </>
          ) : (
            <Pagination
              pageCount={pageCountNote}
              handlePageChange={handlePageChange}
            />
          )}
        </PaginationContainer>
      </Content>
      {showAddModal && (
        <FolderModal
          isOpen={showAddModal}
          onClose={closeModal}
          onSubmit={handleFolderSubmit}
          initialData={initialData}
          isEditMode={modalType === 'editFolder'}
        />
      )}
      {showDeleteModal && (
        <DeleteConfirmModal
          closeModal={closeModal}
          selectedItem={selectedItem}
          selectedTab={selectedTab}
          onDelete={() => {
            if (selectedTab === '폴더') {
              deleteFolder(selectedItem.folderId).then(() => fetchData());
            } else if (selectedTab === '노트') {
              deleteNote(selectedItem.noteId).then(() => fetchData());
            }
            closeModal();
          }}
        />
      )}
    </FrameContainer>
  );
};

export default Frame;
