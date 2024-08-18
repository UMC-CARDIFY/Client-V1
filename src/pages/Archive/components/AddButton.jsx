import styled from 'styled-components';

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

const AddButton = ({ selectedTab, setSelectedItem, setShowAddModal, setModalType, addFolderIcon }) => {
  const handleClick = () => {
    setSelectedItem(null);
    setShowAddModal(true);

    if (selectedTab === '폴더') {
      setModalType('addFolder');
      // 폴더 관련 API 호출
    } else if (selectedTab === '노트') {
      setModalType('addNote');
      // 노트 관련 API 호출
    }
  };

  return (
    <StyledButton onClick={handleClick}>
      <img src={addFolderIcon} alt={selectedTab === '폴더' ? '폴더 추가' : '노트 추가'} />
      {selectedTab === '폴더' ? '폴더 추가' : '노트 추가'}
    </StyledButton>
  );
};

export default AddButton;
