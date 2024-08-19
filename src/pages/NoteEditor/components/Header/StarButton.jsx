import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { markNote } from '../../../../api/noteeditor/markNote';
import { NoteContext } from '../../../../api/NoteContext';

const StarButtonWrapper = styled.button`
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
  background: none;
  border: none;
  cursor: pointer;

  svg {
    width: 100%;
    height: 100%;
    stroke-width: '1.3px';

    stroke: ${(props) => (props.$active ? 'rgba(255, 211, 56, 1)' : '#B1B1B1')};
    fill: ${(props) => (props.$active ? 'rgba(255, 211, 56, 1)' : 'none')};
  }
`;

const StarButton = () => {
  const { noteData, setNoteData } = useContext(NoteContext); // NoteContext 사용
  const [isActive, setIsActive] = useState(noteData?.markState || false);

  useEffect(() => {
    if (noteData) {
      // noteId가 변경될 때마다 markState를 업데이트
      setIsActive(noteData.markState);
    }
  }, [noteData?.markState]);

  const handleMark = async () => {
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      alert('토큰이 존재하지 않습니다. 다시 로그인해주세요.');
      return;
    }
    
    try {
      // 즐겨찾기 상태 토글
      const newMarkState = !isActive;
      const response = await markNote(noteData.noteId, newMarkState, token);
      if (response.isSuccess) {
        setIsActive(newMarkState); // 상태 업데이트
        setNoteData((prevData) => ({
          ...prevData,
          markState: newMarkState, // 전역 상태 업데이트
        }));
        alert('즐겨찾기 상태가 변경되었습니다.');
      } else {
        alert('즐겨찾기 상태 변경에 실패했습니다.');
      }
    } catch (error) {
      alert('오류가 발생했습니다.');
      console.error(error);
    }
  };

  if (!noteData) {
    return null; // noteData가 없을 때는 아무것도 렌더링하지 않음
  }

  return (
    <StarButtonWrapper $active={isActive} onClick={handleMark}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 20" fill="none">
        <path d="M11.3026 16.2009C11.1133 16.1014 10.8871 16.1014 10.6978 16.2009L5.17609 19.1035L6.23071 12.9547C6.26688 12.7438 6.19694 12.5286 6.04368 12.3793L1.57487 8.02497L7.74838 7.12784C7.96006 7.09708 8.14305 6.96414 8.23774 6.77233L11.0001 1.17687L13.7616 6.77226C13.8563 6.9641 14.0393 7.09707 14.251 7.12784L20.4247 8.025L15.9567 12.3793C15.8035 12.5287 15.7336 12.7439 15.7698 12.9548L16.8253 19.1035L11.3026 16.2009ZM4.7098 19.3487C4.70991 19.3486 4.71001 19.3485 4.71012 19.3485L4.7098 19.3487ZM20.802 7.65727L20.8016 7.6577L20.802 7.65727Z" stroke={`${(props) => (props.active ? 'rgba(255, 211, 56, 1)' : '#B1B1B1')}`} strokeWidth="1.3" strokeLinejoin="round"/>
      </svg>
    </StarButtonWrapper>
  );
};

export default StarButton;