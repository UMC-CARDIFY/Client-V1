import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledButton = styled.button`
  display: flex;
  padding: 0.1875rem 0.5rem 0.1875rem 0.375rem;
  align-items: center;
  gap: 0.3125rem;
  border-radius: 0.3125rem;
  background: var(--Main-Button, #ECEFF4);
  border: none;
  cursor: pointer;

  img {
    width: 1rem;
    height: 1rem;
  }
`;

const AddButton = ({ selectedTab, setSelectedItem, setShowAddModal, setModalType, addFolderIcon, currentFolderId }) => {
  const handleClick = () => {
    setSelectedItem(null);
    setShowAddModal(true);

    if (selectedTab === '폴더' && currentFolderId) {
      setModalType('addNote');

    } else if (selectedTab === '폴더') {
      setModalType('addFolder');

    }
  };

  return (
    <StyledButton onClick={handleClick}>
      <img src={addFolderIcon} alt={selectedTab === '폴더' && currentFolderId ? '노트 추가' : '폴더 추가'} />
      {selectedTab === '폴더' && currentFolderId ? '노트 추가' : '폴더 추가'}
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
