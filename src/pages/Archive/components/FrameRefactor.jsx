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
  addFolder,
  editFolder,
  getNoteToFolder
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

const Frame = ({ selectedTab, setSelectedTab }) => {
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
  const [folderNotes, setFolderNotes] = useState([]); // 폴더의 노트를 저장할 상태
  const [currentFolderId, setCurrentFolderId] = useState(null); // 현재 폴더 ID 상태 관리

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

        // 폴더 ID가 존재하면 해당 폴더의 노트를 가져옵니다.
        if (currentFolderId) {
          const folderNotesData = await getNoteToFolder(currentFolderId);
          setFolderNotes(folderNotesData.noteList || []);
        }
      } else if (selectedTab === '노트') {
        data = sortOption
          ? await getNoteSort(sortOption, currentPageNote, pageSize)
          : await getNotes(currentPageNote, pageSize);

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
  }, [selectedTab, currentPageFolder, currentPageNote, sortOption, currentFolderId]);

  useEffect(() => {
    console.log('현재 폴더 ID:', currentFolderId);
    console.log('폴더의 노트:', folderNotes);
  }, [folderNotes, currentFolderId, selectedTab]);

  // 폴더 이름을 가져오기 위한 함수 수정
  const getCurrentFolderName = (folderId) => {
    const folder = folderNotes.find(note => note.folderId === folderId);
    return folder ? folder.folderName : '폴더';
  };

  // 제목 결정
  const title = currentFolderId
    ? getCurrentFolderName(currentFolderId)  // 현재 폴더 ID가 있을 때는 해당 폴더의 이름으로 설정
    : selectedTab === '폴더'
    ? '모든 폴더'
    : '모든 노트';

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
        console.error('잘못된 탭:', tab);
      }
    } else {
      console.error('잘못된 정렬 옵션:', option);
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
      fetchData(); // 데이터 새로고침
    } catch (error) {
      console.error('폴더 즐겨찾기 상태 변경에 실패했습니다:', error);
    }
  };
  
  const handleMarkNoteStatus = async (note) => {
    try {
      await markNote(note.noteId, note.markState === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE');
      fetchData(); // 데이터 새로고침
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
 
      fetchData(); // 폴더 목록 새로고침
      setShowAddModal(false);
    } catch (error) {
      console.error('폴더 추가/수정에 실패했습니다:', error);
    }
  };

  const handleFolderClick = async (folderId) => {
    console.log('handleFolderClick 호출됨, 폴더 ID:', folderId);
    try {
      if (folderId === undefined) {
        throw new Error('폴더 ID가 undefined입니다.');
      }
      setCurrentFolderId(folderId);
      const data = await getNoteToFolder(folderId);
      setFolderNotes(data.noteList || []);
      console.log('폴더의 노트 결과:', data.noteList);
    } catch (error) {
      console.error('폴더의 노트를 가져오는 데 실패했습니다:', error);
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
          />
          <FilteringDropdown />
          {selectedTab !== '노트' && (
            <AddButton
              selectedTab={selectedTab}
              setSelectedItem={setSelectedItem}
              setShowAddModal={setShowAddModal}
              setModalType={setModalType}
              addFolderIcon={addFolderIcon}
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
          moveItem={handleFolderClick} // handleFolderClick을 전달
          onFolderClick={selectedTab === '폴더' ? handleFolderClick : undefined} // onFolderClick을 전달
          currentFolderId={currentFolderId} // 현재 폴더 아이디를 전달
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
