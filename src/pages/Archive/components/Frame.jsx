  import { useState, useEffect } from 'react';
  import styled from 'styled-components';
  import { useNavigate, useLocation } from 'react-router-dom';
  import {
    getFolders,
    getNotes,
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

    @media (max-width: 1440px){
      width: 48rem;
    }
  `;

  const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 0;

    h3 {
      font-size: 1.25rem;
      font-weight: 600;
      line-height: normal;
    }
  `;

  const Content = styled.div`
    flex-grow: 1;
    overflow-y: auto;
  `;

  const Frame = () => {
    const [folders, setFolders] = useState([]);
    const [notes, setNotes] = useState([]);
    const [selectedTab, setSelectedTab] = useState('폴더');
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [sortOption, setSortOption] = useState('최신순');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeMoreDiv, setActiveMoreDiv] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [modalType, setModalType] = useState('');
    
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      fetchItems();
    }, [selectedTab, currentPage, sortOption]);

    const fetchItems = async () => {
      setLoading(true);
      setError(null);
      try {
        let response;
        if (selectedTab === '폴더') {
          response = await getFolders(sortOption, currentPage + 1);
          console.log('Folders response:', response);
    
          if (response && response.foldersList) {
            setFolders(response.foldersList);
            setPageCount(response.totalPages); // totalPages를 페이지 수로 설정
          } else {
            console.error('Unexpected response structure for folders:', response);
          }
        } else {
          response = await getNotes(sortOption, currentPage + 1);
          console.log('Notes response:', response);
    
          if (response && response.notesList) {
            setNotes(response.notesList);
            setPageCount(response.totalPages); // totalPages를 페이지 수로 설정
          } else {
            console.error('Unexpected response structure for notes:', response);
          }
        }
      } catch (error) {
        console.error('Error fetching items:', error);
        setError('Failed to fetch items.');
      } finally {
        setLoading(false);
      }
    };

    const handlePageChange = (event) => {
      const newPage = event.selected;
      setCurrentPage(newPage);
    };

    const handleSortOptionClick = (option) => {
      setSortOption(option);
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
        .then(() => fetchItems());
    };

    const handleMarkNoteStatus = (note) => {
      markNote(note.noteId, note.markState === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE')
        .then(() => fetchItems());
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
          <h3>{selectedTab}</h3>
          <div>
            <button onClick={() => {
              setSelectedItem(null);
              setModalType('addFolder');
              setShowAddModal(true);
            }}>
              <img src={addFolderIcon} alt='폴더 추가' />
              {selectedTab === '폴더' ? '폴더 추가' : '노트 추가'}
            </button>
            <SortDropdown onSortOptionClick={handleSortOptionClick} />
            <FilteringDropdown />
          </div>
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
          <Pagination
            pageCount={pageCount}
            handlePageChange={handlePageChange}
          />
        </Content>
        {showAddModal && <FolderModal type={modalType} item={selectedItem} onClose={closeModal} />}
        {showDeleteModal && <DeleteConfirmModal item={selectedItem} onClose={closeModal} onConfirm={() => {
          if (selectedTab === '폴더') {
            deleteFolder(selectedItem.folderId).then(() => fetchItems());
          } else {
            deleteNote(selectedItem.noteId).then(() => fetchItems());
          }
          closeModal();
        }} />}
      </FrameContainer>
    );
  };


  export default Frame;
