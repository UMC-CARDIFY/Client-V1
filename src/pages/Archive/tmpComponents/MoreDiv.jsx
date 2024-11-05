import PropTypes from 'prop-types'; // prop-types 패키지 임포트
import { forwardRef, useState } from 'react';
import styled from 'styled-components';
import KebabIcon from '../../../assets/kebab.svg';
import { deleteFolder, deleteNote } from '../../../api/archive';
import DeleteConfirmModal from './DeleteConfirmModal'; // 모달 컴포넌트 임포트

const MoreDivContainer = styled.div`
  position: relative;
  border-radius: 0.25rem;
  display: flex;
  width: 2rem;
  height: 2rem;
  padding: 0.375rem 0.875rem;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  &:hover {
    background: var(--Grays-Gray7, #F0F0F0);
  }
`;

const Options = styled.div`
  display: flex;
  width: 8.8125rem;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 0;
  right: 2.5rem;
  z-index: 1;
  border-radius: 0.5rem;
  box-shadow: 0px 4px 26px 0px rgba(0, 0, 0, 0.02), 0px 10px 60px 0px rgba(0, 74, 162, 0.03);
`;

const OptionEditButton = styled.button`
  display: flex;
  padding: 1.0625rem 2rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
  cursor: pointer;
  border: none;
  border-radius: 0.5rem 0.5rem 0rem 0rem;
  border: 1px solid var(--grays-gray-5-divider, #E8E8E8);
  background: var(--Grays-White, #FFF);
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const OptionDeleteButton = styled(OptionEditButton)`
  border-radius: 0rem 0rem 0.5rem 0.5rem;
  border-top: none;
`;

const NoteDeleteButton = styled(OptionEditButton)`
  border-radius: 0.5rem;
`;

const MoreButton = styled.div`
  flex-shrink: 0;
  cursor: pointer;
`;

const Icon = styled.img``;

const MoreDiv = forwardRef(({ type, onEditClick, onDeleteClick, isActive, onMoreClick, itemId, itemName }, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = async () => {
    console.log('Deleting item with ID:', itemId);
    
    try {
      if (type === 'note') {
        await deleteNote(itemId);
      } else if (type === 'folder') {
        await deleteFolder(itemId);
      }
      onDeleteClick(); // 삭제 후 호출되는 콜백
      window.location.reload();
    } catch (error) {
      console.error('삭제 실패:', error);
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <MoreDivContainer ref={ref} onClick={onMoreClick}>
        <MoreButton>
          <Icon src={KebabIcon} />
        </MoreButton>
        {isActive && (
          <Options>
            {type === 'folder' && (
              <>
                <OptionEditButton onClick={onEditClick}>폴더 수정</OptionEditButton>
                <OptionDeleteButton onClick={handleDeleteClick}>폴더 삭제</OptionDeleteButton>
              </>
            )}
            {type === 'note' && (
              <NoteDeleteButton onClick={handleDeleteClick}>노트 삭제</NoteDeleteButton>
            )}
          </Options>
        )}
      </MoreDivContainer>

      <DeleteConfirmModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleDeleteConfirm}
        type={type}
        itemName={itemName}
      />
    </>
  );
});

MoreDiv.displayName = 'MoreDiv';

MoreDiv.propTypes = {
  type: PropTypes.string.isRequired,     
  onEditClick: PropTypes.func.isRequired,  
  onDeleteClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,     
  onMoreClick: PropTypes.func.isRequired,  
  itemId: PropTypes.string.isRequired,     
  itemName: PropTypes.string.isRequired,  
};

export default MoreDiv;
