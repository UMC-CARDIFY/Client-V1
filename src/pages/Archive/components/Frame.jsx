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
  markNote
} from '../../../api/archive';

import FolderModal from './FolderModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import SortDropdown from './SortDropdown';
import FilteringDropdown from './FilteringDropdown';
import Pagination from './Pagination';
import ItemList from './ItemList';
import addFolderIcon from '../../../assets/addFoldersvg.svg';

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

const Frame = () => {
  const [folders, setFolders] = useState([]);
  const [notes, setNotes] = useState([]);
  const [selectedTab, setSelectedTab] = useState('폴더');
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [sortOption, setSortOption] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeMoreDiv, setActiveMoreDiv] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const navigate = useNavigate();

  // 화면 크기에 따라 페이지 사이즈 결정
  const getPageSize = () => {
    return window.innerWidth < 1440 ? 5 : 6;
  };

  // 데이터 가져오기 함수
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      let data;
      const pageSize = getPageSize(); // 화면 너비에 따라 페이지 사이즈 결정

      console.log('Sort Option:', sortOption); // 디버깅 메시지
      console.log('Current Page:', currentPage);
      console.log('Page Size:', pageSize);

      if (selectedTab === '폴더') {
        if (sortOption && sortOption !== 'undefined') { // 'undefined' 검증 추가
          data = await getFolderSort(sortOption, currentPage, pageSize);
        } else {
          data = await getFolders(currentPage, pageSize); // 폴더 목록 API 호출
        }
        console.log('Folders response:', data);
        if (data && data.foldersList) {
          setFolders(data.foldersList);
          setPageCount(data.totalPages); // totalPages를 페이지 수로 설정
        } else {
          console.error('Unexpected response structure for folders:', data);
        }
      } else if (selectedTab === '노트') {
        if (sortOption && sortOption !== 'undefined') { // 'undefined' 검증 추가
          data = await getNoteSort(sortOption, currentPage, pageSize); // 노트 정렬 API 호출
        } else {
          data = await getNotes(currentPage, pageSize); // 노트 목록 API 호출
        }
        console.log('Notes response:', data);
        if (data && data.notesList) {
          setNotes(data.notesList);
          setPageCount(data.totalPages); // totalPages를 페이지 수로 설정
        } else {
          console.error('Unexpected response structure for notes:', data);
        }
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
    // 화면 크기 변경 시 페이지 사이즈를 다시 계산하도록 이벤트 리스너 등록
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [selectedTab, currentPage, sortOption]);

  // 화면 크기 변경 시 데이터 다시 로드
  const handleResize = () => {
    fetchData(); // 화면 크기 변경 시 데이터를 다시 로드
  };

  const handlePageChange = (event) => {
    const newPage = event.selected;
    setCurrentPage(newPage);
  };

  const handleSortOptionClick = (option) => {
    console.log(`Selected sort option in ParentComponent: ${option}`);
  
    // option 값이 올바르게 설정되는지 확인
    if (option) {
      const [selectedTab, sortOption] = option.split(';');
      console.log(`Selected Tab: ${selectedTab}, Sort Option: ${sortOption}`);
  
      if (selectedTab === '폴더') {
        console.log(`폴더 정렬 옵션: ${sortOption}`);
        setSortOption(sortOption);
      } else if (selectedTab === '노트') {
        console.log(`노트 정렬 옵션: ${sortOption}`);
        setSortOption(sortOption);
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
      .then(() => fetchData()); // 수정된 부분
  };

  const handleMarkNoteStatus = (note) => {
    markNote(note.noteId, note.markState === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE')
      .then(() => fetchData()); // 수정된 부분
  };

  const moveItem = (item) => {
    navigate(`/note/${item.noteId}`);
  };

  const closeModal = () => {
    setShowAddModal(false);
    setShowDeleteModal(false);
  };

  return (
    <FrameContainer>
      <Header>
        <h3>{selectedTab === '폴더' ? '모든 폴더' : '모든 노트'}</h3>
        <ButtonContainer>
          <button onClick={() => {
            setSelectedItem(null);
            setModalType('addFolder');
            setShowAddModal(true);
          }}>
            <img src={addFolderIcon} alt='폴더 추가' />
            {selectedTab === '폴더' ? '폴더 추가' : '노트 추가'}
          </button>
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
          <Pagination
            pageCount={pageCount}
            handlePageChange={handlePageChange}
          />
        </PaginationContainer>
      </Content>
      {showAddModal && <FolderModal type={modalType} item={selectedItem} onClose={closeModal} />}
      {showDeleteModal && <DeleteConfirmModal item={selectedItem} onClose={closeModal} onConfirm={() => {
        if (selectedTab === '폴더') {
          deleteFolder(selectedItem.folderId).then(() => fetchData()); // 수정된 부분
        } else {
          deleteNote(selectedItem.noteId).then(() => fetchData()); // 수정된 부분
        }
        closeModal();
      }} />}
    </FrameContainer>
  );
};

export default Frame;
