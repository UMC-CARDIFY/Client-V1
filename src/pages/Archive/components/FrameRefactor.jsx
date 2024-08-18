import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
  getFolders,
  getFolderSort,
  getNotes,
  getNoteSort,
  deleteFolder,
  deleteNote,
  markFolder,
  markNote,
  addFolder
} from '../../../api/archive';

import FolderModal from './FolderModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import SortDropdown from './SortDropdown';
import FilteringDropdown from './FilteringDropdown';
import Pagination from './Pagination';
import ItemList from './ItemList';
import addFolderIcon from '../../../assets/addFoldersvg.svg';
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
    max-width: 48rem;
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
  return colorEntry ? colorEntry[0] : 'defaultColorName'; // 색상 이름 반환
};

const Frame = ({ selectedTab }) => {
  const [folders, setFolders] = useState([]);
  const [notes, setNotes] = useState([]);
  const [currentPageFolder, setCurrentPageFolder] = useState(0);
  const [currentPageNote, setCurrentPageNote] = useState(0);
  const [pageCountFolder, setPageCountFolder] = useState(0);
  const [pageCountNote, setPageCountNote] = useState(0);
  const [sortOption, setSortOption] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeMoreDiv, setActiveMoreDiv] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const navigate = useNavigate();

  const getPageSize = () => window.innerWidth < 1440 ? 5 : 6;

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const pageSize = getPageSize();
      let data;

      if (selectedTab === '폴더') {
        data = sortOption
          ? await getFolderSort(sortOption, currentPageFolder, pageSize)
          : await getFolders(currentPageFolder, pageSize);

        setFolders(data.foldersList || []);
        setPageCountFolder(data.totalPages || 0);
      } else if (selectedTab === '노트') {
        data = sortOption
          ? await getNoteSort(sortOption, currentPageNote, pageSize)
          : await getNotes(currentPageNote, pageSize);

        setNotes(data.noteList || []);
        setPageCountNote(data.totalPage || 0);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setError('Failed to fetch data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedTab, currentPageFolder, currentPageNote, sortOption]);

  const handlePageChange = (selectedItem) => {
    if (selectedTab === '폴더') {
      setCurrentPageFolder(selectedItem.selected);
    } else if (selectedTab === '노트') {
      setCurrentPageNote(selectedItem.selected);
    }
  };

  const handleSortOptionClick = (option) => {
    if (option) {
      const [tab, sortOption] = option.split(';');
      if (tab === '폴더' || tab === '노트') {
        setSortOption(sortOption);
      } else {
        console.error('Invalid tab:', tab);
      }
    } else {
      console.error('Invalid sort option:', option);
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

  const handleMarkStatus = (folder) => {
    markFolder(folder.folderId, folder.markState === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE')
      .then(() => fetchData());
  };

  const handleMarkNoteStatus = (note) => {
    markNote(note.noteId, note.markState === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE')
      .then(() => fetchData());
  };

  const moveItem = (item) => {
    navigate(`/note/${item.noteId}`);
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
          selectedColor: colorName, // 색상 이름으로 변환하여 제출
        });
      } else if (modalType === 'editFolder') {
        // Folder edit logic here (e.g., API call to update folder)
      }
      fetchData(); // Refresh folder list
      setShowAddModal(false);
    } catch (error) {
      console.error('Failed to add/edit folder:', error);
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
        <h3>{selectedTab === '폴더' ? '모든 폴더' : '모든 노트'}</h3>
        <ButtonContainer>
          <AddButton
            selectedTab={selectedTab}
            setSelectedItem={setSelectedItem}
            setShowAddModal={setShowAddModal}
            setModalType={setModalType}
            addFolderIcon={addFolderIcon}
          />
          <SortDropdown 
            onSortOptionClick={handleSortOptionClick} 
            selectedTab={selectedTab} 
          />
          <FilteringDropdown />
        </ButtonContainer>
        <Line />
      </Header>
      <Content>
        <ItemList
          items={selectedTab === '폴더' ? folders : notes}
          selectedTab={selectedTab}
          handleMarkStatus={handleMarkStatus}
          handleMarkNoteStatus={handleMarkNoteStatus}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleMoreClick={handleMoreClick}
          activeMoreDiv={activeMoreDiv}
          moveItem={moveItem}
        />
            <PaginationContainer>
        {selectedTab === '폴더' ? (
          <Pagination
            pageCount={pageCountFolder}
            handlePageChange={handlePageChange}
          />
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
