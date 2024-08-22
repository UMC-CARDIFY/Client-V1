import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { addNote } from '../../../api/archive';
import AddIcon from '../../../assets/addIcon.svg';
import FolderSelectModal from '../../../components/Modal/SelectFolderModal';
import { useState } from 'react';

const StyledButton = styled.button`
  display: flex;
  padding: 0.1875rem 0.5rem 0.1875rem 0.375rem;
  align-items: center;
  gap: 0.3125rem;
  border-radius: 0.3125rem;
  background: #ECEFF4;
  border: none;
  cursor: pointer;
  color: #1A1A1A;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  img {
    width: 1rem;
    height: 1rem;
  }

      &:hover {
    background: #E3EAF6; 
  }

  &:active {
    background:#DCE8FF; 
  }
    
  
`;

const AddButton = ({ selectedTab, setSelectedItem, setShowAddModal, setModalType, currentFolderId }) => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  


  const handleModalClose = () => {
    setIsModalOpen(false); 
  };

  const handleClick = async () => {
    setSelectedItem(null);

    if (selectedTab === '폴더' && currentFolderId) {
      try {
        const data = await addNote(currentFolderId);

        setModalType('addNote');
        navigate(`/note-editor?folderId=${currentFolderId}&noteId=${data.noteId}`);
      } catch (error) {
        console.error('노트 추가 실패:', error);
      }
    } else if (selectedTab === '폴더') {
      setShowAddModal(true);
      setModalType('addFolder');
    }
    else{
        setIsModalOpen(true);
      
    }
  };

  return (
    <StyledButton onClick={handleClick}>
  <img 
    src={AddIcon} 
    alt={
      selectedTab === '폴더' && currentFolderId
        ? '노트 추가'
        : selectedTab === '노트'
        ? '노트 추가'
        : '폴더 추가'
    } 
  />
  {selectedTab === '폴더' && currentFolderId
    ? '노트 추가'
    : selectedTab === '노트'
    ? '노트 추가'
    : '폴더 추가'}
    <FolderSelectModal isOpen={isModalOpen} onClose={handleModalClose} />
</StyledButton>

  );
};

AddButton.propTypes = {
  selectedTab: PropTypes.string.isRequired,
  setSelectedItem: PropTypes.func.isRequired,
  setShowAddModal: PropTypes.func.isRequired,
  setModalType: PropTypes.func.isRequired,
  addFolderIcon: PropTypes.string.isRequired,
  currentFolderId: PropTypes.string 
};

export default AddButton;
