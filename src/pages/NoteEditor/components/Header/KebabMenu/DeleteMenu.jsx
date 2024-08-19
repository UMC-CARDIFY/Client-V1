import PropTypes from 'prop-types';
import { deleteNote } from '../../../../../api/noteeditor/deleteNote';
//import { useContext } from 'react';
//import { NoteContext } from '../../../../../api/NoteContext';
import { ModalOverlay, ModalContent, Title, Description, ButtonGroup, Button } from '../../../../../components/Modal/style/DeleteModalStyles';
import  deleteIcon from '../../../../../../src/assets/deleteicon.svg';

const DeleteMenu = ({ noteId, onClose }) => {
  //const { noteData, setNoteData } = useContext(NoteContext);
  console.log('삭제 노트 id: ', noteId);

  const handleDelete = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('토큰이 존재하지 않습니다. 다시 로그인해주세요.');
      return;
    }

    try {
       const response = await deleteNote(noteId, token);
        //const response = await deleteNote(noteData.noteId, token);
        if (response.isSuccess) {
          alert('노트가 성공적으로 삭제되었습니다.');
          onClose();
        } else {
          alert('노트 삭제에 실패했습니다.');
        }
      } catch (error) {
        console.error('Failed to delete note:', error);
        alert('노트 삭제 중 오류가 발생했습니다.');
      } 
    };

  return (
    <ModalOverlay>
        <ModalContent>
        <Title>
          <img src={deleteIcon} alt="deleteIcon" style={{ marginRight: '0.75rem' }} />
          노트 삭제
        </Title>
        <Description>‘노트 이름’을 삭제하시겠습니까? </Description>
        <Description> 이 노트 안의 플래시카드도 함께 삭제됩니다.</Description>
        <ButtonGroup>
            <Button onClick={onClose}>취소</Button>
            <Button onClick={handleDelete}>확인</Button>
        </ButtonGroup>
        </ModalContent>
    </ModalOverlay>
  );
};

DeleteMenu.propTypes = {
  noteId: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DeleteMenu;