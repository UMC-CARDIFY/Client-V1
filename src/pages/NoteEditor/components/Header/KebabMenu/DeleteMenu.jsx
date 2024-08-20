import PropTypes from 'prop-types';
import styled from 'styled-components';
import { deleteNote } from '../../../../../api/noteeditor/deleteNote';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  display: flex;
  width: 29.5rem;
  padding: 2rem 2rem 1.5rem 2rem;
  flex-direction: column;
  background: var(--Grays-White, #FFF);
  border-radius: 0.5rem;
  box-shadow: 0px 4px 26px 0px rgba(0, 0, 0, 0.02), 0px 10px 60px 0px rgba(0, 74, 162, 0.03);
  z-index: 1000;
`;

const Title = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  color: var(--Semantic-Alert, #EA1215);
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  margin : 0;
  margin-bottom: 0.25rem;
  padding: 0;
  color: var(--Grays-Black, #1A1A1A);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1.25rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  background: #fff;
  color: var(--Grays-Black, #1A1A1A);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  &:hover {
    background: var(--Grays-Gray7, #F0F0F0);  
  }
`;

const DeleteMenu = ({ noteId, onClose }) => {

  const handleDelete = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('토큰이 존재하지 않습니다. 다시 로그인해주세요.');
      return;
    }

    try {
        const response = await deleteNote(noteId, token);
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
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ marginRight: '0.75rem' }}>
            <path d="M12 14V6M12 18V16M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2Z" stroke="#EA1215" strokeWidth="2"/>
          </svg>
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